import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { GalleryIcon } from "./icons/GalleryIcon";
import { MusicIcon } from "./icons/MusicIcon";
import { VideoIcon } from "./icons/VideoIcon";
import Summary from "./Summary";
import Sentiment from "./Sentiment";
import AskAI from "./AskAI";

export default function WorkTabs() {
  let tabs = [
    {
      id: "summary",
      label: "Summary",
      content: <Summary />,
      icon: <VideoIcon />,
    },
    {
      id: "sentiment",
      label: "Sentiment",
      content: <Sentiment />,
      icon: <GalleryIcon />,
    },
    {
      id: "askAI",
      label: "Ask AI",
      content: <AskAI />,
      icon: <MusicIcon />,
    },
  ];

  return (
    <div className="flex w-full h-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs} variant="bordered" fullWidth>
        {({ id, label, content, icon }) => (
          <Tab
            key={id}
            className="h-full"
            title={
              <div className="flex items-center space-x-2">
                {icon}
                <span>{label}</span>
              </div>
            }
          >
            <Card className="h-full">
              <CardBody>{content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
