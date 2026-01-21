/**
 * Seller Constraints
 * Seller/Manufacturer capabilities and constraints
 */

import type { Incoterm, ShippingMode } from "./trade";

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
}
