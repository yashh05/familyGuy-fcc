import characters from "@/data/characters.json";

import { NextResponse } from "next/server";

export async function GET() {
  console.log(characters.data);

  return NextResponse.json({ characters: characters.data });
}
