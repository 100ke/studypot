const studyService = require("../services/studyService");

const createStudy = async (req, res) => {
  const { title, description, location, startDate, endDate } = req.body;
  const hostId = req.user.id;

  const study = await studyService.createStudy({
    title,
    description,
    location,
    startDate,
    endDate,
    hostId,
  });

  res.status(201).json(study);
};

module.exports = {
  createStudy,
};
