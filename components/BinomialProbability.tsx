'use client';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import ProbabilityChart from '@/components/ProbabilityChart';
import { cumulativeBinomialProbability } from '@/lib/binomialModel';
import { Assumptions } from '@/lib/types';
import { Inputs } from '@/lib/types';
import { findKneePoint } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface BinomialProbabilityProps {
  assumptions: Assumptions;
  inputs: Inputs;
}

export default function BinomialProbability({
  assumptions,
  inputs,
}: BinomialProbabilityProps) {
  const [selectedP, setSelectedP] = useState<number>(1);

  const [probabilityGridData, setProbabilityGridData] = useState<
    Array<{
      n: number;
      probability: number;
    }>
  >([]);

  useEffect(() => {
    const data = [];
    const effectiveProb =
      parseFloat(assumptions.unicornRate) /
      100 /
      (1 - parseInt(inputs.skillLevel) / 100);
    const availableStartups =
      inputs.batchSize * (1 - parseInt(inputs.skillLevel) / 100);

    // Calculate for every n to find exact threshold
    for (let n = 1; n <= availableStartups; n++) {
      const prob = cumulativeBinomialProbability(n, selectedP, effectiveProb);

      // Store points at regular intervals and the threshold crossing point
      if (
        n % 5 === 0 ||
        (prob >= 0.5 &&
          data.length > 0 &&
          data[data.length - 1].probability < 0.5)
      ) {
        data.push({
          n,
          probability: prob,
        });
      }
    }

    setProbabilityGridData(data);
  }, [assumptions.unicornRate, inputs.batchSize, inputs.skillLevel, selectedP]);

  // Calculate expected unicorns for dropdown options
  const expectedUnicorns =
    (parseFloat(assumptions.unicornRate) / 100) * inputs.batchSize;
  const pValues = Array.from(
    { length: Math.ceil(expectedUnicorns) },
    (_, i) => i + 1
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium tracking-tight uppercase text-muted-foreground/60 text-xs">
          Analysis using Binomial Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Label>Target outcome:</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[160px] justify-between"
              >
                {selectedP} unicorn{selectedP > 1 ? 's' : ''}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[160px]"
            >
              {pValues.map((p) => (
                <DropdownMenuItem
                  key={p}
                  onClick={() => setSelectedP(p)}
                >
                  {p} unicorn{p > 1 ? 's' : ''}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-muted-foreground tracking-tight">
          <span className="block mt-4">
            You need at least{' '}
            <span className="font-medium">
              {Math.ceil(
                probabilityGridData.find((row) => row.probability >= 0.5)?.n ||
                  inputs.batchSize * (1 - parseInt(inputs.skillLevel) / 100)
              ).toLocaleString()}
            </span>{' '}
            investments to reach {'>'}50% odds of picking {selectedP} unicorn
            {selectedP > 1 ? 's' : ''}.
          </span>
        </p>
        <p className="text-muted-foreground tracking-tight">
          <span className="block mt-2">
            After{' '}
            <span className="font-medium">
              {findKneePoint(probabilityGridData).toLocaleString()}
            </span>{' '}
            investments, each additional check provides diminishing returns in
            improving your odds (the "knee" in the curve).
          </span>
        </p>
        <Separator />
        <div className="grid grid-cols-1 gap-8 pt-4">
          <Card className="shadow-none border-0 p-0">
            <CardHeader className="p-0 pb-3">
              <CardTitle>Unicorn Probability and No. of Investments</CardTitle>
              <p className="text-sm text-muted-foreground">
                How your chances of finding unicorns increase with portfolio
                size
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <ProbabilityChart
                probability={
                  parseFloat(assumptions.unicornRate) /
                  100 /
                  (1 - parseInt(inputs.skillLevel) / 100)
                }
                totalStartups={
                  inputs.batchSize * (1 - parseInt(inputs.skillLevel) / 100)
                }
                selectedP={selectedP}
              />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
