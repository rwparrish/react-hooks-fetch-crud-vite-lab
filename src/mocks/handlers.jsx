import { http } from "msw";
import { data } from "./data";

let questions = data;

export const handlers = [
  http.get("http://localhost:3000/questions", (req, res, ctx) => {
    const response = res(ctx.json(questions))
    console.log("HELLO", response)
    return res(ctx.json(questions));
  }),
  http.post("http://localhost:3000/questions", (req, res, ctx) => {
    const id = questions[questions.length - 1]?.id + 1 || 1;
    const question = { id, ...req.body };
    questions.push(question);
    return res(ctx.json(question));
  }),
  http.delete("http://localhost:3000/questions/:id", (req, res, ctx) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
    }
    questions = questions.filter((q) => q.id !== parseInt(id));
    return res(ctx.json({}));
  }),
  http.patch("http://localhost:3000/questions/:id", (req, res, ctx) => {
    const { id } = req.params;
    const { correctIndex } = req.body;
    const question = questions.find((q) => q.id === parseInt(id));
    if (!question) {
      return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
    }
    question.correctIndex = correctIndex;
    return res(ctx.json(question));
  }),
];
