# GOOGLE ANTIGRAVITY — PART 1 MASTER DEVELOPMENT PROMPT

## Project: Global Product Discovery, Comparison & Shopping Intelligence Platform

You are building the foundation of a premium, global product-discovery platform based on the master architecture provided for this project.

This is **Part 1 of a larger 60-part development specification**.

You MUST treat this part as the foundation for all future parts.

Do not create a disconnected demo, temporary landing page, or generic affiliate website.

The final product must feel like a **premium global shopping intelligence platform** where users discover products, understand whether they are worth buying, compare alternatives, explore trends, and eventually visit a retailer to purchase.

The platform should initially be strongly optimized for:

- United States
- United Kingdom
- Germany
- France
- Canada
- Australia
- broader European markets

The product must be designed so additional countries, currencies, languages, retailers, affiliate programs, and categories can be introduced later without rebuilding the core architecture.

---

# 1. CORE PRODUCT PHILOSOPHY

The website is NOT simply:

> “A website containing Amazon affiliate product links.”

Do NOT design it like a traditional affiliate blog.

The core positioning is:

> DISCOVER → UNDERSTAND → COMPARE → DECIDE → SHOP

The user should feel that the platform helps them answer:

> “What is worth buying?”

rather than:

> “Which Amazon product should I click?”

The platform should combine:

- product discovery
- trend discovery
- product research
- product comparisons
- buying guidance
- product recommendations
- value analysis
- retailer discovery
- deals
- editorial content
- future product intelligence tools

The architecture must support future modules such as:

- Trending Products
- Rising Products
- Hidden Gems
- Worth the Hype
- Product Finder
- Gift Finder
- Comparison Engine
- Alternatives Engine
- Deals
- Price Drops
- Product Database
- Editorial Content
- Newsletter
- Country-aware shopping
- SEO topic clusters
- Admin dashboard
- Analytics
- Trend intelligence

Do NOT implement every future feature in Part 1.

Instead, build the **foundation that allows every future feature to connect naturally**.

---

# 2. BRAND EXPERIENCE

The website must feel:

- premium
- trustworthy
- modern
- intelligent
- editorial
- clean
- fast
- sophisticated
- easy to understand
- commercially effective
- globally usable

Avoid the visual language of:

- cheap affiliate blogs
- coupon spam websites
- cluttered marketplaces
- excessive neon colors
- gaming dashboards
- crypto dashboards
- generic AI SaaS templates
- overly dark interfaces
- excessive gradients
- excessive animations
- purple-heavy startup designs
- visually noisy ecommerce templates

The visual identity should communicate:

> “A modern product intelligence publication with a premium shopping experience.”

---

# 3. PRIMARY VISUAL DIRECTION

Use a predominantly **white premium interface**.

The default experience should be bright and elegant.

Primary visual foundation:

- white backgrounds
- warm off-white sections where useful
- subtle gray borders
- soft neutral surfaces
- black/dark charcoal typography
- restrained accent color
- minimal gradients
- extremely subtle glass effects
- soft shadows
- rounded but not excessively bubbly components

The website should look excellent on:

- 1366×768 desktop
- 1440p desktop
- large desktop monitors
- laptops
- tablets
- iPhone-class mobile devices
- Android mobile devices

Do not design only for large screens.

---

# 4. COLOR SYSTEM

Create a centralized design-token system.

Do NOT hardcode colors throughout components.

Use semantic tokens such as:

```text
background
background-secondary
surface
surface-elevated
surface-hover
border
border-strong
text-primary
text-secondary
text-muted
text-inverse
accent
accent-hover
success
warning
danger
info
```

Base visual direction:

```text
Primary Background:
#FFFFFF

Secondary Background:
very light neutral

Primary Text:
near-black / charcoal

Secondary Text:
neutral gray

Borders:
very light gray

Accent:
restrained premium green

Success:
natural green

Warning:
warm amber

Danger:
restrained red
```

Do not use purple as the primary accent.

Do not create a rainbow UI.

Category colors should remain subtle and secondary.

The interface should remain visually coherent even when product cards contain colorful product photography.

---

# 5. TYPOGRAPHY

Typography must feel premium and editorial.

Use a highly readable modern sans-serif system.

Prioritize:

- excellent readability
- strong hierarchy
- clean numbers
- compact metadata
- comfortable article reading

Create a clear hierarchy:

```text
Display
H1
H2
H3
H4
Body Large
Body
Body Small
Caption
Label
Micro Label
```

Do not make every heading huge.

Use large typography only where it improves hierarchy.

The homepage hero should have a strong headline, but it must remain practical and readable rather than looking like a marketing SaaS template.

---

# 6. SPACING SYSTEM

Create a consistent spacing scale.

Use a predictable system rather than random margins.

Example conceptual scale:

```text
xs
sm
md
lg
xl
2xl
3xl
4xl
5xl
```

All components should use the shared spacing system.

Do not create:

- random 13px margins
- random 27px padding
- inconsistent card gaps
- different border radii for every component

The website must feel designed as one system.

---

# 7. BORDER RADIUS

Use restrained modern rounding.

Recommended direction:

```text
Small controls:
8–10px

Cards:
14–18px

Large featured cards:
20–24px

Pills:
999px
```

Do not make every component excessively rounded.

Premium editorial design should retain some structure and sharpness.

---

# 8. SHADOW SYSTEM

Use extremely subtle shadows.

The interface should not look like every card is floating.

Create semantic shadow levels:

```text
shadow-sm
shadow-card
shadow-elevated
shadow-modal
```

Most normal cards should rely primarily on:

- border
- background contrast
- subtle hover state

Use shadows only when needed.

---

# 9. GLASSMORPHISM

Glass effects may be used selectively.

Do NOT make the entire website transparent.

Good uses:

- floating search interface
- sticky navigation
- modal
- command/search overlay
- floating utility panel
- premium featured section

Avoid:

> entire homepage covered in glass.

The white interface must remain dominant.

---

# 10. GLOBAL LAYOUT

Create a reusable site shell.

Conceptual structure:

```text
App
│
├── Global Header
├── Main Content
├── Optional Secondary Navigation
├── Footer
└── Global Overlays
```

The shell must support:

- normal pages
- category pages
- product pages
- editorial pages
- comparison pages
- tool pages
- deal pages
- future dashboard-like pages

Do not hardcode homepage-only layout logic into the global shell.

---

# 11. HEADER DESIGN

Create a premium responsive header.

Desktop navigation should conceptually support:

```text
Logo

Trending
Categories
Compare
Deals
Guides
Tools

Search

Country / Region
```

Do not overload the header.

The header must prioritize:

1. brand
2. discovery
3. search
4. shopping intent

Use clean spacing.

Avoid tiny text.

Avoid too many navigation items.

---

# 12. HEADER BEHAVIOR

Desktop:

- wide centered content container
- clean navigation
- search entry point
- subtle border
- optional sticky behavior

Tablet:

- simplified navigation
- larger search access

Mobile:

```text
Logo
Search
Menu
```

Do not attempt to squeeze desktop navigation into mobile.

Mobile menu should provide:

```text
Trending
Categories
Compare
Deals
Guides
Tools
Gift Finder
Product Finder
About
```

Future sections must be easy to add.

---

# 13. LOGO AREA

Create a professional text/logo placeholder system.

Do NOT permanently invent a final brand identity if the project does not yet have a confirmed final brand name.

Use a configurable brand token:

```text
SITE_NAME
SITE_TAGLINE
SITE_DESCRIPTION
SITE_LOGO
```

The logo component must support:

- text logo
- SVG logo
- icon + text
- mobile icon-only mode

Do not hardcode the brand name throughout the application.

---

# 14. HOMEPAGE FOUNDATION

Part 1 must establish the homepage architecture.

The homepage should eventually support:

```text
Header

Hero / Product Discovery

Trending Products

Rising Products

Editor's Picks

Worth the Hype

Hidden Gems

Popular Comparisons

Shop by Category

Deals

Gift Finder

Buying Guides

Newsletter

Footer
```

For Part 1, create the structural foundation and polished visual implementation of the main discovery experience.

Future parts will expand individual sections.

Do not prematurely build complex backend intelligence.

---

# 15. HERO SECTION

The hero is one of the most important parts of the entire platform.

Its purpose is NOT simply branding.

Its purpose is:

> Help users immediately discover what they need.

Primary headline concept:

> WHAT'S WORTH BUYING?

Supporting concept:

> Discover trending products, compare your options, and find what is actually worth your money.

Do not necessarily copy this exact wording if the brand system later defines a better version, but preserve the concept.

The hero must immediately communicate:

- product discovery
- trust
- comparison
- value
- ease

---

# 16. HERO SEARCH EXPERIENCE

The central hero element should be a large premium search interface.

Example:

```text
┌──────────────────────────────────────────────┐
│ 🔍  What are you looking for?                │
│                                              │
│     Search products, categories, or ideas    │
└──────────────────────────────────────────────┘
```

Add a strong CTA if appropriate:

```text
Find My Product
```

But do not make the page feel like a generic AI chatbot.

The search should feel like:

> smart shopping search.

Potential placeholder examples:

```text
Search products...
Try “best headphones under $100”
Try “gift for dad under $50”
Try “best travel gadgets”
```

Rotate placeholder examples carefully.

Do not animate them excessively.

---

# 17. SEARCH INTENT PREPARATION

The search architecture must be designed so future versions can understand structured intent.

Example:

User enters:

```text
best headphones under $100
```

Future parser should be able to identify:

```text
category = headphones
intent = best
budget = 100
currency = USD
country = US
```

Another:

```text
gift for dad under $50
```

Future structure:

```text
intent = gift
recipient = dad
budget = 50
currency = USD
country = US
```

Part 1 does NOT need the full AI parser.

But create interfaces/types/contracts that make this future feature possible.

---

# 18. HERO QUICK INTENTS

Below the search box, create subtle quick-search chips.

Examples:

```text
Trending now
Best under $50
Hidden gems
Tech picks
Gift ideas
Travel essentials
```

These must look premium.

Use small pill buttons with:

- white/light surface
- subtle border
- hover state
- keyboard focus
- accessible labels

Do not make them visually dominant over the main search.

---

# 19. HERO TRUST SIGNALS

Create a subtle trust row beneath the main search.

Potential concepts:

```text
✓ Curated picks
✓ Honest comparisons
✓ Updated recommendations
```

Do NOT claim:

- expert testing
- verified purchases
- laboratory testing
- independent reviews

unless those things genuinely exist.

Trust messaging must be truthful.

---

# 20. TRENDING SECTION FOUNDATION

Create a homepage section:

```text
Trending Right Now
```

Supporting text:

```text
Products people are discovering and talking about.
```

The section should support product cards.

Card layout:

```text
Product Image

TRENDING

Product Name

Short description

🔥 Hype Score
94/100

Worth Score
86/100

Price / Price range

View Product →
```

The actual score data should come from data models, not be hardcoded into reusable components.

---

# 21. PRODUCT CARD SYSTEM

Create a reusable ProductCard component.

It must support variants:

```text
default
compact
featured
horizontal
trending
comparison
search-result
deal
editorial
```

Do not duplicate card components for every page.

Use one extensible product-card system.

Potential data:

```typescript
ProductCardData {
  id
  slug
  name
  brand
  image
  category
  price
  currency
  rating
  reviewCount
  hypeScore
  worthScore
  badge
  shortDescription
  availability
  retailer
  affiliateDestination
}
```

Future fields must be easy to add.

---

# 22. PRODUCT CARD UX

Hover behavior:

- slight image scale
- subtle elevation
- border emphasis
- CTA visibility improvement

Do NOT:

- massively zoom
- rotate cards
- use flashy animations
- create annoying parallax
- move surrounding layout

Motion must feel premium and controlled.

Mobile:

- no hover dependency
- touch-friendly interaction
- entire card should remain easy to navigate

---

# 23. PRODUCT IMAGE HANDLING

Images must be treated as a major part of the design.

Requirements:

- fixed aspect-ratio containers
- object-fit containment where appropriate
- consistent visual alignment
- lazy loading
- responsive image sizes
- optimized formats
- graceful fallback
- no layout shift

Do not stretch product images.

Do not allow random source images to destroy card consistency.

---

# 24. SCORE VISUALIZATION

Hype Score and Worth Score are core future brand concepts.

Create reusable score components.

Example:

```text
🔥 Hype
94
/100
```

and:

```text
★ Worth
86
/100
```

Use restrained visual indicators.

Do not make them resemble financial dashboards.

The score system must be:

- accessible
- understandable
- compact
- reusable
- data-driven

Add tooltip/help support explaining what each score means.

---

# 25. SCORE EXPLANATION

Users must never be confused about:

> Why does this product have this score?

Future product pages should support:

```text
Hype Score
Based on trend and popularity signals.

Worth Score
Based on value, quality, features, sentiment, and editorial evaluation.
```

Do not present the scoring methodology as scientifically objective unless it actually is.

Use language such as:

> Our editorial score

when appropriate.

---

# 26. COUNTRY / REGION FOUNDATION

Create a country-aware architecture.

Initial supported regions:

```text
US
UK
DE
FR
CA
AU
```

Future:

```text
IT
ES
NL
BE
AT
CH
SE
NO
DK
FI
IE
```

The architecture must not hardcode the USA.

The default presentation can be USA-first, but the system must be international-ready.

---

# 27. COUNTRY SELECTOR

Create a subtle country/region selector.

Example:

```text
🇺🇸 United States
```

Clicking it opens:

```text
United States
United Kingdom
Germany
France
Canada
Australia
```

Future country additions must be configuration-driven.

Do not create six separate hardcoded websites.

---

# 28. CURRENCY FOUNDATION

Country selection should eventually control currency.

Example:

```text
US → USD
UK → GBP
Germany → EUR
France → EUR
Canada → CAD
Australia → AUD
```

Create a currency formatting utility.

Do not manually concatenate currency symbols inside components.

Example:

```typescript
formatCurrency(price, currency, locale)
```

The system must correctly support:

- decimal formatting
- thousand separators
- locale-specific formatting
- currency symbol placement

---

# 29. RETAILER ARCHITECTURE

The product platform must be retailer-agnostic.

Do not create:

```text
amazonPrice
amazonUrl
```

as the only product model.

Instead conceptually support:

```typescript
Retailer {
  id
  name
  country
  logo
  website
  affiliateEnabled
}

RetailerOffer {
  productId
  retailerId
  price
  currency
  availability
  destinationUrl
  lastUpdated
}
```

This will support:

- Amazon
- Walmart
- Best Buy
- Target
- eBay
- direct brand stores
- future European retailers

Only integrate retailers and affiliate programs where legally and contractually permitted.

---

# 30. PRODUCT DATABASE FOUNDATION

Create the conceptual database architecture for:

```text
Product
Brand
Category
Subcategory
Retailer
RetailerOffer
ProductScore
ProductImage
ProductFeature
ProductSpecification
CountryAvailability
EditorialContent
Comparison
Alternative
```

Part 1 should establish the relationships without building every advanced table immediately.

Use clean relational thinking.

Avoid a giant unstructured JSON blob for the entire product system.

---

# 31. CATEGORY SYSTEM FOUNDATION

Create a category taxonomy system.

Initial top-level categories:

```text
Tech
Home
Kitchen
Beauty
Fashion
Fitness
Travel
Auto
Outdoor
Pets
Kids
Office
Lifestyle
Gifts
```

Categories must be database/configuration-driven.

Do not hardcode navigation into individual components.

Each category should eventually support:

```text
category
subcategories
featured products
trending products
best products
guides
comparisons
deals
```

---

# 32. SEO FOUNDATION

Part 1 must establish SEO architecture from the beginning.

Every future page should support:

```text
title
metaDescription
canonical
openGraph
twitterCard
robots
structuredData
breadcrumbs
```

Create a centralized metadata system.

Do not duplicate SEO logic across pages.

---

# 33. CLEAN URL FOUNDATION

The routing architecture must support:

```text
/
 /trending
 /categories
 /categories/[category]
 /products/[slug]
 /compare/[slug]
 /alternatives/[slug]
 /deals
 /guides
 /tools
```

Future parts may extend this.

URLs must be:

- human-readable
- lowercase
- stable
- descriptive
- SEO-friendly

Avoid unnecessary query parameters for indexable content.

---

# 34. TECHNICAL SEO REQUIREMENTS

Prepare the foundation for:

- XML sitemap
- robots.txt
- canonical URLs
- breadcrumbs
- Open Graph
- structured data
- semantic HTML
- clean internal links
- image alt text
- fast loading
- mobile responsiveness
- correct heading hierarchy

Do not blindly generate schema markup.

Only use structured data appropriate to the actual page content.

---

# 35. ACCESSIBILITY

Accessibility is mandatory.

Implement:

- semantic HTML
- proper buttons
- keyboard navigation
- visible focus states
- accessible labels
- ARIA only where necessary
- sufficient contrast
- reduced-motion support
- meaningful image alt text
- screen-reader-friendly navigation

Do not use clickable `<div>` elements when a button/link is appropriate.

---

# 36. RESPONSIVE DESIGN

Use mobile-first responsive architecture.

Breakpoints should be based on layout needs rather than arbitrary device names.

At minimum support:

```text
small mobile
large mobile
tablet
laptop
desktop
large desktop
```

Test:

```text
320px
375px
390px
430px
768px
1024px
1280px
1366px
1440px
1920px
```

Do not allow:

- horizontal overflow
- broken cards
- oversized typography
- inaccessible navigation
- clipped content

---

# 37. PERFORMANCE

Performance is a core product requirement.

Prioritize:

- server-rendered content where appropriate
- static generation where appropriate
- image optimization
- lazy loading
- code splitting
- minimal client JavaScript
- reusable components
- caching
- efficient database queries
- pagination
- avoiding unnecessary animation libraries on simple elements

Do not add a heavy library for something that can be solved with CSS.

---

# 38. MOTION DESIGN

Use subtle motion.

Recommended behaviors:

```text
hover: 150–200ms
small UI transition: 150–250ms
section reveal: 300–500ms
modal: 200–300ms
```

Use easing curves that feel natural.

Support:

```text
prefers-reduced-motion
```

If reduced motion is enabled:

- disable unnecessary transforms
- reduce transitions
- avoid animated counters
- avoid auto-moving content

---

# 39. MICRO-INTERACTIONS

Use small interactions to make the platform feel premium.

Examples:

- search focus glow
- card hover elevation
- button press feedback
- bookmark state
- country selector transition
- dropdown opening
- subtle image movement
- score tooltip

Never sacrifice usability for animation.

---

# 40. EMPTY STATES

Every major future component needs an intentional empty state.

Examples:

```text
No products found.

Try changing your filters or search terms.
```

or:

```text
No trending products yet.

Check back soon.
```

Never leave blank white boxes.

---

# 41. LOADING STATES

Create reusable skeleton components.

Examples:

```text
ProductCardSkeleton
ArticleSkeleton
SearchResultSkeleton
CategorySkeleton
HeroSkeleton
```

Skeletons should resemble the final content layout.

Avoid generic spinning loaders everywhere.

---

# 42. ERROR STATES

Create a consistent error system.

Examples:

```text
Something went wrong.

We couldn't load these products right now.

Try again.
```

Provide:

```text
Retry
```

when retry makes sense.

Do not expose raw API/database errors to users.

---

# 43. IMAGE FAILURE STATES

If a product image fails:

- preserve layout
- show neutral placeholder
- avoid broken image icon
- retain product title
- retain useful metadata

The page should remain visually stable.

---

# 44. SEARCH FOUNDATION

Create a reusable Search component with:

```text
input
clear button
keyboard navigation
focus state
recent searches foundation
suggestion foundation
loading state
empty state
```

Future autocomplete can provide:

```text
Products
Categories
Guides
Comparisons
```

Do not build a fake search that only visually works.

Connect it to a clean search-service abstraction so the backend implementation can evolve.

---

# 45. SEARCH SERVICE ABSTRACTION

Create a service interface conceptually similar to:

```typescript
SearchService {
  searchProducts()
  searchCategories()
  searchContent()
  getSuggestions()
}
```

Part 1 may use mock/seed data if the backend is not ready.

But components must not directly depend on fake static arrays everywhere.

Keep data access separate from presentation.

---

# 46. DATA / UI SEPARATION

Strongly separate:

```text
UI components
↓
hooks / application logic
↓
services
↓
API
↓
database
```

Do not create:

```text
huge component containing UI + API + database + business logic
```

The codebase must remain scalable for the remaining 59 parts.

---

# 47. COMPONENT ARCHITECTURE

Create a reusable component hierarchy.

Example:

```text
components/
  ui/
    Button
    Input
    Badge
    Card
    Modal
    Tooltip
    Dropdown
    Tabs
    Skeleton

  layout/
    Header
    Footer
    Container
    Section

  product/
    ProductCard
    ProductImage
    ProductPrice
    ProductScore
    ProductBadge

  search/
    SearchBar
    SearchOverlay
    SearchSuggestion

  navigation/
    MainNav
    MobileNav
    Breadcrumbs

  country/
    CountrySelector
    CurrencyDisplay
```

Names may adapt to the chosen framework conventions.

---

# 48. DESIGN SYSTEM DOCUMENTATION

Create a central design-system reference inside the project.

Document:

- colors
- typography
- spacing
- radii
- shadows
- buttons
- forms
- cards
- badges
- navigation
- responsive rules
- animation rules

Future parts MUST reuse this system.

Do not redesign the UI independently for every feature.

---

# 49. HOMEPAGE CONTENT PRIORITY

The homepage should guide the user in this order:

```text
1. What is this website?
2. What can I search?
3. What is trending?
4. What is worth buying?
5. What should I compare?
6. What categories exist?
7. What useful tools exist?
8. Why should I return?
```

Do not put 40 sections above the fold.

The first viewport must be simple.

---

# 50. ABOVE-THE-FOLD REQUIREMENT

Desktop first viewport should communicate:

```text
Brand
Navigation
Main proposition
Search
Quick discovery actions
Subtle trust signal
```

The user should understand the website within approximately a few seconds.

Do not force them to read a huge paragraph.

---

# 51. CONVERSION PHILOSOPHY

The site must be optimized for conversion without becoming aggressive.

Good:

```text
Check price
Compare
See alternatives
Find best match
View deal
```

Avoid:

```text
BUY NOW!!! 🔥🔥🔥
LIMITED!!!
CLICK HERE!!!
```

The platform should feel trustworthy.

---

# 52. AFFILIATE UX FOUNDATION

Affiliate links should be treated as normal shopping destinations.

Do not create misleading buttons.

Use language like:

```text
Check Price
View Deal
See Retailer
Compare Prices
Shop Now
```

depending on the actual destination.

The destination must be accurately represented.

---

# 53. AFFILIATE DISCLOSURE FOUNDATION

Create a reusable disclosure component/page architecture.

It should be easy to place appropriate disclosure text where required.

Do not hide affiliate relationships.

The site must be transparent about commercial relationships.

---

# 54. TRUST-FIRST CONTENT PRINCIPLE

Never generate fake:

- reviews
- ratings
- testing
- expert opinions
- user testimonials
- purchase verification
- performance claims

If information is unavailable:

> Information unavailable

is better than inventing it.

This principle must apply throughout the entire application.

---

# 55. ADMIN-READY FOUNDATION

Even though the admin dashboard is a later part, design data models with future administration in mind.

Products should eventually support:

```text
draft
published
archived
```

Content:

```text
draft
review
published
updated
archived
```

Do not create a system where every change requires editing source code.

---

# 56. FUTURE FEATURE COMPATIBILITY

The architecture MUST leave clean integration points for:

```text
Trend engine
AI product finder
Gift finder
Comparison engine
Alternative engine
Price tracking
Deal engine
Newsletter
Analytics
Editorial CMS
Internationalization
Affiliate management
Product database
Admin dashboard
SEO automation
```

Do not implement fake versions of these just to make the demo appear complete.

Create real foundations and interfaces.

---

# 57. DATABASE PRINCIPLE

Use normalized relational structures where appropriate.

Avoid:

```text
one giant product JSON document containing everything forever
```

Support relationships between:

```text
Product
Brand
Category
Retailer
Offer
Country
Score
Content
Comparison
Alternative
```

Indexes should be planned for:

- slug
- category
- brand
- retailer
- country
- published state
- updated date
- popularity/trend signals

---

# 58. SECURITY FOUNDATION

Never expose secrets to the frontend.

Use environment variables for:

```text
database credentials
API keys
affiliate credentials
private service keys
email provider keys
analytics secrets
```

Never hardcode secrets in components.

Validate external data.

Sanitize user-generated content.

Use server-side authorization for future admin functions.

---

# 59. QUALITY STANDARD

Do not stop when the page technically works.

Before considering Part 1 complete, inspect:

### Visual

- alignment
- typography
- spacing
- responsive behavior
- card consistency
- image quality
- hover states
- focus states

### UX

- navigation clarity
- search clarity
- mobile usability
- CTA clarity
- empty states
- loading states
- errors

### Technical

- console errors
- hydration issues
- broken routes
- invalid HTML
- accessibility warnings
- layout shifts
- unnecessary client rendering
- slow assets

### SEO

- title
- metadata
- headings
- canonical
- semantic structure
- internal links
- robots
- sitemap foundation

---

# 60. CRITICAL ANTIGRAVITY EXECUTION RULE

You are not allowed to treat this prompt as a request for a static mockup only.

Build the actual application foundation.

Use production-quality architecture.

Do not create fake buttons that do nothing unless the functionality belongs to a future part.

For future functionality that is not implemented yet:

- create clean interfaces
- create placeholder states
- create mock data only where necessary
- clearly separate mock data from production data
- make replacement easy

Do not create technical debt just to make the first version look complete.

---

# 61. DO NOT BREAK FUTURE PARTS

This is critical.

The remaining 59 parts will build upon this project.

Therefore:

- do not rename core entities unnecessarily
- do not create conflicting routes
- do not duplicate components
- do not create competing design systems
- do not hardcode country logic
- do not hardcode retailer logic
- do not hardcode category logic
- do not hardcode product-card markup everywhere
- do not make future comparison pages difficult
- do not make future SEO pages difficult
- do not make internationalization difficult

Every decision should ask:

> “Will this architecture still make sense when Parts 2–60 are implemented?”

If not, redesign it before proceeding.

---

# 62. FINAL UX TARGET

When a new visitor opens the website, the emotional impression should be:

> “This looks clean.”

Then:

> “I understand what this website does.”

Then:

> “I can search for what I need.”

Then:

> “These recommendations look useful.”

Then:

> “I can compare products here.”

Then:

> “This site actually helps me decide.”

Finally:

> “I trust this enough to check the retailer.”

That is the intended user journey.

---

# 63. FINAL DESIGN TARGET

The finished Part 1 should feel like a combination of:

```text
Premium editorial publication
+
Modern shopping discovery platform
+
Product research tool
+
Comparison engine foundation
+
Global commerce interface
```

It should NOT feel like:

```text
Generic blog
+
Amazon clone
+
Coupon website
+
AI-generated content farm
```

---

# 64. IMPLEMENTATION ORDER

Implement in this order:

```text
1. Project architecture
2. Design tokens
3. Typography
4. Global layout
5. Header
6. Responsive navigation
7. Footer
8. Homepage structure
9. Hero
10. Search UI
11. Quick intent chips
12. Product card system
13. Score components
14. Trending foundation
15. Country selector foundation
16. Currency utilities
17. Category system foundation
18. SEO utilities
19. Loading states
20. Empty states
21. Error states
22. Accessibility pass
23. Responsive pass
24. Performance pass
25. Final visual polish
```

---

# 65. FINAL ACCEPTANCE CRITERIA

Part 1 is complete only when:

- the application runs successfully
- no major console errors exist
- desktop layout is polished
- mobile layout is polished
- navigation works
- search UI works at the interface level
- product cards are reusable
- product scores are reusable
- country architecture exists
- currency architecture exists
- category architecture exists
- SEO foundation exists
- loading states exist
- empty states exist
- error states exist
- accessibility basics are implemented
- responsive behavior is tested
- design tokens are centralized
- components are reusable
- future parts can extend the architecture without rewriting the foundation

---

# 66. IMPORTANT: DO NOT OVERBUILD PART 1

Do not attempt to complete the entire 60-part platform now.

Part 1 is the **foundation and core experience**.

Build it deeply and professionally, but leave advanced systems for their dedicated future parts.

The architecture must be ready for expansion.

---

# FINAL COMMAND TO GOOGLE ANTIGRAVITY

Build Part 1 as a real, scalable, production-quality foundation for the global product discovery platform described above.

Prioritize:

**premium white UI + USA/Europe usability + trust + product discovery + conversion + SEO + performance + accessibility + scalable architecture.**

Every UI element should feel intentional.

Every component should be reusable.

Every route should have a purpose.

Every future feature should have room to connect.

Do not produce a generic template.

Build the foundation of a serious global product-discovery brand.