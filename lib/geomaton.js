(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.geomaton = factory();
  }
}(this, function () {

  var _extLookupTable,
    addressParts,
    lookupTable,
    addressLookupTable,
    addressSeparator;

  /**
   * Override the default lookup table
   * @param lookupTable
   */
  var config = function(lookupTable) {
    _extLookupTable = lookupTable;
  };

  /**
   *
   * @param response
   * @returns {{}}
   */
  var parse = function(response) {
    init();
    var results = response.results;
    var sortFoo = function(x, y) {
      if (x.types[0] > y.types[0]) return 1;
      if (x.types[0] <= y.types[0]) return -1;
    };

    var structAddr = results[0].address_components.sort(sortFoo);
    var formatAddr = results[0].formatted_address;

    var parsedElms = {};

    structAddr.forEach(function (element) {
      var elm = parseElement(element, formatAddr);

      Object.keys(elm).forEach(function(key) {
        parsedElms[key] = elm[key];
      });

    });

    parsedElms['address'] = generateAddress(addressParts);

    return parsedElms;
  };

  /**
   * Apply the configuration to the parser
   */
  var init = function() {
    var _defaults = {
      lookupTable: {
        address: [
          'street_address',
          'street_number',
          'route',
          'premise',
          'subpremise',
          'neighborhood',
          'point_of_interest',
          'park',
          'airport'
        ],
        country: [
          'country'
        ],
        city: [
          'locality',
          'sublocality',
          'sublocality_level_1',
          'sublocality_level_2',
          'sublocality_level_3',
          'sublocality_level_4',
          'sublocality_level_5'
        ],
        state: [
          'administrative_area_level_1',
          'administrative_area_level_2',
          'administrative_area_level_3',
          'administrative_area_level_4',
          'administrative_area_level_5'
        ],
        zip: [
          'postal_code'
        ]
      },
      addressSeparator: ' '
    };

    addressParts = [];
    lookupTable = _extLookupTable || _defaults.lookupTable;

    addressSeparator = _defaults.addressSeparator;

    addressLookupTable = lookupTable.address;
    delete lookupTable.address;
  };

  /**
   * Parse a single element of Google's `address_components`.
   * Makes use of Google's `formatted_address` to create a correctly ordered address
   * @param element
   * @param formattedString
   * @returns {string}
   */
  var parseElement = function(element, formattedString) {

    var parsed = {};
    var match = false;

    if (addressLookupTable.indexOf(element.types[0]) !== -1 && formattedString.indexOf(element.long_name) !== -1) {
      addressParts.push({
        name: element['long_name'],
        idx: formattedString.indexOf(element.long_name)
      });
    }

    Object.keys(lookupTable).forEach(function(typeKey) {
      lookupTable[typeKey].forEach(function(subtype) {
        if (match === false && element.types.indexOf(subtype) !== -1) {
          parsed[typeKey] = element.long_name;
          lookupTable[typeKey] = [];
          match = true;
        }
      }.bind(this))
    }.bind(this));

    return parsed;
  };

  /**
   * Concatenate the parts of the address in a single string
   * @param addressParts
   * @returns {string}
   */
  var generateAddress = function(addressParts) {
    var address = [];

    addressParts.sort(function(x,y){return x.idx - y.idx}).forEach(function(elm) {
      address.push(elm.name);
    });
    return address.join(addressSeparator);
  };

  /**
   * Public API
   */
  return {
    config: config,
    parse: parse
  }

}));
