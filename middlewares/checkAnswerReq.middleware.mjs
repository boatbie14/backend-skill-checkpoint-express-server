export const validateAnswerReq = (req, res, next) => {
  if (!req.body.content) {
    return res.status(400).json({ message: "Invalid request data." });
  }
  next();
};
