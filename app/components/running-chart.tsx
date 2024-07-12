"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { RevDataNum, useRevData } from "@/hooks/store"
import { useMemo } from "react"

const chartConfig = {
  success: {
    label: "成功个数",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RunningChart() {
  const historyNumbers = useRevData(s => s.historyNumbers);
  const step = useRevData(s => s.step);

  const chartData = useMemo(() => historyNumbers.map((item, idx) => ({
    step: (step - historyNumbers.length) + idx + 1,
    success: countSuccess(item)
  })), [historyNumbers, step]);
  // const chartData = [{
  //   step: 1,
  //   success: 2
  // }, {
  //   step: 2,
  //   success: 8
  // }, {
  //   step: 3,
  //   success: 0
  // }, {
  //   step: 4,
  //   success: 2
  // }, {
  //   step: 5,
  //   success: 2
  // }]

  return (
    <div className="w-screen h-full">

      <ChartContainer config={chartConfig} className="w-full h-40">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="step"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          // tickFormatter={(value) => value}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel indicator="dot" />}
          />

          <Area
            dataKey="success"
            type="step"
            fill="var(--color-success)"
            fillOpacity={0.4}
            stroke="var(--color-success)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
      <div>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function countSuccess(curNumbers: RevDataNum[]) {
  const x = [...curNumbers].sort((a, b) => (a.key - b.key));
  const y = [...curNumbers].sort((a, b) => (a.index - b.index));
  return x.filter((e, idx) => e.key === y[idx].key).length;
}