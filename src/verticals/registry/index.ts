/**
 * Vertical Registry
 *
 * A singleton registry for managing vertical configurations.
 * Allows registration and lookup of vertical-specific configs
 * for multi-vertical support.
 */

import type { SpecCategory } from "../../specs/common";
import type { VerticalConfig } from "./types";

/**
 * Vertical Registry class
 *
 * Manages registration and lookup of vertical configurations.
 */
class VerticalRegistry {
  private configs = new Map<SpecCategory, VerticalConfig>();

  /**
   * Register a vertical configuration
   * @param config - The vertical config to register
   */
  register<T extends VerticalConfig>(config: T): void {
    if (this.configs.has(config.category)) {
      console.warn(
        `[VerticalRegistry] Overwriting existing config for category: ${config.category}`
      );
    }
    this.configs.set(config.category, config);
  }

  /**
   * Get a vertical configuration by category
   * @param category - The spec category
   * @returns The vertical config or undefined if not found
   */
  get(category: SpecCategory): VerticalConfig | undefined {
    return this.configs.get(category);
  }

  /**
   * Get all registered vertical configurations
   * @returns Array of all registered configs
   */
  getAll(): VerticalConfig[] {
    return Array.from(this.configs.values());
  }

  /**
   * Check if a category is registered
   * @param category - The spec category
   * @returns true if registered
   */
  has(category: SpecCategory): boolean {
    return this.configs.has(category);
  }

  /**
   * Get all registered categories
   * @returns Array of all registered category names
   */
  getCategories(): SpecCategory[] {
    return Array.from(this.configs.keys());
  }

  /**
   * Unregister a vertical configuration
   * @param category - The spec category to unregister
   * @returns true if the config was removed
   */
  unregister(category: SpecCategory): boolean {
    return this.configs.delete(category);
  }

  /**
   * Clear all registered configurations
   */
  clear(): void {
    this.configs.clear();
  }
}

/**
 * Global vertical registry instance
 */
export const verticalRegistry = new VerticalRegistry();

/**
 * Get vertical configuration by category
 *
 * Convenience function for accessing the global registry.
 *
 * @param category - The spec category
 * @returns The vertical config or undefined
 *
 * @example
 * ```typescript
 * const config = getVerticalConfig("tshirt");
 * if (config) {
 *   console.log(config.displayName); // "Custom T-shirts"
 * }
 * ```
 */
export function getVerticalConfig(
  category: SpecCategory
): VerticalConfig | undefined {
  return verticalRegistry.get(category);
}

/**
 * Get all registered vertical configurations
 *
 * @returns Array of all registered configs
 */
export function getAllVerticals(): VerticalConfig[] {
  return verticalRegistry.getAll();
}

/**
 * Check if a vertical is registered
 *
 * @param category - The spec category
 * @returns true if the vertical is registered
 */
export function hasVertical(category: SpecCategory): boolean {
  return verticalRegistry.has(category);
}

// Re-export types
export * from "./types";
