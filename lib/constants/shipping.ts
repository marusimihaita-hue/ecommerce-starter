/** Subtotal minim (RON) pentru livrare inclusă. */
export const FREE_SHIPPING_THRESHOLD_RON = 200;

/** Livrare standard când subtotalul este sub prag (RON). */
export const STANDARD_SHIPPING_PRICE_RON = 19;

/** Returnează costul livrării în RON (0 = gratuit). */
export function getShippingChargeRon(subtotalRon: number): number {
  const subtotalBani = Math.round(subtotalRon * 100);
  const thresholdBani = Math.round(FREE_SHIPPING_THRESHOLD_RON * 100);
  return subtotalBani >= thresholdBani ? 0 : STANDARD_SHIPPING_PRICE_RON;
}
