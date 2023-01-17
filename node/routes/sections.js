const express = require('express');
const db = require('../utils/db');
const router = express.Router();

router.get('/', function(req, res, next) {
  db.query(
    `SELECT
      table_sections.id AS id,
      table_sections.name AS title,
      table_sections.description AS description
    FROM table_sections
    WHERE deleted = 0;
    `, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('There seems to have been a problem.');
      }

      res.json(results);
  });
});

router.get('/:id', function(req, res, next) {
  db.query(
    `SELECT
      table_sections.id AS id,
      table_sections.name AS title,
      table_sections.description AS description
    FROM table_sections
    WHERE table_sections.id = ${req.params.id};
    `, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('There seems to have been a problem.');
      }

      res.json(results[0] || null);
  });
});

router.post('/', function(req, res, next) {
  db.query(
    `INSERT INTO table_sections(
      name,
      description
    ) VALUES (
      '${req.body.name}',
      '${req.body.description}'
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
    `UPDATE table_sections
    SET
      name = '${req.body.name}',
      description = '${req.body.description}'
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
    `UPDATE table_sections
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

module.exports = router;
