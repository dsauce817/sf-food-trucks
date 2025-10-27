/*
    * Calculate the Haversine distance between two points on the Earth
    * given their latitude and longitude in decimal degrees.
    * Returns distance in kilometers.
    * Reference: https://en.wikipedia.org/wiki/Haversine_formula 
    *  and https://www.geeksforgeeks.org/dsa/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
    * Formulas:
        a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)
        c = 2 * asin( √a )
        distance = R * c
*/
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {

    const R = 6371; // km
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
}