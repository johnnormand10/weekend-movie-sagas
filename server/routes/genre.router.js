const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const queryText = `
    SELECT * FROM genres ORDER BY "name" ASC
  `;

  pool.query(queryText)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.error('ERROR in genre.router getting all genres:', err);
    res.sendStatus(500);
  })
});

module.exports = router;