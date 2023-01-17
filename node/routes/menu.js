const express = require('express');
const db = require('../utils/db');
const router = express.Router();

router.get('/', function(req, res, next) {
  const itemsQuery = `SELECT
    table_items.id AS id,
    table_items.name AS title,
    table_items.price AS price,
    table_items.section_id AS section_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', table_modifiers.id,
        'title', table_modifiers.description
      )
    ) as modifiers
  FROM table_items
  LEFT JOIN table_items_x_modifiers
  ON table_items.id = table_items_x_modifiers.item_id
  LEFT JOIN table_modifiers
  ON table_modifiers.id = table_items_x_modifiers.modifier_id
  WHERE table_items.deleted = 0
  GROUP BY
    table_items.id,
    table_items.name,
    table_items.price,
    table_items.section_id
  `;


  db.query(
    `SELECT
      table_sections.id AS id,
      table_sections.name AS title,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', items.id,
          'title', items.title,
          'price', items.price,
          'modifiers', items.modifiers
        )
      ) as items
      FROM table_sections
      LEFT JOIN (${itemsQuery}) AS items
      ON items.section_id = table_sections.id
      WHERE table_sections.deleted = 0
      GROUP BY
        table_sections.id,
        table_sections.name;
    `, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('There seems to have been a problem.');
      }

      const formattedResults = results.map((row) => {
        const items = JSON.parse(row.items);
        console.log(items);
        return {
          ...row,
          items: (items[0].id) ? items : []
        }
      });

      res.json(formattedResults);
  });
});

module.exports = router;
