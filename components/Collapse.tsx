import React from "react";
import {
  Accordion,
  AccordionItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CompanyData, dataLabel } from "@/constants";
import OptionsTabs from "./OptionsTabs";

export default function Collapse({
  earningsData,
}: {
  earningsData: CompanyData[];
}) {
  return (
    <Accordion
      fullWidth
      variant="splitted"
      aria-orientation="vertical"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: "auto",
            transition: {
              height: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 1,
              },
              opacity: {
                easings: "ease",
                duration: 1,
              },
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
              height: {
                easings: "ease",
                duration: 0.25,
              },
              opacity: {
                easings: "ease",
                duration: 0.3,
              },
            },
          },
        },
      }}
    >
      {earningsData.map((company) => (
        <AccordionItem
          key={company.companyName}
          startContent={company.icon}
          title={company.companyName}
          indicator={company.icon}
        >
          <div className="grid lg:grid-cols-2 w-full">
            <div>
              <div className="flex w-full">
                <Select
                  variant="bordered"
                  label="Intelligence"
                  placeholder="Select a model"
                  className="max-w-xs"
                  defaultSelectedKeys={["gpt-4o"]}
                  size="sm"
                  isDisabled
                >
                  <SelectItem key="gpt-4o">GPT-4o</SelectItem>
                </Select>
              </div>
              <div className="grid lg:grid-cols-2 gap-4 text-left py-4 px-2 text-sm">
                {Object.keys(company.earningsReport)
                  .sort()
                  .map((item) => (
                    <div
                      key={item}
                      className="flex flex-row gap-2 p-2 text-wrap whitespace-nowrap"
                    >
                      <div className="">{dataLabel[item]}:</div>
                      <div className="font-bold">
                        {company.earningsReport[item]}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <OptionsTabs {...company} />
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
