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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectableList = (0, _List.MakeSelectable)(_List.List);
var propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape()),
  isOpen: _propTypes2.default.bool.isRequired,
  searchTerm: _propTypes2.default.string.isRequired,
  onListItemSelect: _propTypes2.default.func.isRequired
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
  return _react2.default.createElement(_List.ListItem, {
    innerDivStyle: isHighlighted ? styles.highlightedItem : {},
    primaryText: value,
    value: value
  });
};
AutoSelectOptionsItem.propTypes = process.env.NODE_ENV !== "production" ? {
  value: _propTypes2.default.string.isRequired,
  isHighlighted: _propTypes2.default.bool.isRequired
} : {};

var AutoselectOptions = function (_React$Component) {
  _inherits(AutoselectOptions, _React$Component);

  function AutoselectOptions(props) {
    _classCallCheck(this, AutoselectOptions);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.updateHighlightedItem = function (newSearchTerm) {
      var options = _this.props.options;

      var foundIndex = options.findIndex(function (option) {
        return newSearchTerm && option && option.value.indexOf(newSearchTerm) !== -1;
      });
      _this.setState({
        selectedOption: foundIndex
      });
    };

    _this.handleRequestChange = function (evt, index) {
      _this.setState({
        selectedOption: index
      });
      var selectedValue = _this.props.options[index].value;
      _this.props.onListItemSelect(selectedValue);
    };

    _this.state = {
      displayedOption: props.options.slice(0, 50),
      selectedOption: '-1'
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
    var isOpen = this.props.isOpen;
    var displayedOption = this.state.displayedOption;

    if (!isOpen) {
      return null;
    }
    return _react2.default.createElement(
      _Paper2.default,
      null,
      _react2.default.createElement(
        SelectableList,
        { value: this.state.selectedOption, onChange: this.handleRequestChange, style: { maxHeight: '150px', overflowY: 'auto' } },
        displayedOption.map(function (option, index) {
          return _react2.default.createElement(_List.ListItem, {
            key: option.value,
            primaryText: option.value,
            value: index
          });
        })
      )
    );
  };

  return AutoselectOptions;
}(_react2.default.Component);

AutoselectOptions.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
AutoselectOptions.defaultProps = defaultProps;
exports.default = AutoselectOptions;
module.exports = exports['default'];