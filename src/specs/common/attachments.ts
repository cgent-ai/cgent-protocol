/**
 * Common Attachments
 * Shared attachment reference types
 */

/**
 * Attachment kind
 */
export const AttachmentKind = {
  Artwork: "artwork",
  TechPack: "tech_pack",
  ReferenceImage: "reference_image",
  SizeChart: "size_chart",
  LabelDesign: "label_design",
  Other: "other",
} as const;

export type AttachmentKind = (typeof AttachmentKind)[keyof typeof AttachmentKind];

/**
 * Attachment reference
 */
export interface AttachmentRef {
  name?: string;
  uri: string;
  kind?: AttachmentKind;
}
