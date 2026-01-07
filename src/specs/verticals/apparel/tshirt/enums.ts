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
 * GarmentCategory values array for Zod enum schemas
 */
export const GarmentCategoryValues = Object.values(GarmentCategory) as [string, ...string[]];

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
 * FitType values array for Zod enum schemas
 */
export const FitTypeValues = Object.values(FitType) as [string, ...string[]];

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
 * NeckType values array for Zod enum schemas
 */
export const NeckTypeValues = Object.values(NeckType) as [string, ...string[]];

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
 * SleeveType values array for Zod enum schemas
 */
export const SleeveTypeValues = Object.values(SleeveType) as [string, ...string[]];

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
 * FabricDirection values array for Zod enum schemas
 */
export const FabricDirectionValues = Object.values(FabricDirection) as [string, ...string[]];

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
 * KnitType values array for Zod enum schemas
 */
export const KnitTypeValues = Object.values(KnitType) as [string, ...string[]];

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
 * FabricFinish values array for Zod enum schemas
 */
export const FabricFinishValues = Object.values(FabricFinish) as [string, ...string[]];

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
 * SizeSystem values array for Zod enum schemas
 */
export const SizeSystemValues = Object.values(SizeSystem) as [string, ...string[]];

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
 * SizeUnit values array for Zod enum schemas
 */
export const SizeUnitValues = Object.values(SizeUnit) as [string, ...string[]];

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
 * DecorationMethod values array for Zod enum schemas
 */
export const DecorationMethodValues = Object.values(DecorationMethod) as [string, ...string[]];

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
 * DecorationPlacement values array for Zod enum schemas
 */
export const DecorationPlacementValues = Object.values(DecorationPlacement) as [string, ...string[]];

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
 * SpecialEffect values array for Zod enum schemas
 */
export const SpecialEffectValues = Object.values(SpecialEffect) as [string, ...string[]];

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
 * LabelType values array for Zod enum schemas
 */
export const LabelTypeValues = Object.values(LabelType) as [string, ...string[]];

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
 * BarcodeStandard values array for Zod enum schemas
 */
export const BarcodeStandardValues = Object.values(BarcodeStandard) as [string, ...string[]];

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
 * BarcodePlacement values array for Zod enum schemas
 */
export const BarcodePlacementValues = Object.values(BarcodePlacement) as [string, ...string[]];

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
 * PackagingType values array for Zod enum schemas
 */
export const PackagingTypeValues = Object.values(PackagingType) as [string, ...string[]];

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
 * PackagingExtraItem values array for Zod enum schemas
 */
export const PackagingExtraItemValues = Object.values(PackagingExtraItem) as [string, ...string[]];

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
 * FoldingMethod values array for Zod enum schemas
 */
export const FoldingMethodValues = Object.values(FoldingMethod) as [string, ...string[]];

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
 * UseCase values array for Zod enum schemas
 */
export const UseCaseValues = Object.values(UseCase) as [string, ...string[]];

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
 * TargetMarket values array for Zod enum schemas
 */
export const TargetMarketValues = Object.values(TargetMarket) as [string, ...string[]];

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
 * Gender values array for Zod enum schemas
 */
export const GenderValues = Object.values(Gender) as [string, ...string[]];

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
 * StylePreference values array for Zod enum schemas
 */
export const StylePreferenceValues = Object.values(StylePreference) as [string, ...string[]];

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
 * BrandPositioning values array for Zod enum schemas
 */
export const BrandPositioningValues = Object.values(BrandPositioning) as [string, ...string[]];

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
 * CustomizationDepth values array for Zod enum schemas
 */
export const CustomizationDepthValues = Object.values(CustomizationDepth) as [string, ...string[]];

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
 * DesignFileType values array for Zod enum schemas
 */
export const DesignFileTypeValues = Object.values(DesignFileType) as [string, ...string[]];

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
 * QuantityUnit values array for Zod enum schemas
 */
export const QuantityUnitValues = Object.values(QuantityUnit) as [string, ...string[]];

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
 * QualityExpectation values array for Zod enum schemas
 */
export const QualityExpectationValues = Object.values(QualityExpectation) as [string, ...string[]];

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
 * SampleType values array for Zod enum schemas
 */
export const SampleTypeValues = Object.values(SampleType) as [string, ...string[]];

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
 * SampleRequirement values array for Zod enum schemas
 */
export const SampleRequirementValues = Object.values(SampleRequirement) as [string, ...string[]];

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
 * PaymentModel values array for Zod enum schemas
 */
export const PaymentModelValues = Object.values(PaymentModel) as [string, ...string[]];

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
 * PaymentMethod values array for Zod enum schemas
 */
export const PaymentMethodValues = Object.values(PaymentMethod) as [string, ...string[]];

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
 * MOQTolerance values array for Zod enum schemas
 */
export const MOQToleranceValues = Object.values(MOQTolerance) as [string, ...string[]];

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
 * TimelineStrictness values array for Zod enum schemas
 */
export const TimelineStrictnessValues = Object.values(TimelineStrictness) as [string, ...string[]];

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

/**
 * SpecStatus values array for Zod enum schemas
 */
export const SpecStatusValues = Object.values(SpecStatus) as [string, ...string[]];
