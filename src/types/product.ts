/**
 * Product Types
 * Type definitions for products in the Cgent.AI A2A e-commerce Protocol
*/

export type Product = {
  /** Merchant ID */
  merchant_id: string;
  /** Product code (merchant-defined) */
  product_code: string;
  /** Product name */
  product_name: string;
  /** Product categories - 2D array, each sub-array represents a category dimension */
  categories: string[][];
  /** Product tags - 1D array */
  tags: string[];
  /** Product price */
  price: number;
  /** Product status: 0=offline, 1=online */
  product_status: number;
  version: number;
  /** Product extended attributes - JSON string format */
  attributes: string;
  /** Product creation time (ISO 8601 format) */
  created_at: string;
  /** Product last update time (ISO 8601 format) */
  updated_at: string;
};

/**
 * Parsed attributes from ProductInfo.attributes JSON string
 */
export type ProductAttributes = {
  /** Product description */
  description?: string;
  /** Main product image URL */
  mainImage?: string;
  /** Additional product images */
  imageList?: string[];
  /** Other custom attributes */
  attributeJson?: Record<string, unknown>;
  /** Product SKUs with variants */
  skus?: ProductSku[];
};

/**
 * Product SKU definition
 */
export type ProductSku = {
  /** SKU name/identifier */
  skuName: string;
  /** SKU price */
  price: number;
  /** SKU original price */
  originalPrice: number;
  /** SKU image URL */
  imageUrl: string;
  /** SKU stock */
  stock: string;
  /** SKU specific attributes as JSON string */
  attributeJson: string;
};

export type ParsedProduct = Product & {
  /** Parsed attributes for easier access */
  parsedAttributes: ProductAttributes;
}