import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { CompanyData } from "@/constants";
import Summary from "./Summary";
import { VideoIcon } from "./icons/VideoIcon";
import Sentiment from "./Sentiment";
import { GalleryIcon } from "./icons/GalleryIcon";
import AskAI from "./AskAI";
import { MusicIcon } from "./icons/MusicIcon";

export default function OptionsTabs({
  assistantId,
  summary,
  icon,
  sentiment,
}: CompanyData) {
  const tabsData = [
    {
      id: "summary",
      label: "Summary",
      content: (
        <Summary assistantId={assistantId} summaryText={summary} icon={icon} />
      ),
      icon: <VideoIcon />,
    },
    {
      id: "sentiment",
      label: "Sentiment",
      content: (
        <Sentiment
          assistantId={assistantId}
          sentimentText={sentiment}
          icon={icon}
        />
      ),
      icon: <GalleryIcon />,
    },
    {
      id: "askAI",
      label: "Ask AI",
      content: <AskAI assistantId={assistantId} icon={icon} />,
      icon: <MusicIcon />,
    },
  ];
  return (
    <div className="flex w-full h-full flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        items={tabsData}
        variant="bordered"
        fullWidth
      >
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
