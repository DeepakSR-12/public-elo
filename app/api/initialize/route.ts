import { CompanyData } from "@/constants";
import { addCompany } from "@/lib/companiesData";
import {
  createEmptyThread,
  createFile,
  createJsonAssistant,
  createVectorStore,
  fetchMessageFromAssistant,
} from "@/lib/thread";
import { NextResponse } from "next/server";

import OpenAI from "openai";
import { TextContentBlock } from "openai/resources/beta/threads/messages";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const companyName = formData.get("companyName") as string;
    const earningReport = formData.get("earningReport") as File;

    if (!companyName) {
      return new NextResponse("companyName is required", { status: 400 });
    }

    if (!earningReport) {
      return new NextResponse("earningReport is required", { status: 400 });
    }

    console.log({ companyName, earningReport });

    const fileId = await createFile(client, earningReport);

    console.log({ fileId });

    const vectorId = await createVectorStore(client, [fileId], companyName);

    console.log({ vectorId });

    if (vectorId && fileId) {
      const assistantId = await createJsonAssistant(
        client,
        companyName,
        vectorId
      );

      const thread = await createEmptyThread(client);

      if (thread?.id && assistantId) {
        const messages = await fetchMessageFromAssistant(
          client,
          thread?.id,
          assistantId,
          "Retrieve earnings report details for a company in JSON; RETURN RESULT ONLY IN JSON"
        );

        const parsedMessage =
          typeof messages === "string"
            ? JSON.parse(messages)
            : (messages[0] as TextContentBlock).text.value;

        const companyPayload: CompanyData = {
          assistantId,
          companyName,
          earningsReport: JSON.parse(parsedMessage),
        };

        await addCompany(companyPayload);

        return new NextResponse("Assistance is created", { status: 200 });
      }
    }
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
