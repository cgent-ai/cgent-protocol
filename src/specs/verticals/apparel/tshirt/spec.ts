/**
 * TshirtSpec
 * - 只表达「买家需求/RFQ草案」以及「后续与卖家agent协商所需的业务信息」
 * - 不承载对话进度、置信度、下一问、校验错误等交互态（这些应在 SessionMemory / GraphState 里）
 */

import {
  ISODateTimeString,
  ISODateString,
  Currency,
  Country,
  YesNoUnknown,
  Incoterm,
  ShippingMode,
  AttachmentRef,
} from "../../../common";

import {
  GarmentCategory,
  FitType,
  NeckType,
  SleeveType,
  FabricDirection,
  KnitType,
  FabricFinish,
  SizeSystem,
  SizeUnit,
  DecorationMethod,
  DecorationPlacement,
  SpecialEffect,
  LabelType,
  BarcodeStandard,
  BarcodePlacement,
  PackagingType,
  PackagingExtraItem,
  FoldingMethod,
  UseCase,
  TargetMarket,
  Gender,
  StylePreference,
  BrandPositioning,
  CustomizationDepth,
  DesignFileType,
  QuantityUnit,
  QualityExpectation,
  SampleType,
  SampleRequirement,
  PaymentModel,
  PaymentMethod,
  MOQTolerance,
  TimelineStrictness,
  SpecStatus,
} from "./enums";

export interface TshirtSpec {
  meta: SpecMeta;
  intent?: TshirtIntent;

  /**
   * 面向流程的"决策开关"（业务事实，而非对话状态）：
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

export interface TshirtDecisions {
  /**
   * 是否存在任何"定制块"（印花/刺绣/标签/包装任一）
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
  status: SpecStatus;
  version: number;
  created_at: ISODateTimeString;
  last_updated_at: ISODateTimeString;
}

export interface TshirtIntent {
  use_case?: UseCase;
  target_market?: TargetMarket;
  target_audience?: {
    gender?: Gender;
    age_range?: string; // e.g. "18-30"
  };
  style_preference?: StylePreference;
  brand_positioning?: BrandPositioning;
  customization_depth?: CustomizationDepth;
}

/**
 * 订单：总量 + 变体拆分（颜色×尺码×数量）。
 * - 将数量相关信息集中在这里，避免在 constraints/commercial 多处重复。
 */
export interface TshirtOrder {
  quantity?: {
    exact?: number;
    range?: { min?: number; max?: number };
    unit?: QuantityUnit;
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

export interface TshirtProduct {
  category?: GarmentCategory;
  fit_type?: FitType;
  neck_type?: NeckType;
  sleeve_type?: SleeveType;
  fabric?: FabricSpec;
  sizing?: SizingSpec;
}

export interface FabricSpec {
  direction?: FabricDirection;
  composition?: {
    cotton_pct?: number;
    polyester_pct?: number;
    other?: Array<{ name: string; pct?: number }>;
  };
  knit_type?: KnitType;
  weight_gsm?: number | { min?: number; max?: number };
  finish?: Array<FabricFinish>;
}

export interface SizingSpec {
  size_system?: SizeSystem;
  size_list?: string[]; // e.g. ["XS","S","M","L","XL"] or custom codes
  size_chart?: {
    unit?: SizeUnit;
    /**
     * measurements_by_size["M"]["chest"] = 52
     */
    measurements_by_size: Record<string, Record<string, number>>;
    tolerance?: { plus?: number; minus?: number };
  };
}

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
    preferred_file_types?: Array<DesignFileType>;
  };
}

export interface DecorationItem {
  method?: DecorationMethod;
  placement?: DecorationPlacement;
  artwork_ref?: string; // points to AttachmentRef.uri or external id
  artwork_url?: string; // direct URL to the artwork/logo image
  size_mm?: { width?: number; height?: number };
  color_count?: number;
  colors?: ColorSpec[];
  special_effect?: Array<SpecialEffect>;
  notes?: string;
}

export interface LabelingSpec {
  main_label?: {
    required?: boolean | "unknown";
    type?: LabelType;
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
    standard?: BarcodeStandard;
    placement?: BarcodePlacement;
  };
}

export interface PackagingSpec {
  individual_packaging?: {
    type?: PackagingType;
    suffocation_warning?: boolean | "unknown";
    extra_items?: Array<PackagingExtraItem>;
  };
  folding?: FoldingMethod;
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
  expectation?: QualityExpectation;
}

export interface TshirtLogistics {
  incoterm?: Incoterm;
  shipping_mode?: ShippingMode;
  destination?: {
    country?: Country;
    state_or_province?: string;
    city?: string;
    postal_code?: string;
    address_line1?: string;
    address_line2?: string;
  };
  timeline?: {
    need_by_date?: ISODateString;
    ship_by_date?: ISODateString;
    strictness?: TimelineStrictness;
    lead_time_days?: number;
  };
}

export interface TshirtCommercial {
  /**
   * 价格目标（不等于"硬约束"）：用于卖家agent初次给草案报价。
   */
  target_unit_price?: { amount?: number; currency?: Currency };
  max_unit_price?: { amount?: number; currency?: Currency };
  total_budget?: { amount?: number; currency?: Currency };

  moq_tolerance?: MOQTolerance;

  sample?: {
    requirement?: SampleRequirement;
    type?: SampleType;
    quantity?: number;
    budget?: { amount: number; currency: Currency };
    lead_time_days?: number;
    notes?: string;
  };

  payment?: {
    model?: PaymentModel;
    deposit_pct?: number;
    methods?: Array<PaymentMethod>;
    notes?: string;
  };
}

