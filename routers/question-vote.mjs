import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateQuestionId } from "../middlewares/checkQuestionId.middleware.mjs";
import { validateVoteReq } from "../middlewares/checkVoteReq.middleware.mjs";

const questionVoteRouter = Router({ mergeParams: true });

questionVoteRouter.post("/", [validateQuestionId, validateVoteReq], async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const vote = req.body.vote;
    await connectionPool.query(`INSERT INTO question_votes (question_id, vote) VALUES ($1, $2)`, [questionId, vote]);
    return res.status(200).json({ message: "Vote on the question has been recorded successfully." });
  } catch (e) {
    return res.status(500).json({ message: "Unable to vote question." });
  }
});

export default questionVoteRouter;
