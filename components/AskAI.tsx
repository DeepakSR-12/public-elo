"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useRef, useState, useEffect, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { formSchema, MESSAGES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, User } from "lucide-react";
import { MusicIcon } from "./icons/MusicIcon";
import { Logo } from "../public/Logo";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

interface Message {
  role: string;
  content: string;
}

const AskAI = ({
  assistantId,
  icon,
}: {
  assistantId: string;
  icon?: ReactElement;
}) => {
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const ref = useRef<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const scrollToBottom = () => {
    if (ref && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  useEffect(() => {
    const observer = new MutationObserver(scrollToBottom);
    if (ref.current) {
      observer.observe(ref.current, {
        childList: true,
        subtree: true,
      });
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const response = await axios.post("/api/assistant", {
        message: values.prompt,
        assistantId,
      });

      setMessages((current) => [
        ...current,
        userMessage,
        { role: "assistant", content: response.data },
      ]);
      form.reset();
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div ref={ref} className="flex max-h-[300px] h-full overflow-auto">
        {!messages.length ? (
          <div className="h-full p-20 w-full">
            <div className="flex flex-col justify-center items-center">
              <div className="relative">
                <MusicIcon width={72} height={72} />
              </div>
              <p className="text-lg text-muted-foreground text-center">
                Ask AI anything and get clarified!
              </p>
            </div>
          </div>
        ) : (
          <div className="gap-y-4 w-full">
            <div>
              {messages?.map((message, index) => (
                <div key={index} className="w-full p-4">
                  <div className="flex flex-col gap-y-2">
                    {message.role === "user" ? (
                      <div className="flex flex-row-reverse items-end">
                        <div className="w-[90%] flex flex-col gap-y-2 bg-fuchsia-400 dark:bg-fuchsia-500 rounded-xl p-4">
                          <div className="flex justify-end">
                            <div className="border border-black dark:border-white rounded-full p-2">
                              <User />
                            </div>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start">
                        <div className="w-[90%] flex flex-col gap-y-2">
                          <div className="flex">
                            <div className="border border-fuchsia-400 dark:fuchsia-500 rounded-full p-1">
                              <Logo color="violet" />
                            </div>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="p-8 rounded-lg w-full bg-muted flex items-center justify-center">
                  <Loader icon={icon} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <Form {...form}>
          <form
            className="rounded-lg border w-full p-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      variant="underlined"
                      placeholder="Who has presented the earnings call?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              isLoading={isLoading}
              type="submit"
              className="col-span-12 px-2 lg:col-span-2 w-full"
            >
              <Send />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AskAI;
