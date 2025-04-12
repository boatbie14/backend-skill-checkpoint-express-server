import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateAnswerId } from "../middlewares/checkAnswerId.middleware.mjs";
import { validateVoteReq } from "../middlewares/checkVoteReq.middleware.mjs";

const answerVoteRouter = Router({ mergeParams: true });

answerVoteRouter.post("/", [validateAnswerId, validateVoteReq], async (req, res) => {
  try {
    const answerId = req.params.answerId;
    const newVote = req.body.vote;

    await connectionPool.query(`INSERT INTO answer_votes (answer_id, vote) VALUES ($1, $2)`, [answerId, newVote]);

    return res.status(200).json({ message: "Vote on the answer has been recorded successfully." });
  } catch (e) {
    return res.status(500).json({ message: "Unable to vote answer." });
  }
});

export default answerVoteRouter;
