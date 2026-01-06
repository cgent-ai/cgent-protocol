/**
 * Spec Category
 * Top-level specification categories across all verticals
 */

/**
 * Specification category enum
 */
export const SpecCategory = {
  Tshirt: "tshirt",
  Toy: "toy",
  Unknown: "unknown",
} as const;

export type SpecCategory = (typeof SpecCategory)[keyof typeof SpecCategory];

