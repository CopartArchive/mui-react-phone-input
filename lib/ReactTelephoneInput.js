'use strict';

exports.__esModule = true;

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _first = require('lodash/first');

var _first2 = _interopRequireDefault(_first);

var _tail = require('lodash/tail');

var _tail2 = _interopRequireDefault(_tail);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _memoize = require('lodash/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _trim = require('lodash/trim');

var _trim2 = _interopRequireDefault(_trim);

var _startsWith = require('lodash/startsWith');

var _startsWith2 = _interopRequireDefault(_startsWith);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _countryTelephoneData = require('country-telephone-data');

var _countryTelephoneData2 = _interopRequireDefault(_countryTelephoneData);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require('material-ui/List');

var _utils = require('./utils');

var _default = require('../css/default.css');

var _default2 = _interopRequireDefault(_default);

var _flags = require('../images/flags.png');

var _flags2 = _interopRequireDefault(_flags);

var _AutoselectOptions = require('./AutoselectOptions');

var _AutoselectOptions2 = _interopRequireDefault(_AutoselectOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO - fix the onlyContries props.
// Currently expects that as an array of country object,
// but users should be able to send in array of country isos

// import lodash string methods


var allCountries = _countryTelephoneData2.default.allCountries;
var iso2Lookup = _countryTelephoneData2.default.iso2Lookup;
var allCountryCodes = _countryTelephoneData2.default.allCountryCodes;

var keys = {
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  LEFT: 37,
  ENTER: 13,
  ESC: 27,
  PLUS: 43,
  A: 65,
  Z: 90,
  SPACE: 32
};

var getFlagStyle = function getFlagStyle() {
  var flagsImagePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _flags2.default;
  return {
    backgroundImage: 'url(' + flagsImagePath + ')'
  };
};
var FlagIcon = function FlagIcon(_ref) {
  var inputFlagClasses = _ref.inputFlagClasses;
  return _react2.default.createElement('div', { className: inputFlagClasses, style: getFlagStyle() });
};

FlagIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  inputFlagClasses: _propTypes2.default.string
} : {};
FlagIcon.defaultProps = {
  inputFlagClasses: ''
};

var CountryText = function CountryText(_ref2) {
  var name = _ref2.name,
      dialCode = _ref2.dialCode;
  return _react2.default.createElement(
    'span',
    null,
    _react2.default.createElement(
      'span',
      { className: 'country-name' },
      name
    ),
    _react2.default.createElement(
      'span',
      { className: 'dial-code' },
      dialCode
    )
  );
};

CountryText.propTypes = process.env.NODE_ENV !== "production" ? {
  name: _propTypes2.default.string,
  dialCode: _propTypes2.default.string
} : {};
CountryText.defaultProps = {
  name: '',
  dialCode: ''
};

var propTypes = {
  value: _propTypes2.default.string,
  initialValue: _propTypes2.default.string,
  style: _propTypes2.default.shape(),
  errorText: _propTypes2.default.string,
  autoFormat: _propTypes2.default.bool,
  defaultCountry: _propTypes2.default.string,
  onlyCountries: _propTypes2.default.arrayOf(_propTypes2.default.object),
  preferredCountries: _propTypes2.default.arrayOf(_propTypes2.default.string),
  classNames: _propTypes2.default.string,
  className: _propTypes2.default.string,
  inputId: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onEnterKeyPress: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  pattern: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  autoComplete: _propTypes2.default.bool,
  isValid: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  flagDropDownEnabled: _propTypes2.default.bool,
  floatingLabelText: _propTypes2.default.string,
  floatingLabelStyle: _propTypes2.default.shape(),
  name: _propTypes2.default.string,
  inputStyle: _propTypes2.default.shape(),
  underlineFocusStyle: _propTypes2.default.shape(),
  floatingLabelFixed: _propTypes2.default.bool,
  multiLine: _propTypes2.default.bool,
  hintStyle: _propTypes2.default.shape(),
  autoSelect: _propTypes2.default.bool,
  autoSelectOptions: _propTypes2.default.arrayOf(_propTypes2.default.shape())
};
var defaultProps = {
  autoFormat: true,
  errorText: '',
  onlyCountries: allCountries,
  defaultCountry: '',
  isValid: _utils.isNumberValid,
  flagsImagePath: 'flags.png',
  onEnterKeyPress: null,
  preferredCountries: [],
  disabled: false,
  placeholder: ' 1 (702) 123-4567',
  autoComplete: false,
  required: false,
  inputId: 'telephone-input',
  flagDropDownEnabled: true,
  onChange: null,
  floatingLabelText: '',
  floatingLabelStyle: {},
  name: 'phone',
  inputStyle: {},
  underlineFocusStyle: {},
  floatingLabelFixed: true,
  multiLine: false,
  hintStyle: {},
  autoSelect: false,
  autoSelectOptions: []
};

var ReactTelephoneInput = function (_React$Component) {
  _inherits(ReactTelephoneInput, _React$Component);

  function ReactTelephoneInput(props) {
    _classCallCheck(this, ReactTelephoneInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleKeydown = function (event) {
      if (!_this.state.showDropDown) {
        return;
      }
      // ie hack
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false; // eslint-disable-line no-param-reassign
      }

      var self = _this;
      function _moveHighlight(direction) {
        self.setState({
          highlightCountryIndex: self._getHighlightCountryIndex(direction)
        }, function () {
          self.scrollTo(self.getElement(self.state.highlightCountryIndex), true);
        });
      }

      switch (event.which) {
        case keys.DOWN:
          _moveHighlight(1);
          break;
        case keys.UP:
          _moveHighlight(-1);
          break;
        case keys.ENTER:
          _this.handleFlagItemClick(_this.state.preferredCountries.concat(_this.props.onlyCountries)[_this.state.highlightCountryIndex], event);
          break;
        case keys.ESC:
          _this.setState({ showDropDown: false }, _this._cursorToEnd);
          break;
        default:
          if (event.which >= keys.A && event.which <= keys.Z || event.which === keys.SPACE) {
            _this.setState({
              queryString: _this.state.queryString + String.fromCharCode(event.which)
            }, _this.state.debouncedQueryStingSearcher);
          }
      }
    };

    _this.handleInputKeyDown = function (event) {
      var _this$props = _this.props,
          onEnterKeyPress = _this$props.onEnterKeyPress,
          onKeyDown = _this$props.onKeyDown;

      if (event.which === keys.ENTER) {
        if (typeof onEnterKeyPress === 'function') {
          onEnterKeyPress(event);
        }
      }
      if (typeof onKeyDown === 'function') {
        onKeyDown(event);
      }
    };

    _this.handleInputClick = function () {
      _this.setState({ showDropDown: false });
    };

    _this.handleInputFocus = function () {
      var _this$props2 = _this.props,
          onFocus = _this$props2.onFocus,
          onClick = _this$props2.onClick;
      var _this$state = _this.state,
          formattedNumber = _this$state.formattedNumber,
          selectedCountry = _this$state.selectedCountry;
      // trigger parent component's onFocus handler

      if (typeof onFocus === 'function') {
        onFocus(formattedNumber, selectedCountry);
      }
      _this._fillDialCode();
      if (typeof onClick === 'function') {
        onClick(formattedNumber, selectedCountry);
      }
    };

    _this.handleInput = function (event) {
      var formattedNumber = '+';
      var newSelectedCountry = _this.state.selectedCountry;
      var freezeSelection = _this.state.freezeSelection;

      // if the input is the same as before, must be some special key like enter etc.
      if (event.target.value === _this.state.formattedNumber) {
        return;
      }

      // ie hack
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false; // eslint-disable-line no-param-reassign
      }

      if (event.target.value.length > 0) {
        /* before entering the number in new format,
         lets check if the dial code now matches some other country */
        var inputNumber = event.target.value.replace(/\D/g, '');

        /* we don't need to send the whole number to guess the country...
        only the first 6 characters are enough
        the guess country function can then use memoization much more effectively
         since the set of input it gets has drastically reduced */
        if (!_this.state.freezeSelection || _this.state.selectedCountry.dialCode.length > inputNumber.length) {
          newSelectedCountry = _this.guessSelectedCountry(inputNumber.substring(0, 6));
          freezeSelection = false;
        }
        // let us remove all non numerals from the input
        formattedNumber = _this.formatNumber(inputNumber, newSelectedCountry.format);
      }

      var caretPosition = event.target.selectionStart;
      var oldFormattedText = _this.state.formattedNumber;
      var diff = formattedNumber.length - oldFormattedText.length;

      var onSetStateComplete = function onSetStateComplete() {
        if (_utils.isModernBrowser) {
          if (caretPosition === 1 && formattedNumber.length === 2) {
            caretPosition += 1;
          }

          if (diff > 0) {
            caretPosition -= diff;
          }

          if (caretPosition > 0 && oldFormattedText.length >= formattedNumber.length) {
            _this.numberInput.input.setSelectionRange(caretPosition, caretPosition);
          }
        }

        if (_this.props.onChange) {
          _this.props.onChange(_this.numberInput.input, _this.state.formattedNumber, _this.state.selectedCountry, (0, _utils.getUnformattedValue)(_this.state.formattedNumber));
        }
      };
      _this.setState({
        formattedNumber: formattedNumber,
        freezeSelection: freezeSelection,
        selectedCountry: newSelectedCountry.dialCode.length > 0 ? newSelectedCountry : _this.state.selectedCountry
      }, onSetStateComplete);
    };

    _this.handleFlagDropdownClick = function (e) {
      if (_this.props.disabled) {
        return;
      }

      e.preventDefault();
      /* need to put the highlight on the current selected country
        if the dropdown is going to open up */
      _this.setState({
        showDropDown: !_this.state.showDropDown,
        highlightCountry: (0, _find2.default)(_this.props.onlyCountries, _this.state.selectedCountry),
        highlightCountryIndex: (0, _findIndex2.default)(_this.state.preferredCountries.concat(_this.props.onlyCountries), _this.state.selectedCountry)
      }, function () {
        // only need to scrool if the dropdown list is alive
        if (_this.state.showDropDown) {
          _this.scrollTo(_this.getElement(_this.state.highlightCountryIndex + _this.state.preferredCountries.length));
        }
      });
    };

    _this.handleInputBlur = function () {
      if (typeof _this.props.onBlur === 'function') {
        _this.props.onBlur(_this.state.formattedNumber, _this.state.selectedCountry);
      }
    };

    _this.handleAutoselectListSelect = function (selectedValue) {
      var formattedNumber = '+';
      // if the input is the same as before, must be some special key like enter etc.
      if (selectedValue === _this.state.formattedNumber) {
        return;
      }
      var newSelectedCountry = _this.guessSelectedCountry(selectedValue.substring(0, 6));
      formattedNumber = _this.formatNumber(selectedValue, newSelectedCountry.format);
      console.log(_this.numberInput, 'numberinput');
      var caretPosition = _this.numberInput.input.selectionStart;
      var oldFormattedText = _this.state.formattedNumber;
      var diff = formattedNumber.length - oldFormattedText.length;
      _this.numberInput.input.focus();
      var onSetStateComplete = function onSetStateComplete() {
        if (_utils.isModernBrowser) {
          if (caretPosition === 1 && formattedNumber.length === 2) {
            caretPosition += 1;
          }

          if (diff > 0) {
            caretPosition -= diff;
          }

          if (caretPosition > 0 && oldFormattedText.length >= formattedNumber.length) {
            _this.numberInput.input.setSelectionRange(caretPosition, caretPosition);
          }
        }

        if (_this.props.onChange) {
          _this.props.onChange(_this.numberInput.input, _this.state.formattedNumber, _this.state.selectedCountry, (0, _utils.getUnformattedValue)(_this.state.formattedNumber));
        }
      };
      _this.setState({
        formattedNumber: formattedNumber,
        selectedCountry: newSelectedCountry.dialCode.length > 0 ? newSelectedCountry : _this.state.selectedCountry
      }, onSetStateComplete);
    };

    _this._searchCountry = (0, _memoize2.default)(function (queryString) {
      if (!queryString || queryString.length === 0) {
        return null;
      }
      // don't include the preferred countries in search
      var probableCountries = (0, _filter2.default)(_this.props.onlyCountries, function (country) {
        return (0, _startsWith2.default)(country.name.toLowerCase(), queryString.toLowerCase());
      }, _this);
      return probableCountries[0];
    });

    var preferredCountries = _this.props.preferredCountries.map(function (iso2) {
      return iso2Lookup.hasOwnProperty(iso2) ? allCountries[iso2Lookup[iso2]] : null;
    }).filter(function (val) {
      return val !== null;
    });
    _this.state = (0, _assign2.default)({}, {
      preferredCountries: preferredCountries,
      showDropDown: false,
      suggestionsOpen: false,
      queryString: '',
      freezeSelection: false,
      debouncedQueryStingSearcher: (0, _debounce2.default)(_this.searchCountry, 300)
    }, _this._mapPropsToState(_this.props, true));
    return _this;
  }

  ReactTelephoneInput.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    this._cursorToEnd(true);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.numberInput.input, this.state.formattedNumber, this.state.selectedCountry, (0, _utils.getUnformattedValue)(this.state.formattedNumber));
    }
  };

  ReactTelephoneInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(this._mapPropsToState(nextProps));
  };

  ReactTelephoneInput.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !(0, _isEqual2.default)(nextProps, this.props) || !(0, _isEqual2.default)(nextState, this.state);
  };

  ReactTelephoneInput.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  };

  ReactTelephoneInput.prototype.getNumber = function getNumber() {
    return this.state.formattedNumber !== '+' ? this.state.formattedNumber : '';
  };

  ReactTelephoneInput.prototype.getValue = function getValue() {
    return this.getNumber();
  };

  ReactTelephoneInput.prototype.getElement = function getElement(index) {
    return _reactDom2.default.findDOMNode(this.refs['flag_no_' + index]);
  };

  ReactTelephoneInput.prototype.getCountryDropDownList = function getCountryDropDownList() {
    var _classNames3,
        _this2 = this;

    var countryStyle = _default2.default.country,
        preferred = _default2.default.preferred,
        highlight = _default2.default.highlight,
        flagIconStyle = _default2.default.flag,
        countryListStyle = _default2.default['country-list'],
        hideStyle = _default2.default.hide;

    var self = this;
    var countryDropDownList = (0, _map2.default)(this.state.preferredCountries.concat(this.props.onlyCountries), function (country, index) {
      var _classNames, _classNames2;

      var itemClasses = (0, _classnames2.default)((_classNames = {}, _classNames['' + countryStyle] = true, _classNames['' + preferred] = (0, _findIndex2.default)(self.state.preferredCountries, { iso2: country.iso2 }) >= 0, _classNames['' + highlight] = self.state.highlightCountryIndex === index, _classNames));
      var inputFlagClasses = (0, _classnames2.default)((_classNames2 = {}, _classNames2['' + flagIconStyle] = true, _classNames2['' + _default2.default[country.iso2]] = true, _classNames2));
      // const inputFlagClasses = `flag ${country.iso2}`;

      return _react2.default.createElement(_List.ListItem, {
        ref: 'flag_no_' + index,
        key: 'flag_no_' + index,
        'data-flag-key': 'flag_no_' + index,
        className: itemClasses,
        'data-dial-code': '1',
        'data-country-code': country.iso2,
        onTouchTap: self.handleFlagItemClick.bind(self, country),
        leftIcon: _react2.default.createElement(FlagIcon, { inputFlagClasses: inputFlagClasses }),
        primaryText: _react2.default.createElement(CountryText, { name: country.name, dialCode: country.dialCode })
      });
    });

    var dashedLi = _react2.default.createElement(_Divider2.default, { key: 'divider' });
    // let's insert a dashed line in between preffered countries and the rest
    countryDropDownList.splice(this.state.preferredCountries.length, 0, dashedLi);

    var dropDownClasses = (0, _classnames2.default)((_classNames3 = {}, _classNames3['' + countryListStyle] = true, _classNames3['' + hideStyle] = !this.state.showDropDown, _classNames3));
    return _react2.default.createElement(
      _List.List,
      { ref: function ref(elem) {
          return _this2.flagDropdownList = elem;
        }, className: dropDownClasses },
      countryDropDownList
    );
  };

  ReactTelephoneInput.prototype.searchCountry = function searchCountry() {
    var probableCandidate = this._searchCountry(this.state.queryString) || this.props.onlyCountries[0];
    var probableCandidateIndex = (0, _findIndex2.default)(this.props.onlyCountries, probableCandidate) + this.state.preferredCountries.length;
    this.scrollTo(this.getElement(probableCandidateIndex), true);

    this.setState({
      queryString: '',
      highlightCountryIndex: probableCandidateIndex
    });
  };
  // memoize results based on the first 5/6 characters. That is all that matters


  ReactTelephoneInput.prototype.guessSelectedCountry = function guessSelectedCountry(inputNumber) {
    var secondBestGuess = (0, _find2.default)(allCountries, { iso2: this.props.defaultCountry }) || this.props.onlyCountries[0];
    var inputNumberForCountries = inputNumber.substr(0, 4);
    var bestGuess = void 0;
    if ((0, _trim2.default)(inputNumber) !== '') {
      bestGuess = (0, _reduce2.default)(this.props.onlyCountries, function (selectedCountry, country) {
        // if the country dialCode exists WITH area code

        if (allCountryCodes[inputNumberForCountries] && allCountryCodes[inputNumberForCountries][0] === country.iso2) {
          return country;

          // if the selected country dialCode is there with the area code
        } else if (allCountryCodes[inputNumberForCountries] && allCountryCodes[inputNumberForCountries][0] === selectedCountry.iso2) {
          return selectedCountry;

          // else do the original if statement
        } else if ((0, _startsWith2.default)(inputNumber, country.dialCode)) {
          if (country.dialCode.length > selectedCountry.dialCode.length) {
            return country;
          }
          if (country.dialCode.length === selectedCountry.dialCode.length && country.priority < selectedCountry.priority) {
            return country;
          }
        }
        return selectedCountry;
      }, { dialCode: '', priority: 10001 }, this);
    } else {
      return this.props.defaultCountry ? secondBestGuess : { dialCode: '', priority: 10001 };
    }

    if (!bestGuess.name) {
      return secondBestGuess;
    }

    return bestGuess;
  };
  // put the cursor to the end of the input (usually after a focus event)


  ReactTelephoneInput.prototype._cursorToEnd = function _cursorToEnd(skipFocus) {
    var input = this.numberInput.input;

    if (skipFocus) {
      this._fillDialCode();
    } else {
      input.focus();

      if (_utils.isModernBrowser) {
        var len = input.value.length;
        input.setSelectionRange(len, len);
      }
    }
  };

  ReactTelephoneInput.prototype.formatNumber = function formatNumber(text, pattern) {
    if (!text || text.length === 0) {
      return '+';
    }
    // for all strings with length less than 3, just return it (1, 2 etc.)
    // also return the same text if the selected country has no fixed format
    if (text && text.length < 2 || !pattern || !this.props.autoFormat) {
      return '+' + text;
    }

    var formattedObject = (0, _reduce2.default)(pattern, function (acc, character) {
      if (acc.remainingText.length === 0) {
        return acc;
      }

      if (character !== '.') {
        return {
          formattedText: acc.formattedText + character,
          remainingText: acc.remainingText
        };
      }

      return {
        formattedText: acc.formattedText + (0, _first2.default)(acc.remainingText),
        remainingText: (0, _tail2.default)(acc.remainingText)
      };
    }, { formattedText: '', remainingText: text.split('') });
    return formattedObject.formattedText + formattedObject.remainingText.join('');
  };

  ReactTelephoneInput.prototype.scrollTo = function scrollTo(country, middle) {
    if (!country) {
      return;
    }

    var container = _reactDom2.default.findDOMNode(this.refs.flagDropdownList);

    if (!container) {
      return;
    }

    var containerHeight = container.offsetHeight;
    var containerOffset = container.getBoundingClientRect();
    var containerTop = containerOffset.top + document.body.scrollTop;
    var containerBottom = containerTop + containerHeight;

    var element = country;
    var elementOffset = element.getBoundingClientRect();

    var elementHeight = element.offsetHeight;
    var elementTop = elementOffset.top + document.body.scrollTop;
    var elementBottom = elementTop + elementHeight;
    var newScrollTop = elementTop - containerTop + container.scrollTop;
    var middleOffset = containerHeight / 2 - elementHeight / 2;

    if (elementTop < containerTop) {
      // scroll up
      if (middle) {
        newScrollTop -= middleOffset;
      }
      container.scrollTop = newScrollTop;
    } else if (elementBottom > containerBottom) {
      // scroll down
      if (middle) {
        newScrollTop += middleOffset;
      }
      var heightDifference = containerHeight - elementHeight;
      container.scrollTop = newScrollTop - heightDifference;
    }
  };

  ReactTelephoneInput.prototype.handleClickOutside = function handleClickOutside() {
    if (this.state.showDropDown) {
      this.setState({
        showDropDown: false
      });
    }
  };

  ReactTelephoneInput.prototype.handleFlagItemClick = function handleFlagItemClick(country) {
    var _this3 = this;

    var currentSelectedCountry = this.state.selectedCountry;

    var nextSelectedCountry = (0, _find2.default)(this.props.onlyCountries, country);

    // tiny optimization
    if (currentSelectedCountry.iso2 !== nextSelectedCountry.iso2) {
      var dialCodeRegex = RegExp('^(\\+' + currentSelectedCountry.dialCode + ')|\\+');
      var newNumber = this.state.formattedNumber.replace(dialCodeRegex, '+' + nextSelectedCountry.dialCode);
      var formattedNumber = this.formatNumber(newNumber.replace(/\D/g, ''), nextSelectedCountry.format);
      this.setState({
        showDropDown: false,
        selectedCountry: nextSelectedCountry,
        freezeSelection: true,
        formattedNumber: formattedNumber
      }, function () {
        _this3._cursorToEnd();
        if (_this3.props.onChange) {
          _this3.props.onChange(_this3.numberInput.input, formattedNumber, nextSelectedCountry, (0, _utils.getUnformattedValue)(_this3.state.formattedNumber));
        }
      });
    } else {
      this.setState({ showDropDown: false });
    }
  };

  ReactTelephoneInput.prototype._mapPropsToState = function _mapPropsToState(props) {
    var firstCall = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var inputNumber = void 0;

    if (props.value) {
      inputNumber = props.value;
    } else if (props.initialValue && firstCall) {
      inputNumber = props.initialValue;
    } else if (this.props.value) {
      // just cleared the value
      inputNumber = '';
    } else if (this.state && this.state.formattedNumber && this.state.formattedNumber.length > 0) {
      inputNumber = this.state.formattedNumber;
    } else {
      inputNumber = '';
    }

    var selectedCountryGuess = this.guessSelectedCountry(inputNumber.replace(/\D/g, ''));
    var selectedCountryGuessIndex = (0, _findIndex2.default)(allCountries, selectedCountryGuess);
    var formattedNumber = this.formatNumber(inputNumber.replace(/\D/g, ''), selectedCountryGuess ? selectedCountryGuess.format : null);

    return {
      selectedCountry: selectedCountryGuess,
      highlightCountryIndex: selectedCountryGuessIndex,
      formattedNumber: formattedNumber
    };
  };

  ReactTelephoneInput.prototype._fillDialCode = function _fillDialCode() {
    // if the input is blank, insert dial code of the selected country
    if (this.numberInput.input.value === '+') {
      this.setState({
        formattedNumber: '+' + this.state.selectedCountry.dialCode
      });
    }
  };

  ReactTelephoneInput.prototype._getHighlightCountryIndex = function _getHighlightCountryIndex(direction) {
    // had to write own function because underscore does not have findIndex. lodash has it
    var highlightCountryIndex = this.state.highlightCountryIndex + direction;

    if (highlightCountryIndex < 0 || highlightCountryIndex >= this.props.onlyCountries.length + this.state.preferredCountries.length) {
      return highlightCountryIndex - direction;
    }

    return highlightCountryIndex;
  };

  ReactTelephoneInput.prototype.render = function render() {
    var _classNames4,
        _classNames5,
        _classNames6,
        _classNames7,
        _classNames8,
        _classNames9,
        _this4 = this;

    var _props = this.props,
        id = _props.inputId,
        name = _props.name,
        autoSelect = _props.autoSelect,
        autoSelectOptions = _props.autoSelectOptions,
        isValid = _props.isValid,
        autoComplete = _props.autoComplete,
        placeholder = _props.placeholder,
        pattern = _props.pattern,
        disabled = _props.disabled,
        flagDropDownEnabled = _props.flagDropDownEnabled,
        style = _props.style,
        errorText = _props.errorText,
        floatingLabelText = _props.floatingLabelText,
        floatingLabelStyle = _props.floatingLabelStyle,
        inputStyle = _props.inputStyle,
        underlineFocusStyle = _props.underlineFocusStyle,
        floatingLabelFixed = _props.floatingLabelFixed,
        multiLine = _props.multiLine,
        hintStyle = _props.hintStyle,
        required = _props.required;
    var _state = this.state,
        formattedNumber = _state.formattedNumber,
        showDropDown = _state.showDropDown,
        selectedCountry = _state.selectedCountry;

    var rawValue = (0, _utils.getUnformattedValue)(formattedNumber);
    var arrowStyle = _default2.default.arrow,
        upStyle = _default2.default.up,
        hideStyle = _default2.default.hide,
        rootStyle = _default2.default['react-tel-input'],
        formControlStyle = _default2.default['form-control'],
        flagDropdownStyle = _default2.default['flag-dropdown'],
        openDropdownStyle = _default2.default['open-dropdown'],
        flagStyle = _default2.default.flag,
        invalidNumberStyle = _default2.default['invalid-number'],
        selectedFlagStyle = _default2.default['selected-flag'],
        textFieldContainerStyle = _default2.default['phone-text-field-container'],
        autoSelectMenuContainerStyle = _default2.default['autoselect-menu-container'];

    var selectedCountryFlagStyle = _default2.default[selectedCountry.iso2];
    var rootClasses = (0, _classnames2.default)((_classNames4 = {}, _classNames4['' + rootStyle] = true, _classNames4));
    var arrowClasses = (0, _classnames2.default)((_classNames5 = {}, _classNames5['' + arrowStyle] = true, _classNames5['' + upStyle] = showDropDown, _classNames5));
    var inputClasses = (0, _classnames2.default)((_classNames6 = {}, _classNames6['' + formControlStyle] = true, _classNames6['' + invalidNumberStyle] = !isValid(formattedNumber.replace(/\D/g, '')), _classNames6));
    var flagViewClasses = (0, _classnames2.default)((_classNames7 = {}, _classNames7['' + flagDropdownStyle] = true, _classNames7['' + openDropdownStyle] = showDropDown, _classNames7['' + hideStyle] = !flagDropDownEnabled, _classNames7));
    var inputFlagClasses = (0, _classnames2.default)((_classNames8 = {}, _classNames8['' + flagStyle] = true, _classNames8['' + selectedCountryFlagStyle] = true, _classNames8));
    var flagDropdownContainerClasses = (0, _classnames2.default)((_classNames9 = {}, _classNames9['' + selectedFlagStyle] = true, _classNames9['' + hideStyle] = !flagDropDownEnabled, _classNames9));

    return _react2.default.createElement(
      'div',
      {
        className: rootClasses
      },
      _react2.default.createElement(
        'div',
        {
          ref: function ref(input) {
            _this4.flagDropDownButton = input;
          },
          className: flagViewClasses,
          onKeyDown: this.handleKeydown
        },
        _react2.default.createElement(
          'div',
          {
            ref: 'selectedFlag',
            onTouchTap: this.handleFlagDropdownClick,
            className: flagDropdownContainerClasses,
            title: selectedCountry.name + ': + ' + selectedCountry.dialCode,
            role: 'menuitem'
          },
          flagDropDownEnabled && _react2.default.createElement(FlagIcon, { inputFlagClasses: inputFlagClasses }),
          flagDropDownEnabled && selectedCountryFlagStyle && _react2.default.createElement('div', { className: arrowClasses })
        ),
        flagDropDownEnabled && showDropDown ? this.getCountryDropDownList() : ''
      ),
      _react2.default.createElement(
        'div',
        { className: textFieldContainerStyle },
        _react2.default.createElement(_TextField2.default, {
          onChange: this.handleInput,
          onTouchTap: this.handleInputClick,
          onFocus: this.handleInputFocus,
          onBlur: this.handleInputBlur,
          onKeyDown: this.handleInputKeyDown,
          value: formattedNumber,
          ref: function ref(input) {
            _this4.numberInput = input;
          },
          type: 'tel',
          autoComplete: 'off',
          className: inputClasses,
          pattern: pattern,
          required: required,
          hintText: placeholder,
          disabled: disabled,
          id: id,
          name: name,
          style: style,
          errorText: errorText,
          title: formattedNumber,
          maxLength: selectedCountry.format && selectedCountry.format.length || 50,
          floatingLabelText: floatingLabelText,
          floatingLabelStyle: floatingLabelStyle,
          inputStyle: inputStyle,
          underlineFocusStyle: underlineFocusStyle,
          floatingLabelFixed: floatingLabelFixed,
          multiLine: multiLine,
          hintStyle: hintStyle,
          fullWidth: true
        })
      ),
      _react2.default.createElement(
        'div',
        { className: autoSelectMenuContainerStyle },
        autoSelect && _react2.default.createElement(_AutoselectOptions2.default, {
          searchTerm: rawValue,
          options: autoSelectOptions,
          isOpen: this.state.suggestionsOpen,
          onListItemSelect: this.handleAutoselectListSelect
        })
      )
    );
  };

  return ReactTelephoneInput;
}(_react2.default.Component);

ReactTelephoneInput.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
ReactTelephoneInput.defaultProps = defaultProps;

exports.default = (0, _reactOnclickoutside2.default)(ReactTelephoneInput);
module.exports = exports['default'];