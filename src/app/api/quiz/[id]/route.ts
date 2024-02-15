import { NextRequest, NextResponse } from "next/server";
import questions from "@/data/quiz.json";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const question = questions.data.find((quiz) => quiz.id === params.id);
    if (!question) {
      return new NextResponse("Not found", { status: 404 });
    }

    const { correct_answer, ...rest } = question;
    return NextResponse.json({
      question: rest,
    });
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
