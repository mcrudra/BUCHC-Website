import TeamMember from '../../models/TeamMember.js';

export const getTeamMembers = async (req, res) => {
  try {
    // Get all governing body members
    const allGoverning = await TeamMember.find({ department: 'governing' });
    
    // Separate General Co-ordinator from other governing body members
    const generalCoordinator = allGoverning.find(
      member => member.position === 'General Co-ordinator'
    );
    
    const governingBody = allGoverning.filter(
      member => member.position !== 'General Co-ordinator'
    );

    res.json({
      governing: governingBody,
      general_coordinator: generalCoordinator || null,
      em: await TeamMember.find({ department: 'em' }),
      creative: await TeamMember.find({ department: 'creative' }),
      training: await TeamMember.find({ department: 'training' }),
      hr: await TeamMember.find({ department: 'hr' })
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
