/**
 * Common Trade Terms
 * International trade and logistics enums shared across verticals
 */

/**
 * Incoterms® 2020 (International Commercial Terms)
 */
export const Incoterm = {
  EXW: "EXW",
  FOB: "FOB",
  CIF: "CIF",
  DDP: "DDP",
  FCA: "FCA",
  DAP: "DAP",
  Unknown: "unknown",
} as const;

export type Incoterm = (typeof Incoterm)[keyof typeof Incoterm];

/**
 * Shipping mode
 */
export const ShippingMode = {
  Sea: "sea",
  Air: "air",
  Express: "express",
  Rail: "rail",
  Truck: "truck",
  Unknown: "unknown",
} as const;

export type ShippingMode = (typeof ShippingMode)[keyof typeof ShippingMode];
