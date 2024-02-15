import { NextRequest, NextResponse } from "next/server";
import questions from "@/data/quiz.json";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const question = questions.data.find((item) => item.id === params.id);

    if (!question) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const { correct_answer } = question;
    const random = Math.floor(Math.random() * questions.data.length);

    return NextResponse.json({
      correct_answer,
      random: questions.data[random].id,
    });
  } catch (error) {
    return new NextResponse("internal server error", { status: 500 });
  }
}
