'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAddressComponent = exports.reverseGeocode = exports.geocode = undefined;

var _geocoder = require('geocoder');

var _geocoder2 = _interopRequireDefault(_geocoder);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var geocode = function geocode(address) {
  return new Promise(function (resolve, reject) {
    _geocoder2.default.geocode(address, function (err, data) {
      if (err) {
        reject({
          status: data.status,
          reason: _constants.STATUS[data.status]
        });
      }

      resolve(data);
    });
  });
};

var reverseGeocode = function reverseGeocode(lat, lng) {
  return new Promise(function (resolve, reject) {
    _geocoder2.default.reverseGeocode(lat, lng, function (err, data) {
      if (err) {
        reject({
          status: data.status,
          reason: _constants.STATUS[data.status]
        });
      }

      resolve(data);
    });
  });
};

var parseAddressComponent = function parseAddressComponent(comp) {

  var formatted = comp.formatted_address;
  var structured = comp.address_components.sort(function (x, y) {
    if (x.types[0] > y.types[0]) return 1;
    if (x.types[0] <= y.types[0]) return -1;
  });

  var firstGradeObject = structured.map(function (el) {
    var type = _constants.LOOKUP_TABLE[el.types[0]];
    return {
      type: type,
      googleType: el.types[0],
      value: formatted.includes(el.long_name) ? el.long_name : el.short_name
    };
  }).reduce(function (prev, curr) {

    if (curr.type === _constants.TYPE.ADDRESS && prev[curr.type]) {
      return Object.assign(prev, _defineProperty({}, curr.type, {
        googleType: curr.googleType,
        value: computeAddress(formatted, prev[curr.type].value, curr.value)
      }));
    }

    var newObject = _defineProperty({}, curr.type, {
      googleType: curr.googleType,
      value: curr.value
    });

    if (!prev[curr.type] || prev[curr.type].googleType > curr.googleType) {
      return Object.assign(prev, newObject);
    }

    return prev;
  }, {});

  return Object.keys(firstGradeObject).reduce(function (prev, currKey) {
    return Object.assign(prev, _defineProperty({}, currKey, firstGradeObject[currKey].value));
  }, {});
};

var computeAddress = function computeAddress(formatted, prev, curr) {
  var prevIdx = formatted.indexOf(prev);
  var currIdx = formatted.indexOf(curr);
  return prevIdx <= currIdx ? [prev, curr].join(_constants.ADDRESS_SEPARATOR).trim() : [curr, prev].join(_constants.ADDRESS_SEPARATOR).trim();
};

exports.geocode = geocode;
exports.reverseGeocode = reverseGeocode;
exports.parseAddressComponent = parseAddressComponent;