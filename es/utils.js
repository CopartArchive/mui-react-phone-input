import some from 'lodash/some';
import startsWith from 'lodash/startsWith';
import countryData from 'country-telephone-data';

var DELIMITER_REGEX = /([.?*+^$[\]\\(){}|-\s])/g;
export var getUnformattedValue = function getUnformattedValue(formattedValue) {
  return formattedValue.replace(DELIMITER_REGEX, '');
};
export var isNumberValid = function isNumberValid(inputNumber) {
  var countries = countryData.allCountries;
  return some(countries, function (country) {
    return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
  });
};

export var isModernBrowser = typeof document !== 'undefined' ? Boolean(document.createElement('input').setSelectionRange) : true;