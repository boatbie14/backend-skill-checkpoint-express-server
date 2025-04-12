import express from "express";
import questionsRouter from "./routers/questions.mjs";
import questionSearchRouter from "./routers/questions-by-search.mjs";
import questionVoteRouter from "./routers/question-vote.mjs";
import answersRouter from "./routers/answers.mjs";
import answerVoteRouter from "./routers/answer-vote.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀..");
});
app.use("/questions/search", questionSearchRouter);
app.use("/questions/:questionId/vote", questionVoteRouter);
app.use("/questions/:questionId/answers", answersRouter);
app.use("/questions", questionsRouter);
app.use("/answers/:answerId/vote", answerVoteRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
