/**
 * Seller Constraints
 * Seller/Manufacturer capabilities and constraints
 */

import type { Incoterm, ShippingMode } from "./trade";
import type { Country } from "./primitives";

/**
 * T-shirt domain-specific constraints.
 */
export interface TshirtConstraints {
  /**
   * Per-method MOQ thresholds (e.g., screen print higher MOQ).
   */
  moqByDecorationMethod?: Record<string, number>;
  /**
   * Maximum supported color count by method (optional).
   */
  maxColorsByMethod?: Record<string, number>;
}

/**
 * Domain-specific constraint container.
 */
export interface SellerDomainConstraints {
  tshirt?: TshirtConstraints;
}

/**
 * 卖家约束
 * 卖家/制造商的能力和限制条件
 */
export interface SellerConstraints {
  /** 最大交期（天） */
  maxLeadTimeDays?: number;
  /** 最小起订量 */
  minMoq?: number;
  /** 允许的贸易条款 */
  allowedIncoterms?: Incoterm[];
  /** 允许的运输方式 */
  allowedShippingModes?: ShippingMode[];
  /** 允许的目标市场/国家 (合规/出口限制) */
  allowedDestinationCountries?: Country[];
  /** 域特定约束 */
  domains?: SellerDomainConstraints;
}
