import { Button } from "@nextui-org/button";
import React, { useRef, useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

const Sentiment = () => {
  const [sentiment, setSentiment] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );
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

  const fetchSentiment = () => {
    // Fetch sentiment logic here
    setSentiment("New fetched sentiment text...");
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={ref}
        className={`flex max-h-[300px] overflow-auto ${
          !sentiment ? "justify-center items-center h-full" : ""
        }`}
      >
        {!!sentiment ? (
          <TypeAnimation
            splitter={(str) => str.split(/(?= )/)}
            sequence={[sentiment]}
            wrapper="span"
            cursor={true}
            speed={70}
            repeat={1}
            style={{ display: "inline-block" }}
          />
        ) : (
          <Button color="default" variant="bordered" onClick={fetchSentiment}>
            Fetch Latest Sentiment
          </Button>
        )}
      </div>
      <div className="mt-auto">
        <Button color="default" variant="bordered" onClick={fetchSentiment}>
          Fetch Latest Sentiment
        </Button>
      </div>
    </div>
  );
};

export default Sentiment;
