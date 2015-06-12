

  var geocoder;

  var lookupTable = {
    street_address: 'address',
    street_number: 'address',
    route: 'address',
    intersection: 'address',
    political: 'city',
    country: 'country',
    administrative_area_level_1: 'state',
    administrative_area_level_2: 'state', // these are US counties
    administrative_area_level_3: 'state', // smaller and smaller
    administrative_area_level_4: 'state', // ignore or concat?
    administrative_area_level_5: 'state',
    colloquial_area: 'city',
    locality: 'city',
    ward: 'city',
    sublocality: 'city',
    sublocality_level_1: 'city',
    sublocality_level_2: 'city',
    sublocality_level_3: 'city',
    sublocality_level_4: 'city',
    sublocality_level_5: 'city',
    neighborhood: 'address',
    premise: 'address',
    subpremise: 'address',
    postal_code: 'zip',
    natural_feature: 'address',
    airport: 'address',
    park: 'address',
    point_of_interest: 'address'
  };

  function initialize() {
    geocoder = new google.maps.Geocoder();
  }

  function codeAddressAndShowList() {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function (results, status) {

      String.prototype.splice = function(index, count, add) {
        return this.slice(0, index) + (add || "") + this.slice(index + count);
      };

      if (status == google.maps.GeocoderStatus.OK) {

        var struct = '<div class="address-segment"><strong>Formatted: </strong>'+results[0].formatted_address+'</div>';
        var parsed = '<div class="address-segment">';

        console.log(results);

        var structured = results[0].address_components;
        var formatted = results[0].formatted_address;
        var purgedFormatted = formatted;

        structured.map(function (comp) {
          struct += '<div class="address-segment"><pre>' + JSON.stringify(comp, null, 2) + '</pre></div>';

          parsed += subtractiveParsing(comp, formatted);
        });

        parsed += '' +
          '<div>' +
            '<strong>address: </strong>' +
            '<span>'+formatted.replace(/[, ]*$/, '')+'</span>' +
          '</div>';

        $('#structured, #formatted, #panel__results').empty();
        $('#structured').append(struct);
        $('#panel__results').append(parsed + '</div>');


      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  function subtractiveParsing(comp, formatted) {

    if (!lookupTable[comp.types[0]] || lookupTable[comp.types[0]] === 'address') {
      return ;
    }

    var parsed = '';

    var sIdx = formatted.lastIndexOf(comp.short_name), start, end;
    var lIdx = formatted.lastIndexOf(comp.long_name);

    if (sIdx !== -1) {
      start = formatted[sIdx - 1];
      end = formatted[sIdx + comp.short_name.length];

      if ((sIdx === 0 || start === ' ' || start === ',') &&
        (end === undefined || end === ' ' || end === ',' )) {
        parsed += '' +
          '<div>' +
          '<strong>'+lookupTable[comp.types[0]]+': </strong>' +
          '<span>'+comp.short_name+'</span>' +
          '</div>';

        formatted = formatted.splice(sIdx, comp.short_name.length);
      }

    } else if (lIdx !== -1) {
      start = formatted[lIdx - 1];
      end = formatted[lIdx + comp.long_name.length];

      if ((lIdx === 0 || start === ' ' || start === ',') &&
        (end === undefined || end === ' ' || end === ',' )) {
        parsed += '' +
          '<div>' +
          '<strong>'+lookupTable[comp.types[0]]+': </strong>' +
          '<span>'+comp.long_name+'</span>' +
          '</div>';

        formatted = formatted.splice(lIdx, comp.long_name.length);
      }
    }

    return parsed;
  }

  google.maps.event.addDomListener(window, 'load', initialize);

