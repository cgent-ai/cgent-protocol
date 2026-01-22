/**
 * Seller Capabilities
 * Seller/Manufacturer production capabilities
 */

import type { TshirtCapabilities } from "../verticals/apparel/tshirt/capabilities";
import type { ISODateTimeString } from "./primitives";

/**
 * Domain-specific capabilities container.
 */
export interface SellerDomainCapabilities {
  tshirt?: TshirtCapabilities;
  // toy?: ToyCapabilities; // future
}

/**
 * Seller capabilities snapshot.
 * Used for matching buyer requirements against seller production abilities.
 */
export interface SellerCapabilities {
  /** Version identifier for this capability snapshot */
  version?: string;
  /** Source system/API that provided this data */
  source?: string;
  /** When this capability snapshot was updated */
  updatedAt?: ISODateTimeString;
  /** When this capability snapshot expires */
  validUntil?: ISODateTimeString;
  /** Domain-specific capability payloads */
  domains?: SellerDomainCapabilities;
}
