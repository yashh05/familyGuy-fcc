import { endpoint } from "@/utils/endpoint";

interface QuizQuestion {
  question: { id: string; title: string; answers: string[] };
}
export async function getQuizQuestion(id: string): Promise<QuizQuestion> {
  const data = await fetch(`${endpoint}/quiz/${id}`);

  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  return data.json();
}

export async function getRandomQuizQuestion() {
  const data = await fetch(`${endpoint}/quiz/random`, { cache: "no-store" });

  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  return data.json();
}
