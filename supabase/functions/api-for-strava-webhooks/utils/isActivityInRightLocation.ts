/* eslint-disable @typescript-eslint/no-explicit-any */

const isActivityInRightLocation = async (coords: any[], location: any) => {
  let shortestDistance = 999;
  coords.map((c, i) => {
    const dist = getDistanceFromLatLonInKm(c[0], c[1], location.latitude, location.longitude);
    if (dist < shortestDistance) {
      shortestDistance = dist;
    }
  });
  console.log('shortestDistance:', shortestDistance);
  if (shortestDistance < 0.5) {
    return true;
  }
  return false;
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default isActivityInRightLocation;
