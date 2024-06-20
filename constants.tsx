import { Alphabet, Meta, Microsoft } from "./components/icons/icons";
import * as z from "zod";

export const mockEarningDataCompanies = [
  {
    assistantId: "",
    company: "Meta",
    icon: <Meta />,
  },
  {
    assistantId: "",
    company: "Microsoft",
    icon: <Microsoft />,
  },
  {
    assistantId: "",
    company: "Alphabet",
    icon: <Alphabet />,
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

export const data: Record<string, string> = {
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
};

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

export const MESSAGES = [
  {
    role: "assistant",
    content: "This is a test1",
  },
  {
    role: "user",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    role: "assistant",
    content: "This is a test!",
  },
  {
    role: "user",
    content: "Question Test",
  },
  {
    role: "assistant",
    content: "This is a test!",
  },
  {
    role: "user",
    content: "Question Test",
  },
];
