/**
 * Verticals Module
 *
 * Exports the vertical registry and all built-in vertical configurations.
 * Auto-registers built-in verticals when this module is imported.
 */

// Export registry types and functions
export * from "./registry";

// Export tshirt config
export { tshirtVerticalConfig, TSHIRT_CHAT_ANALYSIS_PROMPT } from "./tshirt/config";

// ============================================================================
// Auto-register built-in verticals
// ============================================================================
import { verticalRegistry } from "./registry";
import { tshirtVerticalConfig } from "./tshirt/config";

// Register tshirt vertical
verticalRegistry.register(tshirtVerticalConfig);
