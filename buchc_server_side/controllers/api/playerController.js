import Player from '../../models/Player.js';

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ rank: 1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
