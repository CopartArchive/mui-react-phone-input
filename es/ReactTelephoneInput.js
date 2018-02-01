function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO - fix the onlyContries props.
// Currently expects that as an array of country object,
// but users should be able to send in array of country isos
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import debounce from 'lodash/debounce';
import memoize from 'lodash/memoize';
import assign from 'lodash/assign';
import isEqual from 'lodash/isEqual';
import { asYouType } from 'libphonenumber-js';
// import lodash string methods
import trim from 'lodash/trim';
import startsWith from 'lodash/startsWith';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import onClickOutside from 'react-onclickoutside';
import classNames from 'classnames';
import countryData from 'country-telephone-data';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { isNumberValid, getUnformattedValue, isModernBrowser } from './utils';
import styles from '../css/default.css';
import flagImage from '../images/flags.png';
import AutoselectOptions from './AutoselectOptions';

var allCountries = countryData.allCountries;
var iso2Lookup = countryData.iso2Lookup;
var allCountryCodes = countryData.allCountryCodes;

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
  var flagsImagePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : flagImage;
  return {
    backgroundImage: 'url(' + flagsImagePath + ')'
  };
};
var FlagIcon = function FlagIcon(_ref) {
  var inputFlagClasses = _ref.inputFlagClasses;
  return React.createElement('div', { className: inputFlagClasses, style: getFlagStyle() });
};

FlagIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  inputFlagClasses: PropTypes.string
} : {};
FlagIcon.defaultProps = {
  inputFlagClasses: ''
};

var CountryText = function CountryText(_ref2) {
  var name = _ref2.name,
      dialCode = _ref2.dialCode;
  return React.createElement(
    'span',
    null,
    React.createElement(
      'span',
      { className: 'country-name' },
      name
    ),
    React.createElement(
      'span',
      { className: 'dial-code' },
      dialCode
    )
  );
};

CountryText.propTypes = process.env.NODE_ENV !== "production" ? {
  name: PropTypes.string,
  dialCode: PropTypes.string
} : {};
CountryText.defaultProps = {
  name: '',
  dialCode: ''
};

var propTypes = {
  value: PropTypes.string,
  initialValue: PropTypes.string,
  style: PropTypes.shape(),
  errorText: PropTypes.string,
  errorStyle: PropTypes.object,
  autoFormat: PropTypes.bool,
  defaultCountry: PropTypes.string,
  onlyCountries: PropTypes.arrayOf(PropTypes.object),
  preferredCountries: PropTypes.arrayOf(PropTypes.string),
  classNames: PropTypes.string,
  className: PropTypes.string,
  inputId: PropTypes.string,
  onChange: PropTypes.func,
  onEnterKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.bool,
  isValid: PropTypes.func,
  placeholder: PropTypes.string,
  flagDropDownEnabled: PropTypes.bool,
  floatingLabelText: PropTypes.string,
  floatingLabelStyle: PropTypes.shape(),
  name: PropTypes.string,
  inputStyle: PropTypes.shape(),
  underlineFocusStyle: PropTypes.shape(),
  floatingLabelFixed: PropTypes.bool,
  multiLine: PropTypes.bool,
  hintStyle: PropTypes.shape(),
  autoSelect: PropTypes.bool,
  autoSelectOptions: PropTypes.arrayOf(PropTypes.shape())
};
var defaultProps = {
  autoFormat: true,
  errorText: '',
  onlyCountries: allCountries,
  defaultCountry: '',
  isValid: isNumberValid,
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
  autoSelectOptions: [],
  errorStyle: {}
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
        if (isModernBrowser) {
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
          _this.props.onChange(_this.numberInput.input, _this.state.formattedNumber, _this.state.selectedCountry, getUnformattedValue(_this.state.formattedNumber));
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
        highlightCountry: find(_this.props.onlyCountries, _this.state.selectedCountry),
        highlightCountryIndex: findIndex(_this.state.preferredCountries.concat(_this.props.onlyCountries), _this.state.selectedCountry)
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
      var caretPosition = _this.numberInput.input.selectionStart;
      var oldFormattedText = _this.state.formattedNumber;
      var diff = formattedNumber.length - oldFormattedText.length;
      _this.numberInput.input.focus();
      var onSetStateComplete = function onSetStateComplete() {
        if (isModernBrowser) {
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
          _this.props.onChange(_this.numberInput.input, _this.state.formattedNumber, _this.state.selectedCountry, getUnformattedValue(_this.state.formattedNumber));
        }
      };
      _this.setState({
        formattedNumber: formattedNumber,
        selectedCountry: newSelectedCountry.dialCode.length > 0 ? newSelectedCountry : _this.state.selectedCountry
      }, onSetStateComplete);
    };

    _this._searchCountry = memoize(function (queryString) {
      if (!queryString || queryString.length === 0) {
        return null;
      }
      // don't include the preferred countries in search
      var probableCountries = filter(_this.props.onlyCountries, function (country) {
        return startsWith(country.name.toLowerCase(), queryString.toLowerCase());
      }, _this);
      return probableCountries[0];
    });

    var preferredCountries = _this.props.preferredCountries.map(function (iso2) {
      return iso2Lookup.hasOwnProperty(iso2) ? allCountries[iso2Lookup[iso2]] : null;
    }).filter(function (val) {
      return val !== null;
    });
    _this.state = assign({}, {
      preferredCountries: preferredCountries,
      showDropDown: false,
      suggestionsOpen: false,
      queryString: '',
      freezeSelection: false,
      debouncedQueryStingSearcher: debounce(_this.searchCountry, 300)
    }, _this._mapPropsToState(_this.props, true));
    return _this;
  }

  ReactTelephoneInput.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    this._cursorToEnd(true);
    this._fillDialCode();
  };

  ReactTelephoneInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(this._mapPropsToState(nextProps));
  };

  ReactTelephoneInput.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
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
    return ReactDOM.findDOMNode(this.refs['flag_no_' + index]);
  };

  ReactTelephoneInput.prototype.getCountryDropDownList = function getCountryDropDownList() {
    var _classNames3,
        _this2 = this;

    var countryStyle = styles.country,
        preferred = styles.preferred,
        highlight = styles.highlight,
        flagIconStyle = styles.flag,
        countryListStyle = styles['country-list'],
        hideStyle = styles.hide;

    var self = this;
    var countryDropDownList = map(this.state.preferredCountries.concat(this.props.onlyCountries), function (country, index) {
      var _classNames, _classNames2;

      var itemClasses = classNames((_classNames = {}, _classNames['' + countryStyle] = true, _classNames['' + preferred] = findIndex(self.state.preferredCountries, { iso2: country.iso2 }) >= 0, _classNames['' + highlight] = self.state.highlightCountryIndex === index, _classNames));
      var inputFlagClasses = classNames((_classNames2 = {}, _classNames2['' + flagIconStyle] = true, _classNames2['' + styles[country.iso2]] = true, _classNames2));
      // const inputFlagClasses = `flag ${country.iso2}`;

      return React.createElement(ListItem, {
        ref: 'flag_no_' + index,
        key: 'flag_no_' + index,
        'data-flag-key': 'flag_no_' + index,
        className: itemClasses,
        'data-dial-code': '1',
        'data-country-code': country.iso2,
        onTouchTap: self.handleFlagItemClick.bind(self, country),
        leftIcon: React.createElement(FlagIcon, { inputFlagClasses: inputFlagClasses }),
        primaryText: React.createElement(CountryText, { name: country.name, dialCode: country.dialCode })
      });
    });

    var dashedLi = React.createElement(Divider, { key: 'divider' });
    // let's insert a dashed line in between preffered countries and the rest
    countryDropDownList.splice(this.state.preferredCountries.length, 0, dashedLi);

    var dropDownClasses = classNames((_classNames3 = {}, _classNames3['' + countryListStyle] = true, _classNames3['' + hideStyle] = !this.state.showDropDown, _classNames3));
    return React.createElement(
      List,
      { ref: function ref(elem) {
          return _this2.flagDropdownList = elem;
        }, className: dropDownClasses },
      countryDropDownList
    );
  };

  ReactTelephoneInput.prototype.searchCountry = function searchCountry() {
    var probableCandidate = this._searchCountry(this.state.queryString) || this.props.onlyCountries[0];
    var probableCandidateIndex = findIndex(this.props.onlyCountries, probableCandidate) + this.state.preferredCountries.length;
    this.scrollTo(this.getElement(probableCandidateIndex), true);

    this.setState({
      queryString: '',
      highlightCountryIndex: probableCandidateIndex
    });
  };
  // memoize results based on the first 5/6 characters. That is all that matters


  ReactTelephoneInput.prototype.guessSelectedCountry = function guessSelectedCountry(inputNumber) {
    var secondBestGuess = find(allCountries, { iso2: this.props.defaultCountry }) || this.props.onlyCountries[0];
    var inputNumberForCountries = inputNumber.substr(0, 4);
    var bestGuess = void 0;
    if (trim(inputNumber) !== '') {
      bestGuess = reduce(this.props.onlyCountries, function (selectedCountry, country) {
        // if the country dialCode exists WITH area code

        if (allCountryCodes[inputNumberForCountries] && allCountryCodes[inputNumberForCountries][0] === country.iso2) {
          return country;

          // if the selected country dialCode is there with the area code
        } else if (allCountryCodes[inputNumberForCountries] && allCountryCodes[inputNumberForCountries][0] === selectedCountry.iso2) {
          return selectedCountry;

          // else do the original if statement
        } else if (startsWith(inputNumber, country.dialCode)) {
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

      if (isModernBrowser) {
        var len = input.value.length;
        input.setSelectionRange(len, len);
      }
    }
  };

  ReactTelephoneInput.prototype.formatNumber = function formatNumber(text, pattern, firstCall) {
    if (!text || text.length === 0) {
      return '+';
    }
    // for all strings with length less than 3, just return it (1, 2 etc.)
    // also return the same text if the selected country has no fixed format
    if (text && text.length < 2 || !pattern || !this.props.autoFormat) {
      this.setState({ maxLength: undefined });
      return '+' + text;
    }
    var formatter = new asYouType();
    var formattedNumber = formatter.input('+' + text);

    var nextFormatter = new asYouType();
    nextFormatter.input('+' + text + '5');
    var isNextInputValid = nextFormatter.template || nextFormatter.country;

    if (!isNextInputValid && !firstCall) {
      this.setState({ maxLength: formatter.template && formatter.template.length });
    }
    formatter.reset();
    nextFormatter.reset();
    return formattedNumber;
  };

  ReactTelephoneInput.prototype.scrollTo = function scrollTo(country, middle) {
    if (!country) {
      return;
    }

    var container = ReactDOM.findDOMNode(this.refs.flagDropdownList);

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

    var nextSelectedCountry = find(this.props.onlyCountries, country);

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
          _this3.props.onChange(_this3.numberInput.input, formattedNumber, nextSelectedCountry, getUnformattedValue(_this3.state.formattedNumber));
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
    var selectedCountryGuessIndex = findIndex(allCountries, selectedCountryGuess);
    var formattedNumber = this.formatNumber(inputNumber.replace(/\D/g, ''), selectedCountryGuess ? selectedCountryGuess.format : null, firstCall);

    return {
      selectedCountry: selectedCountryGuess,
      highlightCountryIndex: selectedCountryGuessIndex,
      formattedNumber: formattedNumber
    };
  };

  ReactTelephoneInput.prototype._fillDialCode = function _fillDialCode() {
    var _this4 = this;

    // if the input is blank, insert dial code of the selected country
    if (this.numberInput.input.value === '+') {
      this.setState({
        formattedNumber: this.props.disabled ? '' : '+' + this.state.selectedCountry.dialCode
      }, function () {
        if (typeof _this4.props.onChange === 'function') {
          _this4.props.onChange(_this4.numberInput.input, _this4.state.formattedNumber, _this4.state.selectedCountry, getUnformattedValue(_this4.state.formattedNumber));
        }
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
        _this5 = this;

    var _props = this.props,
        id = _props.inputId,
        name = _props.name,
        autoSelect = _props.autoSelect,
        autoSelectOptions = _props.autoSelectOptions,
        isValid = _props.isValid,
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
        required = _props.required,
        errorStyle = _props.errorStyle;
    var _state = this.state,
        formattedNumber = _state.formattedNumber,
        showDropDown = _state.showDropDown,
        selectedCountry = _state.selectedCountry,
        maxLength = _state.maxLength;

    var rawValue = getUnformattedValue(formattedNumber);
    var arrowStyle = styles.arrow,
        upStyle = styles.up,
        hideStyle = styles.hide,
        rootStyle = styles['react-tel-input'],
        formControlStyle = styles['form-control'],
        flagDropdownStyle = styles['flag-dropdown'],
        openDropdownStyle = styles['open-dropdown'],
        flagStyle = styles.flag,
        invalidNumberStyle = styles['invalid-number'],
        selectedFlagStyle = styles['selected-flag'],
        textFieldContainerStyle = styles['phone-text-field-container'],
        autoSelectMenuContainerStyle = styles['autoselect-menu-container'];

    var selectedCountryFlagStyle = styles[selectedCountry.iso2];
    var rootClasses = classNames((_classNames4 = {}, _classNames4['' + rootStyle] = true, _classNames4));
    var arrowClasses = classNames((_classNames5 = {}, _classNames5['' + arrowStyle] = true, _classNames5['' + upStyle] = showDropDown, _classNames5));
    var inputClasses = classNames((_classNames6 = {}, _classNames6['' + formControlStyle] = true, _classNames6['' + invalidNumberStyle] = !isValid(formattedNumber.replace(/\D/g, '')), _classNames6));
    var flagViewClasses = classNames((_classNames7 = {}, _classNames7['' + flagDropdownStyle] = true, _classNames7['' + openDropdownStyle] = showDropDown, _classNames7['' + hideStyle] = !flagDropDownEnabled, _classNames7));
    var inputFlagClasses = classNames((_classNames8 = {}, _classNames8['' + flagStyle] = true, _classNames8['' + selectedCountryFlagStyle] = true, _classNames8));
    var flagDropdownContainerClasses = classNames((_classNames9 = {}, _classNames9['' + selectedFlagStyle] = true, _classNames9['' + hideStyle] = !flagDropDownEnabled, _classNames9));

    return React.createElement(
      'div',
      {
        className: rootClasses
      },
      React.createElement(
        'div',
        {
          ref: function ref(input) {
            _this5.flagDropDownButton = input;
          },
          className: flagViewClasses,
          onKeyDown: this.handleKeydown
        },
        React.createElement(
          'div',
          {
            ref: 'selectedFlag',
            onTouchTap: this.handleFlagDropdownClick,
            className: flagDropdownContainerClasses,
            title: selectedCountry.name + ': + ' + selectedCountry.dialCode,
            role: 'menuitem'
          },
          flagDropDownEnabled && React.createElement(FlagIcon, { inputFlagClasses: inputFlagClasses }),
          flagDropDownEnabled && selectedCountryFlagStyle && React.createElement('div', { className: arrowClasses })
        ),
        flagDropDownEnabled && showDropDown ? this.getCountryDropDownList() : ''
      ),
      React.createElement(
        'div',
        { className: textFieldContainerStyle },
        React.createElement(TextField, {
          onChange: this.handleInput,
          onTouchTap: this.handleInputClick,
          onFocus: this.handleInputFocus,
          onBlur: this.handleInputBlur,
          onKeyDown: this.handleInputKeyDown,
          value: formattedNumber,
          ref: function ref(input) {
            _this5.numberInput = input;
          },
          type: 'tel',
          autoComplete: 'off',
          className: inputClasses,
          pattern: pattern,
          required: required,
          hintText: !disabled && placeholder,
          disabled: disabled,
          id: id,
          name: name,
          style: style,
          errorText: errorText,
          errorStyle: errorStyle,
          title: formattedNumber,
          maxLength: maxLength || 20,
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
      React.createElement(
        'div',
        { className: autoSelectMenuContainerStyle },
        autoSelect && React.createElement(AutoselectOptions, {
          searchTerm: rawValue,
          options: autoSelectOptions,
          isOpen: this.state.suggestionsOpen,
          onListItemSelect: this.handleAutoselectListSelect
        })
      )
    );
  };

  return ReactTelephoneInput;
}(React.Component);

ReactTelephoneInput.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
ReactTelephoneInput.defaultProps = defaultProps;

export default onClickOutside(ReactTelephoneInput);