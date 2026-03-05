const router = require('express').Router();
const Poll = require('../models/Poll');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const polls = await Poll.find().sort('-createdAt').populate('creator', 'username');
  res.json(polls);
});

router.get('/:id', async (req, res) => {
  const poll = await Poll.findById(req.params.id).populate('creator', 'username');
  res.json(poll);
});

router.post('/', auth, async (req, res) => {
  const { question, options, expiresAt } = req.body;
  const poll = await Poll.create({
    question,
    options: options.map(o => ({ text: o })),
    creator: req.user.id,
    expiresAt
  });
  res.json(poll);
});

router.post('/:id/vote', auth, async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (poll.voters.includes(req.user.id))
    return res.status(400).json({ msg: 'Already voted' });
  poll.options[req.body.optionIndex].votes += 1;
  poll.voters.push(req.user.id);
  await poll.save();
  res.json(poll);
});

router.delete('/:id', auth, async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (poll.creator.toString() !== req.user.id)
    return res.status(403).json({ msg: 'Not authorized' });
  await poll.deleteOne();
  res.json({ msg: 'Deleted' });
});

module.exports = router;