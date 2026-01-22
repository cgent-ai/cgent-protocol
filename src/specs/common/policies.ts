/**
 * Seller Policies
 * Governance and safety policy switches for seller agents
 */

/**
 * Seller policy configuration.
 * Controls agent behavior regarding risk handling and human approval requirements.
 */
export interface SellerPolicies {
  /**
   * IP/copyright risk handling:
   * - off: ignore IP risk signals
   * - warn: flag for human review but don't block
   * - block: reject requests with IP risk
   */
  ipRiskGate?: "off" | "warn" | "block";
  /**
   * Compliance strictness for target markets:
   * - relaxed: minimal compliance checks
   * - standard: normal compliance requirements
   * - strict: enhanced compliance verification
   */
  complianceGate?: "relaxed" | "standard" | "strict";
  /**
   * Whether agent outputs must always be human-approved before being sent externally.
   */
  requireHumanApprovalToSend?: boolean;
}
