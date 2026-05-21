import Event from "../../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    // Sync event `is_past` flags before returning lists
    try {
      const now = new Date();
      // Mark past events
      await Event.updateMany(
        { is_past: false, date: { $lt: now } },
        { $set: { is_past: true } },
      );
      // Optionally mark future events as not past (in case date was changed)
      await Event.updateMany(
        { is_past: true, date: { $gte: now } },
        { $set: { is_past: false } },
      );
    } catch (syncErr) {
      console.error("Failed to sync event is_past flags:", syncErr);
    }
    const upcomingEvents = await Event.find({ is_past: false }).sort({
      date: 1,
    });

    const pastEvents = await Event.find({ is_past: true })
      .sort({ date: -1 })
      .limit(4);

    res.json({
      upcomingEvents,
      pastEvents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
