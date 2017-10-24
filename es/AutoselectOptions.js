var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { AutoSizer, List as VirtualList } from 'react-virtualized';
import { ListItem } from 'material-ui/List';

var OPTIONS_ROW_HEIGHT = 50;
var optionStyleProps = {
  rowHeight: 72,
  optionsMinHeight: 200
};
var propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()),
  isOpen: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onListItemSelect: PropTypes.func.isRequired
};
var defaultProps = {
  options: []
};

var styles = {
  highlightedItem: { backgroundColor: 'rgba(0,0,0,0.1)' }
};
var AutoSelectOptionsItem = function AutoSelectOptionsItem(_ref) {
  var value = _ref.value,
      isHighlighted = _ref.isHighlighted;
  return React.createElement(ListItem, {
    innerDivStyle: isHighlighted ? styles.highlightedItem : {},
    primaryText: value,
    value: value
  });
};
AutoSelectOptionsItem.propTypes = process.env.NODE_ENV !== "production" ? {
  value: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool.isRequired
} : {};

var AutoselectOptions = function (_React$Component) {
  _inherits(AutoselectOptions, _React$Component);

  function AutoselectOptions(props) {
    _classCallCheck(this, AutoselectOptions);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.updateHighlightedItem = function (newSearchTerm) {
      var options = _this.props.options;

      var foundIndex = options.findIndex(function (option) {
        return newSearchTerm && option && option.value.startsWith(newSearchTerm);
      });
      _this.setState({
        selectedOption: foundIndex
      });
    };

    _this.handleListItemTouchTap = function (option) {
      return function () {
        _this.props.onListItemSelect(option.value);
      };
    };

    _this.state = {
      selectedOption: null
    };
    return _this;
  }

  AutoselectOptions.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var currentSearchTerm = this.props.searchTerm;
    var newSearchTerm = nextProps.searchTerm;
    if (currentSearchTerm !== newSearchTerm) {
      this.updateHighlightedItem(newSearchTerm);
    }
  };

  AutoselectOptions.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        isOpen = _props.isOpen,
        options = _props.options;
    var optionsStyleWidth = optionStyleProps.width,
        optionStyleRowHeight = optionStyleProps.rowHeight,
        optionStyleMinHeight = optionStyleProps.optionsMinHeight;

    if (!isOpen) {
      return null;
    }
    return React.createElement(
      Paper,
      null,
      React.createElement(VirtualList, {
        name: name,
        scrollToIndex: this.state.selectedOption,
        width: Math.max(optionsStyleWidth || 200, 190),
        height: Math.min(options.length * optionStyleRowHeight, optionStyleMinHeight),
        rowCount: options.length,
        rowHeight: optionStyleProps.rowHeight || OPTIONS_ROW_HEIGHT,
        className: styles.options,
        tabIndex: -1,
        rowRenderer: function rowRenderer(_ref2) {
          var i = _ref2.index,
              key = _ref2.key,
              style = _ref2.style;
          return React.createElement(ListItem, {
            key: key,
            primaryText: options[i].value,
            value: i,
            innerDivStyle: i === _this2.state.selectedOption ? styles.highlightedItem : {},
            onClick: _this2.handleListItemTouchTap(options[i])
          });
        }
      })
    );
  };

  return AutoselectOptions;
}(React.Component);

AutoselectOptions.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AutoselectOptions.defaultProps = defaultProps;

var AutoSizedAutoSelectOptions = function AutoSizedAutoSelectOptions(props) {
  return React.createElement(
    AutoSizer,
    null,
    function (_ref3) {
      var width = _ref3.width;
      return React.createElement(AutoselectOptions, _extends({}, props, { width: width }));
    }
  );
};
export default AutoSizedAutoSelectOptions;