const express = require('express');
const db = require('../utils/db');
const router = express.Router();

router.get('/', function(req, res, next) {
  db.query(
    `SELECT
      table_items.id AS id,
      table_items.name AS title,
      table_items.description AS description,
      table_items.price AS price,
      table_items.section_id AS section_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', table_modifiers.id,
          'description', table_modifiers.description
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
      table_items.description,
      table_items.price,
      table_items.section_id;
    `, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('There seems to have been a problem.');
      }

      const formattedResults = results.map((row) => {
        const modifiers = JSON.parse(row.modifiers);
        return {
          ...row,
          modifiers: (modifiers[0].id) ? modifiers: []
        }
      });

      res.json(formattedResults);
  });
});

router.get('/:id', function(req, res, next) {
  db.query(
    `SELECT
      table_items.id AS id,
      table_items.name AS title,
      table_items.description AS description,
      table_items.price AS price,
      table_items.section_id AS section_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', table_modifiers.id,
          'description', table_modifiers.description
        )
      ) as modifiers
    FROM table_items
    LEFT JOIN table_items_x_modifiers
    ON table_items.id = table_items_x_modifiers.item_id
    LEFT JOIN table_modifiers
    ON table_modifiers.id = table_items_x_modifiers.modifier_id
    WHERE table_items.id = ${req.params.id};
    `, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('There seems to have been a problem.');
      }

      const formattedResults = results.map((row) => {
        const modifiers = JSON.parse(row.modifiers);
        return {
          ...row,
          modifiers: (modifiers[0].id) ? modifiers: []
        }
      });

      res.json(formattedResults[0] || null);
  });
});

router.post('/', function(req, res, next) {
  db.query(
    `INSERT INTO table_items(
      name,
      description,
      price,
      section_id
    ) VALUES (
      '${req.body.name}',
      '${req.body.description}',
      ${req.body.price},
      ${req.body.section_id}
    );
    `, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('There seems to have been a problem.');
      }

      res.json({ message: 'Success' });
  });
});

router.put('/:id', function(req, res, next) {
  db.query(
    `UPDATE table_items
    SET
      name = '${req.body.name}',
      description = '${req.body.description}',
      price = ${req.body.price},
      section_id = ${req.body.section_id}
    WHERE id = ${req.params.id};
    `, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('There seems to have been a problem.');
      }

      res.json({ message: 'Success' });
  });
});

router.put('/delete/:id', function(req, res, next) {
  db.query(
    `UPDATE table_items
    SET
      deleted = 1
    WHERE id = ${req.params.id};
    `, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('There seems to have been a problem.');
      }

      res.json({ message: 'Success' });
  });
});

router.post('/map-to-modifiers', function(req, res, next) {
  db.query(
    `INSERT INTO table_items_x_modifiers(
      item_id,
      modifier_id
    ) VALUES ${
      (req.body.values || [])
        .map(({ item_id, modifier_id }) => `(${item_id}, ${modifier_id})`)
        .join(', ')
    };
    `, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('There seems to have been a problem.');
      }

      res.json({ message: 'Success' });
  });
});

module.exports = router;
