/**
 * Vertical Registry Type Definitions
 *
 * Base types for the vertical configuration registry that enables
 * multi-vertical support without hardcoding.
 */

import type { SpecCategory } from "../../specs/common";

/**
 * Field type for spec fields
 */
export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "enum"
  | "array"
  | "object"
  | "range"
  | "date";

/**
 * Definition of a single spec field
 */
export interface FieldDefinition {
  /** Human-readable label for the field */
  label: string;
  /** Data type of the field */
  type: FieldType;
  /** For enum fields: list of possible values */
  enumValues?: string[];
  /** For enum fields: human-readable labels for each value */
  enumLabels?: Record<string, string>;
  /** Hint for LLM when analyzing chat for this field */
  llmHint?: string;
  /** Whether this field is an array */
  isArray?: boolean;
}

/**
 * Metadata for a section of fields
 */
export interface FieldSectionMetadata {
  /** Human-readable section label */
  label: string;
  /** Display order (lower = earlier) */
  order: number;
  /** Fields within this section, keyed by dot-notation path */
  fields: Record<string, FieldDefinition>;
}

/**
 * Complete field metadata for a vertical
 */
export interface VerticalFieldMetadata {
  /** Sections of fields, keyed by section name */
  sections: Record<string, FieldSectionMetadata>;
}

/**
 * Prompt templates for LLM operations
 */
export interface VerticalPromptTemplates {
  /** Description of the vertical intent for intent detection */
  intentDescription: string;
  /** Keywords that indicate this vertical */
  intentKeywords: string[];
  /** System prompt for chat analysis (extracting spec changes from chat) */
  chatAnalysisPrompt: string;
  /** Prompt for generating spec summary */
  specSummaryPrompt: string;
}

/**
 * Feature flags for vertical capabilities
 */
export interface VerticalFeatures {
  /** Whether this vertical supports negotiation with sellers */
  supportsNegotiation: boolean;
  /** Whether this vertical supports re-negotiation after initial quote */
  supportsRenegotiation: boolean;
  /** Whether spec extraction is enabled */
  supportsSpecExtraction?: boolean;
}

/**
 * Base vertical configuration interface
 *
 * @template TCategory - The spec category type (e.g., "tshirt")
 * @template TSpec - The spec type (e.g., TshirtSpec)
 * @template TArtifacts - The artifacts type (e.g., TshirtArtifacts)
 */
export interface VerticalConfig<
  TCategory extends SpecCategory = SpecCategory,
  TSpec = unknown,
  TArtifacts = unknown,
> {
  /** The spec category identifier */
  category: TCategory;
  /** Version of this config */
  version: string;
  /** Human-readable name */
  displayName: string;
  /** Description of what this vertical handles */
  description: string;

  /** Field metadata for UI rendering and change tracking */
  fieldMetadata: VerticalFieldMetadata;

  /** Prompt templates for LLM operations */
  prompts: VerticalPromptTemplates;

  /** Feature flags */
  features: VerticalFeatures;

  /** Optional type markers (not used at runtime, just for TypeScript) */
  _specType?: TSpec;
  _artifactsType?: TArtifacts;
}

/**
 * Get field label from vertical config by path
 */
export function getFieldLabel(
  config: VerticalConfig,
  path: string
): string {
  for (const section of Object.values(config.fieldMetadata.sections)) {
    if (section.fields[path]) {
      return section.fields[path].label;
    }
  }
  // Fallback: use last part of path
  return path.split(".").pop() || path;
}

/**
 * Get field section/category from vertical config by path
 */
export function getFieldCategory(
  config: VerticalConfig,
  path: string
): string {
  // Try exact match first
  for (const [sectionKey, section] of Object.entries(
    config.fieldMetadata.sections
  )) {
    if (section.fields[path]) {
      return section.label;
    }
  }

  // Try prefix match (e.g., "order.quantity.exact" -> "order" section)
  const firstPart = path.split(".")[0];
  const section = config.fieldMetadata.sections[firstPart];
  if (section) {
    return section.label;
  }

  return "Other";
}

/**
 * Get all field definitions from vertical config
 */
export function getAllFields(
  config: VerticalConfig
): Array<{ path: string; definition: FieldDefinition; section: string }> {
  const fields: Array<{
    path: string;
    definition: FieldDefinition;
    section: string;
  }> = [];

  for (const [sectionKey, section] of Object.entries(
    config.fieldMetadata.sections
  )) {
    for (const [path, definition] of Object.entries(section.fields)) {
      fields.push({ path, definition, section: section.label });
    }
  }

  return fields;
}
