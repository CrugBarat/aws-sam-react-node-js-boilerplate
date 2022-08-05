const { Examples } = require('../dynamo/models');
const { sortData } = require('../utils/sortData');
const { createId } = require('../utils/createId');

exports.getAllExamples = async (req, res) => {
  try {
    const data = await Examples.scan().exec();
    return res.json(sortData(data));
  } catch (err) {
    return res.status(500).json({ error: `Error getting all examples: ${err}` });
  }
};

exports.saveExample = async (req, res) => {
  req.body.id = createId();
  req.body.created = new Date().getTime();

  try {
    await Examples.create(req.body);
    return res.json({ status: 'Example saved!' });
  } catch (err) {
    return res.status(500).json({ error: `Error saving example: ${err}` });
  }
};

exports.deleteExample = async (req, res) => {
  const { id } = req.params;

  try {
    await Examples.delete({ id });
    return res.json({ status: `Example with ID:${id} deleted` });
  } catch (err) {
    return res.status(500).json({ error: `Error deleting example: ${err}` });
  }
};
