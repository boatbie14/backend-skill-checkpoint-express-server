export const validateReqeQuestion = (req, res, next) => {
  const { title, description, category } = req.body;

  if (title == "" || description == "" || category == "") {
    return res.status(400).json({ message: "Invalid request data." });
  }

  if (description.length > 300) {
    return res.status(400).json({ message: "The description is over 300 characters." });
  }

  next();
};
