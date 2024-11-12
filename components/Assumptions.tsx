'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AssumptionsProps {
  assumptions: {
    unicornRate: string;
    valuation: number;
  };
  setAssumptions: React.Dispatch<
    React.SetStateAction<{
      unicornRate: string;
      valuation: number;
    }>
  >;
}

export function Assumptions({ assumptions, setAssumptions }: AssumptionsProps) {
  const [editMode, setEditMode] = useState({
    unicornRate: false,
    valuation: false,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium tracking-tight uppercase text-muted-foreground/60 text-xs">
          Assumptions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground tracking-tight">
        <div>
          {editMode.unicornRate ? (
            <span>
              1. Historically, each cohort has an average{' '}
              <span className="relative w-20 inline-flex">
                <Input
                  className="pr-6"
                  value={assumptions.unicornRate}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow numbers and one decimal point
                    if (/^\d*\.?\d*$/.test(value)) {
                      setAssumptions((prev) => ({
                        ...prev,
                        unicornRate: value,
                      }));
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      setAssumptions((prev) => ({
                        ...prev,
                        unicornRate: value.toFixed(1), // Format to one decimal place
                      }));
                    }
                  }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </span>{' '}
              unicorn rate.
              <Button
                variant="link"
                className="ml-1 p-0 h-auto text-muted-foreground"
                onClick={() =>
                  setEditMode((prev) => ({
                    ...prev,
                    unicornRate: !prev.unicornRate,
                  }))
                }
              >
                (Save)
              </Button>
            </span>
          ) : (
            <span>
              1. Historically, each cohort has an average{' '}
              <span
                onClick={() =>
                  setEditMode((prev) => ({
                    ...prev,
                    unicornRate: !prev.unicornRate,
                  }))
                }
                className="font-medium underline decoration-dotted underline-offset-4 cursor-pointer"
              >
                {assumptions.unicornRate}%
              </span>{' '}
              unicorn rate.{' '}
              <Button
                variant="link"
                className="ml-1 p-0 h-auto text-muted-foreground"
                onClick={() =>
                  setEditMode((prev) => ({
                    ...prev,
                    unicornRate: !prev.unicornRate,
                  }))
                }
              >
                (Edit)
              </Button>
            </span>
          )}
        </div>

        <div>
          {editMode.valuation ? (
            <span>
              2. Average valuations for the cohort are{' '}
              <span className="relative w-32 inline-flex mx-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  className="pl-6"
                  value={assumptions.valuation.toLocaleString()}
                  onChange={(e) => {
                    // Remove any non-digit characters and parse
                    const value =
                      parseInt(e.target.value.replace(/\D/g, '')) || 0;
                    setAssumptions((prev) => ({
                      ...prev,
                      valuation: value,
                    }));
                  }}
                />
              </span>{' '}
              post-money. This implies a{' '}
              {(1000000000 / assumptions.valuation).toFixed(1)}x multiple needed
              to achieve a $1B+ outcome.{' '}
              <Button
                variant="link"
                className="ml-1 p-0 h-auto text-muted-foreground"
                onClick={() =>
                  setEditMode((prev) => ({
                    ...prev,
                    valuation: !prev.valuation,
                  }))
                }
              >
                (Save)
              </Button>
            </span>
          ) : (
            <span>
              2. Average valuations for the cohort are{' '}
              <span
                className="font-medium underline decoration-dotted underline-offset-4 cursor-pointer"
                onClick={() =>
                  setEditMode((prev) => ({
                    ...prev,
                    valuation: !prev.valuation,
                  }))
                }
              >
                ${assumptions.valuation.toLocaleString()}
              </span>{' '}
              post-money. This implies a{' '}
              {(1000000000 / assumptions.valuation).toFixed(1)}x multiple needed
              to achieve $1B+ outcome.{' '}
              <Button
                variant="link"
                className="ml-1 p-0 h-auto text-muted-foreground"
                onClick={() =>
                  setEditMode((prev) => ({
                    ...prev,
                    valuation: !prev.valuation,
                  }))
                }
              >
                (Edit)
              </Button>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
