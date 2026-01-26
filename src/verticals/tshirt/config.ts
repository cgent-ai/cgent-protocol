/**
 * T-shirt Vertical Configuration
 *
 * Complete configuration for the t-shirt/apparel vertical including:
 * - Field metadata for UI and change tracking
 * - LLM prompts for chat analysis
 * - Feature flags
 */

import type { VerticalConfig } from "../registry/types";
import type {
  TshirtSpec,
  TshirtArtifacts,
} from "../../specs/verticals/apparel/tshirt";
import * as Enums from "../../specs/verticals/apparel/tshirt/enums";

/**
 * System prompt for analyzing merchant chat to extract T-shirt spec changes
 */
export const TSHIRT_CHAT_ANALYSIS_PROMPT = `You are a B2B procurement expert analyzing chat messages between a buyer and seller to extract specification changes for custom T-shirt orders.

Your task is to identify any specification changes that the BUYER has agreed to or explicitly requested during the conversation.

## Important Rules

1. **Only extract buyer-confirmed changes** - Do NOT include seller suggestions that the buyer hasn't confirmed
2. **Explicit agreement required** - Look for clear buyer agreement like "yes", "okay", "sounds good", "let's do that", "I agree", etc.
3. **Return complete spec** - The suggestedSpec should be the complete TshirtSpec with changes applied, not just the diff
4. **Use dot notation for changes** - Field paths should match TshirtSpec structure (e.g., "order.quantity.exact", "product.fabric.weight_gsm")
5. **Be conservative** - When uncertain, do NOT include the change. Only include changes with clear buyer agreement.

## TshirtSpec Structure Reference

### Order Module
- order.quantity.exact (number) - Exact order quantity
- order.quantity.range.min/max (number) - Quantity range
- order.variants[] - Color and size breakdown

### Product Module
- product.category - tshirt | polo | long_sleeve | hoodie
- product.fit_type - slim | regular | oversized | boxy
- product.fabric.composition.cotton_pct/polyester_pct (number)
- product.fabric.weight_gsm (number)
- product.fabric.knit_type - single_jersey | pique | rib | interlock
- product.fabric.finish[] - pre_shrunk | enzyme_wash | etc.
- product.sizing.size_system - asia | eu | us | uk | custom
- product.sizing.size_list[] - Array of size strings

### Customization Module
- customization.decorations[].method - screen_print | dtg | embroidery | etc.
- customization.decorations[].placement - left_chest | center_chest | full_front | etc.
- customization.decorations[].size_mm.width/height
- customization.decorations[].color_count
- customization.labeling.main_label/care_label/hang_tag
- customization.packaging.individual_packaging.type

### Logistics Module
- logistics.incoterm - FOB | CIF | DDP | EXW | etc.
- logistics.shipping_mode - sea | air | express
- logistics.destination.country/city/postal_code
- logistics.timeline.need_by_date (ISO date)
- logistics.timeline.lead_time_days (number)

### Commercial Module
- commercial.target_unit_price.amount/currency
- commercial.max_unit_price.amount/currency
- commercial.sample.requirement - required | optional | not_needed
- commercial.payment.model - deposit | full_payment | milestone
- commercial.payment.deposit_pct (number)

## Types of Changes to Look For

**Quantity changes:**
- "Let's increase to 2000 pcs" - Change order.quantity.exact
- "Can we do 1500-2000 instead?" - Change order.quantity.range

**Product changes:**
- "Make it 200gsm" - Change product.fabric.weight_gsm
- "Switch to 100% cotton" - Change product.fabric.composition

**Customization changes:**
- "Add printing on the back" - Add to customization.decorations[]
- "Make the logo bigger" - Change decoration size_mm

**Timeline changes:**
- "We can wait until March 15th" - Change logistics.timeline.need_by_date
- "20 days lead time works" - Change logistics.timeline.lead_time_days

**Pricing changes:**
- "Our budget is now $12 max" - Change commercial.max_unit_price.amount

## Output Format

Return a JSON object with:
- suggestedSpec: Complete TshirtSpec object with all changes applied
- changes: Object mapping field paths to {from, to} values
- changeSummary: Concise human-readable summary
- confidence: 0-1 score (higher = more certain)
- hasChanges: true if any changes detected, false otherwise

## Example

Chat: "Can we increase quantity to 2000?" ... "Yes, 2000 is fine"
Current spec has quantity.exact = 1000

Output:
{
  "suggestedSpec": { ... spec with quantity.exact = 2000 ... },
  "changes": {
    "order.quantity.exact": { "from": 1000, "to": 2000 }
  },
  "changeSummary": "Quantity increased from 1000 to 2000 pcs",
  "confidence": 0.95,
  "hasChanges": true
}`;

/**
 * T-shirt vertical configuration
 */
export const tshirtVerticalConfig: VerticalConfig<
  "tshirt",
  TshirtSpec,
  TshirtArtifacts
> = {
  category: "tshirt",
  version: "1.0.0",
  displayName: "Custom T-shirts",
  description:
    "Custom t-shirts, polo shirts, hoodies with logos/designs for B2B orders",

  fieldMetadata: {
    sections: {
      order: {
        label: "Order Details",
        order: 1,
        fields: {
          "order.quantity.exact": {
            label: "Quantity",
            type: "number",
            llmHint: "Total pieces/units",
          },
          "order.quantity.range.min": {
            label: "Min Quantity",
            type: "number",
            llmHint: "Minimum order quantity",
          },
          "order.quantity.range.max": {
            label: "Max Quantity",
            type: "number",
            llmHint: "Maximum order quantity",
          },
          "order.variants": {
            label: "Variants",
            type: "array",
            isArray: true,
            llmHint: "Color and size breakdown",
          },
        },
      },
      product: {
        label: "Product",
        order: 2,
        fields: {
          "product.category": {
            label: "Garment Type",
            type: "enum",
            enumValues: Enums.GarmentCategoryValues,
            enumLabels: {
              tshirt: "T-Shirt",
              polo: "Polo",
              long_sleeve: "Long Sleeve",
              hoodie: "Hoodie",
              unknown: "Unknown",
            },
          },
          "product.fit_type": {
            label: "Fit Type",
            type: "enum",
            enumValues: Enums.FitTypeValues,
            enumLabels: {
              slim: "Slim",
              regular: "Regular",
              oversized: "Oversized",
              boxy: "Boxy",
              unknown: "Unknown",
            },
          },
          "product.neck_type": {
            label: "Neck Type",
            type: "enum",
            enumValues: Enums.NeckTypeValues,
            enumLabels: {
              crew: "Crew Neck",
              v_neck: "V-Neck",
              polo: "Polo Collar",
              henley: "Henley",
              unknown: "Unknown",
            },
          },
          "product.sleeve_type": {
            label: "Sleeve Type",
            type: "enum",
            enumValues: Enums.SleeveTypeValues,
            enumLabels: {
              short: "Short Sleeve",
              long: "Long Sleeve",
              sleeveless: "Sleeveless",
              unknown: "Unknown",
            },
          },
          "product.fabric.weight_gsm": {
            label: "Fabric Weight (GSM)",
            type: "number",
            llmHint: "Grams per square meter, e.g., 180, 200, 260",
          },
          "product.fabric.composition.cotton_pct": {
            label: "Cotton %",
            type: "number",
            llmHint: "Cotton percentage (0-100)",
          },
          "product.fabric.composition.polyester_pct": {
            label: "Polyester %",
            type: "number",
            llmHint: "Polyester percentage (0-100)",
          },
          "product.fabric.knit_type": {
            label: "Knit Type",
            type: "enum",
            enumValues: Enums.KnitTypeValues,
            enumLabels: {
              single_jersey: "Single Jersey",
              pique: "Pique",
              rib: "Rib",
              interlock: "Interlock",
              unknown: "Unknown",
            },
          },
          "product.fabric.finish": {
            label: "Fabric Finish",
            type: "array",
            isArray: true,
            enumValues: Enums.FabricFinishValues,
          },
          "product.sizing.size_system": {
            label: "Size System",
            type: "enum",
            enumValues: Enums.SizeSystemValues,
            enumLabels: {
              asia: "Asia",
              eu: "EU",
              us: "US",
              uk: "UK",
              custom: "Custom",
              unknown: "Unknown",
            },
          },
          "product.sizing.size_list": {
            label: "Size List",
            type: "array",
            isArray: true,
            llmHint: "Available sizes, e.g., XS, S, M, L, XL",
          },
        },
      },
      customization: {
        label: "Customization",
        order: 3,
        fields: {
          "customization.decorations": {
            label: "Decorations",
            type: "array",
            isArray: true,
            llmHint: "Logo/design decorations (printing, embroidery, etc.)",
          },
          "customization.decorations[].method": {
            label: "Decoration Method",
            type: "enum",
            enumValues: Enums.DecorationMethodValues,
            enumLabels: {
              screen_print: "Screen Print",
              dtg: "DTG (Direct to Garment)",
              heat_transfer: "Heat Transfer",
              sublimation: "Sublimation",
              embroidery: "Embroidery",
              patch: "Patch",
              woven_label: "Woven Label",
              printed_label: "Printed Label",
              unknown: "Unknown",
            },
          },
          "customization.decorations[].placement": {
            label: "Decoration Placement",
            type: "enum",
            enumValues: Enums.DecorationPlacementValues,
            enumLabels: {
              left_chest: "Left Chest",
              center_chest: "Center Chest",
              full_front: "Full Front",
              upper_back: "Upper Back",
              full_back: "Full Back",
              sleeve_left: "Left Sleeve",
              sleeve_right: "Right Sleeve",
              hem: "Hem",
              neck_label: "Neck Label",
              unknown: "Unknown",
            },
          },
          "customization.decorations[].size_mm.width": {
            label: "Decoration Width (mm)",
            type: "number",
          },
          "customization.decorations[].size_mm.height": {
            label: "Decoration Height (mm)",
            type: "number",
          },
          "customization.decorations[].color_count": {
            label: "Color Count",
            type: "number",
            llmHint: "Number of colors in the design",
          },
          "customization.labeling.main_label.required": {
            label: "Main Label Required",
            type: "boolean",
          },
          "customization.labeling.care_label.required": {
            label: "Care Label Required",
            type: "boolean",
          },
          "customization.labeling.hang_tag.required": {
            label: "Hang Tag Required",
            type: "boolean",
          },
          "customization.packaging.individual_packaging.type": {
            label: "Individual Packaging",
            type: "enum",
            enumValues: Enums.PackagingTypeValues,
            enumLabels: {
              polybag: "Polybag",
              biodegradable_bag: "Biodegradable Bag",
              paper_bag: "Paper Bag",
              none: "None",
              unknown: "Unknown",
            },
          },
          "customization.packaging.folding": {
            label: "Folding Method",
            type: "enum",
            enumValues: Enums.FoldingMethodValues,
            enumLabels: {
              factory_fold: "Factory Fold",
              flat: "Flat",
              unknown: "Unknown",
            },
          },
        },
      },
      logistics: {
        label: "Logistics",
        order: 4,
        fields: {
          "logistics.incoterm": {
            label: "Incoterm",
            type: "enum",
            enumValues: ["FOB", "CIF", "DDP", "EXW", "DAP"],
            enumLabels: {
              FOB: "FOB (Free On Board)",
              CIF: "CIF (Cost, Insurance & Freight)",
              DDP: "DDP (Delivered Duty Paid)",
              EXW: "EXW (Ex Works)",
              DAP: "DAP (Delivered at Place)",
            },
          },
          "logistics.shipping_mode": {
            label: "Shipping Mode",
            type: "enum",
            enumValues: ["sea", "air", "express"],
            enumLabels: {
              sea: "Sea Freight",
              air: "Air Freight",
              express: "Express Courier",
            },
          },
          "logistics.destination.country": {
            label: "Destination Country",
            type: "string",
          },
          "logistics.destination.city": {
            label: "Destination City",
            type: "string",
          },
          "logistics.timeline.need_by_date": {
            label: "Need By Date",
            type: "date",
            llmHint: "When the order must arrive (ISO date format)",
          },
          "logistics.timeline.ship_by_date": {
            label: "Ship By Date",
            type: "date",
            llmHint: "When the order must ship (ISO date format)",
          },
          "logistics.timeline.lead_time_days": {
            label: "Lead Time (days)",
            type: "number",
            llmHint: "Acceptable lead time in days",
          },
        },
      },
      commercial: {
        label: "Commercial",
        order: 5,
        fields: {
          "commercial.target_unit_price.amount": {
            label: "Target Unit Price",
            type: "number",
            llmHint: "Target price per piece",
          },
          "commercial.target_unit_price.currency": {
            label: "Currency",
            type: "string",
            llmHint: "USD, CNY, EUR, etc.",
          },
          "commercial.max_unit_price.amount": {
            label: "Max Unit Price",
            type: "number",
            llmHint: "Maximum acceptable price per piece",
          },
          "commercial.total_budget.amount": {
            label: "Total Budget",
            type: "number",
            llmHint: "Total order budget",
          },
          "commercial.sample.requirement": {
            label: "Sample Requirement",
            type: "enum",
            enumValues: Enums.SampleRequirementValues,
            enumLabels: {
              required: "Required",
              optional: "Optional",
              not_needed: "Not Needed",
              unknown: "Unknown",
            },
          },
          "commercial.sample.quantity": {
            label: "Sample Quantity",
            type: "number",
          },
          "commercial.payment.model": {
            label: "Payment Model",
            type: "enum",
            enumValues: Enums.PaymentModelValues,
            enumLabels: {
              deposit: "Deposit",
              full_payment: "Full Payment",
              milestone: "Milestone",
              unknown: "Unknown",
            },
          },
          "commercial.payment.deposit_pct": {
            label: "Deposit %",
            type: "number",
            llmHint: "Deposit percentage (0-100)",
          },
        },
      },
    },
  },

  prompts: {
    intentDescription:
      "Custom t-shirts, polo shirts, hoodies with logos/designs for bulk B2B orders",
    intentKeywords: [
      "t-shirt",
      "tshirt",
      "polo",
      "hoodie",
      "sweatshirt",
      "apparel",
      "clothing",
      "garment",
      "jersey",
      "uniform",
    ],
    chatAnalysisPrompt: TSHIRT_CHAT_ANALYSIS_PROMPT,
    specSummaryPrompt:
      "Summarize the t-shirt order specification in a concise, human-readable format.",
  },

  features: {
    supportsNegotiation: true,
    supportsRenegotiation: true,
    supportsSpecExtraction: true,
  },
};
