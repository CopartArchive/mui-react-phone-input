import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';

var propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()),
  isOpen: PropTypes.bool.isRequired,
  onListItemSelect: PropTypes.func.isRequired
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
  return React.createElement(ListItem, { primaryText: value, onTouchTap: handleAutoSelectTouchTap(value) });
};
AutoSelectOptionsItem.propTypes = process.env.NODE_ENV !== "production" ? {
  value: PropTypes.string.isRequired,
  onListItemSelect: PropTypes.func.isRequired
} : {};
var AutoselectOptions = function AutoselectOptions(_ref2) {
  var options = _ref2.options,
      onListItemSelect = _ref2.onListItemSelect,
      isOpen = _ref2.isOpen;
  return isOpen && React.createElement(
    Paper,
    null,
    React.createElement(
      List,
      null,
      options.map(function (option) {
        return React.createElement(AutoSelectOptionsItem, {
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
export default AutoselectOptions;