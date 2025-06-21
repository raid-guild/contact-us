"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// RaidGuild color palette for charts
const chartColors = {
  moloch: "#BD482D",
  molochLight: "#D25C41",
  molochDark: "#8B3521",
  scroll: "#837820",
  scrollLight: "#DCCD6A",
  scrollDark: "#B5A22C",
  neutral: "#806F6B",
  neutralLight: "#9E8E8A",
  neutralDark: "#645754",
};

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface ChartConfig {
  title: string;
  description?: string;
  data: ChartData[];
  xKey?: string;
  yKey?: string;
  colors?: string[];
  height?: number;
}

interface BaseChartProps {
  config: ChartConfig;
  className?: string;
}

// Line Chart Component
export function LineChartComponent({ config, className }: BaseChartProps) {
  const {
    title,
    description,
    data,
    xKey = "name",
    colors = [chartColors.moloch, chartColors.scroll],
    height = 300,
  } = config;

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="font-display">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.neutral}
              opacity={0.3}
            />
            <XAxis
              dataKey={xKey}
              stroke={chartColors.neutralLight}
              fontSize={12}
            />
            <YAxis stroke={chartColors.neutralLight} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#221D1C",
                border: `1px solid ${chartColors.neutral}`,
                borderRadius: "8px",
                color: "#FAFAFA",
              }}
            />
            <Legend />
            {Object.keys(data[0] || {})
              .filter((key) => key !== xKey)
              .map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{
                    fill: colors[index % colors.length],
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    stroke: colors[index % colors.length],
                    strokeWidth: 2,
                  }}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Bar Chart Component
export function BarChartComponent({ config, className }: BaseChartProps) {
  const {
    title,
    description,
    data,
    xKey = "name",
    colors = [chartColors.moloch, chartColors.scroll],
    height = 300,
  } = config;

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="font-display">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.neutral}
              opacity={0.3}
            />
            <XAxis
              dataKey={xKey}
              stroke={chartColors.neutralLight}
              fontSize={12}
            />
            <YAxis stroke={chartColors.neutralLight} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#221D1C",
                border: `1px solid ${chartColors.neutral}`,
                borderRadius: "8px",
                color: "#FAFAFA",
              }}
            />
            <Legend />
            {Object.keys(data[0] || {})
              .filter((key) => key !== xKey)
              .map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Area Chart Component
export function AreaChartComponent({ config, className }: BaseChartProps) {
  const {
    title,
    description,
    data,
    xKey = "name",
    colors = [chartColors.moloch, chartColors.scroll],
    height = 300,
  } = config;

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="font-display">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.neutral}
              opacity={0.3}
            />
            <XAxis
              dataKey={xKey}
              stroke={chartColors.neutralLight}
              fontSize={12}
            />
            <YAxis stroke={chartColors.neutralLight} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#221D1C",
                border: `1px solid ${chartColors.neutral}`,
                borderRadius: "8px",
                color: "#FAFAFA",
              }}
            />
            <Legend />
            {Object.keys(data[0] || {})
              .filter((key) => key !== xKey)
              .map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Pie Chart Component
export function PieChartComponent({ config, className }: BaseChartProps) {
  const {
    title,
    description,
    data,
    colors = [
      chartColors.moloch,
      chartColors.scroll,
      chartColors.neutral,
      chartColors.molochLight,
      chartColors.scrollLight,
    ],
    height = 300,
  } = config;

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="font-display">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#221D1C",
                border: `1px solid ${chartColors.neutral}`,
                borderRadius: "8px",
                color: "#FAFAFA",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Chart Grid Component for displaying multiple charts
interface ChartGridProps {
  charts: Array<{
    type: "line" | "bar" | "area" | "pie";
    config: ChartConfig;
  }>;
  className?: string;
}

export function ChartGrid({ charts, className }: ChartGridProps) {
  const renderChart = (type: string, config: ChartConfig) => {
    switch (type) {
      case "line":
        return <LineChartComponent config={config} />;
      case "bar":
        return <BarChartComponent config={config} />;
      case "area":
        return <AreaChartComponent config={config} />;
      case "pie":
        return <PieChartComponent config={config} />;
      default:
        return <LineChartComponent config={config} />;
    }
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {charts.map((chart, index) => (
        <div key={index}>{renderChart(chart.type, chart.config)}</div>
      ))}
    </div>
  );
}

// Sample data for demos
export const sampleData = {
  monthlyRevenue: [
    { name: "Jan", revenue: 4000, expenses: 2400 },
    { name: "Feb", revenue: 3000, expenses: 1398 },
    { name: "Mar", revenue: 2000, expenses: 9800 },
    { name: "Apr", revenue: 2780, expenses: 3908 },
    { name: "May", revenue: 1890, expenses: 4800 },
    { name: "Jun", revenue: 2390, expenses: 3800 },
  ],
  userStats: [
    { name: "Active", value: 400 },
    { name: "Inactive", value: 300 },
    { name: "New", value: 200 },
    { name: "Returning", value: 100 },
  ],
  performance: [
    { name: "Q1", performance: 65, target: 70 },
    { name: "Q2", performance: 78, target: 75 },
    { name: "Q3", performance: 90, target: 80 },
    { name: "Q4", performance: 85, target: 85 },
  ],
};
