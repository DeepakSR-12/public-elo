import { Alphabet, Meta, Microsoft } from "./components/icons/icons";
import * as z from "zod";

export interface CompanyData {
  assistantId: string;
  companyName: string;
  icon?: JSX.Element;
  summary?: string;
  sentiment?: string;
  earningsReport: Record<string, string>;
}

export const dataLabel: Record<string, string> = {
  company_name: "Company Name",
  revenue: "Revenue",
  earnings_per_share: "Earnings Per Share",
  gross_margin: "Gross Margin",
  operating_income: "Operating Income",
  net_income: "Net Income",
  free_cash_flow: "Free Cash Flow",
  capital_expenditures: "Capital Expenditures",
  effective_tax_rate: "Effective Tax Rate",
  number_of_employees: "Number Of Employees",
  headcount_change: "Headcount Change",
  operating_expenses: "Operating Expenses",
  stock_based_compensation_impact: "Stock Based Compensation Impact",
  gross_margin_percentage: "Gross Margin Percentage",
};

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
});

export const earningReportSchema = z.object({
  companyName: z.string().min(1, { message: "Company Name is required" }),
});

export const MESSAGES = [
  {
    role: "assistant",
    content: "Hi, what do you want to know about the earnings report?",
  },
];

export interface Message {
  role: string;
  content: string;
}
