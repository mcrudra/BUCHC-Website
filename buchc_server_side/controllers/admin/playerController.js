import Player from '../../models/Player.js';
import { body, validationResult } from 'express-validator';

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ rank: 1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlayer = async (req, res) => {
  try {
    const isNew = req.params.id === 'new';

    if (isNew) {
      return res.json({
        _id: 'new',
        rank: '',
        name: '',
        points: ''
      });
    }

    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const data = req.body;
    data.rank = parseInt(data.rank);
    data.points = parseInt(data.points);

    // Validate required fields
    if (!data.name || !data.rank || !data.points) {
      return res.status(400).json({ message: 'Name, rank, and points are required' });
    }

    const existingPlayer = await Player.findOne({ rank: data.rank });
    if (existingPlayer) {
      return res.status(400).json({ message: 'Rank already exists' });
    }

    const player = await Player.create(data);
    res.status(201).json(player);
  } catch (error) {
    console.error('Create player error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const data = req.body;
    data.rank = parseInt(data.rank);
    data.points = parseInt(data.points);

    if (data.rank) {
      const existingPlayer = await Player.findOne({
        rank: data.rank,
        _id: { $ne: req.params.id }
      });
      if (existingPlayer) {
        return res.status(400).json({ message: 'Rank already exists' });
      }
    }

    const player = await Player.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json(player);
  } catch (error) {
    console.error('Update player error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
