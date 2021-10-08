// (as line Items do not store an item price so an api call must provide objects)
export const getTotalPrice = (lineItemObjects) => {
  const totalPrice = lineItemObjects
    .map((lio) => lio.itemId.price * lio.quantity)
    .reduce(sumReducer, 0);
  return totalPrice;
};

// get total quantity from lineItems
export const getTotalQuantity = (lineItems) => {
  if (lineItems !== null && lineItems !== undefined) {
    return lineItems.map((li) => li.quantity).reduce(sumReducer, 0);
  }
};

export const sumReducer = (sum, val) => sum + val;

// round prices
export const roundNum = (num, length) => {
  var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
  return number.toFixed(2);
};

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
// source https://www.codegrepper.com/code-examples/javascript/calculate+distance+between+two+coordinates+formula+javascript
export const calcDist = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
};

// Format distance for printing on van page
export const formatDist = (d) => {
  if (d < 1) {
    return roundNum(d * 1000, 0);
  } else {
    return roundNum(d, 2);
  }
};

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

// Find the 5 closest open vans to current geolocation
export const getNearestVans = (userLat, userLng, vanList) => {
  console.log(userLat, userLng, vanList);
  const withDistance = vanList.map((van) => {
    const vanWithDist = {
      van: van,
      distance: calcDist(userLat, userLng, van.location.lat, van.location.lng),
    };
    return vanWithDist;
  });

  // return 5 nearest vans
  return withDistance.sort(compareDist).slice(0, 6);
};

// distance comparator function
function compareDist(a, b) {
  if (a.distance < b.distance) return -1;
  if (a.distance > b.distance) return 1;
  return 0;
}
