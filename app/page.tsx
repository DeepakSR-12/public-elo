"use client";
import Collapse from "@/components/Collapse";
import EarningReportModal from "@/components/EarningReportModal";
import { subtitle, title } from "@/components/primitives";
import { mockEarningDataCompanies } from "@/constants";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const earningsData = mockEarningDataCompanies;
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-3xl text-center justify-center">
        <h1 className={title({ color: "violet" })}>Earnings Report Q4-2024</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Gather insights, summary, sentiment and earnings information!
        </h2>
      </div>

      <div className="flex w-full justify-end">
        <Button color="default" variant="bordered" onClick={onOpen}>
          Add an Earning Report
        </Button>
      </div>

      <div className="inline-block text-center w-full justify-center">
        <Collapse earningsData={earningsData} />
      </div>

      {!!isOpen ? (
        <EarningReportModal isOpen={isOpen} onOpenChange={onOpenChange} closeModal={onClose} />
      ) : null}
    </section>
  );
}
