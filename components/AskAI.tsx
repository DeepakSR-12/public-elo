import { Button, Input } from "@nextui-org/react";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { formSchema, MESSAGES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, User } from "lucide-react";
import { MusicIcon } from "./icons/MusicIcon";
import { Logo } from "../public/Logo";

interface Message {
  role: string;
  content: string;
}

const AskAI = () => {
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const ref = useRef<any>(null);

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

      //   const newMessages = [...messages, userMessage];
      //   const response = await axios.post("/api/conversation", {
      //     messages: newMessages,
      //   });

      //   setMessages((current) => [
      //     ...current,
      //     userMessage,
      //     { role: "assistant", content: response.data },
      //   ]);
      //   form.reset();
      // } catch (error: any) {
      //   if (error?.response?.status === 403) {
      //     onOpen();
      //   } else {
      //     toast.error("Something went wrong.");
      //   }
    } finally {
      // router.refresh();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex max-h-[300px] overflow-auto">
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
            {messages?.map((message, index) => (
              <div key={index} className="w-full p-4">
                <div className="flex flex-col gap-y-2">
                  {message.role === "user" ? (
                    <div className="flex flex-row-reverse items-end">
                      <div className="w-[80%] flex flex-col gap-y-2 bg-gray-400 rounded-lg p-4">
                        <div className="flex justify-end">
                          <div className="border rounded-full p-2">
                            <User />
                          </div>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex">
                        <div className="border rounded-full p-1">
                          <Logo />
                        </div>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Form {...form}>
        <form
          className="rounded-lg border w-full p-4 focus-within:shadow-sm grid grid-cols-12 gap-2 mt-auto"
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

          <Button className="col-span-12 px-2 lg:col-span-2 w-full">
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AskAI;
