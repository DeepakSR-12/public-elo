import { retrieveCompaniesData } from "@/lib/companiesData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const companies = await retrieveCompaniesData();
    return NextResponse.json({ companies });
  } catch (error) {
    console.log("[COMPANIES_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
