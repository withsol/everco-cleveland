/**
 * School-district geography for the Ever Co deal finder.
 *
 * The screen covers six SCHOOL DISTRICTS, not zip codes or mailing cities — a
 * house with a North Olmsted or Fairview Park address can still be in Westlake
 * schools. Redfin's CSV has no school-district column, but every row carries
 * LATITUDE/LONGITUDE, so each listing is assigned to a district by testing its
 * point against the official boundary polygons in districts.json.
 *
 * Boundaries: U.S. Census Bureau TIGERweb "Unified School Districts" (the same
 * boundaries NCES uses), simplified to ~1 m. Refresh by re-querying TIGERweb
 * MapServer/0 for the GEOIDs in districts.json.
 */
import data from "./districts.json";

/** A polygon is a list of rings; ring 0 is the outer edge, the rest are holes. */
type Ring = number[][]; // [lng, lat][]
type Polygon = Ring[];

export interface District {
  /** Short display name, e.g. "Westlake". */
  name: string;
  /** Official district name, e.g. "Westlake City School District". */
  district: string;
  geoid: string;
  county: string;
  polygons: Polygon[];
  /** [minLng, minLat, maxLng, maxLat] */
  bbox: [number, number, number, number];
}

export const DISTRICTS: District[] = (
  data.districts as Omit<District, "bbox">[]
).map((d) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const poly of d.polygons) {
    for (const [x, y] of poly[0]) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  return { ...d, bbox: [minX, minY, maxX, maxY] };
});

/** Even-odd ray cast. */
function inRing(lng: number, lat: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function inPolygon(lng: number, lat: number, poly: Polygon): boolean {
  if (!inRing(lng, lat, poly[0])) return false;
  for (let h = 1; h < poly.length; h++) if (inRing(lng, lat, poly[h])) return false;
  return true;
}

/** The target district containing this point, or null if it's in none of them. */
export function districtFor(lat: number, lng: number): District | null {
  for (const d of DISTRICTS) {
    const [minX, minY, maxX, maxY] = d.bbox;
    if (lng < minX || lng > maxX || lat < minY || lat > maxY) continue;
    if (d.polygons.some((p) => inPolygon(lng, lat, p))) return d;
  }
  return null;
}

/**
 * Redfin map-search polygon ("lng lat,lng lat,...", closed) covering a
 * district's bounding box plus a small pad. Over-fetching is fine — the
 * point-in-polygon test decides membership.
 */
export function searchPoly(d: District, pad = 0.003): string {
  const [minX, minY, maxX, maxY] = d.bbox;
  const pts = [
    [minX - pad, minY - pad],
    [maxX + pad, minY - pad],
    [maxX + pad, maxY + pad],
    [minX - pad, maxY + pad],
    [minX - pad, minY - pad],
  ];
  return pts.map(([x, y]) => `${x.toFixed(5)} ${y.toFixed(5)}`).join(",");
}
