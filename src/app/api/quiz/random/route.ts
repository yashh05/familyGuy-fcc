import { NextRequest, NextResponse } from "next/server";
import questions from "@/data/quiz.json";

export async function GET(req: NextRequest) {
  try {
    const random = Math.floor(Math.random() * questions.data.length);
    return NextResponse.json({
      randomQuestion: questions.data[random].id,
    });
  } catch (error) {
    return new NextResponse("internal server error", { status: 500 });
  }
}
