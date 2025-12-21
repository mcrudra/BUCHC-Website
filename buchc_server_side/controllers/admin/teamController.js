import TeamMember from '../../models/TeamMember.js';
import { body, validationResult } from 'express-validator';

export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ createdAt: -1 });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamMember = async (req, res) => {
  try {
    const isNew = req.params.id === 'new';
    
    if (isNew) {
      return res.json({
        _id: 'new',
        name: '',
        position: '',
        department: 'governing',
        photo: '',
        mail: ''
      });
    }
    
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(teamMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const data = req.body;
    
    // Validate required fields
    if (!data.name || !data.position || !data.department) {
      return res.status(400).json({ message: 'Name, position, and department are required' });
    }
    
    const teamMember = await TeamMember.create(data);
    res.status(201).json(teamMember);
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.json(teamMember);
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
