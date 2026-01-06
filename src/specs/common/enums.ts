/**
 * Common Enums
 * Shared enums used across multiple verticals
 */

/**
 * Yes/No/Unknown decision type
 */
export const YesNoUnknown = {
  Yes: "yes",
  No: "no",
  Unknown: "unknown",
} as const;

export type YesNoUnknown = (typeof YesNoUnknown)[keyof typeof YesNoUnknown];
