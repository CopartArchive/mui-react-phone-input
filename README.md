# React Material Telephone Input

This is a fork of [mukeshsoni's react-telephone-input plugin](https://github.com/mukeshsoni/react-telephone-input) built on [Material UI](http://material-ui.com) components v0.15.4

## Getting Started

**Using npm**
```
npm install rahulravindrancopart/react-telephone-input
```
**Using yarn**
```
yarn add rahulravindrancopart/react-telephone-input
```

Use in code thus
```js

import React from 'react'
import { render } from 'react-dom'
import ReactTelInput from 'react-telephone-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const changeHandler = (target, formattedNumber, selectedCountry, rawValue) => {
  console.log(`${formattedNumber} - ${rawValue}`, 'Formatted value and raw value')
}
const Demo = () =>(<div>
<MuiThemeProvider>
<div>
<RTI
  flagsImagePath="./images/flags.png"
  name="phone"
  onChange={changeHandler}
  floatingLabelText="phone"
  floatingLabelStyle={{ color: '#01579b' }}
  flagDropDownEnabled
  value={''}
/>
</div>
  </div>)
render(<Demo />, document.querySelector('#demo'))

```
## Features
* Automatically format the number as the user types
* Navigate the country dropdown by typing a country's name, or using up/down keys
* Selecting a country from the dropdown will update the dial code in the input
* Typing a different dial code will automatically update the displayed flag
* Country names in the dropdown also include localised versions in brackets
* Dropdown appears above or below the input depending on available space/scroll position

### Prerequisites

Requires following as peerDependencies
 - material-ui
 - react
 - react-dom
 - react-tap-event-plugin

### Development

Clone the repository

```
git clone https://github.com/rahulravindrancopart/react-telephone-input.git
```

Run npm install

```
npm install
```
Or yarn

```
yarn install
```

Run the demo files

```
yarn run start
```

Run clean
```
yarn run clean
```
Build the files
```
yarn run build
```

## Running the tests

```
yarn test
```

### Linting


```
yarn run lint
```

## Built With

* [React](http://www.reactjs.org/) - Facebook's rendering library
* [material-ui](https://material-ui.com/) - React based presentational components using Google's material design principles


## Contributing


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/rahulravindrancopart/react-telephone-input/releases).


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to [mukeshsoni](https://github.com/mukeshsoni), for creating the original plugin in react


## Component props
The component accepts other props to customize it -

#### value and initialValue
Both the props have the same purpose - for setting the initial value of the input programatically.

#### initialValue
See `value` above.

#### autoFormat
`true` by default. Setting it to false will turn off all auto formatting.

#### defaultCountry
The component selects the country code of a country by default. You can change it by passing the iso2 name of a country. E.g. for United States, set `defaultCountry` to 'us'.

#### onlyCountries
If you don't want all countries to be shown in the dropdown list, you can pass an array of country iso2 names to be shown in the dropdown list.

#### preferredCountries
Preferred countries show up in the top of the list. This prop also accepts an array of country iso2 names.

E.g.
```
<ReactTelephoneInput
  preferredCountries={['in', 'us', 'uk']}
  />
```
#### classNames
You can send in style classes to be applied to the top container div of the component.

#### onChange
Function, called whenever there is a change of value in the input box.

#### onEnterKeyPress
Function, called when user presses the 'enter' key when the input box is in focus.

#### onBlur
Function, called when the focus goes away from the input box.

#### onFocus
Function, called when the input box gets the focus.

#### disabled
Boolean value. When set to true, the input box is disabled and clicking on flag dropdown does nothing.

#### flagDropDownEnabled
Boolean value. False by default. To toggle the flag display functionality 
