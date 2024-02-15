import { endpoint } from "@/utils/endpoint";

interface CharacterData {
  id: number;
  name: string;
  slug: string;
  skills: string[];
  description: string;
  age: string;
  avatar: string;
  images: string[];
  occupations: string[];
}

interface Character {
  characters: CharacterData[];
}

export async function getAllCharacters(): Promise<Character> {
  const res = await fetch(`${endpoint}/api/character`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
}

interface quoteData {
  character: CharacterData;
  character_quotes?: string[];
}

export async function getCharacterBySlug(slug: string) {
  const res = await fetch(`${endpoint}/api/character/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Data");
  }
  const data: quoteData = await res.json();

  return data;
}
