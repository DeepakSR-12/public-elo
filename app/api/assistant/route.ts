import { updateCompany } from "@/lib/companiesData";
import { createEmptyThread, fetchMessageFromAssistant } from "@/lib/thread";
import { NextResponse } from "next/server";

import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, assistantId, type, companyName } = body;

    if (!message) {
      return new NextResponse("message is required", { status: 400 });
    }

    const thread = await createEmptyThread(client);

    const response = await fetchMessageFromAssistant(
      client,
      thread?.id,
      assistantId,
      message
    );

    if (
      !!response &&
      typeof response == "string" &&
      (type === "summary" || type === "sentiment")
    ) {
      await updateCompany(companyName, type, response);
    }

    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
