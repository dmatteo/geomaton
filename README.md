
# geomaton

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
jsdomify.create()
```

Create a new DOM instance (with or withouth the optional DOM string).

### config()
TODO: add doc


## Usage examples
TODO: add example using Google own example

## Test

```
npm install
mocha
```

## License
MIT