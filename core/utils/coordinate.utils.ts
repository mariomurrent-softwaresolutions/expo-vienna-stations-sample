const isValidCoordinate = (latitude: string, longitude: string): boolean => {
  if (!latitude || !longitude) {
    return false;
  }

  const lat = Number(latitude);
  const lng = Number(longitude);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return false;
  }

  if(isZeroCoordinate(lat, lng)) {
    return false;
  }

  const validLat = lat >= -90 && lat <= 90;
  const validLng = lng >= -180 && lng <= 180;

  return validLat && validLng;
}

const isZeroCoordinate = (latitude: number, longitude: number): boolean => {
  return latitude === 0 && longitude === 0;
}

export {isValidCoordinate};
