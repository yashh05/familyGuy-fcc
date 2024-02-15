import { NextRequest, NextResponse } from "next/server";
import characters from "@/data/characters.json";
import quotes from "@/data/quotes.json";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const character = characters.data.find((item) => item.slug === params.slug);

    if (!character) {
      return new NextResponse("not found", { status: 404 });
    }

    const character_qoutes = quotes.data
      .filter((item) => item.character_id === character.id)
      .map((quotes) => quotes.quote);

    return NextResponse.json({
      character,
      character_quotes: character_qoutes.length > 0 ? character_qoutes : null,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
