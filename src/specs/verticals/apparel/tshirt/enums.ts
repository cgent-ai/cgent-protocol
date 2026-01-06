/**
 * Tshirt-specific Enums
 * Enums and constants specific to the t-shirt vertical
 */

/**
 * Garment category
 */
export const GarmentCategory = {
  Tshirt: "tshirt",
  Polo: "polo",
  LongSleeve: "long_sleeve",
  Hoodie: "hoodie",
  Unknown: "unknown",
} as const;

export type GarmentCategory = (typeof GarmentCategory)[keyof typeof GarmentCategory];

/**
 * Fit type
 */
export const FitType = {
  Slim: "slim",
  Regular: "regular",
  Oversized: "oversized",
  Boxy: "boxy",
  Unknown: "unknown",
} as const;

export type FitType = (typeof FitType)[keyof typeof FitType];

/**
 * Neck type
 */
export const NeckType = {
  Crew: "crew",
  VNeck: "v_neck",
  Polo: "polo",
  Henley: "henley",
  Unknown: "unknown",
} as const;

export type NeckType = (typeof NeckType)[keyof typeof NeckType];

/**
 * Sleeve type
 */
export const SleeveType = {
  Short: "short",
  Long: "long",
  Sleeveless: "sleeveless",
  Unknown: "unknown",
} as const;

export type SleeveType = (typeof SleeveType)[keyof typeof SleeveType];

/**
 * Fabric direction/composition
 */
export const FabricDirection = {
  Cotton: "cotton",
  Polyester: "polyester",
  Blend: "blend",
  Unknown: "unknown",
} as const;

export type FabricDirection = (typeof FabricDirection)[keyof typeof FabricDirection];

/**
 * Knit type
 */
export const KnitType = {
  SingleJersey: "single_jersey",
  Pique: "pique",
  Rib: "rib",
  Interlock: "interlock",
  Unknown: "unknown",
} as const;

export type KnitType = (typeof KnitType)[keyof typeof KnitType];

/**
 * Fabric finish
 */
export const FabricFinish = {
  PreShrunk: "pre_shrunk",
  EnzymeWash: "enzyme_wash",
  SiliconeWash: "silicone_wash",
  AntiPilling: "anti_pilling",
  MoistureWicking: "moisture_wicking",
  Unknown: "unknown",
} as const;

export type FabricFinish = (typeof FabricFinish)[keyof typeof FabricFinish];

/**
 * Size system
 */
export const SizeSystem = {
  Asia: "asia",
  EU: "eu",
  US: "us",
  UK: "uk",
  Custom: "custom",
  Unknown: "unknown",
} as const;

export type SizeSystem = (typeof SizeSystem)[keyof typeof SizeSystem];

/**
 * Size unit
 */
export const SizeUnit = {
  Cm: "cm",
  Inch: "inch",
  Unknown: "unknown",
} as const;

export type SizeUnit = (typeof SizeUnit)[keyof typeof SizeUnit];

/**
 * Decoration method
 */
export const DecorationMethod = {
  ScreenPrint: "screen_print",
  DTG: "dtg",
  HeatTransfer: "heat_transfer",
  Sublimation: "sublimation",
  Embroidery: "embroidery",
  Patch: "patch",
  WovenLabel: "woven_label",
  PrintedLabel: "printed_label",
  Unknown: "unknown",
} as const;

export type DecorationMethod = (typeof DecorationMethod)[keyof typeof DecorationMethod];

/**
 * Decoration placement
 */
export const DecorationPlacement = {
  LeftChest: "left_chest",
  CenterChest: "center_chest",
  FullFront: "full_front",
  UpperBack: "upper_back",
  FullBack: "full_back",
  SleeveLeft: "sleeve_left",
  SleeveRight: "sleeve_right",
  Hem: "hem",
  NeckLabel: "neck_label",
  Unknown: "unknown",
} as const;

export type DecorationPlacement = (typeof DecorationPlacement)[keyof typeof DecorationPlacement];

/**
 * Special effect for decoration
 */
export const SpecialEffect = {
  Puff: "puff",
  Glow: "glow",
  Metallic: "metallic",
  Reflective: "reflective",
  Foil: "foil",
  HighDensity: "high_density",
  Unknown: "unknown",
} as const;

export type SpecialEffect = (typeof SpecialEffect)[keyof typeof SpecialEffect];

/**
 * Label type
 */
export const LabelType = {
  Woven: "woven",
  Printed: "printed",
  HeatTransfer: "heat_transfer",
  Unknown: "unknown",
} as const;

export type LabelType = (typeof LabelType)[keyof typeof LabelType];

/**
 * Barcode standard
 */
export const BarcodeStandard = {
  EAN13: "EAN13",
  UPC: "UPC",
  CODE128: "CODE128",
  QR: "QR",
  Unknown: "unknown",
} as const;

export type BarcodeStandard = (typeof BarcodeStandard)[keyof typeof BarcodeStandard];

/**
 * Barcode placement
 */
export const BarcodePlacement = {
  Polybag: "polybag",
  Hangtag: "hangtag",
  Garment: "garment",
  Unknown: "unknown",
} as const;

export type BarcodePlacement = (typeof BarcodePlacement)[keyof typeof BarcodePlacement];

/**
 * Packaging type
 */
export const PackagingType = {
  Polybag: "polybag",
  BiodegradableBag: "biodegradable_bag",
  PaperBag: "paper_bag",
  None: "none",
  Unknown: "unknown",
} as const;

export type PackagingType = (typeof PackagingType)[keyof typeof PackagingType];

/**
 * Packaging extra items
 */
export const PackagingExtraItem = {
  SilicaGel: "silica_gel",
  Hanger: "hanger",
  SizeSticker: "size_sticker",
  Unknown: "unknown",
} as const;

export type PackagingExtraItem = (typeof PackagingExtraItem)[keyof typeof PackagingExtraItem];

/**
 * Folding method
 */
export const FoldingMethod = {
  FactoryFold: "factory_fold",
  Flat: "flat",
  Unknown: "unknown",
} as const;

export type FoldingMethod = (typeof FoldingMethod)[keyof typeof FoldingMethod];

/**
 * Use case
 */
export const UseCase = {
  BrandMerch: "brand_merch",
  Promotion: "promotion",
  EmployeeUniform: "employee_uniform",
  Resale: "resale",
  Event: "event",
  Other: "other",
} as const;

export type UseCase = (typeof UseCase)[keyof typeof UseCase];

/**
 * Target market
 */
export const TargetMarket = {
  Domestic: "domestic",
  NorthAmerica: "north_america",
  Europe: "europe",
  SoutheastAsia: "southeast_asia",
  Global: "global",
  Unknown: "unknown",
} as const;

export type TargetMarket = (typeof TargetMarket)[keyof typeof TargetMarket];

/**
 * Gender
 */
export const Gender = {
  Male: "male",
  Female: "female",
  Unisex: "unisex",
  Unknown: "unknown",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

/**
 * Style preference
 */
export const StylePreference = {
  Minimal: "minimal",
  Streetwear: "streetwear",
  Casual: "casual",
  Business: "business",
  Unknown: "unknown",
} as const;

export type StylePreference = (typeof StylePreference)[keyof typeof StylePreference];

/**
 * Brand positioning
 */
export const BrandPositioning = {
  LowEnd: "low_end",
  MidRange: "mid_range",
  HighEnd: "high_end",
  Undecided: "undecided",
} as const;

export type BrandPositioning = (typeof BrandPositioning)[keyof typeof BrandPositioning];

/**
 * Customization depth
 */
export const CustomizationDepth = {
  None: "none",
  Light: "light",
  Deep: "deep",
  Unknown: "unknown",
} as const;

export type CustomizationDepth = (typeof CustomizationDepth)[keyof typeof CustomizationDepth];

/**
 * File type for design assets
 */
export const DesignFileType = {
  AI: "ai",
  PSD: "psd",
  PDF: "pdf",
  SVG: "svg",
  PNG: "png",
  JPG: "jpg",
  Unknown: "unknown",
} as const;

export type DesignFileType = (typeof DesignFileType)[keyof typeof DesignFileType];

/**
 * Quantity unit
 */
export const QuantityUnit = {
  Pcs: "pcs",
  Sets: "sets",
  Unknown: "unknown",
} as const;

export type QuantityUnit = (typeof QuantityUnit)[keyof typeof QuantityUnit];

/**
 * Quality expectation
 */
export const QualityExpectation = {
  SampleRequired: "sample_required",
  MassOnly: "mass_only",
  Flexible: "flexible",
  Unknown: "unknown",
} as const;

export type QualityExpectation = (typeof QualityExpectation)[keyof typeof QualityExpectation];

/**
 * Sample type
 */
export const SampleType = {
  PPSample: "pp_sample",
  PreProduction: "pre_production",
  SizeSet: "size_set",
  PhotoSample: "photo_sample",
  Unknown: "unknown",
} as const;

export type SampleType = (typeof SampleType)[keyof typeof SampleType];

/**
 * Sample requirement
 */
export const SampleRequirement = {
  Required: "required",
  Optional: "optional",
  NotNeeded: "not_needed",
  Unknown: "unknown",
} as const;

export type SampleRequirement = (typeof SampleRequirement)[keyof typeof SampleRequirement];

/**
 * Payment model
 */
export const PaymentModel = {
  Deposit: "deposit",
  FullPayment: "full_payment",
  Milestone: "milestone",
  Unknown: "unknown",
} as const;

export type PaymentModel = (typeof PaymentModel)[keyof typeof PaymentModel];

/**
 * Payment method
 */
export const PaymentMethod = {
  TT: "T/T",
  LC: "L/C",
  PayPal: "PayPal",
  AlibabaTradeAssurance: "AlibabaTradeAssurance",
  Unknown: "unknown",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

/**
 * MOQ tolerance
 */
export const MOQTolerance = {
  Strict: "strict",
  Negotiable: "negotiable",
  Unknown: "unknown",
} as const;

export type MOQTolerance = (typeof MOQTolerance)[keyof typeof MOQTolerance];

/**
 * Timeline strictness
 */
export const TimelineStrictness = {
  Hard: "hard",
  Soft: "soft",
  Unknown: "unknown",
} as const;

export type TimelineStrictness = (typeof TimelineStrictness)[keyof typeof TimelineStrictness];

/**
 * Spec status
 */
export const SpecStatus = {
  Draft: "draft",
  RFQReady: "rfq_ready",
  Negotiating: "negotiating",
  Frozen: "frozen",
} as const;

export type SpecStatus = (typeof SpecStatus)[keyof typeof SpecStatus];
