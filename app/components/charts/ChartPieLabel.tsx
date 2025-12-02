"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label list"

const chartData = [
  { orders: "noIniciada", cantidad: 275, fill: "var(--color-noIniciada)" },
  { orders: "iniciada", cantidad: 200, fill: "var(--color-iniciada)" },
  { orders: "finalizada", cantidad: 187, fill: "var(--color-finalizada)" },
]

const chartConfig = {
  cantidad: {
    label: "Cantidad",
  },
  noIniciada: {
    label: "No iniciadas",
    color: "hsl(var(--chart-1))",
  },
  iniciada: {
    label: "Iniciadas",
    color: "hsl(var(--chart-2))",
  },
  finalizada: {
    label: "Finalizadas",
    color: "hsl(var(--chart-3))",
  },

} satisfies ChartConfig

export function ChartPieLabelList() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Ordenes de trabajo</CardTitle>
        <CardDescription>----</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-black mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="cantidad" hideLabel />}
            />
            <Pie data={chartData} dataKey="cantidad">
              <LabelList
                dataKey="orders"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
