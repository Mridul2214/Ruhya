const Content = require('../models/Content');

const getAllContent = async (req, res) => {
  try {
    const content = await Content.find().sort({ section: 1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSection = async (req, res) => {
  try {
    const { section } = req.params;
    const content = await Content.findOne({ section: section.toLowerCase() });

    if (!content) {
      return res.status(404).json({ message: 'Section not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateSection = async (req, res) => {
  try {
    const { section } = req.params;
    const { title, subtitle, body, imageUrl } = req.body;

    const updatedContent = await Content.findOneAndUpdate(
      { section: section.toLowerCase() },
      { title, subtitle, body, imageUrl },
      { new: true, runValidators: true, upsert: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: 'Section not found' });
    }

    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllContent, getSection, updateSection };
