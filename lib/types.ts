export interface Assumptions {
  unicornRate: string;
  valuation: number;
}

export interface Inputs {
  batchSize: number;
  fundsAvailable: number;
  skillLevel: string;
}

export interface ChartDataPoint {
  category: string;
  value: number;
  fill: string;
}

export interface KellyRecommendations {
  numInvestments: number;
  avgCheckSize: number;
  effectiveHitRate: number;
}

export interface BinomialProbabilityProps {
  probability: number;
  totalStartups: number;
  selectedP: number;
}

export interface ChartDataPoint {
  n: number;
  probability: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: ChartDataPoint;
  }>;
  label?: number;
  selectedP: number;
}

export interface CategoricalChartPoint {
  category: string;
  value: number;
  fill: string;
}

export interface ThemeConfig {
  theme: keyof typeof import('@/lib/constants').THEME_OPTIONS;
  setTheme: (theme: string) => void;
}
