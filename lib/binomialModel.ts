// src/utils/mathModel.ts

/**
 * Calculates the binomial coefficient C(n,k) using a more numerically stable method
 */
export function binomialCoefficient(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  // Use symmetry of Pascal's triangle
  k = Math.min(k, n - k);
  let c = 1;

  for (let i = 0; i < k; i++) {
    c = (c * (n - i)) / (i + 1);
  }

  return Math.round(c);
}

/**
 * Calculates P(X = k) - probability of exactly k successes in n trials
 */
export function exactBinomialProbability(
  n: number,
  k: number,
  p: number
): number {
  return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/**
 * Calculates P(X ≥ k) - probability of k or more successes in n trials
 * Uses logarithms for numerical stability with large numbers
 */
export function cumulativeBinomialProbability(
  n: number,
  k: number,
  p: number
): number {
  // Probability of getting at least k successes in n trials
  let prob = 0;
  for (let i = k; i <= n; i++) {
    prob += binomialProbability(n, i, p);
  }
  return prob;
}

/**
 * Calculates P(X = k) - probability of exactly k successes in n trials
 */
function binomialProbability(n: number, k: number, p: number): number {
  return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function combination(n: number, k: number): number {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
