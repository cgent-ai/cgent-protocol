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
