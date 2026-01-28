/**
 * Cgent.AI A2A Protocol
 *
 * Type definitions for the Cgent.AI A2A e-commerce Protocol
 * @packageDocumentation
 */

// ============================================================================
// Re-export all types from submodules
// ============================================================================
export * from './specs';
export * from './p2p';
export * from './verticals';

// ============================================================================
// Namespace exports for better organization
// ============================================================================

// Tshirt vertical namespaces
export * as TshirtSpecTypes from './specs/verticals/apparel/tshirt/spec';
export * as TshirtArtifactsTypes from './specs/verticals/apparel/tshirt/artifacts';
export * as TshirtEnums from './specs/verticals/apparel/tshirt/enums';
export * as TshirtCapabilitiesTypes from './specs/verticals/apparel/tshirt/capabilities';

// Common specs namespaces
export * as CommonEnums from './specs/common/enums';
export * as CommonTrade from './specs/common/trade';
export * as CommonPrimitives from './specs/common/primitives';
export * as CommonAttachments from './specs/common/attachments';
export * as CommonConstraints from './specs/common/constraints';
export * as CommonCapabilities from './specs/common/capabilities';
export * as CommonPolicies from './specs/common/policies';

// P2P namespaces
export * as P2PMessageSync from './p2p/message-sync';

// Verticals namespaces
export * as VerticalRegistry from './verticals/registry';
export * as TshirtVerticalConfig from './verticals/tshirt/config';
