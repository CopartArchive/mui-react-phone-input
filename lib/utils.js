'use strict';

exports.__esModule = true;
exports.isModernBrowser = exports.isNumberValid = exports.getUnformattedValue = undefined;

var _some = require('lodash/some');

var _some2 = _interopRequireDefault(_some);

var _startsWith = require('lodash/startsWith');

var _startsWith2 = _interopRequireDefault(_startsWith);

var _countryTelephoneData = require('country-telephone-data');

var _countryTelephoneData2 = _interopRequireDefault(_countryTelephoneData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DELIMITER_REGEX = /([.?*+^$[\]\\(){}|-\s])/g;
var getUnformattedValue = exports.getUnformattedValue = function getUnformattedValue(formattedValue) {
  return formattedValue.replace(DELIMITER_REGEX, '');
};
var isNumberValid = exports.isNumberValid = function isNumberValid(inputNumber) {
  var countries = _countryTelephoneData2.default.allCountries;
  return (0, _some2.default)(countries, function (country) {
    return (0, _startsWith2.default)(inputNumber, country.dialCode) || (0, _startsWith2.default)(country.dialCode, inputNumber);
  });
};

var isModernBrowser = exports.isModernBrowser = typeof document !== 'undefined' ? Boolean(document.createElement('input').setSelectionRange) : true;