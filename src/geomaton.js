import geocoder from 'geocoder';
import { STATUS, LOOKUP_TABLE, ADDRESS_SEPARATOR, TYPE } from './constants'

const geocode = (address) => {
  return new Promise((resolve, reject) => {
    geocoder.geocode(address, (err, data) => {
      if (err) {
        reject({
          status: data.status,
          reason: STATUS[data.status]
        });
      }

      resolve(data);
    });
  });
};

const reverseGeocode = (lat, lng) => {
  return new Promise((resolve, reject) => {
    geocoder.reverseGeocode(lat, lng, (err, data) => {
      if (err) {
        reject({
          status: data.status,
          reason: STATUS[data.status]
        });
      }

      resolve(data);
    });
  });
};

const parseAddressComponent = (comp) => {

  var formatted = comp.formatted_address;
  var structured = comp.address_components.sort((x, y) => {
    if (x.types[0] > y.types[0]) return 1;
    if (x.types[0] <= y.types[0]) return -1;
  });

  const firstGradeObject = structured.map((el) => {
    const type = LOOKUP_TABLE[el.types[0]];
    return {
      type,
      googleType: el.types[0],
      value: formatted.includes(el.long_name) ? el.long_name : el.short_name
    };
  }).reduce((prev, curr) => {

    if (curr.type === TYPE.ADDRESS && prev[curr.type]) {
      return Object.assign(prev, {
        [curr.type]: {
          googleType: curr.googleType,
          value: computeAddress(formatted, prev[curr.type].value, curr.value)
        }
      });
    }

    const newObject = {
      [curr.type]: {
        googleType: curr.googleType,
        value: curr.value
      }
    };

    if (!prev[curr.type] || prev[curr.type].googleType > curr.googleType) {
      return Object.assign(prev, newObject);
    }

    return prev;

  }, {});

  return Object.keys(firstGradeObject).reduce((prev, currKey) => {
    return Object.assign(prev, {[currKey]: firstGradeObject[currKey].value})
  }, {});

};

const computeAddress = (formatted, prev, curr) => {
  const prevIdx = formatted.indexOf(prev);
  const currIdx = formatted.indexOf(curr);
  return prevIdx <= currIdx
    ? [prev, curr].join(ADDRESS_SEPARATOR).trim()
    : [curr, prev].join(ADDRESS_SEPARATOR).trim()
};


export {
  geocode,
  reverseGeocode,
  parseAddressComponent
}
