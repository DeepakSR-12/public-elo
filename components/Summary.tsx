"use client";
import { Button } from "@nextui-org/button";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";
import Loader from "./Loader";

const Summary = ({
  assistantId,
  summaryText,
  icon,
}: {
  assistantId: string;
  summaryText: string;
  icon: JSX.Element;
}) => {
  const [summary, setSummary] = useState(summaryText ?? "");
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchSummary = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/conversation", {
        message: "Generate a summary of the earnings report",
        assistantId,
      });

      setSummary(response.data);
      toast.success("Latest Summary is fetched!.");
    } catch (error: any) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={ref}
        className={`flex max-h-[300px] overflow-auto ${
          !summary ? "justify-center items-center h-full" : ""
        }`}
      >
        {!!isLoading ? (
          <div className="p-8 rounded-lg w-full h-full bg-muted flex items-center justify-center">
            <Loader icon={icon} message="Summarizing..." />
          </div>
        ) : !!summary ? (
          <TypeAnimation
            key={summary}
            splitter={(str) => str.split(/(?= )/)}
            sequence={[summary]}
            wrapper="span"
            cursor={true}
            speed={70}
            repeat={1}
            style={{ display: "inline-block" }}
          />
        ) : (
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            color="default"
            variant="bordered"
            onClick={fetchSummary}
          >
            Fetch Latest Summary
          </Button>
        )}
      </div>
      <div className="flex justify-end mt-auto">
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          color="default"
          variant="bordered"
          onClick={fetchSummary}
        >
          Fetch Latest Summary
        </Button>
      </div>
    </div>
  );
};

export default Summary;
