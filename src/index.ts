/**
 * Cgent.AI A2A Protocol
 * 
 * Type definitions for the Cgent.AI A2A e-commerce Protocol
 */

// Export all order types
export type {
  ChainInfo,
  TokenInfo,
  TransactionInfo,
  AddressInfo,
  Order,
  OrderStatus,
} from './types/order';

// Export all product types
export type {
  Product,
  ProductAttributes,
  ProductSku,
  ParsedProduct,
} from './types/product';

// Export all T-shirt spec types
export type {
  TshirtSpec,
  SpecMeta,
  TshirtIntent,
  TshirtDecisions,
  TshirtOrder,
  TshirtVariant,
  TshirtProduct,
  TshirtCustomization,
  TshirtCompliance,
  TshirtQuality,
  TshirtLogistics,
  TshirtCommercial,
  ColorSpec,
  FabricSpec,
  SizingSpec,
  DecorationItem,
  LabelingSpec,
  PackagingSpec,
  AttachmentRef,
  // Utility types
  ISODateTimeString,
  ISODateString,
  CurrencyCode,
  CountryCode,
  YesNoUnknown,
  // Enums
  GarmentCategory,
  FitType,
  NeckType,
  SleeveType,
  SizeSystem,
  DecorationMethod,
  DecorationPlacement,
  Incoterm,
  ShippingMode,
} from './specs/t-shirt-spec';
