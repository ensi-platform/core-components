import { FC } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Brush,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { ChartProps } from './types';

interface ChartCompositionProps {
    Line: typeof Line;
    LineChart: typeof LineChart;

    Area: typeof Area;
    AreaChart: typeof AreaChart;

    Bar: typeof Bar;
    BarChart: typeof BarChart;

    CartesianGrid: typeof CartesianGrid;
    Legend: typeof Legend;
    Tooltip: typeof Tooltip;
    XAxis: typeof XAxis;
    YAxis: typeof YAxis;
    Brush: typeof Brush;
}

const Chart = ({ children, width = '100%', height, className }: ChartProps) => (
    <ResponsiveContainer width={width} height={height} className={className}>
        {children as any}
    </ResponsiveContainer>
);

Chart.LineChart = LineChart;
Chart.Line = Line;

Chart.AreaChart = AreaChart;
Chart.Area = Area;

Chart.BarChart = BarChart;
Chart.Bar = Bar;

Chart.CartesianGrid = CartesianGrid;
Chart.Legend = Legend;
Chart.Tooltip = Tooltip;
Chart.XAxis = XAxis;
Chart.YAxis = YAxis;
Chart.Brush = Brush;

export default Chart as FC<ChartProps> & ChartCompositionProps;