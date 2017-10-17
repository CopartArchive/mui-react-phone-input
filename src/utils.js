import some from 'lodash/some';
import startsWith from 'lodash/startsWith';
import countryData from 'country-telephone-data';


const DELIMITER_REGEX = /([.?*+^$[\]\\(){}|-\s])/g
export const getUnformattedValue = formattedValue => formattedValue.replace(DELIMITER_REGEX, '')
export const isNumberValid = (inputNumber) => {
  const countries = countryData.allCountries;
  return some(countries, country => startsWith(inputNumber, country.dialCode) ||
    startsWith(country.dialCode, inputNumber))
}

export const isModernBrowser = (typeof document !== 'undefined') ? Boolean(document.createElement('input').setSelectionRange) : true
