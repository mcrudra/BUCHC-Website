import Event from '../../models/Event.js';
import Player from '../../models/Player.js';
import TeamMember from '../../models/TeamMember.js';

export const getDashboard = async (req, res) => {
  try {
    const eventsCount = await Event.countDocuments();
    const playersCount = await Player.countDocuments();
    const teamMembersCount = await TeamMember.countDocuments();

    res.json({
      events: eventsCount,
      players: playersCount,
      teamMembers: teamMembersCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
