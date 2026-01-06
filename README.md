# Cgent.AI Commerce Protocol

[![npm version](https://img.shields.io/npm/v/@cgentai/cgent-protocol.svg)](https://www.npmjs.com/package/@cgentai/cgent-protocol)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TypeScript type definitions and protocol specifications for Cgent.AI's Agent-to-Agent (A2A) commerce platform, supporting B2B custom procurement workflows.

## Overview

This package provides **protocol-layer types only** – no runtime validation or business logic. It defines:

- **Specs**: Buyer requirements (RFQ drafts) for various product verticals
- **Artifacts**: Seller responses (feasibility, estimates, draft offers)
- **Common types**: Shared primitives, enums, and trade terms across verticals
- **Enums**: Runtime constants for use in UI, validation, and business logic

**Note**: Runtime schema validation (e.g., Zod, Joi) should be implemented in host applications, not in this protocol package.

## Installation

```bash
npm install @cgentai/cgent-protocol
# or
pnpm add @cgentai/cgent-protocol
# or
yarn add @cgentai/cgent-protocol
```

**Requirements**: Node.js >=20.0.0

## Quick Start

### Basic Import

```typescript
import {
  TshirtSpec,
  TshirtArtifacts,
  SpecCategory,
  SpecStatus,
  FitType,
  YesNoUnknown,
  Currency,
  Country,
} from '@cgentai/cgent-protocol';

// Create a minimal spec
const spec: TshirtSpec = {
  meta: {
    spec_id: "rfq-20250106-001",
    category: "tshirt",
    status: SpecStatus.Draft,
    version: 1,
    created_at: new Date().toISOString(),
    last_updated_at: new Date().toISOString(),
  },
  order: {
    quantity: {
      exact: 1000,
      unit: "pcs",
    },
  },
  product: {
    category: "tshirt",
    fit_type: FitType.Regular, // Using enum constant
    fabric: {
      direction: "cotton",
      weight_gsm: 180,
    },
  },
};
```

### Subpath Imports

For more granular imports, use subpath exports:

```typescript
// Common types and enums
import { YesNoUnknown, Incoterm, Currency, Country, AttachmentRef } from '@cgentai/cgent-protocol/specs/common';

// Tshirt vertical (all exports)
import { TshirtSpec, TshirtArtifacts } from '@cgentai/cgent-protocol/specs/verticals/apparel/tshirt';

// Tshirt enums only
import { FitType, NeckType, DecorationMethod } from '@cgentai/cgent-protocol/specs/verticals/apparel/tshirt/enums';

// Order and product types
import { Order, Product } from '@cgentai/cgent-protocol/types';
```

## Enum Usage Convention

All enums follow a dual-export pattern for both runtime and type-level usage:

```typescript
// Definition (in the package)
export const FitType = {
  Slim: "slim",
  Regular: "regular",
  Oversized: "oversized",
  Boxy: "boxy",
  Unknown: "unknown",
} as const;

export type FitType = (typeof FitType)[keyof typeof FitType];

// Usage in your code
import { FitType } from '@cgentai/cgent-protocol';

// Runtime constant (for switch/case, UI dropdowns, etc.)
const fitType = FitType.Slim; // "slim"
console.log(Object.values(FitType)); // ["slim", "regular", "oversized", "boxy", "unknown"]

// Type annotation
function processFit(fit: FitType) {
  switch (fit) {
    case FitType.Slim:
      // ...
      break;
    case FitType.Regular:
      // ...
      break;
  }
}
```

**Benefits**:
- ✅ Type-safe at compile time
- ✅ Runtime constants available for business logic
- ✅ Enumerable for UI rendering or validation
- ✅ Single source of truth

## Key Concepts

### Specs vs Artifacts

- **Specs** (e.g., `TshirtSpec`): Buyer requirements and RFQ drafts collected by buyer agents
- **Artifacts** (e.g., `TshirtArtifacts`): Seller responses including feasibility reports, estimates, and draft offers

### Vertical Organization

```
specs/
├── common/              # Shared across all verticals
│   ├── primitives      # ISO dates, currency codes, country codes
│   ├── enums           # YesNoUnknown, SpecCategory
│   ├── trade           # Incoterm, ShippingMode
│   └── attachments     # AttachmentRef, AttachmentKind
└── verticals/          # Product category-specific specs
    └── apparel/
        └── tshirt/
            ├── spec        # TshirtSpec and related interfaces
            ├── artifacts   # TshirtArtifacts and seller responses
            └── enums       # 40+ tshirt-specific enums
```

### Decision Switches

The `decisions` field in specs acts as business-level switches to optimize agent conversations:

```typescript
const spec: TshirtSpec = {
  // ...
  decisions: {
    need_customization: YesNoUnknown.Yes,     // Agent should collect customization details
    need_decoration: YesNoUnknown.No,         // Skip decoration questions
    need_sample: YesNoUnknown.Unknown,        // Not yet decided
  },
  // ...
};
```

**Values**:
- `"yes"`: Explicitly needed – agent should collect detailed information
- `"no"`: Explicitly not needed – agent should skip this section
- `"unknown"`: Not yet decided – agent may need to ask

## Common Enums

### Shared Across Verticals

- **`SpecCategory`**: `Tshirt`, `Toy`, `Unknown`
- **`YesNoUnknown`**: `Yes`, `No`, `Unknown`
- **`Currency`**: `USD` (currently only USD is supported)
- **`Country`**: 34 major markets including `US`, `CN`, `GB`, `DE`, `JP`, `FR`, `IT`, `ES`, `CA`, `AU`, `SG`, `IN`, etc. (ISO 3166-1 alpha-2)
- **`Incoterm`**: `EXW`, `FOB`, `CIF`, `DDP`, `FCA`, `DAP`, `Unknown`
- **`ShippingMode`**: `Sea`, `Air`, `Express`, `Rail`, `Truck`, `Unknown`

### Tshirt-Specific

- **Garment**: `GarmentCategory`, `FitType`, `NeckType`, `SleeveType`
- **Fabric**: `FabricDirection`, `KnitType`, `FabricFinish`
- **Sizing**: `SizeSystem`, `SizeUnit`
- **Decoration**: `DecorationMethod`, `DecorationPlacement`, `SpecialEffect`
- **Labeling**: `LabelType`, `BarcodeStandard`, `BarcodePlacement`
- **Packaging**: `PackagingType`, `FoldingMethod`
- **Business**: `UseCase`, `TargetMarket`, `SampleRequirement`, `PaymentMethod`, `MOQTolerance`

See the [full enum list](./src/specs/verticals/apparel/tshirt/enums.ts) for all available constants.

## Minimal TshirtSpec Example

```typescript
import {
  TshirtSpec,
  SpecStatus,
  FitType,
  QuantityUnit,
  Currency,
  Country,
} from '@cgentai/cgent-protocol';

const minimalSpec: TshirtSpec = {
  meta: {
    spec_id: "rfq-example-001",
    category: "tshirt",
    status: SpecStatus.Draft,
    version: 1,
    created_at: "2025-01-06T10:00:00Z",
    last_updated_at: "2025-01-06T10:00:00Z",
  },
  order: {
    quantity: {
      exact: 500,
      unit: QuantityUnit.Pcs,
    },
  },
  product: {
    fit_type: FitType.Regular,
    neck_type: "crew",
    fabric: {
      direction: "cotton",
      weight_gsm: 180,
    },
  },
  commercial: {
    target_unit_price: {
      amount: 5.50,
      currency: Currency.USD, // Using Currency enum
    },
  },
  logistics: {
    destination: {
      country: Country.US, // Using Country enum
      city: "Los Angeles",
    },
  },
};
```

## Versioning

This package follows [Semantic Versioning (semver)](https://semver.org/):

- **Major** (e.g., 2.0.0): Breaking changes
  - Removing fields
  - Changing required fields from optional
  - Changing enum values
- **Minor** (e.g., 1.1.0): Non-breaking additions
  - Adding new optional fields
  - Adding new enum values
  - Adding new verticals
- **Patch** (e.g., 1.0.1): Bug fixes and documentation

### Spec Version Field

Each spec includes a `meta.version` field:

```typescript
interface SpecMeta {
  spec_id: string;
  category: "tshirt";
  status: SpecStatus;
  version: number; // Incremented when spec structure changes
  created_at: ISODateTimeString;
  last_updated_at: ISODateTimeString;
}
```

Host applications should use this field to handle backward compatibility when spec structures evolve.

## TypeScript Configuration

This package exports both CommonJS and ESM formats with full TypeScript support:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node16" / "nodenext"
    "esModuleInterop": true,
    "strict": true
  }
}
```

## Package Exports

```typescript
// Main entry (exports everything)
import * from '@cgentai/cgent-protocol';

// Subpath exports
import * from '@cgentai/cgent-protocol/types';
import * from '@cgentai/cgent-protocol/types/order';
import * from '@cgentai/cgent-protocol/types/product';
import * from '@cgentai/cgent-protocol/specs';
import * from '@cgentai/cgent-protocol/specs/common';
import * from '@cgentai/cgent-protocol/specs/verticals/apparel/tshirt';
import * from '@cgentai/cgent-protocol/specs/verticals/apparel/tshirt/spec';
import * from '@cgentai/cgent-protocol/specs/verticals/apparel/tshirt/artifacts';
import * from '@cgentai/cgent-protocol/specs/verticals/apparel/tshirt/enums';
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev

# Clean build artifacts
pnpm clean
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Backward Compatibility**: Avoid breaking changes unless absolutely necessary
2. **Documentation**: Update README and JSDoc comments for new fields
3. **Enum Convention**: Follow the `const object + type` pattern for all enums
4. **Versioning**: Update the package version according to semver

## License

MIT © Cgent.AI

## Links

- [GitHub Repository](https://github.com/cgent-ai/cgent-protocol)
- [Issue Tracker](https://github.com/cgent-ai/cgent-protocol/issues)
- [npm Package](https://www.npmjs.com/package/@cgentai/cgent-protocol)

