export const validateVoteReq = (req, res, next) => {
  const voteData = req.body.vote;

  if (voteData !== 1 && voteData !== -1) {
    return res.status(400).json({ message: "Invalid vote value." });
  }

  next();
};
