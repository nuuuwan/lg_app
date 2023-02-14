export default class Geo {
  static async getLatLng() {
    const data = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    const coords = data.coords;
    return [coords.latitude, coords.longitude];
  }
}
