const User = require('../models/userModel');
const Conversation = require('../models/dsaInteractionModel');

exports.returnUserProfileInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.returnUserConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    next(error);
  }
};
