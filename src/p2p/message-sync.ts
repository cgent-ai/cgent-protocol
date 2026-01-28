/**
 * P2P Message Synchronization Types
 *
 * Type definitions for bidirectional chat message synchronization
 * between buyer and seller nodes via libp2p.
 */

// ============================================================================
// Action Types
// ============================================================================

/**
 * P2P action type for chat message synchronization
 */
export type MessageSyncAction = "chat_message_sync";

/**
 * Direction of the message in the sync payload
 */
export type MessageSyncDirection = "buyer_to_seller" | "seller_to_buyer";

/**
 * Type of the synchronized message
 * - text: Human-sent text messages (synchronized via P2P)
 * - negotiation: Agent negotiation messages (local storage only, not synced)
 * - system: System messages
 * - spec_update: Buyer updated spec (buyer → seller)
 * - quote_update: Seller updated quote (seller → buyer)
 */
export type MessageSyncType =
  | "text"
  | "negotiation"
  | "system"
  | "spec_update"
  | "quote_update";

// ============================================================================
// Payload Types
// ============================================================================

/**
 * Payload for chat message synchronization
 * Sent when a user manually sends a message that needs to be synced to the other party
 */
export interface ChatMessageSyncPayload {
  /** Unique message ID from the sender's system */
  messageId: string;
  /** Buyer's user ID (used to identify the conversation on both sides) */
  buyerUserId: string;
  /** Merchant/Seller ID (used to identify the merchant) */
  merchantId: string;
  /** Direction of the message */
  direction: MessageSyncDirection;
  /** Type of the message */
  type: MessageSyncType;
  /** Text content of the message */
  content: string;
  /** ISO 8601 timestamp when the message was created */
  createdAt: string;
  /** Optional session ID for contextual conversations */
  sessionId?: string;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Response for chat message synchronization
 */
export interface ChatMessageSyncResponse {
  /** Whether the message was successfully received and stored */
  success: boolean;
  /** Message ID assigned by the receiver's system (if successful) */
  receiverMessageId?: string;
  /** Error message (if failed) */
  error?: string;
}

// ============================================================================
// Spec/Quote Update Metadata Types
// ============================================================================

/**
 * Metadata for spec update messages (buyer → seller)
 * Included in ChatMessageSyncPayload.metadata when type is "spec_update"
 */
export interface SpecUpdateMetadata {
  /** Unique ID for this spec update */
  specUpdateId: string;
  /** Spec category (e.g., "tshirt") */
  category: string;
  /** Version number of the spec (optional) */
  version?: number;
  /** Fields that were updated with their old and new values */
  updatedFields: Record<string, { from: unknown; to: unknown }>;
  /** ISO 8601 timestamp when the update occurred */
  updatedAt: string;
  /** Whether this update triggered a new negotiation round */
  triggeredNegotiation: boolean;
  /** Human-readable summary of changes */
  changeSummary?: string;
}

/**
 * Metadata for quote update messages (seller → buyer)
 * Included in ChatMessageSyncPayload.metadata when type is "quote_update"
 */
export interface QuoteUpdateMetadata {
  /** Unique ID for this quote update */
  quoteUpdateId: string;
  /** Negotiation session ID (optional) */
  sessionId?: string;
  /** Version number of the quote (optional) */
  version?: number;
  /** Fields that were updated with their old and new values */
  updatedFields: Record<string, { from: unknown; to: unknown }>;
  /** ISO 8601 timestamp when the update occurred */
  updatedAt: string;
  /** Human-readable summary of changes */
  changeSummary?: string;
}

// ============================================================================
// Order Placed Types (for order_placed P2P action)
// ============================================================================

/**
 * P2P action type for order placement notification
 */
export type OrderPlacedAction = "order_placed";

/**
 * Spec data included in order_placed payload
 */
export interface OrderPlacedSpec {
  /** Spec category (e.g., "tshirt") */
  category: string;
  /** Complete spec data */
  data: unknown;
  /** Buyer-side AgentMessage ID (optional) */
  messageId?: string;
}

/**
 * Quote data included in order_placed payload
 */
export interface OrderPlacedQuote {
  /** Quote category */
  category: string;
  /** Complete quote/artifacts data */
  data: unknown;
  /** Buyer-side AgentMessage ID (optional) */
  messageId?: string;
}

/**
 * Payment information for verification
 */
export interface OrderPlacedPayment {
  /** Stripe PaymentIntent ID */
  stripePaymentIntentId: string;
  /** Merchant ID for payment verification */
  merchantId: string;
}

/**
 * Payload for order_placed action
 * Sent from buyer to seller when an order is placed and payment succeeds
 */
export interface OrderPlacedPayload {
  /** Order ID from cgent-user */
  orderId: string;
  /** Buyer's user ID */
  buyerUserId: string;
  /** Order amount in cents (USD) */
  amountCents: number;
  /** Quantity ordered */
  quantity: number;
  /** Short summary of the spec for display */
  specSummary: string;
  /** Timestamp when order was placed (Unix ms) */
  timestamp: number;
  /** Complete spec data */
  spec: OrderPlacedSpec;
  /** Complete quote data */
  quote: OrderPlacedQuote;
  /** Payment verification information */
  payment: OrderPlacedPayment;
}

/**
 * Payment verification result
 */
export interface PaymentVerificationResult {
  /** Whether payment was verified */
  verified: boolean;
  /** Payment status from registry */
  status: string;
}

/**
 * Response for order_placed action
 */
export interface OrderPlacedResponse {
  /** Whether the order notification was received */
  success: boolean;
  /** Timestamp when the notification was received (ISO 8601) */
  receivedAt: string;
  /** Seller-side order ID (if created) */
  sellerOrderId?: string;
  /** Payment verification result */
  paymentVerification?: PaymentVerificationResult;
  /** Error message (if failed) */
  error?: string;
}
