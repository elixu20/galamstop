
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ChartType = "area" | "bar" | "pie" | "line";

interface AnalyticsChartProps {
  data: any[];
  type: ChartType;
  height?: number;
  xAxisKey?: string;
  dataKeys: string[];
  colors?: string[];
  stackId?: string;
}

const defaultColors = [
  "#22c55e", // galamsey-green
  "#f59e0b", // galamsey-gold
  "#3b82f6", 
  "#ec4899",
  "#8b5cf6",
  "#10b981",
];

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  data,
  type,
  height = 300,
  xAxisKey = "name",
  dataKeys,
  colors = defaultColors,
  stackId,
}) => {
  const renderChart = () => {
    const chartConfig = {
      area: {
        label: "Area Chart",
        theme: {
          light: "var(--theme-primary)",
          dark: "var(--theme-primary)",
        },
      },
      bar: {
        label: "Bar Chart",
        theme: {
          light: "var(--theme-primary)",
          dark: "var(--theme-primary)",
        },
      },
      pie: {
        label: "Pie Chart",
        theme: {
          light: "var(--theme-primary)",
          dark: "var(--theme-primary)",
        },
      },
      line: {
        label: "Line Chart",
        theme: {
          light: "var(--theme-primary)",
          dark: "var(--theme-primary)",
        },
      },
    };

    switch (type) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {dataKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stackId={stackId}
                  fill={colors[index % colors.length]}
                  stroke={colors[index % colors.length]}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId={stackId}
                  fill={colors[index % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKeys[0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <ChartContainer config={{}}>
      {renderChart()}
    </ChartContainer>
  );
};

export default AnalyticsChart;
