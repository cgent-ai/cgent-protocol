/**
 * Prebuilt Zod Schemas for T-shirt Spec
 *
 * This module provides ready-to-use Zod schemas for all T-shirt enums.
 * These schemas follow the nullable().default(null) pattern commonly used
 * with OpenAI structured outputs.
 *
 * @example
 * ```typescript
 * import { GarmentCategorySchema } from "@cgentai/cgent-protocol/specs/verticals/apparel/tshirt/zod-schemas";
 * import { z } from "zod";
 *
 * const ProductSchema = z.object({
 *   category: GarmentCategorySchema,
 *   fit_type: FitTypeSchema,
 *   // ...
 * });
 * ```
 */

import { z } from "zod";
import * as Enums from "./enums";

/**
 * Helper function to create a nullable enum schema with default null
 * This pattern is commonly used with OpenAI structured outputs
 */
export function createNullableEnumSchema<T extends [string, ...string[]]>(
  values: T
): z.ZodDefault<z.ZodNullable<z.ZodEnum<T>>> {
  return z.enum(values).nullable().default(null);
}

/**
 * Helper function to create a simple nullable enum without default
 * Use this for schemas that will be referenced by other schemas ($ref)
 * as OpenAI doesn't support default keyword in referenced schemas
 */
export function createReusableEnumSchema<T extends [string, ...string[]]>(
  values: T
): z.ZodNullable<z.ZodEnum<T>> {
  return z.enum(values).nullable();
}

// ============================================================================
// Product Enums
// ============================================================================

export const GarmentCategorySchema = createNullableEnumSchema(Enums.GarmentCategoryValues);
export const FitTypeSchema = createNullableEnumSchema(Enums.FitTypeValues);
export const NeckTypeSchema = createNullableEnumSchema(Enums.NeckTypeValues);
export const SleeveTypeSchema = createNullableEnumSchema(Enums.SleeveTypeValues);

// ============================================================================
// Fabric Enums
// ============================================================================

export const FabricDirectionSchema = createNullableEnumSchema(Enums.FabricDirectionValues);
export const KnitTypeSchema = createNullableEnumSchema(Enums.KnitTypeValues);
export const FabricFinishSchema = createNullableEnumSchema(Enums.FabricFinishValues);

// ============================================================================
// Sizing Enums
// ============================================================================

export const SizeSystemSchema = createNullableEnumSchema(Enums.SizeSystemValues);
export const SizeUnitSchema = createNullableEnumSchema(Enums.SizeUnitValues);

// ============================================================================
// Customization Enums
// ============================================================================

export const DecorationMethodSchema = createNullableEnumSchema(Enums.DecorationMethodValues);
export const DecorationPlacementSchema = createNullableEnumSchema(Enums.DecorationPlacementValues);
export const SpecialEffectSchema = createNullableEnumSchema(Enums.SpecialEffectValues);
export const LabelTypeSchema = createNullableEnumSchema(Enums.LabelTypeValues);

// ============================================================================
// Packaging Enums
// ============================================================================

export const BarcodeStandardSchema = createNullableEnumSchema(Enums.BarcodeStandardValues);
export const BarcodePlacementSchema = createNullableEnumSchema(Enums.BarcodePlacementValues);
export const PackagingTypeSchema = createNullableEnumSchema(Enums.PackagingTypeValues);
export const PackagingExtraItemSchema = createNullableEnumSchema(Enums.PackagingExtraItemValues);
export const FoldingMethodSchema = createNullableEnumSchema(Enums.FoldingMethodValues);

// ============================================================================
// Business Context Enums
// ============================================================================

export const UseCaseSchema = createNullableEnumSchema(Enums.UseCaseValues);
export const TargetMarketSchema = createNullableEnumSchema(Enums.TargetMarketValues);
export const GenderSchema = createNullableEnumSchema(Enums.GenderValues);
export const StylePreferenceSchema = createNullableEnumSchema(Enums.StylePreferenceValues);
export const BrandPositioningSchema = createNullableEnumSchema(Enums.BrandPositioningValues);
export const CustomizationDepthSchema = createNullableEnumSchema(Enums.CustomizationDepthValues);

// ============================================================================
// Design & Assets Enums
// ============================================================================

export const DesignFileTypeSchema = createNullableEnumSchema(Enums.DesignFileTypeValues);

// ============================================================================
// Order & Quantity Enums
// ============================================================================

export const QuantityUnitSchema = createNullableEnumSchema(Enums.QuantityUnitValues);
export const QualityExpectationSchema = createNullableEnumSchema(Enums.QualityExpectationValues);

// ============================================================================
// Commercial Enums
// ============================================================================

export const SampleTypeSchema = createNullableEnumSchema(Enums.SampleTypeValues);
export const SampleRequirementSchema = createNullableEnumSchema(Enums.SampleRequirementValues);
export const PaymentModelSchema = createNullableEnumSchema(Enums.PaymentModelValues);
export const PaymentMethodSchema = createNullableEnumSchema(Enums.PaymentMethodValues);
export const MOQToleranceSchema = createNullableEnumSchema(Enums.MOQToleranceValues);

// ============================================================================
// Logistics Enums
// ============================================================================

export const TimelineStrictnessSchema = createNullableEnumSchema(Enums.TimelineStrictnessValues);

// ============================================================================
// Spec Management Enums
// ============================================================================

export const SpecStatusSchema = createNullableEnumSchema(Enums.SpecStatusValues);
