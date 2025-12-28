/**
 * TshirtSpec
 * - 只表达「买家需求/RFQ草案」以及「后续与卖家agent协商所需的业务信息」
 * - 不承载对话进度、置信度、下一问、校验错误等交互态（这些应在 SessionMemory / GraphState 里）
 */
export interface TshirtSpec {
  meta: SpecMeta;
  intent?: TshirtIntent;

  /**
   * 面向流程的“决策开关”（业务事实，而非对话状态）：
   * 用来区分：
   * - unknown：尚未明确/尚未决策
   * - no：明确不需要（Graph 应停止追问该块）
   * - yes：明确需要（Graph 可进入该块的细节收集）
   */
  decisions?: TshirtDecisions;

  /**
   * 订单与数量：RFQ 最关键的输入之一。
   * - 总量/范围 + 颜色×尺码的拆分
   */
  order: TshirtOrder;

  /**
   * 基础款本体：版型/面料/克重/尺码体系/尺码表等。
   */
  product: TshirtProduct;

  /**
   * 定制与工艺：印花/刺绣/标签/包装等，会强影响可行性与报价。
   */
  customization?: TshirtCustomization;

  /**
   * 合规与质量要求：必须提前明确，避免后期返工。
   */
  compliance?: TshirtCompliance;
  quality?: TshirtQuality;

  /**
   * 物流与交期：目的地、条款、截止时间。
   */
  logistics?: TshirtLogistics;

  /**
   * 商务条款：价格目标、样衣、付款、MOQ容忍等（避免与 order/quality/logistics 重复）。
   */
  commercial?: TshirtCommercial;

  /**
   * 附件：图稿/参考图/尺码表/吊牌设计等。
   */
  attachments?: AttachmentRef[];

  /**
   * 任何无法结构化但对报价/打样重要的补充说明。
   */
  notes?: string;
}

export type ISODateTimeString = string; // e.g. "2025-12-25T12:34:56Z"
export type ISODateString = string; // e.g. "2025-12-25"
export type CurrencyCode = string; // e.g. "CNY" | "USD"
export type CountryCode = string; // e.g. ISO 3166-1 alpha-2 "CN" | "US"

export type YesNoUnknown = "yes" | "no" | "unknown";

export interface TshirtDecisions {
  /**
   * 是否存在任何“定制块”（印花/刺绣/标签/包装任一）
   */
  need_customization?: YesNoUnknown;
  /**
   * 是否有图案/Logo 工艺（印花/刺绣等）
   */
  need_decoration?: YesNoUnknown;
  /**
   * 是否需要自有品牌标签/吊牌/条码贴
   */
  need_labeling?: YesNoUnknown;
  /**
   * 是否需要定制包装（非仅普通OPP袋）
   */
  need_packaging_customization?: YesNoUnknown;
  /**
   * 是否有明确合规要求（目标市场/品类触发）
   */
  need_compliance?: YesNoUnknown;
  /**
   * 是否需要样衣/样品流程
   */
  need_sample?: YesNoUnknown;
  /**
   * 是否有明确预算/目标价（没有也可报价，只是区间更宽）
   */
  has_price_target?: YesNoUnknown;
}

export interface SpecMeta {
  spec_id: string;
  category: "tshirt";
  status: "draft" | "rfq_ready" | "negotiating" | "frozen";
  version: number;
  created_at: ISODateTimeString;
  last_updated_at: ISODateTimeString;
}

export interface TshirtIntent {
  use_case?:
    | "brand_merch"
    | "promotion"
    | "employee_uniform"
    | "resale"
    | "event"
    | "other";

  target_market?:
    | "domestic"
    | "north_america"
    | "europe"
    | "southeast_asia"
    | "global"
    | "unknown";

  target_audience?: {
    gender?: "male" | "female" | "unisex" | "unknown";
    age_range?: string; // e.g. "18-30"
  };

  style_preference?:
    | "minimal"
    | "streetwear"
    | "casual"
    | "business"
    | "unknown";

  brand_positioning?:
    | "low_end"
    | "mid_range"
    | "high_end"
    | "undecided";

  customization_depth?:
    | "none"
    | "light"
    | "deep"
    | "unknown";
}

/**
 * 订单：总量 + 变体拆分（颜色×尺码×数量）。
 * - 将数量相关信息集中在这里，避免在 constraints/commercial 多处重复。
 */
export interface TshirtOrder {
  quantity?: {
    exact?: number;
    range?: { min?: number; max?: number };
    unit?: "pcs" | "sets" | "unknown";
  };
  variants?: TshirtVariant[];
}

export interface TshirtVariant {
  base_color?: ColorSpec; // 衣身底色（不是印花色）
  size_breakdown?: Array<{ size: string; quantity: number }>;
  notes?: string;
}

export interface ColorSpec {
  name?: string; // e.g. "Black"
  pantone?: string; // e.g. "Pantone 19-4006 TCX"
  hex?: string;
}

export type GarmentCategory = "tshirt" | "polo" | "long_sleeve" | "hoodie" | "unknown";
export type FitType = "slim" | "regular" | "oversized" | "boxy" | "unknown";
export type NeckType = "crew" | "v_neck" | "polo" | "henley" | "unknown";
export type SleeveType = "short" | "long" | "sleeveless" | "unknown";

export interface TshirtProduct {
  category?: GarmentCategory;
  fit_type?: FitType;
  neck_type?: NeckType;
  sleeve_type?: SleeveType;

  fabric?: FabricSpec;
  sizing?: SizingSpec;
}

export interface FabricSpec {
  direction?: "cotton" | "polyester" | "blend" | "unknown";
  composition?: {
    cotton_pct?: number;
    polyester_pct?: number;
    other?: Array<{ name: string; pct?: number }>;
  };
  knit_type?: "single_jersey" | "pique" | "rib" | "interlock" | "unknown";
  weight_gsm?: number | { min?: number; max?: number };
  finish?: Array<
    "pre_shrunk"
    | "enzyme_wash"
    | "silicone_wash"
    | "anti_pilling"
    | "moisture_wicking"
    | "unknown"
  >;
}

export type SizeSystem = "asia" | "eu" | "us" | "uk" | "custom" | "unknown";

export interface SizingSpec {
  size_system?: SizeSystem;
  size_list?: string[]; // e.g. ["XS","S","M","L","XL"] or custom codes
  size_chart?: {
    unit?: "cm" | "inch" | "unknown";
    /**
     * measurements_by_size["M"]["chest"] = 52
     */
    measurements_by_size: Record<string, Record<string, number>>;
    tolerance?: { plus?: number; minus?: number };
  };
}

export type DecorationMethod =
  | "screen_print"
  | "dtg"
  | "heat_transfer"
  | "sublimation"
  | "embroidery"
  | "patch"
  | "woven_label"
  | "printed_label"
  | "unknown";

export type DecorationPlacement =
  | "left_chest"
  | "center_chest"
  | "full_front"
  | "upper_back"
  | "full_back"
  | "sleeve_left"
  | "sleeve_right"
  | "hem"
  | "neck_label"
  | "unknown";

export interface TshirtCustomization {
  /**
   * 是否需要定制（同 decisions.need_customization，放在块内便于卖家阅读）
   */
  required?: YesNoUnknown;
  decorations?: DecorationItem[];
  labeling?: LabelingSpec;
  packaging?: PackagingSpec;
  design_assets?: {
    provided_by_user?: boolean;
    needs_design_help?: boolean;
    preferred_file_types?: Array<"ai" | "psd" | "pdf" | "svg" | "png" | "jpg" | "unknown">;
  };
}

export interface DecorationItem {
  method?: DecorationMethod;
  placement?: DecorationPlacement;
  artwork_ref?: string; // points to AttachmentRef.uri or external id
  size_mm?: { width?: number; height?: number };
  color_count?: number;
  colors?: ColorSpec[];
  special_effect?: Array<
    "puff"
    | "glow"
    | "metallic"
    | "reflective"
    | "foil"
    | "high_density"
    | "unknown"
  >;
  notes?: string;
}

export interface LabelingSpec {
  main_label?: {
    required?: boolean | "unknown";
    type?: "woven" | "printed" | "heat_transfer" | "unknown";
    artwork_ref?: string;
    text?: string;
  };
  care_label?: {
    required?: boolean | "unknown";
    language?: string;
    artwork_ref?: string;
    text?: string;
  };
  hang_tag?: {
    required?: boolean | "unknown";
    artwork_ref?: string;
    text?: string;
  };
  barcode_sticker?: {
    required?: boolean | "unknown";
    standard?: "EAN13" | "UPC" | "CODE128" | "QR" | "unknown";
    placement?: "polybag" | "hangtag" | "garment" | "unknown";
  };
}

export interface PackagingSpec {
  individual_packaging?: {
    type?: "polybag" | "biodegradable_bag" | "paper_bag" | "none" | "unknown";
    suffocation_warning?: boolean | "unknown";
    extra_items?: Array<"silica_gel" | "hanger" | "size_sticker" | "unknown">;
  };
  folding?: "factory_fold" | "flat" | "unknown";
  carton?: {
    qty_per_carton?: number;
    carton_marking?: string;
  };
}

export interface TshirtCompliance {
  required?: YesNoUnknown;
  standards?: string[]; // e.g. ["OEKO-TEX", "CPSIA", "REACH", "GB 18401"]
  restricted_substances?: string[];
  documentation?: string[]; // e.g. ["test_report", "msds"]
}

export interface TshirtQuality {
  must_have?: string[];
  must_not_have?: string[];
  expectation?: "sample_required" | "mass_only" | "flexible" | "unknown";
}

export type Incoterm = "EXW" | "FOB" | "CIF" | "DDP" | "FCA" | "DAP" | "unknown";
export type ShippingMode = "sea" | "air" | "express" | "rail" | "truck" | "unknown";

export interface TshirtLogistics {
  incoterm?: Incoterm;
  shipping_mode?: ShippingMode;
  destination?: {
    country?: CountryCode;
    state_or_province?: string;
    city?: string;
    postal_code?: string;
    address_line1?: string;
    address_line2?: string;
  };
  timeline?: {
    need_by_date?: ISODateString;
    ship_by_date?: ISODateString;
    strictness?: "hard" | "soft" | "unknown";
    lead_time_days?: number;
  };
}

export interface TshirtCommercial {
  /**
   * 价格目标（不等于“硬约束”）：用于卖家agent初次给草案报价。
   */
  target_unit_price?: { amount?: number; currency?: CurrencyCode };
  max_unit_price?: { amount?: number; currency?: CurrencyCode };
  total_budget?: { amount?: number; currency?: CurrencyCode };

  moq_tolerance?: "strict" | "negotiable" | "unknown";

  sample?: {
    requirement?: "required" | "optional" | "not_needed" | "unknown";
    type?: "pp_sample" | "pre_production" | "size_set" | "photo_sample" | "unknown";
    quantity?: number;
    budget?: { amount: number; currency: CurrencyCode };
    lead_time_days?: number;
    notes?: string;
  };

  payment?: {
    model?: "deposit" | "full_payment" | "milestone" | "unknown";
    deposit_pct?: number;
    methods?: Array<"T/T" | "L/C" | "PayPal" | "AlibabaTradeAssurance" | "unknown">;
    notes?: string;
  };
}

export interface AttachmentRef {
  name?: string;
  uri: string;
  kind?: "artwork" | "tech_pack" | "reference_image" | "size_chart" | "label_design" | "other";
}