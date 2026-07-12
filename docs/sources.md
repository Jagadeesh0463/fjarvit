# Sources

Every change-history entry in `content/cards/*.json` cites a source. This is
the same list, grouped by bank, so it can be checked in one place instead of
digging through 20 JSON files. Direct official bank PDFs are marked; the
rest are news/aggregator articles that reported on a bank's change.

## HDFC Bank

- **hdfc-indianoil** — Fee on Large Fuel Transactions
  Official PDF: https://v.hdfc.bank.in/content/dam/hdfc-aem-microsites/common-pdfs/pdf/OPM_Pricing.pdf
- **hdfc-millennia** — Complimentary Domestic Lounge Access
  1Finance review: https://1finance.co.in/blog/hdfc-millennia-credit-card-review/
- **hdfc-millennia** — Reward Point Earning Exclusions
  Official PDF: https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/personal-banking/discover-products/cards/credit-cards/millennia-credit-card/Terms-and-Conditions-Millennia-Credit-Card.pdf
- **hdfc-regalia-gold** — Domestic Lounge Access & Reward Point Earn Rate
  CardExpert: https://www.cardexpert.in/hdfc-regalia-gold-2026-lounge-access-update/

## SBI Card

- **sbi-cashback** — Online Cashback Cap
  SBI Card Notices, p.1 (no direct URL cited)
- **sbi-prime** — Complimentary Lifestyle Memberships
  CardInsider: https://cardinsider.com/blog/airport-lounge-access-takes-hit-sbi-card-revises-benefits-popular-credit-cards/
- **sbi-prime** — Domestic Lounge Access Network
  Business Standard: https://www.business-standard.com/finance/personal-finance/sbi-card-s-new-lounge-access-rules-from-2026-key-changes-for-flyers-125121000540_1.html
- **sbi-simplyclick** — Swiggy Reward Rate
  Business Standard: https://www.business-standard.com/finance/personal-finance/sbi-card-reduces-reward-points-on-simplyclick-and-other-credit-cards-125031900403_1.html
- **sbi-simplyclick** — Complimentary Insurance Cover
  Official notices page: https://www.sbicard.com/en/customer-notices.page

## ICICI Bank

- **icici-amazon-pay** — Foreign Currency Markup Fee
  1Finance review: https://1finance.co.in/blog/amazon-pay-icici-credit-card-review/
- **icici-sapphiro** — Domestic Lounge Access Spend Requirement
  Official page: https://www.icici.bank.in/personal-banking/cards/credit-card/upcoming-changes-features-and-charges

## Axis Bank

- **airtel-axis** — Airtel Cashback Cap
  Axis Bank Terms & Conditions, p.4 (no direct URL cited)
- **axis-ace** — Base Cashback Rate (All Other Spends)
  CardInsider: https://cardinsider.com/blog/all-major-axis-bank-credit-cards-devalued/
- **axis-flipkart** — Complimentary Domestic Lounge Access
  Finology Select: https://select.finology.in/articles/credit-card/flipkart-axis-bank-credit-card-devaluation
- **axis-magnus** — Monthly Milestone Reward Points
  Paisabazaar: https://www.paisabazaar.com/credit-card/axis-magnus-devaluation/

## Kotak Mahindra Bank

No sourced change-history entries yet (`kotak-811-dream-different`, `kotak-white`
have no recorded changes — see [roadmap.md](./roadmap.md) known gaps).

## IDFC FIRST Bank

- **idfc-first-millennia** — Reward Points Earning Base & 10X Threshold
  Official PDF: https://www.idfcfirst.bank.in/content/dam/idfcfirstbank/pdf/credit-card/FIRST-Millennia-Credit-Card.pdf
- **idfc-first-wealth** — Reward Points Earning Base
  Official PDF: https://www.idfcfirst.bank.in/content/dam/idfcfirstbank/pdf/credit-card/Wealth-1-Credit-Card.pdf

## IndusInd Bank

- **indusind-legend** — Airport Lounge Access
  Official PDF: https://www.indusind.bank.in/content/dam/indusind-corporate/Other/welcomekit/credit-card-benefits/Legend_Benefit_Guide_02-01-2026.pdf

## AU Small Finance Bank

No sourced change-history entries yet (`au-lit`, `au-altura` have no recorded
changes).

## Note on monitoring

`scripts/monitor-sources.mjs` checks all URLs above on a schedule and flags
when one changes — see [source-monitoring.md](./source-monitoring.md). It
cannot verify a source is currently reachable from this development
sandbox (network is restricted here to a small allowlist), so the links
above should be manually clicked to confirm they still resolve before
relying on them.
