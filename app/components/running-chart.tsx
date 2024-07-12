"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RevDataNum, useRevData } from "@/hooks/store";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { fail } from "assert";

const chartConfig = {
  success: {
    label: "成功个数",
    color: "hsl(var(--chart-1))",
  },
  fail: {
    label: "失败个数",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RunningChart() {
  const historyNumbers = useRevData((s) => s.historyNumbers);
  const step = useRevData((s) => s.step);
  const [show, setShow] = useState(true);

  const chartData = useMemo(
    () =>
      show
        ? historyNumbers.map((item, idx) => {
            const success = countSuccess(item);
            return {
              step: step - historyNumbers.length + idx + 1,
              success: success,
              fail: item.length - success,
            };
          })
        : [],
    [historyNumbers, step, show]
  );
  // const chartData = [
  //   {
  //     step: 1,
  //     success: 2,
  //     fail: 8,
  //   },
  //   {
  //     step: 2,
  //     success: 8,
  //     fail: 2,
  //   },
  //   {
  //     step: 3,
  //     success: 0,
  //     fail: 10,
  //   },
  //   {
  //     step: 4,
  //     success: 2,
  //     fail: 8,
  //   },
  //   {
  //     step: 5,
  //     success: 2,
  //     fail: 8,
  //   },
  // ];

  return (
    <div className="w-screen h-full">
      <div className="ml-4">
        {show && (
          <Button
            size={"icon"}
            variant={"ghost"}
            className="w-4 h-4 rounded-full "
            onClick={() => setShow(false)}
          >
            <EyeIcon size="16" />
          </Button>
        )}
        {!show && (
          <Button
            size={"icon"}
            variant={"ghost"}
            className="w-4 h-4 rounded-full "
            onClick={() => setShow(true)}
          >
            <EyeOffIcon size="16" />
          </Button>
        )}
      </div>
      {show && (
        <ChartContainer config={chartConfig} className="w-full h-40">
          <BarChart
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
            <Bar
              dataKey="success"
              fill="var(--color-success)"
              fillOpacity={0.4}
              radius={[0, 0, 4, 4]}
              stroke="var(--color-success)"
              stackId="a"
            />
            <Bar
              dataKey="fail"
              fill="var(--color-len)"
              fillOpacity={0.4}
              radius={[4, 4, 0, 0]}
              stroke="var(--color-len)"
              stackId="a"
            />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
}

function countSuccess(curNumbers: RevDataNum[]) {
  const x = [...curNumbers].sort((a, b) => a.key - b.key);
  const y = [...curNumbers].sort((a, b) => a.index - b.index);
  return x.filter((e, idx) => e.key === y[idx].key).length;
}
