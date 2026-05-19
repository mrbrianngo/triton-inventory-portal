# Triton Inventory Portal

The **Triton Inventory Portal** is a specialized prescriptive analytics overlay designed specifically for the unique operational demands of student-run organizations and collegiate merchandise operations. 

## The Vacant Niche

Student organizations are heavily supported by general administrative software (like Springly or Orbi), bulk manufacturing networks (like Fresh Prints), and point-of-sale registers (like Square or Shopify POS). However, there is a massive operational gap when it comes to **bridging volatile, qualitative pre-event sentiment data with physical manufacturing placement.** 

This application fills that specific void. It is intentionally designed to integrate alongside standard club management platforms and campus POS systems. It acts as an elite decision optimization layer that translates erratic social media polls and expected attendance metrics into explicit, risk-adjusted production volumes. 

## End-to-End Prescriptive Analytics

The portal employs a single-period Newsvendor optimization framework to protect student organizational budgets. Rather than outputting blind guesses, the backend calculates empirical mean demands ($\mu$), models standard deviation error variance ($\sigma$), and derives the financial Critical Ratio ($CR$) using explicit economic cost variables (Retail Price, Production COGS, and Salvage Value).

It eliminates post-event deadstock while ensuring high-impulse event demand is captured at peak operational efficiency.

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
