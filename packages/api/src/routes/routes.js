const express = require('express');
const { EXAMPLES_URI, DELETE_EXAMPLE_URI } = require('../constants/constants');
const examples = require('../controllers/examples');

const router = express.Router();

router.get(EXAMPLES_URI, examples.getAllExamples);
router.post(EXAMPLES_URI, examples.saveExample);
router.delete(DELETE_EXAMPLE_URI, examples.deleteExample);

module.exports = router;
