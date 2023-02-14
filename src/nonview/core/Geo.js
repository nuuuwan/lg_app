const DEFAULT_LATLNG = [6.9172766042580065, 79.86479288444164];

export default class Geo {
  static async getLatLng() {
    try {
      const data = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const coords = data.coords;
      return [coords.latitude, coords.longitude];
    } catch (e) {
      return DEFAULT_LATLNG;
    }
  }
}
