/**
 * Cgent.AI A2A Protocol
 * 
 * Type definitions for the Cgent.AI A2A e-commerce Protocol
 * @packageDocumentation
 */

// ============================================================================
// Re-export all types from submodules
// ============================================================================
export * from './types';
export * from './specs';

// ============================================================================
// Namespace exports for better organization
// ============================================================================
export * as OrderTypes from './types/order';
export * as ProductTypes from './types/product';

// Tshirt vertical namespaces
export * as TshirtSpecTypes from './specs/verticals/apparel/tshirt/spec';
export * as TshirtArtifactsTypes from './specs/verticals/apparel/tshirt/artifacts';
export * as TshirtEnums from './specs/verticals/apparel/tshirt/enums';

// Common specs namespaces
export * as CommonEnums from './specs/common/enums';
export * as CommonTrade from './specs/common/trade';
export * as CommonPrimitives from './specs/common/primitives';
export * as CommonAttachments from './specs/common/attachments';
