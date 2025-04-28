const Conversation = require('../models/conversationModel');

exports.getAllConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    next(error);
  }
};

exports.getConversationById = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ _id: req.params.id, userId: req.user.id });

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found.' });
    }

    res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
};

exports.deleteConversationById = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found.' });
    }

    res.status(200).json({ success: true, message: 'Conversation deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.clearAllConversations = async (req, res, next) => {
  try {
    await Conversation.deleteMany({ userId: req.user.id });
    res.status(200).json({ success: true, message: 'All conversations cleared successfully.' });
  } catch (error) {
    next(error);
  }
};
