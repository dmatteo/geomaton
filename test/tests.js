//var geomaton = require('../lib/geomaton');
//
//var expect = require('unexpected').clone();
//expect.installPlugin(require('unexpected-mitm'));
//expect.installPlugin(require('unexpected-http'));
//
//expect.addAssertion('to be parsed as', function (expect, subject, value) {
//  return expect('https://maps.googleapis.com/maps/api/geocode/json?address=' + subject, 'to yield response',
//    { body: expect.it('when passed as parameter to', geomaton.parse, 'to equal', value) });
//});

import { geocode, reverseGeocode, parseAddressComponent } from '../src/geomaton';

describe('Geomaton 1.0', () => {


  it('should resolve the address', () => {

    return geocode('via Milano 25').then((data) => {
      return data.results.map((el) => {
        console.log(parseAddressComponent(el));
      })
    }, (err) => {
      console.log('err?', err);

    });

  });
});

describe.skip('geomaton.js', function() {

  describe('should parse correctly the following address', function() {

    // copy/paste this assertion to create mocked out responses
    it.skip('Usage example of `with http recorded and injected`', function() {
      var address = 'via Milano 25, Cologno Monzese';
      var parsed =   {
        state: 'Lombardia',
        country: 'Italy',
        city: 'Cologno Monzese',
        zip: '20093',
        address: 'Via Milano 25'
      };
      return expect(address, 'with http recorded and injected', 'to be parsed as', parsed);
    });

    it('Italy 1', function() {
      var address = 'via Milano 25, Cologno Monzese';
      var parsed =   {
        state: 'Lombardia',
        country: 'Italy',
        city: 'Cologno Monzese',
        zip: '20093',
        address: 'Via Milano 25'
      };
      return expect(address, 'with http mocked out', {
        request: { url: 'GET /maps/api/geocode/json?address=via%20Milano%2025,%20Cologno%20Monzese', headers: { Host: 'maps.googleapis.com' } },
        response: {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8', Expires: 'Wed, 17 Jun 2015 13:54:32 GMT', 'Cache-Control': 'public, max-age=86400', 'Access-Control-Allow-Origin': '*', Server: 'mafe', 'X-XSS-Protection': '1; mode=block', 'X-Frame-Options': 'SAMEORIGIN', 'Alternate-Protocol': '443:quic,p=1', 'Accept-Ranges': 'none',
            Vary: 'Accept-Language,Accept-Encoding'
          },
          body: {
            results: [
              {
                address_components: [
                  { long_name: '25', short_name: '25', types: [ 'street_number' ] },
                  { long_name: 'Via Milano', short_name: 'Via Milano', types: [ 'route' ] },
                  { long_name: 'Cologno Monzese', short_name: 'Cologno Monzese', types: [ 'locality', 'political' ] },
                  { long_name: 'Cologno Monzese', short_name: 'Cologno Monzese', types: [ 'administrative_area_level_3', 'political' ] },
                  { long_name: 'Città Metropolitana di Milano', short_name: 'MI', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Lombardia', short_name: 'Lombardia', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Italy', short_name: 'IT', types: [ 'country', 'political' ] },
                  { long_name: '20093', short_name: '20093', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Via Milano, 25, 20093 Cologno Monzese MI, Italy',
                geometry: { location: { lat: 45.52802459999999, lng: 9.2784896 }, location_type: 'ROOFTOP', viewport: { northeast: { lat: 45.5293735802915, lng: 9.279838580291502 }, southwest: { lat: 45.5266756197085, lng: 9.277140619708497 } } },
                place_id: 'ChIJh5DvQQq4hkcRhubw8kLWTic',
                types: [ 'street_address' ]
              }
            ],
            status: 'OK'
          }
        }
      }, 'to be parsed as', parsed);
    });

    it('USA 1', function() {
      var address = 'Market St. 2, San Francisco';
      var parsed =     {
        state: 'California',
        country: 'United States',
        city: 'San Francisco',
        zip: '94105',
        address: '2 Market Street'
      };

      return expect('Market St. 2, San Francisco', 'with http mocked out', {
        request: { url: 'GET /maps/api/geocode/json?address=Market%20St.%202,%20San%20Francisco', headers: { Host: 'maps.googleapis.com' } },
        response: {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8', Expires: 'Wed, 17 Jun 2015 14:06:35 GMT', 'Cache-Control': 'public, max-age=86400', 'Access-Control-Allow-Origin': '*', Server: 'mafe', 'X-XSS-Protection': '1; mode=block', 'X-Frame-Options': 'SAMEORIGIN', 'Alternate-Protocol': '443:quic,p=1', 'Accept-Ranges': 'none',
            Vary: 'Accept-Language,Accept-Encoding'
          },
          body: {
            results: [
              {
                address_components: [
                  { long_name: '2', short_name: '2', types: [ 'street_number' ] },
                  { long_name: 'Market Street', short_name: 'Market St', types: [ 'route' ] },
                  { long_name: 'San Francisco', short_name: 'SF', types: [ 'locality', 'political' ] },
                  { long_name: 'San Francisco County', short_name: 'San Francisco County', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'California', short_name: 'CA', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'United States', short_name: 'US', types: [ 'country', 'political' ] },
                  { long_name: '94105', short_name: '94105', types: [ 'postal_code' ] }
                ],
                formatted_address: '2 Market Street, San Francisco, CA 94105, USA',
                geometry: { bounds: { northeast: { lat: 37.7944795, lng: -122.3948819 }, southwest: { lat: 37.7944695, lng: -122.3948952 } }, location: { lat: 37.7944795, lng: -122.3948952 }, location_type: 'RANGE_INTERPOLATED', viewport: { northeast: { lat: 37.7958234802915, lng: -122.3935395697085 }, southwest: { lat: 37.7931255197085, lng: -122.3962375302915 } } },
                place_id: 'Ei0yIE1hcmtldCBTdHJlZXQsIFNhbiBGcmFuY2lzY28sIENBIDk0MTA1LCBVU0E',
                types: [ 'street_address' ]
              }
            ],
            status: 'OK'
          }
        }
      }, 'to be parsed as', parsed);
    });

    it('France 1`', function() {
      var address = 'Plaza';
      var parsed =     {
          state: 'Aquitaine', // should be removed
          country: 'France', // should be removed
          city: 'Amendeuix-Oneix', // should be removed
          zip: '64120', // should be removed
          address: 'Plaza' // should be removed
        };
      return expect(address, 'with http mocked out', {
        request: { url: 'GET /maps/api/geocode/json?address=Plaza', headers: { Host: 'maps.googleapis.com' } },
        response: {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8', Expires: 'Wed, 17 Jun 2015 14:15:46 GMT', 'Cache-Control': 'public, max-age=86400', 'Access-Control-Allow-Origin': '*', Server: 'mafe', 'X-XSS-Protection': '1; mode=block', 'X-Frame-Options': 'SAMEORIGIN', 'Alternate-Protocol': '443:quic,p=1', 'Accept-Ranges': 'none',
            Vary: 'Accept-Language,Accept-Encoding'
          },
          body: {
            results: [
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'route' ] },
                  { long_name: 'Amendeuix-Oneix', short_name: 'Amendeuix-Oneix', types: [ 'locality', 'political' ] },
                  { long_name: 'Pyrénées-Atlantiques', short_name: '64', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Aquitaine', short_name: 'Aquitaine', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'France', short_name: 'FR', types: [ 'country', 'political' ] },
                  { long_name: '64120', short_name: '64120', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Plaza, 64120 Amendeuix-Oneix, France',
                geometry: { bounds: { northeast: { lat: 43.3551209, lng: -1.040035 }, southwest: { lat: 43.35267899999999, lng: -1.0448812 } }, location: { lat: 43.354337, lng: -1.042352 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 43.35524893029149, lng: -1.040035 }, southwest: { lat: 43.3525509697085, lng: -1.0448812 } } },
                place_id: 'ChIJrxtid3LFVg0R_Xo-4cgwFBQ',
                types: [ 'route' ]
              },
              {
                address_components: [ { long_name: 'Plaza', short_name: 'Plaza', types: [ 'route' ] }, { long_name: 'Buenos Aires', short_name: 'CABA', types: [ 'locality', 'political' ] }, { long_name: 'Buenos Aires', short_name: 'CABA', types: [ 'administrative_area_level_1', 'political' ] }, { long_name: 'Argentina', short_name: 'AR', types: [ 'country', 'political' ] } ],
                formatted_address: 'Plaza, Buenos Aires, Argentina',
                geometry: { bounds: { northeast: { lat: -34.5471277, lng: -58.4671514 }, southwest: { lat: -34.5855657, lng: -58.49166499999999 } }, location: { lat: -34.5655251, lng: -58.4788475 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: -34.5471277, lng: -58.4671514 }, southwest: { lat: -34.5855657, lng: -58.49166499999999 } } },
                place_id: 'ChIJAVusGmK2vJURtvbJ79qCOo8',
                types: [ 'route' ]
              },
              {
                address_components: [ { long_name: 'Plaza de la Revolucion', short_name: 'Plaza de la Revolucion', types: [ 'administrative_area_level_2', 'political' ] }, { long_name: 'Havana', short_name: 'Havana', types: [ 'administrative_area_level_1', 'political' ] }, { long_name: 'Cuba', short_name: 'CU', types: [ 'country', 'political' ] } ],
                formatted_address: 'Plaza de la Revolucion, Cuba',
                geometry: { bounds: { northeast: { lat: 23.1465562, lng: -82.37715539999999 }, southwest: { lat: 23.1003883, lng: -82.4119663 } }, location: { lat: 23.1215318, lng: -82.39399999999999 }, location_type: 'APPROXIMATE', viewport: { northeast: { lat: 23.1465562, lng: -82.37715539999999 }, southwest: { lat: 23.1003883, lng: -82.4119663 } } },
                place_id: 'ChIJ57TtJFx3zYgRgAa6ssVzpmw',
                types: [ 'administrative_area_level_2', 'political' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'route' ] },
                  { long_name: 'Aincille', short_name: 'Aincille', types: [ 'locality', 'political' ] },
                  { long_name: 'Pyrénées-Atlantiques', short_name: '64', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Aquitaine', short_name: 'Aquitaine', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'France', short_name: 'FR', types: [ 'country', 'political' ] },
                  { long_name: '64220', short_name: '64220', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Plaza, 64220 Aincille, France',
                geometry: { bounds: { northeast: { lat: 43.149114, lng: -1.1920154 }, southwest: { lat: 43.137209, lng: -1.1999629 } }, location: { lat: 43.143139, lng: -1.195945 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 43.149114, lng: -1.1920154 }, southwest: { lat: 43.137209, lng: -1.1999629 } } },
                place_id: 'ChIJo3W4x8MqVw0Rfi7bcc-eFjQ',
                types: [ 'route' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'route' ] },
                  { long_name: 'Moerdijk', short_name: 'Moerdijk', types: [ 'locality', 'political' ] },
                  { long_name: 'Moerdijk', short_name: 'Moerdijk', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Noord-Brabant', short_name: 'NB', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Netherlands', short_name: 'NL', types: [ 'country', 'political' ] },
                  { long_name: '4782', short_name: '4782', types: [ 'postal_code_prefix', 'postal_code' ] }
                ],
                formatted_address: 'Plaza, 4782 Moerdijk, Netherlands',
                geometry: { bounds: { northeast: { lat: 51.6775515, lng: 4.615455700000001 }, southwest: { lat: 51.67361529999999, lng: 4.6062595 } }, location: { lat: 51.6755642, lng: 4.6108418 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 51.6775515, lng: 4.615455700000001 }, southwest: { lat: 51.67361529999999, lng: 4.6062595 } } },
                place_id: 'ChIJvZf-ookjxEcRsBseZlJJFXI',
                types: [ 'route' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'route' ] },
                  { long_name: 'Garris', short_name: 'Garris', types: [ 'locality', 'political' ] },
                  { long_name: 'Pyrénées-Atlantiques', short_name: '64', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Aquitaine', short_name: 'Aquitaine', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'France', short_name: 'FR', types: [ 'country', 'political' ] },
                  { long_name: '64120', short_name: '64120', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Plaza, 64120 Garris, France',
                geometry: { bounds: { northeast: { lat: 43.342641, lng: -1.0588321 }, southwest: { lat: 43.3389452, lng: -1.0623553 } }, location: { lat: 43.3408535, lng: -1.0611138 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 43.342641, lng: -1.0588321 }, southwest: { lat: 43.3389452, lng: -1.0623553 } } },
                place_id: 'ChIJo2LIsfXPVg0RbiEOSCuXtec',
                types: [ 'route' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'route' ] },
                  { long_name: 'Huissen', short_name: 'Huissen', types: [ 'locality', 'political' ] },
                  { long_name: 'Lingewaard', short_name: 'Lingewaard', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Gelderland', short_name: 'GE', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Netherlands', short_name: 'NL', types: [ 'country', 'political' ] },
                  { long_name: '6852', short_name: '6852', types: [ 'postal_code_prefix', 'postal_code' ] }
                ],
                formatted_address: 'Plaza, 6852 Huissen, Netherlands',
                geometry: { bounds: { northeast: { lat: 51.9432874, lng: 5.9204392 }, southwest: { lat: 51.94127839999999, lng: 5.918077299999999 } }, location: { lat: 51.9422337, lng: 5.919173199999999 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 51.9436318802915, lng: 5.920607230291502 }, southwest: { lat: 51.9409339197085, lng: 5.917909269708497 } } },
                place_id: 'ChIJoX4VkZGmx0cRhk22vphuptY',
                types: [ 'route' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'route' ] },
                  { long_name: 'Valdelubiel', short_name: 'Valdelubiel', types: [ 'locality', 'political' ] },
                  { long_name: 'Burgo de Osma-Ciudad de Osma', short_name: 'Burgo de Osma-Ciudad de Osma', types: [ 'administrative_area_level_4', 'political' ] },
                  { long_name: 'Soria', short_name: 'Soria', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Castilla y León', short_name: 'CL', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Spain', short_name: 'ES', types: [ 'country', 'political' ] },
                  { long_name: '42318', short_name: '42318', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Plaza, 42318 Valdelubiel, Soria, Spain',
                geometry: { bounds: { northeast: { lat: 41.63933470000001, lng: -3.0493051 }, southwest: { lat: 41.6391712, lng: -3.0495459 } }, location: { lat: 41.6392461, lng: -3.04939 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 41.6406019302915, lng: -3.048076519708498 }, southwest: { lat: 41.6379039697085, lng: -3.050774480291501 } } },
                place_id: 'ChIJgwfNRyj0RA0R9H84wOpzk28',
                types: [ 'route' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'premise' ] },
                  { long_name: 'Carretera Sánchez', short_name: '2', types: [ 'route' ] },
                  { long_name: 'El Centro', short_name: 'El Centro', types: [ 'sublocality_level_1', 'sublocality', 'political' ] },
                  { long_name: 'Azua', short_name: 'Azua', types: [ 'locality', 'political' ] },
                  { long_name: 'Azua', short_name: 'Azua', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Dominican Republic', short_name: 'DO', types: [ 'country', 'political' ] },
                  { long_name: '71000', short_name: '71000', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Plaza, Carretera Sánchez, Azua 71000, Dominican Republic',
                geometry: { bounds: { northeast: { lat: 18.45427, lng: -70.7348112 }, southwest: { lat: 18.4540586, lng: -70.7350338 } }, location: { lat: 18.4541643, lng: -70.7349225 }, location_type: 'ROOFTOP', viewport: { northeast: { lat: 18.4555132802915, lng: -70.7335735197085 }, southwest: { lat: 18.4528153197085, lng: -70.7362714802915 } } },
                place_id: 'ChIJTUkiWeGjuo4Rdd38WsHGTjc',
                types: [ 'premise' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'premise' ] },
                  { long_name: 'Carretera Panamericana', short_name: '1', types: [ 'route' ] },
                  { long_name: 'Penonomé', short_name: 'Penonomé', types: [ 'locality', 'political' ] },
                  { long_name: 'Penonomé', short_name: 'Penonomé', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Coclé', short_name: 'Coclé', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Panama', short_name: 'PA', types: [ 'country', 'political' ] }
                ],
                formatted_address: 'Plaza, Carretera Panamericana, Penonomé, Panama',
                geometry: { bounds: { northeast: { lat: 8.5092304, lng: -80.36328979999999 }, southwest: { lat: 8.5082913, lng: -80.3640381 } }, location: { lat: 8.5087608, lng: -80.363664 }, location_type: 'ROOFTOP', viewport: { northeast: { lat: 8.510109830291503, lng: -80.36231496970849 }, southwest: { lat: 8.507411869708498, lng: -80.3650129302915 } } },
                place_id: 'ChIJRwo-8jJPrI8RXepkeFE4d48',
                types: [ 'premise' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'premise' ] },
                  { long_name: '8111', short_name: '8111', types: [ 'street_number' ] },
                  { long_name: '100 Avenue', short_name: '100 Ave', types: [ 'route' ] },
                  { long_name: 'Fort Saint John', short_name: 'Fort St John', types: [ 'locality', 'political' ] },
                  { long_name: 'Peace River', short_name: 'Peace River', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'British Columbia', short_name: 'BC', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Canada', short_name: 'CA', types: [ 'country', 'political' ] },
                  { long_name: 'V1J 1W4', short_name: 'V1J 1W4', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Plaza, 8111 100 Avenue, Fort Saint John, BC V1J 1W4, Canada',
                geometry: { bounds: { northeast: { lat: 56.246289, lng: -120.8111504 }, southwest: { lat: 56.2459662, lng: -120.8118828 } }, location: { lat: 56.24612759999999, lng: -120.8115166 }, location_type: 'ROOFTOP', viewport: { northeast: { lat: 56.2474765802915, lng: -120.8101676197085 }, southwest: { lat: 56.2447786197085, lng: -120.8128655802915 } } },
                place_id: 'ChIJVVG65yM0klMR9AwC1JbCc_4',
                types: [ 'premise' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'premise' ] },
                  { long_name: '535', short_name: '535', types: [ 'street_number' ] },
                  { long_name: 'King\'s Road', short_name: 'King\'s Rd', types: [ 'route' ] },
                  { long_name: 'Chelsea', short_name: 'Chelsea', types: [ 'neighborhood', 'political' ] },
                  { long_name: 'London', short_name: 'London', types: [ 'locality', 'political' ] },
                  { long_name: 'London', short_name: 'London', types: [ 'postal_town' ] },
                  { long_name: 'Greater London', short_name: 'Gt Lon', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'United Kingdom', short_name: 'GB', types: [ 'country', 'political' ] },
                  { long_name: 'SW10 0SZ', short_name: 'SW10 0SZ', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Plaza, 535 King\'s Road, Chelsea, London SW10 0SZ, UK',
                geometry: { location: { lat: 51.48002020000001, lng: -0.1857894 }, location_type: 'ROOFTOP', viewport: { northeast: { lat: 51.48136918029151, lng: -0.184440419708498 }, southwest: { lat: 51.47867121970851, lng: -0.187138380291502 } } },
                place_id: 'ChIJ8yHWun0FdkgR0Tu370RmvII',
                types: [ 'premise' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza South', short_name: 'Plaza S', types: [ 'route' ] },
                  { long_name: 'Sandoval County', short_name: 'Sandoval County', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'New Mexico', short_name: 'NM', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'United States', short_name: 'US', types: [ 'country', 'political' ] },
                  { long_name: '87083', short_name: '87083', types: [ 'postal_code' ] }
                ], formatted_address: 'Plaza South, New Mexico 87083, USA',
                geometry: { bounds: { northeast: { lat: 35.6590727, lng: -106.3319839 }, southwest: { lat: 35.6459966, lng: -106.346664 } }, location: { lat: 35.6511691, lng: -106.3442168 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 35.6590727, lng: -106.3319839 }, southwest: { lat: 35.6459966, lng: -106.346664 } } }, partial_match: true,
                place_id: 'ChIJn7Cyk1ZlGIcR7iuMbc41fT4', types: [ 'route' ]
              },
              {
                address_components: [
                  { long_name: 'North Plaza', short_name: 'N Plaza', types: [ 'route' ] },
                  { long_name: 'Austin', short_name: 'Austin', types: [ 'locality', 'political' ] },
                  { long_name: 'Travis County', short_name: 'Travis County', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Texas', short_name: 'TX', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'United States', short_name: 'US', types: [ 'country', 'political' ] },
                  { long_name: '78753', short_name: '78753', types: [ 'postal_code' ] }
                ], formatted_address: 'North Plaza, Austin, TX 78753, USA',
                geometry: { bounds: { northeast: { lat: 30.3560394, lng: -97.6843097 }, southwest: { lat: 30.3492952, lng: -97.6887814 } }, location: { lat: 30.352507, lng: -97.6867345 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 30.3560394, lng: -97.6843097 }, southwest: { lat: 30.3492952, lng: -97.6887814 } } }, partial_match: true,
                place_id: 'ChIJER-HRHfJRIYR7M3bhRp3EBc', types: [ 'route' ]
              },
              {
                address_components: [
                  { long_name: 'North Plaza', short_name: 'N Plaza', types: [ 'route' ] },
                  { long_name: 'Paris', short_name: 'Paris', types: [ 'locality', 'political' ] },
                  { long_name: 'Lamar County', short_name: 'Lamar County', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Texas', short_name: 'TX', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'United States', short_name: 'US', types: [ 'country', 'political' ] },
                  { long_name: '75460', short_name: '75460', types: [ 'postal_code' ] }
                ], formatted_address: 'North Plaza, Paris, TX 75460, USA',
                geometry: { bounds: { northeast: { lat: 33.6616756, lng: -95.5562994 }, southwest: { lat: 33.6613311, lng: -95.557154 } }, location: { lat: 33.6613332, lng: -95.5569465 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 33.6628523302915, lng: -95.55537771970849 }, southwest: { lat: 33.6601543697085, lng: -95.55807568029151 } } },
                partial_match: true, place_id: 'ChIJaTXnWQNYSoYREOToa6kc4j4', types: [ 'route' ]
              },
              {
                address_components: [
                  { long_name: 'Calle Plaza', short_name: 'Calle Plaza', types: [ 'route' ] },
                  { long_name: 'San Fernando de Apure', short_name: 'San Fernando de Apure', types: [ 'locality', 'political' ] },
                  { long_name: 'San Fernando', short_name: 'San Fernando', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Apure', short_name: 'Apure', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Venezuela', short_name: 'VE', types: [ 'country', 'political' ] }
                ], formatted_address: 'Calle Plaza, San Fernando de Apure, Venezuela',
                geometry: { bounds: { northeast: { lat: 7.8880432, lng: -67.47550869999999 }, southwest: { lat: 7.8783749, lng: -67.4778906 } }, location: { lat: 7.883412799999999, lng: -67.4767311 }, location_type: 'GEOMETRIC_CENTER', viewport: { northeast: { lat: 7.8880432, lng: -67.47535066970848 }, southwest: { lat: 7.8783749, lng: -67.4780486302915 } } },
                partial_match: true, place_id: 'ChIJ_RdLIiuHeI4RTVNY6ryHrbE', types: [ 'route' ]
              },
              {
                address_components: [
                  { long_name: 'Plaza', short_name: 'Plaza', types: [ 'premise' ] },
                  { long_name: 'Roashanee Magu', short_name: 'Roashanee Magu', types: [ 'route' ] },
                  { long_name: 'Nellaidhoo', short_name: 'Nellaidhoo', types: [ 'locality', 'political' ] },
                  { long_name: 'Haa Dhaalu Atoll', short_name: 'Haa Dhaalu Atoll', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Upper North Province', short_name: 'Upper North Province', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Maldives', short_name: 'MV', types: [ 'country', 'political' ] }
                ],
                formatted_address: 'Plaza, Roashanee Magu, Nellaidhoo, Maldives',
                geometry: { bounds: { northeast: { lat: 6.7168182, lng: 72.9470005 }, southwest: { lat: 6.7165358, lng: 72.9467994 } }, location: { lat: 6.716677, lng: 72.94689989999999 }, location_type: 'ROOFTOP', viewport: { northeast: { lat: 6.718025980291502, lng: 72.9482489302915 }, southwest: { lat: 6.715328019708497, lng: 72.94555096970849 } } },
                place_id: 'ChIJxRWV5J3jbDsRMOJtnlCh9H0',
                types: [ 'premise' ]
              }
            ],
            status: 'OK'
          }
        }
      }, 'to be parsed as', parsed);
    });

    it('Russia 1`', function() {
      var address = 'Станиславского, 17, Новосибирск, Новосибирская обл., Russia, 630054';
      var parsed =   {
        state: 'Novosibirskaya oblast\'', // should be removed
        country: 'Russia', // should be removed
        city: 'Novosibirsk', // should be removed
        zip: '630054', // should be removed
        address: 'ulitsa Stanislavskogo 17' // should be removed
      };
      
      return expect(address, 'with http mocked out', {
        request: { url: 'GET /maps/api/geocode/json?address=Станиславского,%2017,%20Новосибирск,%20Новосибирская%20обл.,%20Russia,%20630054', headers: { Host: 'maps.googleapis.com' } },
        response: {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8', Expires: 'Wed, 17 Jun 2015 14:17:53 GMT', 'Cache-Control': 'public, max-age=86400', 'Access-Control-Allow-Origin': '*', Server: 'mafe', 'X-XSS-Protection': '1; mode=block', 'X-Frame-Options': 'SAMEORIGIN', 'Alternate-Protocol': '443:quic,p=1', 'Accept-Ranges': 'none',
            Vary: 'Accept-Language,Accept-Encoding'
          },
          body: {
            results: [
              {
                address_components: [
                  { long_name: '17', short_name: '17', types: [ 'street_number' ] },
                  { long_name: 'ulitsa Stanislavskogo', short_name: 'ul. Stanislavskogo', types: [ 'route' ] },
                  { long_name: 'Novosibirsk', short_name: 'Novosibirsk', types: [ 'locality', 'political' ] },
                  { long_name: 'gorod Novosibirsk', short_name: 'g. Novosibirsk', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Novosibirskaya oblast\'', short_name: 'Novosibirskaya oblast\'', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Russia', short_name: 'RU', types: [ 'country', 'political' ] },
                  { long_name: '630054', short_name: '630054', types: [ 'postal_code' ] }
                ],
                formatted_address: 'ulitsa Stanislavskogo, 17, Novosibirsk, Novosibirskaya oblast\', Russia, 630054',
                geometry: { location: { lat: 54.981065, lng: 82.872446 }, location_type: 'ROOFTOP', viewport: { northeast: { lat: 54.9824139802915, lng: 82.8737949802915 }, southwest: { lat: 54.9797160197085, lng: 82.8710970197085 } } },
                place_id: 'ChIJnZAdAtHm30IRs2IJB0Yrbxo',
                types: [ 'street_address' ]
              }
            ],
            status: 'OK'
          }
        }
      }, 'to be parsed as', parsed);
    });

    it('Australia 1`', function() {
      var address = '580 George Street Sydney NSW 2000, Australia';
      var parsed =   {
        state: 'New South Wales', // should be removed
        country: 'Australia', // should be removed
        city: 'Sydney', // should be removed
        zip: '2000', // should be removed
        address: '580 George Street' // should be removed
      };

      return expect(address, 'with http mocked out', {
        request: { url: 'GET /maps/api/geocode/json?address=580%20George%20Street%20Sydney%20NSW%202000,%20Australia', headers: { Host: 'maps.googleapis.com' } },
        response: {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8', Expires: 'Wed, 17 Jun 2015 14:19:17 GMT', 'Cache-Control': 'public, max-age=86400', 'Access-Control-Allow-Origin': '*', Server: 'mafe', 'X-XSS-Protection': '1; mode=block', 'X-Frame-Options': 'SAMEORIGIN', 'Alternate-Protocol': '443:quic,p=1', 'Accept-Ranges': 'none',
            Vary: 'Accept-Language,Accept-Encoding'
          },
          body: {
            results: [
              {
                address_components: [
                  { long_name: '580', short_name: '580', types: [ 'street_number' ] },
                  { long_name: 'George Street', short_name: 'George St', types: [ 'route' ] },
                  { long_name: 'Sydney', short_name: 'Sydney', types: [ 'locality', 'political' ] },
                  { long_name: 'New South Wales', short_name: 'NSW', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Australia', short_name: 'AU', types: [ 'country', 'political' ] },
                  { long_name: '2000', short_name: '2000', types: [ 'postal_code' ] }
                ],
                formatted_address: '580 George Street, Sydney NSW 2000, Australia',
                geometry: { bounds: { northeast: { lat: -33.8747603, lng: 151.2067372 }, southwest: { lat: -33.8747646, lng: 151.2067195 } }, location: { lat: -33.8747646, lng: 151.2067372 }, location_type: 'RANGE_INTERPOLATED', viewport: { northeast: { lat: -33.8734134697085, lng: 151.2080773302915 }, southwest: { lat: -33.87611143029149, lng: 151.2053793697085 } } },
                place_id: 'Ei01ODAgR2VvcmdlIFN0cmVldCwgU3lkbmV5IE5TVyAyMDAwLCBBdXN0cmFsaWE',
                types: [ 'street_address' ]
              }
            ],
            status: 'OK'
          }
        }
      }, 'to be parsed as', parsed);
    });

    it('Denmark 1`', function() {
      var address = 'Grønbakken 1, copenhagen';
      var parsed =   {
        state: 'København', // should be removed
        country: 'Denmark', // should be removed
        city: 'København', // should be removed
        zip: '2720', // should be removed
        address: 'Grønbakken 1' // should be removed
      };

      return expect(address, 'with http mocked out', {
        request: { url: 'GET /maps/api/geocode/json?address=Grønbakken%201,%20copenhagen', headers: { Host: 'maps.googleapis.com' } },
        response: {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8', Expires: 'Wed, 17 Jun 2015 14:28:21 GMT', 'Cache-Control': 'public, max-age=86400', 'Access-Control-Allow-Origin': '*', Server: 'mafe', 'X-XSS-Protection': '1; mode=block', 'X-Frame-Options': 'SAMEORIGIN', 'Alternate-Protocol': '443:quic,p=1', 'Accept-Ranges': 'none',
            Vary: 'Accept-Language,Accept-Encoding'
          },
          body: {
            results: [
              {
                address_components: [
                  { long_name: '1', short_name: '1', types: [ 'street_number' ] },
                  { long_name: 'Grønbakken', short_name: 'Grønbakken', types: [ 'route' ] },
                  { long_name: 'Vanløse', short_name: 'Vanløse', types: [ 'sublocality_level_1', 'sublocality', 'political' ] },
                  { long_name: 'København', short_name: 'kbh', types: [ 'locality', 'political' ] },
                  { long_name: 'København', short_name: 'København', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Denmark', short_name: 'DK', types: [ 'country', 'political' ] },
                  { long_name: '2720', short_name: '2720', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Grønbakken 1, 2720 Vanløse, Denmark',
                geometry: { location: { lat: 55.684614, lng: 12.494206 }, location_type: 'ROOFTOP', viewport: { northeast: { lat: 55.6859629802915, lng: 12.4955549802915 }, southwest: { lat: 55.6832650197085, lng: 12.4928570197085 } } },
                place_id: 'ChIJ0WTMLdlTUkYRpgz86aEKs40',
                types: [ 'street_address' ]
              }
            ],
            status: 'OK'
          }
        }
      }, 'to be parsed as', parsed);
    });

  });

  describe('should apply a config and parse accordingly', function() {

    it('Italy 1 with config', function() {
      var lookupTable = {
        address: [
          'street_address',
          'street_number',
          'route',
          'premise',
          'subpremise',
          'neighborhood',
          'point_of_interest',
          'park',
          'airport',
          'locality',
          'sublocality',
          'sublocality_level_1',
          'sublocality_level_2',
          'sublocality_level_3',
          'sublocality_level_4',
          'sublocality_level_5'
        ],
        country: [
          'country'
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
      };
      geomaton.config(lookupTable);

      var address = 'via Milano 25, Cologno Monzese';
      var parsed =    {
          state: 'Lombardia', // should be removed
          country: 'Italy', // should be removed
          zip: '20093', // should be removed
          address: 'Via Milano 25 Cologno Monzese' // should be removed
        };
      return expect(address, 'with http mocked out', {
        request: { url: 'GET /maps/api/geocode/json?address=via%20Milano%2025,%20Cologno%20Monzese', headers: { Host: 'maps.googleapis.com' } },
        response: {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8', Expires: 'Wed, 17 Jun 2015 21:10:30 GMT', 'Cache-Control': 'public, max-age=86400', 'Access-Control-Allow-Origin': '*', Server: 'mafe',
            'X-XSS-Protection': '1; mode=block', 'X-Frame-Options': 'SAMEORIGIN', 'Alternate-Protocol': '443:quic,p=1', 'Accept-Ranges': 'none', Vary: 'Accept-Language,Accept-Encoding'
          },
          body: {
            results: [
              {
                address_components: [
                  { long_name: '25', short_name: '25', types: [ 'street_number' ] },
                  { long_name: 'Via Milano', short_name: 'Via Milano', types: [ 'route' ] },
                  { long_name: 'Cologno Monzese', short_name: 'Cologno Monzese', types: [ 'locality', 'political' ] },
                  { long_name: 'Cologno Monzese', short_name: 'Cologno Monzese', types: [ 'administrative_area_level_3', 'political' ] },
                  { long_name: 'Città Metropolitana di Milano', short_name: 'MI', types: [ 'administrative_area_level_2', 'political' ] },
                  { long_name: 'Lombardia', short_name: 'Lombardia', types: [ 'administrative_area_level_1', 'political' ] },
                  { long_name: 'Italy', short_name: 'IT', types: [ 'country', 'political' ] },
                  { long_name: '20093', short_name: '20093', types: [ 'postal_code' ] }
                ],
                formatted_address: 'Via Milano, 25, 20093 Cologno Monzese MI, Italy',
                geometry: {
                  location: { lat: 45.52802459999999, lng: 9.2784896 },
                  location_type: 'ROOFTOP',
                  viewport: { northeast: { lat: 45.5293735802915, lng: 9.279838580291502 }, southwest: { lat: 45.5266756197085, lng: 9.277140619708497 } }
                },
                place_id: 'ChIJh5DvQQq4hkcRhubw8kLWTic',
                types: [ 'street_address' ]
              }
            ],
            status: 'OK'
          }
        }
      }, 'to be parsed as', parsed);
    });

  });

});
