import { Alphabet, Meta, Microsoft } from "./components/icons/icons";
import * as z from "zod";

export interface CompanyData {
  assistantId: string;
  companyName: string;
  icon: JSX.Element;
  summary: string;
  sentiment: string;
  earningsReport: Record<string, string>;
}

export const mockEarningDataCompanies: CompanyData[] = [
  {
    assistantId: "asst_goomWAgJIEtYK8XKiueI2rYQ",
    companyName: "Meta",
    icon: <Meta />,
    summary:
      "The earnings report for the first quarter of 2024 highlights a 27% year-over-year revenue increase to $36.5 billion, with a 49% operating margin in the Family of Apps segment and a Reality Labs operating loss of $3.8 billion[1]. Operating income was $13.8 billion with a 38% margin, and net income was recorded at $12.4 billion or $4.71 per share, with strong growth in ad revenue across different regions and verticals[2]",
    sentiment:
      "The sentiment analysis of the earnings report indicates a positive outlook, with revenue growth of 27%, strong operating margins, and optimistic views on AI development and monetization efficiency",
    earningsReport: {
      company_name: "Meta Platforms, Inc.",
      revenue: "36.5 billion",
      earnings_per_share: "$4.71",
      gross_margin: "N/A",
      operating_income: "13.8 billion",
      net_income: "12.4 billion",
      free_cash_flow: "12.5 billion",
      capital_expenditures: "6.7 billion",
      effective_tax_rate: "13%",
      number_of_employees: "69,300",
      headcount_change: "up 3% from Q4",
      operating_expenses: "22.6 billion",
      stock_based_compensation_impact: "N/A",
      gross_margin_percentage: "N/A",
    },
  },
  {
    assistantId: "",
    companyName: "Microsoft",
    icon: <Microsoft />,
    summary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty",
    sentiment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty",
    earningsReport: {
      company_name: "Meta Platforms, Inc.",
      revenue: "36.5 billion",
      earnings_per_share: "$4.71",
      gross_margin: "N/A",
      operating_income: "13.8 billion",
      net_income: "12.4 billion",
      free_cash_flow: "12.5 billion",
      capital_expenditures: "6.7 billion",
      effective_tax_rate: "13%",
      number_of_employees: "69,300",
      headcount_change: "up 3% from Q4",
      operating_expenses: "22.6 billion",
      stock_based_compensation_impact: "N/A",
      gross_margin_percentage: "N/A",
    },
  },
  {
    assistantId: "",
    companyName: "Alphabet",
    icon: <Alphabet />,
    summary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty",
    sentiment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty",
    earningsReport: {
      company_name: "Meta Platforms, Inc.",
      revenue: "36.5 billion",
      earnings_per_share: "$4.71",
      gross_margin: "N/A",
      operating_income: "13.8 billion",
      net_income: "12.4 billion",
      free_cash_flow: "12.5 billion",
      capital_expenditures: "6.7 billion",
      effective_tax_rate: "13%",
      number_of_employees: "69,300",
      headcount_change: "up 3% from Q4",
      operating_expenses: "22.6 billion",
      stock_based_compensation_impact: "N/A",
      gross_margin_percentage: "N/A",
    },
  },
  //   {
  //     assistantId: "",
  //     company: "Pintrest",
  //   },
  //   {
  //     assistantId: "",
  //     company: "Pfizer",
  //   },
  //   {
  //     assistantId: "",
  //     company: "Adani",
  //   },
  //   {
  //     assistantId: "",
  //     company: "Coinbase",
  //   },
  //   {
  //     assistantId: "",
  //     company: "Reddit",
  //   },
  //   {
  //     assistantId: "",
  //     company: "Tesla",
  //   },
];

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
