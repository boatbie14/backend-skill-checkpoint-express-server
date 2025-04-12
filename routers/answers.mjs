import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateQuestionId } from "../middlewares/checkQuestionId.middleware.mjs";
import { validateAnswerReq } from "../middlewares/checkAnswerReq.middleware.mjs";

const answersRouter = Router({ mergeParams: true });

//Get answers for a question
answersRouter.get("/", [validateQuestionId], async (req, res) => {
  const questionId = req.params.questionId;
  console.log(questionId);
  try {
    const result = await connectionPool.query(`SELECT * FROM answers WHERE question_id = $1`, [questionId]);

    return res.status(200).json({ found: result.rows.length, data: result.rows });
  } catch (e) {
    return res.status(500).json({ question_id: req.params.questionId, message: "Unable to fetch answers." });
  }
});

//Create an answer for a question
answersRouter.post("/", [validateQuestionId, validateAnswerReq], async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const newAnswer = req.body.content;

    const result = await connectionPool.query(`INSERT INTO answers (question_id, content) VALUES ($1, $2) RETURNING *`, [
      questionId,
      newAnswer,
    ]);

    return res.status(201).json({
      message: "Answer created successfully.",
      data: result.rows[0],
    });
  } catch (e) {
    return res.status(500).json({ message: "Unable to create answers." });
  }
});

//Delete all answers for a question
answersRouter.delete("/", [validateQuestionId], async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const result = await connectionPool.query(`SELECT * FROM answers WHERE question_id = $1`, [questionId]);
    await connectionPool.query(`DELETE FROM answers WHERE question_id = $1`, [questionId]);

    return res.status(200).json({ found: result.rows.length, message: "All answers for the question have been deleted successfully." });
  } catch (e) {
    return res.status(500).json({ message: "Unable to delete answers." });
  }
});

export default answersRouter;
