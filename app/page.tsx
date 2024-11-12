'use client';
import ThemeToggle from '@/components/ThemeToggle';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { Assumptions } from '@/components/Assumptions';
import { useEffect, useState } from 'react';
import ModelInputs from '@/components/ModelInputs';
import KellyCriterion from '@/components/KellyCriterion';
import Explanation from '@/components/Explanation';
import BinomialProbability from '@/components/BinomialProbability';
import { Button } from '@/components/ui/button';
import { SiGithub } from 'react-icons/si';

export default function HomePage() {
  const [assumptions, setAssumptions] = useState({
    unicornRate: '5.0',
    valuation: 20000000,
  });
  const [inputs, setInputs] = useState({
    batchSize: 100,
    fundsAvailable: 1000000,
    skillLevel: '0',
  });

  const [activeApproach, setActiveApproach] = useState<'kelly' | 'probability'>(
    'kelly'
  );

  // Add this state to track theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Add useEffect to detect theme changes
  useEffect(() => {
    // Check if document is available (client-side)
    if (typeof window !== 'undefined') {
      // Initial theme
      setTheme(
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );

      // Create observer for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
          ) {
            setTheme(
              document.documentElement.classList.contains('dark')
                ? 'dark'
                : 'light'
            );
          }
        });
      });

      // Start observing
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      // Cleanup
      return () => observer.disconnect();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative min-h-screen"
    >
      {/* Header with Theme Toggle */}
      <div className="flex items-center justify-between p-4 gap-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <a
            href="https://orangecollective.vc"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent animate-shimmer" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <Image
                src="/icon.png"
                alt="Orange Collective"
                width={16}
                height={16}
              />
              Built by Orange Collective
            </Button>
          </a>
        </motion.div>
        <div className="flex items-center gap-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <a
              href="https://github.com/davecyen/unicorn-ratio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <SiGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>

      {/* Title Section */}
      <div className="pt-2 sm:pt-4">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="relative group cursor-pointer mb-2">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            <Image
              src={
                theme === 'dark'
                  ? '/UnicornIconBorder.png'
                  : '/UnicornIconBorderLight.png'
              }
              alt="Unicorn Ratio"
              width={120}
              height={120}
              className="relative transform group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-600/10 to-orange-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center pb-0 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-400 via-zinc-700 to-zinc-700 dark:from-white dark:via-white dark:to-zinc-600 [text-shadow:_0_0_30px_rgba(255,255,255,0.05),_0_0_10px_rgba(255,255,255,0.05)] dark:[text-shadow:_0_0_30px_rgba(255,255,255,0.1),_0_0_10px_rgba(255,255,255,0.1)] [-webkit-text-stroke:_0.5px_rgba(0,0,0,0.15)] dark:[-webkit-text-stroke:_0.5px_rgba(255,255,255,0.2)]">
            The Unicorn Ratio
          </h1>
          <p className="text-sm sm:text-base text-center text-muted-foreground mt-0 max-w-2xl mx-auto px-2 tracking-tight">
            How many startups should you invest in for a given cohort?
          </p>
        </div>
      </div>

      {/* Assumptions Section */}
      <div className="w-full max-w-4xl mx-auto space-y-6 p-2 sm:p-4">
        <Assumptions
          assumptions={assumptions}
          setAssumptions={setAssumptions}
        />
        <ModelInputs
          inputs={inputs}
          setInputs={setInputs}
          activeApproach={activeApproach}
          setActiveApproach={setActiveApproach}
        />
        {activeApproach === 'kelly' ? (
          <KellyCriterion
            assumptions={assumptions}
            inputs={inputs}
          />
        ) : (
          <BinomialProbability
            assumptions={assumptions}
            inputs={inputs}
          />
        )}
        <Explanation />
        {/* Disclaimer Section */}
        <div className="text-xs sm:text-sm text-muted-foreground space-y-3 sm:space-y-4 px-2 sm:px-4 pb-4">
          <p className="font-medium">Disclaimer:</p>
          <div className="space-y-4">
            <p>
              The Unicorn Ratio is a framework that provides probabilistic
              estimates for portfolio construction. This should not be
              considered or used as investment advice.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="p-4 text-center"
      >
        <Separator className="mb-4" />
        <div className="flex w-full items-center justify-center">
          <p className="text-xs text-muted-foreground text-center max-w-xl leading-normal tracking-tight">
            © {new Date().getFullYear()}. Orange Collecive is a venture fund led
            by an independent group of Y Combinator alumni and is not
            affiliated, associated, authorized, endorsed by, or officially
            connected with Y Combinator.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
