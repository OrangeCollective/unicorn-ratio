'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ExternalLink } from 'lucide-react';
import { PieChart, Pie, AreaChart, Area } from 'recharts';

interface ModelInputsProps {
  inputs: {
    batchSize: number;
    fundsAvailable: number;
    skillLevel: string;
  };
  setInputs: React.Dispatch<
    React.SetStateAction<{
      batchSize: number;
      fundsAvailable: number;
      skillLevel: string;
    }>
  >;
  activeApproach: 'kelly' | 'probability';
  setActiveApproach: React.Dispatch<
    React.SetStateAction<'kelly' | 'probability'>
  >;
}

export default function ModelInputs({
  inputs,
  setInputs,
  activeApproach,
  setActiveApproach,
}: ModelInputsProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      approach: activeApproach,
    },
  });

  const renderChart = () => {
    if (!isMounted) {
      return <div className="h-24 w-24" />; // Placeholder with same dimensions
    }

    return (
      <PieChart
        width={96}
        height={96}
      >
        <Pie
          data={[
            { value: 75, fill: '#fed7aa' },
            { value: 25, fill: '#f97316' },
          ]}
          dataKey="value"
          cx={48}
          cy={48}
          innerRadius={30}
          outerRadius={40}
          startAngle={90}
          endAngle={-270}
          strokeWidth={0}
        />
      </PieChart>
    );
  };

  const renderAreaChart = () => {
    if (!isMounted) {
      return <div className="h-24 w-24" />; // Placeholder
    }

    return (
      <AreaChart
        width={120}
        height={96}
        data={[
          { n: 0, p: 0 },
          { n: 20, p: 0.5 },
          { n: 50, p: 0.75 },
          { n: 70, p: 0.87 },
          { n: 80, p: 0.95 },
          { n: 100, p: 0.99 },
        ]}
        margin={{
          top: 5,
          right: 10,
          bottom: 5,
          left: 5,
        }}
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
              stopColor="#f97316"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="#f97316"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="p"
          stroke="#f97316"
          fill="url(#colorProbability)"
        />
      </AreaChart>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium tracking-tight uppercase text-muted-foreground/60 text-xs">
          Inputs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="batchSize">1. No. of startups in the cohort</Label>
            <Input
              id="batchSize"
              type="number"
              value={inputs.batchSize}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                setInputs((prev) => ({
                  ...prev,
                  batchSize: parseInt(value) || 0,
                }));
              }}
              onBlur={(e) => {
                const value = parseInt(e.target.value.replace(/,/g, '')) || 0;
                e.target.value = value.toLocaleString();
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fundsAvailable">2. Funds available to deploy</Label>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="fundsAvailable"
                className="pl-6"
                value={inputs.fundsAvailable.toLocaleString()}
                onChange={(e) => {
                  // Remove any non-digit characters and parse
                  const value =
                    parseInt(e.target.value.replace(/\D/g, '')) || 0;
                  setInputs((prev) => ({
                    ...prev,
                    fundsAvailable: value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="skillLevel">
              3. How much of the cohort can you confidently rule out? (i.e.
              investing skill level)
            </Label>
            <Select
              value={inputs.skillLevel}
              onValueChange={(value) =>
                setInputs((prev) => ({ ...prev, skillLevel: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">
                  0% - Base model (No filtering)
                </SelectItem>
                <SelectItem value="25">25% - Light filtering</SelectItem>
                <SelectItem value="50">50% - Moderate filtering</SelectItem>
                <SelectItem value="75">75% - Strong filtering</SelectItem>
                <SelectItem value="90">90% - Elite filtering</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <Label>4. Select a model:</Label>
          <div className="flex flex-col gap-2">
            <Form {...form}>
              <form>
                <RadioGroup
                  defaultValue={activeApproach}
                  onValueChange={(value) => {
                    setActiveApproach(value as 'kelly' | 'probability');
                    form.setValue('approach', value as 'kelly' | 'probability');
                  }}
                  className="grid max-w-md grid-cols-2 gap-8 pt-2"
                >
                  <FormField
                    control={form.control}
                    name="approach"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary dark:[&:has([data-state=checked])>div]:border-orange-600">
                            <FormControl>
                              <RadioGroupItem
                                className="sr-only"
                                value="kelly"
                              />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent h-[132px]">
                              <div className="flex items-center justify-center p-2">
                                <div className="relative h-24 w-24 mr-2">
                                  {renderChart()}
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">
                              Kelly Criterion
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary dark:[&:has([data-state=checked])>div]:border-orange-600">
                            <FormControl>
                              <RadioGroupItem
                                value="probability"
                                className="sr-only"
                              />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                              <div className="flex items-center justify-center px-2 py-3">
                                <div className="relative h-24 w-24 mr-3">
                                  {renderAreaChart()}
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">
                              Binomial Distribution
                            </span>
                          </FormLabel>
                        </FormItem>
                      </>
                    )}
                  />
                </RadioGroup>
              </form>
            </Form>
            <p className="text-sm text-muted-foreground mt-2">
              {activeApproach === 'kelly' ? (
                <>
                  <span className="font-medium">Objective: </span>Optimize
                  portfolio size and check amounts using the{' '}
                  <a
                    href="https://www.investopedia.com/articles/trading/04/091504.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-2 hover:text-foreground inline-flex items-center gap-1"
                  >
                    Kelly Criterion
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              ) : (
                <>
                  <span className="font-medium">Objective: </span>Analyze
                  portfolio size vs. success rate using the{' '}
                  <a
                    href="https://www.investopedia.com/terms/b/binomialdistribution.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-2 hover:text-foreground inline-flex items-center gap-1"
                  >
                    Binomial Distribution
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
