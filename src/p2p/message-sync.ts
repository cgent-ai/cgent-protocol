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
 */
export type MessageSyncType = "text" | "negotiation" | "system";

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
