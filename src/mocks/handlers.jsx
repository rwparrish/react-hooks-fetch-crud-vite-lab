import { http, HttpResponse } from "msw";
import { data } from "./data";

let questions = data;

export const handlers = [
  http.get("http://localhost:3000/questions", () => {
    const response = HttpResponse.json(questions)
    return response;
  }),
  http.post("http://localhost:3000/questions", async ({ request }) => {
    // Parse the request body
    const requestBody = await request.json()
    
    // Generate new ID
    const id = questions[questions.length - 1]?.id + 1 || 1
    
    // Create new question with ID
    const question = { id, ...requestBody }
    
    // Add to questions array
    questions.push(question)
    
    // Log if needed
    console.log("New question created:", question)
    
    // Return response using HttpResponse
    return HttpResponse.json(question, {
      status: 201
    })
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
