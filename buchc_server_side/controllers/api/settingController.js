import Setting from '../../models/Setting.js';

export const getJoinLink = async (req, res) => {
  try {
    const joinLink = await Setting.get('join_link', '');
    res.json({ join_link: joinLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSettings = async (req, res) => {
  try {
    res.json({
      join_link: await Setting.get('join_link', ''),
      club_email: await Setting.get('club_email', ''),
      facebook_link: await Setting.get('facebook_link', ''),
      instagram_link: await Setting.get('instagram_link', ''),
      linkedin_link: await Setting.get('linkedin_link', '')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
