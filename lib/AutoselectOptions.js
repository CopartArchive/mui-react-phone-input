'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _List = require('material-ui/List');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape()),
  isOpen: _propTypes2.default.bool.isRequired,
  onListItemSelect: _propTypes2.default.func.isRequired
};
var defaultProps = {
  options: []
};

var AutoSelectOptionsItem = function AutoSelectOptionsItem(_ref) {
  var value = _ref.value,
      onListItemSelect = _ref.onListItemSelect;

  var handleAutoSelectTouchTap = function handleAutoSelectTouchTap(selectedValue) {
    return function () {
      return onListItemSelect(selectedValue);
    };
  };
  return _react2.default.createElement(_List.ListItem, { primaryText: value, onTouchTap: handleAutoSelectTouchTap(value) });
};
AutoSelectOptionsItem.propTypes = process.env.NODE_ENV !== "production" ? {
  value: _propTypes2.default.string.isRequired,
  onListItemSelect: _propTypes2.default.func.isRequired
} : {};
var AutoselectOptions = function AutoselectOptions(_ref2) {
  var options = _ref2.options,
      onListItemSelect = _ref2.onListItemSelect,
      isOpen = _ref2.isOpen;
  return isOpen && _react2.default.createElement(
    _Paper2.default,
    null,
    _react2.default.createElement(
      _List.List,
      null,
      options.map(function (option) {
        return _react2.default.createElement(AutoSelectOptionsItem, {
          key: option.value,
          value: option.value,
          onListItemSelect: onListItemSelect
        });
      })
    )
  );
};
AutoselectOptions.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AutoselectOptions.defaultProps = defaultProps;
exports.default = AutoselectOptions;
module.exports = exports['default'];