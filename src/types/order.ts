/**
 * Order Types
 * Type definitions for orders in the Cgent.AI A2A e-commerce Protocol
 */


import {Product} from "./product";

/**
 * CAIP-2 Chain Identifier
 * Format: namespace:reference
 * Example: "eip155:1" (Ethereum Mainnet), "eip155:137" (Polygon)
 */
export type ChainInfo = {
  /** CAIP-2 chain identifier (e.g., "eip155:1") */
  caip2: string;
  /** Optional chain name for display */
  chainName?: string;
};

/**
 * Token Information
 * Information about the token used for payment
 */
export type TokenInfo = {
  /** Token contract address */
  tokenContract: string;
  /** Token symbol (e.g., "USDT", "USDC", "ETH") */
  tokenSymbol: string;
  /** Optional token decimals */
  decimals?: number;
  /** Optional token name */
  tokenName?: string;
};

/**
 * Transaction Information
 * On-chain transaction details
 */
export type TransactionInfo = {
  /** Transaction hash */
  txHash: string;
  /** Buyer wallet address */
  buyerAddress: string;
  /** Seller wallet address */
  sellerAddress: string;
  /** Transfer amount (as string to preserve precision) */
  amount: string;
  /** Chain information using CAIP-2 format */
  chainInfo: ChainInfo;
  /** Token information */
  tokenInfo: TokenInfo;
};

/**
 * Address Information
 * International standard address format
 */
export type AddressInfo = {
  /** Street address line 1 */
  streetAddress?: string;
  /** Street address line 2 */
  streetAddress2?: string;
  /** City */
  city?: string;
  /** State/Province */
  state?: string;
  /** Postal/ZIP code */
  postalCode?: string;
  /** Country code (ISO 3166-1 alpha-2, e.g., "US", "CN") */
  country?: string;
  /** Full formatted address (optional) */
  formattedAddress?: string;
};


/**
 * Order Database Model
 * Order as stored in the database
 */
export type Order = {
  /** Order ID */
  orderId: string;
  /** User ID */
  userId: string;
  /** Merchant ID */
  merchantId: string;
  /** Product code */
  productCode: string;
  /** Product unit price */
  price: number;
  /** Purchase quantity */
  qty: number;
  /** Transaction information */
  transactionInfo: TransactionInfo;
  /** Address information (may be null) */
  addressInfo: AddressInfo | null;
  /** Product information */
  productInfo: Product | null;
  /** Extra information (reserved field) */
  extraInfo: Record<string, unknown> | null;
  /** Remarks */
  remark: string | null;
  /** Order status */
  status: OrderStatus;
  /** Payment intent ID (for Stripe payments) */
  paymentIntentId: string | null;
  /** Payment type: "wallet" or "stripe" */
  paymentType: "wallet" | "stripe";
  /** Order creation timestamp */
  createdAt: Date;
  /** Order last update timestamp */
  updatedAt: Date;
};

export type OrderStatus = "None" | "BuyerPaid" | "SellerLocked" | "SellerRefunded"
  | "SellerReleased" | "BuyerWithdrawn" | "ArbitrationPending"
  | "ArbitrationBuyer" | "ArbitrationSeller";