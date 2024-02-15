import { Answer } from "@/components/Answer";
import { Container } from "@/components/Container";
import { getQuizQuestion } from "@/lib/quiz";
import { endpoint } from "@/utils/endpoint";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!endpoint) {
    return null;
  }
  const { question } = await getQuizQuestion(params.id);

  return (
    <Container className="flex flex-col gap-5 py-5">
      <h1 className="text-lg font-semibold">{question.title}</h1>
      <Answer answers={question.answers} questionId={params.id} />
    </Container>
  );
};

export default Page;
