import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Category, Expense } from "@/lib/types";

const chartData = [
  { browser: "GYM", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 1703, fill: "var(--color-edge)" },
  { browser: "other", visitors: 10, fill: "var(--color-other)" },
];

const chartConfig = {
  GYM: {
    label: "GYM",
    color: "indigo",
  },
  safari: {
    label: "FOOD",
    color: "var(--color-FOOD)",
  },
  firefox: {
    label: "TRANSPORT",
    color: "var(--color-TRANSPORT)",
  },
  edge: {
    label: "ENTERTAINMENT",
    color: "var(--color-ENTERTAINMENT)",
  },
  other: {
    label: "OTHER",
    color: "var(--color-OTHER)",
  },
} satisfies ChartConfig;

export function ChartPieDonutText({
  expenses,
  CategoryMap,
}: {
  expenses: Expense[];
  CategoryMap: {
    category: string | undefined;
    amount: number;
    fill: string;
  }[];
}) {
  return (
    <Card className="flex flex-col m-4 rounded-md">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={CategoryMap}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {expenses.reduce(
                            (prev, next) => prev + Number(next.amount),
                            0,
                          )}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
