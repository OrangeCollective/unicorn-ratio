import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add this helper function near the other probability functions
export function findKneePoint(
  data: Array<{ n: number; probability: number }>
): number {
  if (data.length < 3) return data[0]?.n || 0;

  // Normalize the data points to [0,1] range to make the knee detection scale-invariant
  const maxN = Math.max(...data.map((d) => d.n));
  const normalizedData = data.map((d) => ({
    n: d.n / maxN,
    probability: d.probability,
  }));

  let maxCurvature = -Infinity;
  let kneeIndex = 0;

  // Calculate curvature at each point using three-point estimation
  for (let i = 1; i < normalizedData.length - 1; i++) {
    const prev = normalizedData[i - 1];
    const curr = normalizedData[i];
    const next = normalizedData[i + 1];

    // First derivatives
    const dx1 = curr.n - prev.n;
    const dy1 = curr.probability - prev.probability;
    const dx2 = next.n - curr.n;
    const dy2 = next.probability - curr.probability;

    // Second derivative approximation
    const dx = (dx1 + dx2) / 2;
    const dy = (dy1 + dy2) / 2;
    const d2y = (dy2 / dx2 - dy1 / dx1) / dx;

    // Curvature = |y''| / (1 + y'^2)^(3/2)
    const firstDerivSquared = Math.pow(dy / dx, 2);
    const curvature = Math.abs(d2y) / Math.pow(1 + firstDerivSquared, 1.5);

    if (curvature > maxCurvature) {
      maxCurvature = curvature;
      kneeIndex = i;
    }
  }

  return data[kneeIndex].n;
}

// Helper function to round to nearest thousand
export function roundToThousands(num: number): number {
  return Math.round(num / 1000) * 1000;
}
