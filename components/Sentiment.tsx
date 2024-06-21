"use client";
import { Button } from "@nextui-org/button";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";
import Loader from "./Loader";

const Sentiment = ({
  assistantId,
  sentimentText,
  icon,
}: {
  assistantId: string;
  sentimentText: string;
  icon: JSX.Element;
}) => {
  const [sentiment, setSentiment] = useState(sentimentText ?? "");
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

  const fetchSentiment = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setSentiment(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty"
      );
      setIsLoading(false);
      toast.success("Latest Sentiment is fetched!.");
    }, 3000);
    // setIsLoading(true);
    // try {
    //   const response = await axios.post("/api/conversation", {
    //     message: "Give a sentiment analysis on the earnings report.",
    //     assistantId,
    //   });
    //   setSentiment(response.data);
    // toast.success("Latest Sentiment is fetched!.");
    // } catch (error: any) {
    // toast.error("Something went wrong!");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={ref}
        className={`flex max-h-[300px] overflow-auto ${
          !sentiment ? "justify-center items-center h-full" : ""
        }`}
      >
        {!!isLoading ? (
          <div className="p-8 rounded-lg w-full h-full bg-muted flex items-center justify-center">
            <Loader icon={icon} message="Analyzing Sentiment..." />
          </div>
        ) : !!sentiment ? (
          <TypeAnimation
            key={sentiment}
            splitter={(str) => str.split(/(?= )/)}
            sequence={[sentiment]}
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
            onClick={fetchSentiment}
          >
            Fetch Latest Sentiment
          </Button>
        )}
      </div>
      <div className="flex justify-end mt-auto">
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          color="default"
          variant="bordered"
          onClick={fetchSentiment}
        >
          Fetch Latest Sentiment
        </Button>
      </div>
    </div>
  );
};

export default Sentiment;
