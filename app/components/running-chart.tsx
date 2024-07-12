"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
            interval={10}
          // tickFormatter={(value) => value}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel indicator="dot" />}
          />

          <Area
            dataKey="success"
            type="basis"
            fill="var(--color-success)"
            fillOpacity={0.4}
            stroke="var(--color-success)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

function countSuccess(curNumbers: RevDataNum[]) {
  const x = [...curNumbers].sort((a, b) => (a.key - b.key));
  const y = [...curNumbers].sort((a, b) => (a.index - b.index));
  return x.filter((e, idx) => e.key === y[idx].key).length;
}