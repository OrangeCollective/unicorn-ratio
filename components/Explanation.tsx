import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { InlineMath } from 'react-katex';
import { Separator } from '@/components/ui/separator';

export default function Explanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium tracking-tight uppercase text-muted-foreground/60 text-xs">
          Explanation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 tracking-tight">
        <p className="text-muted-foreground">
          The Unicorn Ratio is a framework for deciding how many companies to
          invest in a given cohort of startups. There are two different ways of
          thinking about this problem: the{' '}
          <a
            href="https://www.investopedia.com/articles/trading/04/091504.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-foreground inline-flex items-center gap-1"
          >
            Kelly Criterion
            <ExternalLink className="h-3 w-3" />
          </a>{' '}
          and{' '}
          <a
            href="https://www.investopedia.com/terms/b/binomialdistribution.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-foreground inline-flex items-center gap-1"
          >
            Binomial Distribution
            <ExternalLink className="h-3 w-3" />
          </a>
          .
        </p>

        {/* Kelly Formula Section */}
        <div className="bg-muted/50 p-6 rounded-lg space-y-4">
          <h3 className="font-medium uppercase text-xs text-muted-foreground/60">
            Kelly Criterion
          </h3>
          <div className="text-center py-6">
            <InlineMath>{'f = p - \\frac{1-p}{b}'}</InlineMath>
          </div>
          <p className="font-medium uppercase text-xs text-muted-foreground/60 mb-2">
            Where:
          </p>
          <ul className="list-none space-y-4 pl-4 text-muted-foreground text-sm">
            <li>
              <InlineMath>{`f`}</InlineMath> = what fraction of your money to
              put into each investment
            </li>
            <li>
              <InlineMath>{`p`}</InlineMath> = chance of success (goes up as you
              get better at picking companies)
            </li>
            <li>
              <InlineMath>{`b`}</InlineMath> = how many times your money
              multiplies if you succeed (like 50x)
            </li>
            <li>
              <InlineMath>{`\\frac{1}{f}`}</InlineMath> = how many companies to
              invest in
            </li>
          </ul>
        </div>

        {/* Understanding Kelly Section */}
        <div className="space-y-4 pt-2">
          <h3 className="font-medium">Understanding the Kelly Criterion</h3>
          <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-sm">
            <li>
              The Kelly Criterion helps determine the optimal fraction of your
              capital to invest in each opportunity, balancing potential returns
              against risk.
            </li>
            <li>
              When applied to startup investing, it suggests both how many
              companies to invest in (portfolio size) and how much to invest in
              each one (check size).
            </li>
            <li>
              The formula accounts for your ability to pick winners (through the
              'p' term) and the potential return multiple (through the 'b'
              term).
            </li>
          </ul>
        </div>

        <Separator />

        {/* Probability Formula Section */}
        <div className="bg-muted/50 p-6 rounded-lg space-y-4">
          <h3 className="font-medium uppercase text-xs text-muted-foreground/60">
            Binomial Distribution
          </h3>
          <div className="text-center py-6">
            <InlineMath>
              {'P(\\text{at least one unicorn}) = 1 - (1-p)^n'}
            </InlineMath>
          </div>
          <p className="font-medium uppercase text-xs text-muted-foreground/60">
            Where:
          </p>
          <ul className="list-none space-y-4 pl-4 text-muted-foreground text-sm">
            <li>
              <InlineMath>{`P`}</InlineMath> = your chance of finding at least
              one unicorn
            </li>
            <li>
              <InlineMath>{`n`}</InlineMath> = how many companies you invest in
            </li>
            <li>
              <InlineMath>{`p`}</InlineMath> = chance that any single investment
              becomes a unicorn
            </li>
          </ul>
        </div>

        {/* Understanding Probability Section */}
        <div className="space-y-4 py-2">
          <h3 className="font-medium">Understanding the Probability Curve</h3>
          <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
            <li>
              The "knee" represents the point where adding more investments
              starts giving you significantly less benefit.
            </li>
            <li>
              Before this point, each new investment significantly improves your
              chances of success.
            </li>
            <li>
              After this point, you need many more investments to achieve
              similar improvements in probability.
            </li>
            <li>
              Mathematically, this point is identified using the second
              derivative of the probability curve, which measures the rate at
              which returns are diminishing.
            </li>
          </ul>
        </div>

        <Separator />

        {/* Limitations Section */}
        <div className="space-y-4 py-2">
          <h3 className="font-medium">Limitations</h3>
          <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
            <li>
              These calculations assume you have an accurate assessment of how
              good you are at picking companies (i.e. how much filtering you can
              do).
            </li>
            <li>
              Just because something worked in the past doesn't mean it will
              work in the future. Historical unicorn rate may not predict future
              outcomes.
            </li>
            <li>
              Sometimes you might want to invest different amounts in different
              companies. Some deal dynamics might be more attractive than
              others.
            </li>
            <li>
              Be aware of your conversion rate (# investments selected / #
              meetings booked) and thoughtful about founders' time. Reputation
              is important.
            </li>
            <li>
              While these models have broad applications across investing,
              gambling, and information theory, their application to startup
              investing does not reflect real-world complexities.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
