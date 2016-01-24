'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var STATUS = exports.STATUS = {
  OK: 'The address was successfully parsed and at least one geocode was returned',
  ZERO_RESULTS: 'The geocode was successful but returned no results.\n' + 'This may occur if the geocoder was passed a non-existent address',
  OVER_QUERY_LIMIT: 'You are over your geocoding quota',
  REQUEST_DENIED: 'Your request was denied',
  INVALID_REQUEST: 'Generally indicates that the query (address, components or latlng) is missing',
  UNKNOWN_ERROR: 'The request could not be processed due to a server error'
};

var TYPE = exports.TYPE = {
  ADDRESS: 'address',
  CITY: 'city',
  COUNTRY: 'country',
  STATE: 'state',
  POSTAL_CODE: 'postal_code '
};

var LOOKUP_TABLE = exports.LOOKUP_TABLE = {
  'street_address': TYPE.ADDRESS,
  'street_number': TYPE.ADDRESS,
  'route': TYPE.ADDRESS,
  'premise': TYPE.ADDRESS,
  'subpremise': TYPE.ADDRESS,
  'neighborhood': TYPE.ADDRESS,
  'point_of_interest': TYPE.ADDRESS,
  'park': TYPE.ADDRESS,
  'airport': TYPE.ADDRESS,
  /********************************/
  'locality': TYPE.CITY,
  'sublocality': TYPE.CITY,
  'sublocality_level_1': TYPE.CITY,
  'sublocality_level_2': TYPE.CITY,
  'sublocality_level_3': TYPE.CITY,
  'sublocality_level_4': TYPE.CITY,
  'sublocality_level_5': TYPE.CITY,
  /********************************/
  'country': TYPE.COUNTRY,
  /********************************/
  'administrative_area_level_1': TYPE.STATE,
  'administrative_area_level_2': TYPE.STATE,
  'administrative_area_level_3': TYPE.STATE,
  'administrative_area_level_4': TYPE.STATE,
  'administrative_area_level_5': TYPE.STATE,
  /********************************/
  'postal_code': TYPE.POSTAL_CODE,
  'zip': TYPE.POSTAL_CODE
};

var ADDRESS_SEPARATOR = exports.ADDRESS_SEPARATOR = ' ';