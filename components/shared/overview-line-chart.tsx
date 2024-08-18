"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function Component({ data }: { data: any }) {
  const chartConfig = {
    trip: {
      label: "Trip Schedule",
      color: "hsl(var(--primary))",
    },
    buddy: {
      label: "Buddy Approve",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer
      className="max-h-[400px] w-full"
      config={chartConfig}
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 0,
          right: 12,
          top: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          minTickGap={50}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          minTickGap={4}
          width={40}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent />}
        />
        <Line
          dataKey="trip"
          type="monotone"
          stroke="var(--color-trip)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="buddy"
          type="monotone"
          stroke="var(--color-buddy)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
