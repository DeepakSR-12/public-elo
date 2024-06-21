import OpenAI from "openai";
import { MessageContent } from "openai/resources/beta/threads/messages";
import { setTimeout } from "timers/promises";

export async function createEmptyThread(openai: OpenAI) {
  const emptyThread = await openai.beta.threads.create();

  return emptyThread;
}

export async function fetchMessageFromAssistant(
  openai: OpenAI,
  threadId: string,
  assistantId: string,
  userMessage: string
): Promise<MessageContent[]> {
  try {
    const threadMessage = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userMessage,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    const retrieveRun = async () => {
      while (true) {
        const currentRun = await openai.beta.threads.runs.retrieve(
          threadId,
          run.id
        );

        if (currentRun.status === "completed") {
          const allMessages = await openai.beta.threads.messages.list(threadId);

          const assistantMessage = allMessages.data.find(
            (message) => message.role === "assistant"
          );

          if (assistantMessage) {
            return assistantMessage.content;
          } else {
            throw new Error("Assistant message not found.");
          }
        } else if (
          currentRun.status === "queued" ||
          currentRun.status === "in_progress"
        ) {
          // Wait for a while before checking again
          await setTimeout(5000);
        } else {
          throw new Error(`Unexpected run status: ${currentRun.status}`);
        }
      }
    };

    return await retrieveRun();
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
