import { Router } from 'express';
const axios = require('axios');
const router = Router();

/**
 * Returns the list of results.
 */
router.get('/query', (req, res) => {
  const options = {
    headers: {
      'x-api-key': process.env.API_KEY
    }
  };

  const url = process.env.API + req.query;
  console.log('url', url);

  axios
    .get(url, options)
    .then(res => res.data)
    .then(results => {
      return res.status(200).json(results);
    })
    .catch(err => {
      console.log('Error', err.message, err.stack);
      res.status(err.response.status).json(err.response.data);
    });
});

export default router;
