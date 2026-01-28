import { TshirtSpec } from "./spec";
import { ISODateTimeString } from "../../../common";
import { DecorationMethod } from "./enums";

export type FeasibilityStatus = "ok" | "conditional_ok" | "hard_reject";
export type FieldPath = string;
export type ConfidenceLevel = "low" | "medium" | "high";

/**
 * Negotiation phase enum for UI display and workflow tracking.
 * Helps UI show appropriate status indicators at each stage.
 */
export type NegotiationPhase =
  | "spec_received"      // Spec received, awaiting processing
  | "feasibility_check"  // Checking constraints and capabilities
  | "estimating"         // Computing pricing estimate
  | "draft_pending"      // Draft offer being composed
  | "human_review"       // Awaiting human review/approval
  | "offer_ready"        // Non-binding offer ready for buyer
  | "counter_offer"      // Buyer requested changes (future use)
  | "expired"            // Negotiation round expired
  | "rejected"           // Hard rejected, cannot proceed
  | "approved";          // Human approved, ready to proceed

// ============================================================================
// Pricing Configuration Types (P0)
// ============================================================================

/**
 * Garment base pricing by GSM weight range.
 * Merchants configure different prices for different weight tiers.
 */
export interface GarmentPricingTier {
  /** Minimum GSM for this tier (inclusive) */
  minGsm: number;
  /** Maximum GSM for this tier (inclusive) */
  maxGsm: number;
  /** Minimum unit price (USD/piece) */
  priceMin: number;
  /** Maximum unit price (USD/piece) */
  priceMax: number;
}

/**
 * Quantity-based discount tier.
 * Higher quantities get better discounts.
 */
export interface QuantityDiscountTier {
  /** Minimum quantity to qualify for this tier */
  minQty: number;
  /** Discount percentage (e.g., 5 means 5% off) */
  discountPct: number;
}

/**
 * Screen print decoration pricing.
 */
export interface ScreenPrintPricing {
  /** One-time plate/screen setup fee (USD) */
  setupFee: number;
  /** Fee per color/plate (USD) */
  perColorFee: number;
  /** Minimum per-unit printing cost (USD/piece) */
  perUnitMin: number;
  /** Maximum per-unit printing cost (USD/piece) */
  perUnitMax: number;
}

/**
 * DTG (Direct to Garment) decoration pricing.
 */
export interface DtgPricing {
  /** Minimum per-unit printing cost (USD/piece) */
  perUnitMin: number;
  /** Maximum per-unit printing cost (USD/piece) */
  perUnitMax: number;
  /** Optional: cost per square inch for large prints (USD/sq inch) */
  perSqInchFee?: number;
}

/**
 * Embroidery decoration pricing.
 */
export interface EmbroideryPricing {
  /** One-time digitizing/setup fee (USD) */
  setupFee: number;
  /** Cost per 1000 stitches (USD) */
  perKStitchFee: number;
  /** Minimum per-unit cost (USD/piece) */
  perUnitMin?: number;
  /** Maximum per-unit cost (USD/piece) */
  perUnitMax?: number;
}

/**
 * Heat transfer decoration pricing.
 */
export interface HeatTransferPricing {
  /** Minimum per-unit transfer cost (USD/piece) */
  perUnitMin: number;
  /** Maximum per-unit transfer cost (USD/piece) */
  perUnitMax: number;
  /** Optional: setup fee for custom transfers (USD) */
  setupFee?: number;
}

/**
 * Sublimation decoration pricing.
 */
export interface SublimationPricing {
  /** Minimum per-unit cost (USD/piece) */
  perUnitMin: number;
  /** Maximum per-unit cost (USD/piece) */
  perUnitMax: number;
}

/**
 * Decoration pricing configuration by method.
 * Each method has its own cost structure.
 */
export interface DecorationPricingConfig {
  screen_print?: ScreenPrintPricing;
  dtg?: DtgPricing;
  embroidery?: EmbroideryPricing;
  heat_transfer?: HeatTransferPricing;
  sublimation?: SublimationPricing;
}

/**
 * Labeling/branding add-on pricing.
 */
export interface LabelingPricing {
  /** Woven label cost per piece (USD) */
  wovenLabel?: number;
  /** Printed label cost per piece (USD) */
  printedLabel?: number;
  /** Hang tag cost per piece (USD) */
  hangTag?: number;
}

/**
 * Packaging add-on pricing.
 */
export interface PackagingPricing {
  /** Polybag cost per piece (USD) */
  polybag?: number;
  /** Paper bag cost per piece (USD) */
  paperBag?: number;
  /** Custom box cost per piece (USD) */
  customBox?: number;
}

/**
 * Complete pricing configuration for T-shirt production.
 * Merchants configure this to enable config-driven estimates.
 */
export interface TshirtPricingConfig {
  /** Currency for all prices (default: USD) */
  currency?: string;

  /** Base garment pricing by weight tier */
  garmentPricing?: GarmentPricingTier[];

  /** Quantity-based discount tiers */
  qtyTiers?: QuantityDiscountTier[];

  /** Decoration method pricing */
  decorationPricing?: DecorationPricingConfig;

  /** Labeling add-on pricing */
  labelingPricing?: LabelingPricing;

  /** Packaging add-on pricing */
  packagingPricing?: PackagingPricing;

  /** Default lead time range (production days) */
  defaultLeadTimeDays?: {
    min: number;
    max: number;
  };

  /** Additional lead time per decoration method (days) */
  decorationLeadTimeAddon?: Partial<Record<DecorationMethod, number>>;
}

export interface TshirtArtifacts {
  feasibility?: SellerFeasibilityReport;
  estimate?: SellerEstimate;
  draftOffer?: SellerDraftOffer;
  /**
   * Optional suggested patches to help buyer agent update `TshirtSpec` (never auto-applied by seller agent).
   */
  suggestedSpecPatches?: SpecPatchSuggestion[];
  /**
   * For advanced flows, seller can store the last typed spec snapshot used for artifacts.
   * Not required; mainly useful for debugging.
   */
  lastSpec?: TshirtSpec;
}

export interface SellerFeasibilityReport {
  status: FeasibilityStatus;
  blockingReasons?: Array<{
    code: string;
    fieldPath?: FieldPath;
    detail: string;
    severity?: "low" | "medium" | "high";
  }>;
  conditions?: Array<{
    if: string;
    then: string;
  }>;
  options?: Array<{
    optionId: string;
    description: string;
    suggestedSpecPatch?: SpecPatchSuggestion;
    impact?: {
      cost?: "lower" | "same" | "higher" | "unknown";
      leadTime?: "shorter" | "same" | "longer" | "unknown";
      quality?: "lower" | "same" | "higher" | "unknown";
      compliance?: "riskier" | "same" | "safer" | "unknown";
    };
  }>;
  requiresHumanReview?: boolean;
}

/**
 * Cost breakdown component for transparency.
 * Shows min/max range and optional explanatory note.
 */
export interface CostBreakdownItem {
  min: number;
  max: number;
  note?: string;
}

/**
 * One-time setup fees breakdown.
 */
export interface SetupFeesBreakdown {
  /** Total setup fees (USD) */
  total: number;
  /** Itemized breakdown descriptions */
  breakdown: string[];
}

/**
 * Cost breakdown showing how the estimate is composed.
 * Helps buyers understand pricing and facilitates negotiation.
 */
export interface EstimateCostBreakdown {
  /** Base garment cost per unit */
  garment?: CostBreakdownItem;
  /** Decoration/printing cost per unit */
  decoration?: CostBreakdownItem;
  /** Labeling cost per unit (woven labels, tags, etc.) */
  labeling?: CostBreakdownItem;
  /** Packaging cost per unit */
  packaging?: CostBreakdownItem;
  /** One-time setup fees (screen setup, digitizing, etc.) */
  setupFees?: SetupFeesBreakdown;
}

/**
 * Pricing tier for quantity-based pricing display.
 */
export interface EstimatePricingTier {
  /** Minimum quantity for this tier */
  minQty: number;
  /** Maximum quantity for this tier (undefined = no limit) */
  maxQty?: number;
  /** Unit price range at this quantity tier */
  unitPrice: {
    min: number;
    max: number;
  };
}

/**
 * Alternative option type for estimate alternatives.
 * Describes what aspect of the spec would change to achieve different pricing/timeline.
 */
export type AlternativeType =
  | "quantity_increase"    // Increase quantity for better unit price
  | "quantity_decrease"    // Decrease quantity for faster delivery
  | "decoration_change"    // Switch decoration method
  | "fabric_change"        // Switch fabric weight/type
  | "timeline_extension"   // Extend timeline for lower price
  | "timeline_rush"        // Rush order with premium
  | "remove_feature"       // Remove optional features
  | "bulk_discount";       // Special bulk pricing

/**
 * An alternative pricing/timeline option presented alongside the main estimate.
 * Helps buyers understand trade-offs and facilitates negotiation.
 */
/**
 * Final quote information.
 * Marks an estimate as a final, confirmed quote from the seller.
 * Note: No `finalizedBy` field needed since the final quote is always confirmed by the seller.
 */
export interface FinalQuoteInfo {
  /** Whether this is a final quote */
  isFinal: boolean;
  /** When the quote was finalized */
  finalizedAt: ISODateTimeString;
  /** Optional note about the final quote (e.g., "Valid for 7 days") */
  note?: string;
  /** Specific final price per unit (when confirmed, replaces price range) */
  finalPrice?: number;
  /** Final confirmed quantity */
  finalQuantity?: number;
}

export interface EstimateAlternative {
  /** Unique identifier for this alternative */
  alternativeId: string;
  /** Type of change this alternative represents */
  type: AlternativeType;
  /** Human-readable description of this option */
  description: string;
  /** What spec change would achieve this alternative */
  suggestedSpecChange?: {
    fieldPath: FieldPath;
    currentValue?: unknown;
    suggestedValue: unknown;
  };
  /** Price range for this alternative */
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  /** Lead time for this alternative */
  leadTimeDays?: {
    productionMin?: number;
    productionMax?: number;
    totalMin?: number;
    totalMax?: number;
  };
  /** Impact description comparing to main estimate */
  impact: {
    priceDelta?: "lower" | "same" | "higher";
    priceDeltaPct?: number;
    leadTimeDelta?: "shorter" | "same" | "longer";
    leadTimeDeltaDays?: number;
    qualityDelta?: "lower" | "same" | "higher";
  };
  /** Whether this alternative is recommended */
  recommended?: boolean;
}

export interface SellerEstimate {
  /**
   * Price estimate range. Non-binding.
   */
  priceRange?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  /**
   * Lead time estimate range (days). Non-binding.
   */
  leadTimeDays?: {
    productionMin?: number;
    productionMax?: number;
    totalMin?: number;
    totalMax?: number;
  };
  /**
   * Cost breakdown showing price composition (P0 enhancement).
   * Helps buyers understand the estimate and negotiate effectively.
   */
  costBreakdown?: EstimateCostBreakdown;
  /**
   * Quantity-based pricing tiers (P0 enhancement).
   * Shows how unit price changes with order quantity.
   */
  pricingTiers?: EstimatePricingTier[];
  /**
   * Alternative options with different price/timeline trade-offs (P1 enhancement).
   * Presents actionable alternatives to help buyers choose or negotiate.
   */
  alternatives?: EstimateAlternative[];
  confidence?: ConfidenceLevel;
  assumptions?: string[];
  /**
   * When this estimate was computed (for display).
   * Use validUntil for the actual expiration.
   */
  validUntil?: ISODateTimeString;
  /**
   * When this estimate expires and should no longer be considered valid (P2 enhancement).
   * After this time, a new estimate should be requested.
   * Helps prevent stale pricing from being used in negotiations.
   */
  expiresAt?: ISODateTimeString;
  /**
   * Final quote marker. When set with isFinal=true, indicates this is a confirmed
   * final quote from the seller (not just an estimate).
   * Buyer can see this and decide to place an order, continue negotiating, or hold.
   */
  finalQuote?: FinalQuoteInfo;
}

export interface SellerDraftOffer {
  nonBinding: true;
  subjectToFinalConfirmation: true;
  includedScope?: string[];
  excludedScope?: string[];
  /**
   * Clarification questions to be sent back to buyer agent.
   * Single source of truth: do NOT duplicate outside draftOffer.
   */
  openQuestions?: ClarificationQuestion[];
  /**
   * Risk flags for human review and buyer communication.
   * Single source of truth: do NOT duplicate outside draftOffer.
   */
  riskFlags?: RiskFlag[];
  requiresHumanConfirmation?: boolean;
  provenance?: {
    agentVersion?: string;
    generatedAt?: ISODateTimeString;
  };
}

export interface SpecPatchSuggestion {
  /**
   * Field path in the buyer spec that could be updated.
   */
  fieldPath: FieldPath;
  /**
   * Suggested value (opaque to seller agent consumers).
   */
  value: unknown;
  /**
   * Why this patch is suggested (helps buyer agent decide to adopt).
   */
  reason?: string;
}

export interface ClarificationQuestion {
  id: string;
  fieldPath?: FieldPath;
  priority?: "p0" | "p1" | "p2";
  blocking?: boolean;
  question: string;
  rationale?: string;
  suggestedOptions?: string[];
}

export interface RiskFlag {
  code: string;
  severity: "low" | "medium" | "high";
  message: string;
  fieldPath?: FieldPath;
}

