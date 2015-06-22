
# geomaton

[![Build Status](https://travis-ci.org/dmatteo/geomaton.svg?branch=master)](https://travis-ci.org/dmatteo/geomaton)
[![Coverage Status](https://coveralls.io/repos/dmatteo/geomaton/badge.svg?branch=master)](https://coveralls.io/r/dmatteo/geomaton?branch=master)
[![Dependency Status](https://david-dm.org/dmatteo/geomaton.svg)](https://david-dm.org/dmatteo/geomaton)


`geomaton` is a parsing library that will let you convert the response you get from Google Geocoding API v3
into an object that may be more suitable for your application, whether is it frontend or backend.  
  
It works by mapping the type of fields available in Google's API (check out the [documentation](https://developers.google.com/maps/documentation/geocoding/#Types))
to the fields you have in your application.  
By default the `output` fields are: 
* address
* city
* zip
* state
* country

You can customize mappings using `geomaton.config()`

## Getting started

```
npm install geomaton
```

## Usage

Just require `geomaton` and pass in your Google Geocoding API response.

```javascript
var geomaton = require('geomaton');
var parsedResult = geomaton.parse(response)
```

Out of the box the address will be structured as:

```javascript
{
  state: 'California',
  country: 'United States',
  city: 'San Francisco',
  zip: '94105',
  address: '2 Market Street'
}
```

## Methods

Other than the parse method, which only takes an API response as parameter,
`geomaton` expose a `config()` method that can be used to configure the parsing

### parse(apiResponse)

```javascript
var parsedResponse = geomaton.parse(response)
```

Create a new DOM instance (with or withouth the optional DOM string).

### config()

You can configure the parsing by passing a custom `lookupTable` into `geomaton`
```javascript
geomaton.config(lookupTable)
```
  
  
Below is the default lookupTable that `geomaton` will use if you don't provide your own.  
This table contains all the types that Google Geocode API V3 can return.
 
```javascript
{
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
}
```

While providing your lookupTable, The only mandatory property is `address`, while all the others can be 
whatever you want (or even non existent)
## Usage examples
TODO: add example using Google own example

## Test

```
npm install
mocha
```

## License

The MIT License (MIT)  
  
Permission is hereby granted, free of charge, to any person obtaining a copy    
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  
  
The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.  
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.  
  