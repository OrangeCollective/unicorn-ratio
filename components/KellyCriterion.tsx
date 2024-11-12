'use client';
import React, { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Pie, PieChart, Sector, Label as RechartsLabel } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Assumptions, Inputs } from '@/lib/types';
import { roundToThousands } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface KellyCriterionProps {
  assumptions: Assumptions;
  inputs: Inputs;
}

const KellyCriterion = ({ assumptions, inputs }: KellyCriterionProps) => {
  // Calculate recommendations based on Kelly Criterion
  const calculateRecommendations = () => {
    const baseP = parseFloat(assumptions.unicornRate) / 100;
    const ruleOut = parseInt(inputs.skillLevel);
    const effectiveP = baseP / (1 - ruleOut / 100);
    const q = 1 - effectiveP;
    const b = 1000000000 / assumptions.valuation; // Multiple needed for unicorn
    const f = effectiveP - q / b;
    const numInvestments = Math.round(f > 0 ? 1 / f : 0);
    const avgCheckSize = inputs.fundsAvailable / numInvestments;

    return {
      numInvestments,
      avgCheckSize,
      effectiveHitRate: effectiveP * 100,
    };
  };

  const recommendations = calculateRecommendations();

  // Generate data for pie chart
  const chartData = [
    {
      category: 'ruled_out',
      value: inputs.batchSize * (parseInt(inputs.skillLevel) / 100),
      fill: 'hsl(215 5% 20%)', // keep muted gray
    },
    {
      category: 'not_selected',
      value:
        inputs.batchSize * (1 - parseInt(inputs.skillLevel) / 100) -
        recommendations.numInvestments,
      fill: '#fed7aa', // bg-orange-200
    },
    {
      category: 'selected',
      value: recommendations.numInvestments,
      fill: '#f97316', // bg-orange-500
    },
  ];

  const chartConfig = {
    value: { label: 'Companies' },
    ruled_out: { label: 'Ruled Out', color: 'hsl(215 25% 27%)' },
    not_selected: { label: 'Not Selected', color: '#fed7aa' },
    selected: {
      label: 'Selected for Investment',
      color: '#f97316',
    },
  } satisfies ChartConfig;

  // Generate scenarios for table
  const scenarios = [0, 25, 50, 75, 90].map((ruleOut) => {
    const baseP = parseFloat(assumptions.unicornRate) / 100;
    const effectiveP = baseP / (1 - ruleOut / 100);
    const q = 1 - effectiveP;
    const b = 1000000000 / assumptions.valuation;
    const f = effectiveP - q / b;
    return {
      skillLevel: ruleOut,
      effectiveHitRate: (effectiveP * 100).toFixed(1),
      numInvestments: Math.round(f > 0 ? 1 / f : 0),
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium tracking-tight uppercase text-muted-foreground/60 text-xs">
          Analysis using Kelly Criterion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground tracking-tight">
          Invest in approximately{' '}
          <span className="font-medium">
            {recommendations.numInvestments.toLocaleString()}
          </span>{' '}
          companies (out of{' '}
          <span className="font-medium">
            {inputs.batchSize.toLocaleString()}
          </span>{' '}
          total companies in the cohort), with an average check size of ~
          <span className="font-medium">
            ${roundToThousands(recommendations.avgCheckSize).toLocaleString()}
          </span>
          .
        </p>

        <Separator />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 pt-2">
          {/* Investment Scenarios Table */}
          <Card className="shadow-none border-0 p-0">
            <CardHeader className="p-0 pb-3">
              <CardTitle>Investment Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full overflow-x-auto">
                <table className="w-full caption-bottom text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b transition-colors">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Filtering Level
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        No. of Investments
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Check Size
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((scenario) => (
                      <tr
                        key={scenario.skillLevel}
                        className={`
                        border-b transition-colors text-muted-foreground
                        ${
                          parseInt(inputs.skillLevel) === scenario.skillLevel
                            ? 'bg-orange-50 dark:bg-orange-500 font-medium text-primary'
                            : ''
                        }
                      `}
                      >
                        <td className="p-4 align-middle">
                          {scenario.skillLevel}%
                        </td>
                        <td className="p-4 align-middle">
                          {scenario.numInvestments.toLocaleString()}
                        </td>
                        <td className="p-4 align-middle">
                          $
                          {roundToThousands(
                            inputs.fundsAvailable / scenario.numInvestments
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Batch Allocation Chart */}
          <Card className="shadow-none border-0 p-0">
            <CardHeader className="p-0 pb-3">
              <CardTitle>Investment Allocation</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        className="min-w-[12rem]"
                        labelClassName="flex items-center justify-between gap-8"
                      />
                    }
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="category"
                    innerRadius={75}
                    strokeWidth={4}
                    activeIndex={2}
                    activeShape={({
                      cx,
                      cy,
                      innerRadius,
                      outerRadius = 0,
                      startAngle,
                      endAngle,
                      fill,
                      ...props
                    }: PieSectorDataItem) => (
                      <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius + 6}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                        {...props}
                      />
                    )}
                  >
                    <RechartsLabel
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {recommendations.numInvestments.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Investments
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Write ~{recommendations.numInvestments.toLocaleString()} checks
                of $
                {roundToThousands(
                  recommendations.avgCheckSize
                ).toLocaleString()}
              </div>
              <div className="leading-none text-muted-foreground">
                Total deployment: ${inputs.fundsAvailable.toLocaleString()}
              </div>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default KellyCriterion;
