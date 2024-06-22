"use client";
import Collapse from "@/components/Collapse";
import EarningReportModal from "@/components/EarningReportModal";
import Loader from "@/components/Loader";
import { subtitle, title } from "@/components/primitives";
import { CompanyData } from "@/constants";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [earningsData, setEarningsData] = useState<CompanyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/companies");
      if (response?.data?.companies) setEarningsData(response?.data?.companies);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-3xl text-center justify-center">
        <h1 className={title({ color: "violet" })}>Earnings Report Q1-2024</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Gather insights, summary, sentiment and earnings information!
        </h2>
      </div>

      <div className="flex w-full justify-end">
        <Button color="default" variant="bordered" onClick={onOpen}>
          Add a new Earning Report
        </Button>
      </div>

      {isLoading ? (
        <Loader message="Earning Report is Loading..." />
      ) : (
        <div className="inline-block text-center w-full justify-center">
          <Collapse key={earningsData?.length} earningsData={earningsData} />
        </div>
      )}

      {!!isOpen ? (
        <EarningReportModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          closeModal={onClose}
          fetchCompanies={fetchCompanies}
        />
      ) : null}
    </section>
  );
}
