/**
 * Automated checks for the VANTA ARC store logic.
 * Run with: node tests/run-tests.ts
 * (Uses Node's built-in type stripping — this file and lib/products.ts
 *  use only erasable TypeScript, no enums or namespaces.)
 */
import assert from "node:assert";
import {
  PRODUCTS,
  cartItemUnitPrice,
  cartSubtotal,
  demoShipping,
  filterProducts,
  getColor,
  getProduct,
  searchProducts,
  sortProducts,
  validateCheckout,
  variantPrice,
} from "../lib/products.ts";

let passed = 0;
function check(name: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`ok - ${name}`);
}

// Cart calculations
check("cart subtotal sums unit price x qty", () => {
  const items = [
    { productSlug: "vanta-arc-pro", colorId: "vanta-black", qty: 2 },
    { productSlug: "arc-usb-c-audio-cable", colorId: "vanta-black", qty: 1 },
  ];
  assert.equal(cartSubtotal(items), 349 * 2 + 19);
});

check("cart subtotal is 0 for an empty cart", () => {
  assert.equal(cartSubtotal([]), 0);
});

check("variant price adds finish delta", () => {
  const pro = getProduct("vanta-arc-pro")!;
  assert.equal(variantPrice(pro, "titanium"), 369);
  assert.equal(variantPrice(pro, "vanta-black"), 349);
});

check("demo shipping: free over $150, $9 below, $19 express", () => {
  assert.equal(demoShipping(200, "standard"), 0);
  assert.equal(demoShipping(100, "standard"), 9);
  assert.equal(demoShipping(200, "express"), 19);
  assert.equal(demoShipping(0, "standard"), 0);
});

// Filtering / search / sorting
check("filter by category returns only that category", () => {
  const list = filterProducts(PRODUCTS, { category: "accessories" });
  assert.equal(list.length, 3);
  assert.ok(list.every((p) => p.category === "accessories"));
});

check("filter by max price excludes expensive products", () => {
  const list = filterProducts(PRODUCTS, { maxPrice: 50 });
  assert.ok(list.length >= 3);
  assert.ok(list.every((p) => p.price <= 50));
});

check("search finds headphones by tagline word", () => {
  const list = searchProducts("spatial");
  assert.ok(list.some((p) => p.slug === "vanta-arc-pro"));
});

check("search returns empty for nonsense query", () => {
  assert.equal(searchProducts("zzz-no-such-product").length, 0);
});

check("sort price-asc orders cheapest first", () => {
  const list = sortProducts(PRODUCTS, "price-asc");
  assert.equal(list[0].slug, "arc-usb-c-audio-cable");
  assert.equal(list[list.length - 1].slug, "vanta-arc-pro");
});

check("sort name orders alphabetically", () => {
  const list = sortProducts(PRODUCTS, "name");
  const names = list.map((p) => p.name);
  assert.deepEqual(names, [...names].sort());
});

// Variant selection
check("variant selection falls back to first color for unknown id", () => {
  const pro = getProduct("vanta-arc-pro")!;
  assert.equal(getColor(pro, "no-such-color").id, "vanta-black");
});

check("cart item unit price follows selected color", () => {
  assert.equal(cartItemUnitPrice({ productSlug: "vanta-arc-pro", colorId: "electric", qty: 1 }), 359);
});

// Checkout validation
check("checkout validation rejects empty/invalid fields", () => {
  const errors = validateCheckout({ name: "", email: "not-an-email", address: "x", city: "", postal: "" });
  assert.ok(errors.name && errors.email && errors.address && errors.city && errors.postal);
});

check("checkout validation accepts a complete valid form", () => {
  const errors = validateCheckout({
    name: "Haris Akbar",
    email: "haris@example.com",
    address: "123 Example Street",
    city: "Mardan",
    postal: "23200",
  });
  assert.deepEqual(errors, {});
});

// Data integrity
check("product slugs are unique and every product has at least one color", () => {
  const slugs = PRODUCTS.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(PRODUCTS.every((p) => p.colors.length >= 1));
  assert.equal(PRODUCTS.length, 6);
});

console.log(`\n${passed} checks passed.`);
