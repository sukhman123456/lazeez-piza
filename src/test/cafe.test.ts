import { describe, expect, it } from "vitest";
import { cafe, menuItems, orderableItems, whatsappUrl } from "@/lib/cafe";

describe("Cafe content rules", () => {
  it("uses the owner-confirmed calling number", () => {
    expect(cafe.callUrl).toBe("tel:+918558022097");
  });

  it("includes the selected item in WhatsApp to the verified number", () => {
    const url = new URL(whatsappUrl("Gold Corn Pizza"));
    expect(url.pathname).toBe("/918558022097");
    expect(url.searchParams.get("text")).toContain("Gold Corn Pizza");
  });

  it("includes size or details in WhatsApp when provided", () => {
    const url = new URL(whatsappUrl("Spl. Lazeez Pizza", "Medium - ₹350"));
    expect(url.searchParams.get("text")).toContain("Medium - ₹350");
  });

  it("offers verified items for ordering from the official menu", () => {
    const names = orderableItems().map((i) => i.name);
    expect(names).toContain("Gold Corn Pizza");
    expect(names).toContain("Spl. Lazeez Pizza");
    expect(names).toContain("Spl. Lazeez Burger");
    expect(names).toContain("Spl. Lazeez Sandwich Pizza");
    expect(orderableItems().length).toBeGreaterThanOrEqual(50);
  });

  it("ensures all menu items have valid confirmed prices and descriptions", () => {
    expect(
      menuItems.every(
        (i) =>
          typeof i.price === "number" &&
          i.price > 0 &&
          typeof i.description === "string" &&
          i.confirmed === true,
      ),
    ).toBe(true);
  });

  it("preserves the provided rating and review count", () => {
    expect([cafe.rating, cafe.reviewCount]).toEqual([4.9, 14]);
  });

  it("lists only the provided closing time", () => {
    expect(cafe.closingTime).toBe("10 PM");
    expect(cafe).not.toHaveProperty("openingTime");
  });
});
