import { TshirtSpec, ISODateTimeString } from "./t-shirt-spec";

export type FeasibilityStatus = "ok" | "conditional_ok" | "hard_reject";
export type FieldPath = string;
export type ConfidenceLevel = "low" | "medium" | "high";




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
  confidence?: ConfidenceLevel;
  assumptions?: string[];
  validUntil?: ISODateTimeString;
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