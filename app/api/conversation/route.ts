import { createEmptyThread, fetchMessageFromAssistant } from "@/lib/thread";
import { NextResponse } from "next/server";

import OpenAI from "openai";
import { TextContentBlock } from "openai/resources/beta/threads/messages";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, assistantId } = body;

    if (!message) {
      return new NextResponse("message is required", { status: 400 });
    }

    const thread = await createEmptyThread(client);

    const messages = await fetchMessageFromAssistant(
      client,
      thread?.id,
      assistantId,
      message
    );

    const parsedMessage = (messages[0] as TextContentBlock).text.value;
    return NextResponse.json(parsedMessage);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
