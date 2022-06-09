# Concepts overview

Concepts are different domains that tie together a Beambasket solution. Not all concepts need to be nessecarily used, but in order for different modules to work interoperable, they all use these abstract, standardized, concepts.

Additional concepts can be introduced by a new module, as needed, however, that comes at the risk of reducing the ability to plug-and-play other modules.

### Customers

Manages authentication, and subjects relating to customers.

### Quoting

Manages pricing of a Product, generating a total quote, and the pricing for that.

Shipping related matters also fall within this category (as it needs to also be priced).

### Ordering

Manages creating orders, either from a Quote or directly. 

### Designs

Manages the creation of a customer design, to be turned into a QuoteRow, Quote or Order.

### Files

Manages files, to be uploaded to some backend.

### Products
Manages product configuration pages & their backend logic.

### Localization

Manages localization of the portal.

### Taxes

Manages tax calculation.

### Payments

Manages various payment suppliers for creating orders.


# Database models

*All database models and fields are optional & fully extensible.* The most important thing is to *use the recommended naming and types consistent for module interop.*

This excludes the required Prisma relation fields for Model-to-Model relations.

## Customers Models

### Model Account
- 

### Model User

- name String
- email String
- emailVerified String
- image String
- taxMethod TaxMethod
- accounts Account[]
- sessions Session[]

## Quoting Models

### Model Quote

- name String
- total Int
- tax Int
- taxPercentage Int
- taxMethod TaxMethod

### Model QuoteRow

- quantity Int

## Ordering Models

### Model Order

- name String
- total Int
- tax Int
- taxPercentage Int
- taxMethod TaxMethod
- quantity Int

### Model OrderRow

## Designs Models

## Model Design

- originalFile File

## Files Models

### Model File

- filename String

## Products Models

### Model ProductTypeCategory

- productTypeVariants ProductTypeVariant[]
- description LocalizedText

### Model ProductTypeVariant

- productTypes ProductType[]
- description LocalizedText

### Model ProductType

- name String
- description LocalizedText

## Localization Model

### Model LocalizedText

- text String

## Taxes Model

### Enum TaxMethod

- None
- Inclusive
- Exclusive

## Payments Model


# Backend Functions


# Backend Endpoints & DTO's

All endpoints & DTO fields are optional and extensible. Important is to keep naming the convention consistent across modules.

## DTO's

All DTO's for JSON responses are based upon the database model, and can return the same properties that the database defines.

## Quoting

POST /user/quoting/quoteDesign

Request JSON
- designId string
- productTypeId string
- quantity number

Return JSON
- total number
- tax number
- taxMethod

## Designs

### GET /user/designs

Return JSON MultipleDesignsResponse

- designs DesignResponse[]

### GET /user/designs/[designId]

Return JSON SingleDesignResponse

- design DesignResponse

### POST /user/designs/[productSlug]/from-file

Multipart/Form-Data

- originalFile file

Return JSON SingleDesignResponse

- design DesignResponse

### POST /user/designs/[productSlug]/from-data

JSON

- ...

Return JSON
- design Design


# Frontend Components

## Customers Components

### UserButton /components/user-button


# Frontend Pages

## Customers Pages

### Index /

## Quoting Pages

### Create Quote Row Page /quote/[productSlug]/

### Product Quoting Page /quote/[productSlug]/[quoteRowId]

### View Quote Page /quote/

### View Quote Page /quote/[quoteId]

## Ordering Pages

### Place Order Page /place-order

### Place Order Page /place-order/[quoteId]

## Payments Pages

### Pay for Quote Page /payment/[quoteId]