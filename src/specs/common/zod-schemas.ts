/**
 * Prebuilt Zod Schemas for Common Enums
 *
 * This module provides ready-to-use Zod schemas for common enums shared across verticals.
 *
 * @example
 * ```typescript
 * import { YesNoUnknownSchema, IncotermSchema } from "@cgentai/cgent-protocol/specs/common/zod-schemas";
 * import { z } from "zod";
 *
 * const ConfigSchema = z.object({
 *   need_sample: YesNoUnknownSchema,
 *   incoterm: IncotermSchema,
 *   // ...
 * });
 * ```
 */

import { z } from "zod";
import { YesNoUnknownValues } from "./enums";
import { IncotermValues, ShippingModeValues } from "./trade";

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
// Common Decision Enums
// ============================================================================

/**
 * YesNoUnknown schema - commonly used for decision fields
 * Note: Uses createReusableEnumSchema (no default) as it's often referenced by other schemas
 */
export const YesNoUnknownSchema = createReusableEnumSchema(YesNoUnknownValues);

// ============================================================================
// Trade & Logistics Enums
// ============================================================================

export const IncotermSchema = createNullableEnumSchema(IncotermValues);
export const ShippingModeSchema = createNullableEnumSchema(ShippingModeValues);
