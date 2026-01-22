/**
 * Tshirt Capabilities
 * Seller capabilities specific to the t-shirt vertical
 */

import type { FabricDirection, KnitType, DecorationMethod, DecorationPlacement } from "./enums";
import type { TshirtPricingConfig } from "./artifacts";

/**
 * T-shirt production capabilities for a seller/manufacturer.
 * Used to match buyer requirements against what the seller can produce.
 */
export interface TshirtCapabilities {
  /**
   * Supported fabric directions and knit types (high-level).
   */
  supportedFabricDirections?: FabricDirection[];
  supportedKnitTypes?: KnitType[];
  /**
   * Supported weight (gsm) range for production.
   */
  supportedWeightGsm?: { min?: number; max?: number };
  /**
   * Supported decoration methods (aligned with protocol enum where possible).
   */
  supportedDecorationMethods?: DecorationMethod[];
  /**
   * Supported placements (optional).
   */
  supportedDecorationPlacements?: DecorationPlacement[];
  /**
   * Sample support.
   */
  supportsSample?: boolean;
  /**
   * Compliance markets/standards coverage.
   */
  supportedStandards?: string[];
  /**
   * Pricing configuration for config-driven estimates (P0).
   * Merchants configure this to provide accurate, itemized pricing.
   */
  pricingConfig?: TshirtPricingConfig;
}
