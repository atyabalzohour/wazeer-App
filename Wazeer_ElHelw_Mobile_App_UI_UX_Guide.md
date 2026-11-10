# Wazeer ElHelw — Mobile App UI/UX Guide

**Brand:** وزير الحلو | Wazeer ElHelw  
**Project:** Food & Dessert Ordering Mobile Application  
**Developer:** Mr.Hafez Rahim  
**Design:** Arabic-first (RTL), English-ready (LTR) | Android & iOS  
**Version:** 1.0 — November 2026

## 1. Design Direction

Create a modern, friendly, premium food-ordering experience based on the **supplied original Wazeer ElHelw logo**. Keep product photography prominent, navigation intuitive, and checkout fast. Use consistent rounded components, generous spacing, readable Arabic typography, and clear order states.

## 2. Color Palette

Colors are approximate screen-matched values from the supplied logo; confirm exact values against the approved brand artwork before production.

| Color | Hex | Usage |
|---|---|---|
| Turquoise | `#12AFBF` | Brand backgrounds, header accents |
| Deep Purple | `#352C60` | Main headings, icons, navigation text |
| Vibrant Pink | `#EE2364` | Primary buttons, selected states, prices |
| Golden Yellow | `#F3CB2F` | Promotions, badges, decorative accents |
| White | `#FFFFFF` | Cards, content surfaces |
| Soft Gray | `#F5F6FA` | App canvas, dividers, input backgrounds |
| Dark Text | `#202033` | Body copy and high-contrast content |
| Success Green | `#15803D` | Paid, completed and successful states |

**Usage:** White/gray as the main content canvas; turquoise for branded sections; purple for typography; pink for primary actions. Preserve the original logo proportions, colors, and clear space.

## 3. Core App Screens

| Screen | Key Components |
|---|---|
| Home | Delivery location, search, promotional carousel, categories, offers, best sellers |
| Categories / Menu | Category filters, sort, search, product grid, favorites, add-to-cart |
| Product Details | Hero image, descriptions, variants, price, quantity, add-to-cart |
| Cart | Editable items, remove, coupon, subtotal, delivery fee, total |
| Checkout | Saved addresses, delivery options, payment method, notes, final confirmation |
| My Orders | Current/previous orders, order status timeline, reorder and invoice access |
| My Account | Profile, addresses, favorites, notifications, support and settings |
| Invoice | Invoice/order number, date, customer, items, charges, tax, payment status, PDF/share/print |

## 4. UI Component Rules

- **Layout:** Native RTL for Arabic; mirror direction appropriately for English. Use an 8-point spacing system and responsive mobile layouts.
- **Typography:** Use a clear Arabic typeface such as Cairo or Tajawal; strong headings, concise labels, legible prices.
- **Cards:** White surfaces, rounded corners (12–20 px), subtle shadows, consistent image aspect ratios.
- **Buttons:** Pink primary CTA with white text; secondary buttons outlined or on white surfaces. Minimum touch target **44 × 44 px**.
- **Navigation:** Persistent bottom tabs for **الرئيسية، الأقسام، السلة، طلباتي، حسابي** on standard browsing screens. Hide or simplify them during focused checkout.
- **Forms:** Explicit labels, validation messages, loading states, disabled states and helpful empty states.
- **Accessibility:** Sufficient color contrast, scalable text, screen-reader labels and visible focus states.

## 5. Essential Ordering Logic

1. Customer selects a delivery location; show products available for that service area/branch.
2. Customer browses categories, opens a product, and chooses available variants and quantity.
3. Cart calculates line totals, validated discounts, and current charges from backend data.
4. Checkout verifies address, fulfillment availability, delivery cost, payment method and final amount **before** order submission.
5. Confirmation creates one unique order reference and displays the actual order status; prevent duplicate submissions.
6. Order tracking shows backend-driven states: **Placed → Accepted → Preparing → Out for Delivery → Delivered**, plus **Cancelled/Failed** when relevant.
7. Invoice displays the finalized transaction and supports **download PDF, share and print**. Include a genuine verification QR only if a backend verification endpoint exists.

**Important:** Example prices, tax rates, discounts, delivery estimates, addresses, ratings, reward points and payment methods shown in concept mockups are placeholders—not confirmed business data. Calculate VAT and any statutory invoice fields according to the applicable Egyptian tax and e-invoicing requirements; do not hardcode example rates or claim payment completion before confirmation.

## 6. Development & Quality Checklist

- Centralize design tokens and reusable components; avoid per-screen style duplication.
- Optimize product images, support lazy loading and skeleton states.
- Connect products, availability, discounts, charges and orders to real APIs; never use demo values in production.
- Secure authentication, customer data, payment handoff and permission checks on the backend.
- Test RTL/LTR, small screens, slow networks, cart persistence, payment failures and checkout recovery.
- Keep invoice totals mathematically consistent with the completed order.

---

**Developed by:** **Mr.Hafez Rahim**  
**Project:** **Wazeer ElHelw Mobile Application**
