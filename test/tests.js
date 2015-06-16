
var results = [
  {
    "address_components" : [
      {
        "long_name" : "2",
        "short_name" : "2",
        "types" : [ "street_number" ]
      },
      {
        "long_name" : "Market Street",
        "short_name" : "Market St",
        "types" : [ "route" ]
      },
      {
        "long_name" : "San Francisco",
        "short_name" : "SF",
        "types" : [ "locality", "political" ]
      },
      {
        "long_name" : "San Francisco County",
        "short_name" : "San Francisco County",
        "types" : [ "administrative_area_level_2", "political" ]
      },
      {
        "long_name" : "California",
        "short_name" : "CA",
        "types" : [ "administrative_area_level_1", "political" ]
      },
      {
        "long_name" : "United States",
        "short_name" : "US",
        "types" : [ "country", "political" ]
      },
      {
        "long_name" : "94105",
        "short_name" : "94105",
        "types" : [ "postal_code" ]
      }
    ],
    "formatted_address" : "2 Market Street, San Francisco, CA 94105, USA",
    "geometry" : {
      "bounds" : {
        "northeast" : {
          "lat" : 37.7944795,
          "lng" : -122.3948819
        },
        "southwest" : {
          "lat" : 37.7944695,
          "lng" : -122.3948952
        }
      },
      "location" : {
        "lat" : 37.7944795,
        "lng" : -122.3948952
      },
      "location_type" : "RANGE_INTERPOLATED",
      "viewport" : {
        "northeast" : {
          "lat" : 37.7958234802915,
          "lng" : -122.3935395697085
        },
        "southwest" : {
          "lat" : 37.7931255197085,
          "lng" : -122.3962375302915
        }
      }
    },
    "place_id" : "Ei0yIE1hcmtldCBTdHJlZXQsIFNhbiBGcmFuY2lzY28sIENBIDk0MTA1LCBVU0E",
    "types" : [ "street_address" ]
  }
];

var geomaton = require('../lib/geomaton');
var expect = require('unexpected').clone();
expect.installPlugin(require('unexpected-mitm'));

describe('geomaton.js', function() {

  it('should output something', function() {
    var parsed = geomaton.parse(results);
    expect(parsed, 'to satisfy', {
      state: 'California',
      country: 'United States',
      city: 'San Francisco',
      zip: '94105'
    });
  });

  it('should config')
});
