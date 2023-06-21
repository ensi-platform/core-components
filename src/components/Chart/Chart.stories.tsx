/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { colors, scale } from '@scripts/gds';

import README from './README.md';
import Chart from './index';

export default {
    title: 'Components / Chart',
    component: Chart,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Chart>;

const lineData = [
    {
        name: 'Страница A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Страница B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Страница C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Страница D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Страница E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Страница F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Страница G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const areaData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const barData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export const Line: StoryObj<ComponentProps<typeof Chart> & {}> = {
    args: {
        width: '100%',
        height: 500,
    },
    argTypes: {},
    render: args => (
        <Chart {...args}>
            <Chart.LineChart
                data={lineData}
                margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                }}
                height={500}
            >
                <Chart.CartesianGrid strokeDasharray="3 3" />
                <Chart.XAxis dataKey="name" />
                <Chart.YAxis />
                <Chart.Tooltip />
                <Chart.Legend />
                <Chart.Line type="monotone" dataKey="pv" stroke={colors.primary} activeDot={{ r: 8 }} />
                <Chart.Line type="monotone" dataKey="uv" stroke={colors.danger} />
            </Chart.LineChart>
        </Chart>
    ),
};

export const Area: StoryObj<ComponentProps<typeof Chart> & {}> = {
    args: {
        width: '100%',
        height: 500,
    },
    argTypes: {},
    render: args => (
        <Chart {...args}>
            <Chart.AreaChart
                data={areaData}
                margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                }}
                height={500}
            >
                <Chart.CartesianGrid strokeDasharray="3 3" />
                <Chart.XAxis dataKey="name" />
                <Chart.YAxis />
                <Chart.Tooltip />
                <Chart.Legend />
                <Chart.Area
                    type="monotone"
                    dataKey="uv"
                    stackId="1"
                    stroke={colors.danger}
                    fill={colors.dangerDivider}
                />
                <Chart.Area
                    type="monotone"
                    dataKey="pv"
                    stackId="1"
                    stroke={colors.secondaryHover}
                    fill={colors.primary}
                    activeDot={{ r: 8 }}
                />
            </Chart.AreaChart>
        </Chart>
    ),
};

export const Bar: StoryObj<ComponentProps<typeof Chart> & {}> = {
    args: {
        width: '100%',
        height: 500,
    },
    argTypes: {},
    render: args => (
        <Chart {...args}>
            <Chart.BarChart
                data={barData}
                margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                }}
                height={500}
            >
                <Chart.CartesianGrid strokeDasharray="3 3" />
                <Chart.XAxis dataKey="name" />
                <Chart.YAxis />
                <Chart.Tooltip />
                <Chart.Legend />
                <Chart.Bar dataKey="uv" fill={colors.dangerDivider} />
                <Chart.Bar dataKey="pv" fill={colors.primary} />
                <Chart.Brush dataKey="name" height={scale(4)} />
            </Chart.BarChart>
        </Chart>
    ),
};
