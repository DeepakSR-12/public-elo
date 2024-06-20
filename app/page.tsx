"use client";
import Collapse from "@/components/Collapse";
import { subtitle, title } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title({ color: "violet" })}>Earnings Report Q4-2024</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Gather insights, summary, sentiment and earnings information!
        </h2>
      </div>
      <div className="inline-block text-center w-full justify-center">
        <Collapse />
      </div>
    </section>
  );
}
