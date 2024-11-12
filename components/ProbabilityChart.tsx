// src/components/ProbabilityChart.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cumulativeBinomialProbability } from '@/lib/binomialModel';

interface ProbabilityChartProps {
  probability: number;
  totalStartups: number;
  selectedP: number;
}

const ProbabilityChart: React.FC<ProbabilityChartProps> = ({
  probability,
  totalStartups,
  selectedP,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);

  const lightOrangeColor = '#ffedd5';
  const orangeColor = '#F26625';

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    generateChartData();
  }, [probability, totalStartups, selectedP]);

  const generateChartData = () => {
    const data = [];

    for (let n = 1; n <= totalStartups; n++) {
      const prob = cumulativeBinomialProbability(n, selectedP, probability);
      data.push({
        n,
        probability: prob,
      });
    }

    setChartData(data);
  };

  // Get ticks based on screen width
  const getXAxisTicks = () => {
    // For mobile screens
    if (windowWidth < 640) {
      return Array.from(
        { length: Math.floor(totalStartups / 20) + 1 },
        (_, i) => Math.min((i + 1) * 20, totalStartups)
      ).filter((tick) => tick <= totalStartups);
    }

    // For all other screens
    return Array.from({ length: Math.floor(totalStartups / 5) + 1 }, (_, i) =>
      Math.min((i + 1) * 5, totalStartups)
    ).filter((tick) => tick <= totalStartups);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const probability = payload[0].value;
      return (
        <div className="bg-background border-border rounded-lg shadow-lg p-3 border">
          <p className="text-sm text-foreground">
            Investing in <span className="font-semibold">{label}</span>{' '}
            companies in the batch gives you a{' '}
            <span className="font-semibold">
              {(probability * 100).toFixed(1)}%
            </span>{' '}
            chance of picking at least{' '}
            <span className="font-semibold">
              {selectedP} unicorn{selectedP > 1 ? 's' : ''}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-[300px] md:h-[450px]">
      <ResponsiveContainer
        className="border-0 shadow-none"
        width="100%"
        height="100%"
      >
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 5, bottom: 40 }}
        >
          <defs>
            <linearGradient
              id="colorProbability"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={orangeColor}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={lightOrangeColor}
                stopOpacity={0.8}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-zinc-200/50 dark:stroke-zinc-700/30"
          />
          <XAxis
            dataKey="n"
            label={{
              value: 'No. of Investments (n)',
              position: 'insideBottom',
              offset: -20,
              style: {
                textAnchor: 'middle',
                fontSize: windowWidth < 640 ? '11px' : '12px',
              },
            }}
            tick={{ fontSize: windowWidth < 640 ? 10 : 12 }}
            ticks={getXAxisTicks()}
            allowDecimals={false}
          />
          <YAxis
            label={{
              value: `Probability (P)`,
              angle: -90,
              position: 'insideLeft',
              offset: 5,
              style: {
                textAnchor: 'middle',
                fontSize: windowWidth < 640 ? '11px' : '12px',
              },
            }}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            tick={{ fontSize: windowWidth < 640 ? 10 : 12 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#666', strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="probability"
            stroke={orangeColor}
            fillOpacity={1}
            fill="url(#colorProbability)"
            name={`At least ${selectedP} unicorn${selectedP > 1 ? 's' : ''}`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProbabilityChart;
