import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ['governing', 'em', 'creative', 'training', 'hr']
    },
    photo: {
        type: String,
        default: null
    },
    mail: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
