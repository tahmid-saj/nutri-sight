
function latLngToXY(
  lat: number,
  lng: number,
  latMin: number,
  latMax: number,
  lngMin: number,
  lngMax: number,
  imageWidth: number,
  imageHeight: number
): { x: number; y: number } {
  const x = ((lng - lngMin) / (lngMax - lngMin)) * imageWidth;
  const y = ((latMax - lat) / (latMax - latMin)) * imageHeight;
  return { x, y };
}
