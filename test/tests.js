var geomaton = require('../lib/geomaton');

var expect = require('unexpected').clone();
expect.installPlugin(require('unexpected-mitm'));
expect.installPlugin(require('unexpected-http'));

expect.addAssertion('to be parsed as', function (expect, subject, value) {
  return expect('https://maps.googleapis.com/maps/api/geocode/json?address=' + subject, 'to yield response',
    { body: expect.it('when passed as parameter to', geomaton.parse, 'to equal', value) });
});

describe('geomaton.js', function() {

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

});
