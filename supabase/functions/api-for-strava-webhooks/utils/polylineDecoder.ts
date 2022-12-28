import { transform } from 'https://cdnjs.cloudflare.com/ajax/libs/openlayers/6.12.0/proj.min.js';

const polylineDecoder = (encoded: string) => {
  // array that holds the points

  const points = [];
  const olPoints = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;
  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii                                                                                    //and substract it by 63
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    olPoints.push(transform([lng / 1e5, lat / 1e5], 'EPSG:4326', 'EPSG:3857'));
    points.push([lat / 1e5, lng / 1e5]);
  }

  return [points, olPoints];
};

export default polylineDecoder;
