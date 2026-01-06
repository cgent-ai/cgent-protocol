/**
 * Common Primitives
 * Shared primitive types used across all specs
 */

/**
 * ISO 8601 date-time string (e.g., "2025-12-25T12:34:56Z")
 */
export type ISODateTimeString = string;

/**
 * ISO 8601 date string (e.g., "2025-12-25")
 */
export type ISODateString = string;

/**
 * Supported currency codes
 * Currently only USD is supported for transactions
 */
export const Currency = {
  USD: "USD",
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];

/**
 * Supported country codes (ISO 3166-1 alpha-2)
 * Covers major markets for B2B procurement
 */
export const Country = {
  // North America
  US: "US", // United States
  CA: "CA", // Canada
  MX: "MX", // Mexico
  
  // Europe
  GB: "GB", // United Kingdom
  DE: "DE", // Germany
  FR: "FR", // France
  IT: "IT", // Italy
  ES: "ES", // Spain
  NL: "NL", // Netherlands
  BE: "BE", // Belgium
  PL: "PL", // Poland
  
  // Asia Pacific
  CN: "CN", // China
  JP: "JP", // Japan
  KR: "KR", // South Korea
  TW: "TW", // Taiwan
  HK: "HK", // Hong Kong
  SG: "SG", // Singapore
  MY: "MY", // Malaysia
  TH: "TH", // Thailand
  VN: "VN", // Vietnam
  ID: "ID", // Indonesia
  PH: "PH", // Philippines
  IN: "IN", // India
  AU: "AU", // Australia
  NZ: "NZ", // New Zealand
  
  // Middle East
  AE: "AE", // United Arab Emirates
  SA: "SA", // Saudi Arabia
  IL: "IL", // Israel
  TR: "TR", // Turkey
  
  // South America
  BR: "BR", // Brazil
  AR: "AR", // Argentina
  CL: "CL", // Chile
  
  // Africa
  ZA: "ZA", // South Africa
  EG: "EG", // Egypt
} as const;

export type Country = (typeof Country)[keyof typeof Country];
