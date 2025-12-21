import Setting from '../../models/Setting.js';
import { body, validationResult } from 'express-validator';

export const getSettings = async (req, res) => {
  try {
    const settings = {
      join_link: await Setting.get('join_link', ''),
      club_email: await Setting.get('club_email', ''),
      facebook_link: await Setting.get('facebook_link', ''),
      instagram_link: await Setting.get('instagram_link', ''),
      linkedin_link: await Setting.get('linkedin_link', '')
    };
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { join_link, club_email, facebook_link, instagram_link, linkedin_link } = req.body;
    
    if (join_link !== undefined) await Setting.set('join_link', join_link || '');
    if (club_email !== undefined) await Setting.set('club_email', club_email || '');
    if (facebook_link !== undefined) await Setting.set('facebook_link', facebook_link || '');
    if (instagram_link !== undefined) await Setting.set('instagram_link', instagram_link || '');
    if (linkedin_link !== undefined) await Setting.set('linkedin_link', linkedin_link || '');
    
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
