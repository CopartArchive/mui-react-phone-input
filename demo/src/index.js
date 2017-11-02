import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RTI from '../../src/withStyles';

injectTapEventPlugin();
const changeHandler = (target, formattedNumber, selectedCountry, rawValue) => {
  console.log(`${formattedNumber} - ${rawValue}`, 'Formatted value and raw value')
}
const Demo = () => (<div>
  <h1>React Telephone Input Demo</h1>
  <MuiThemeProvider>
    <div>
      <h2>WIth flag dropdown</h2>
      <RTI
        flagsImagePath="./images/flags.png"
        name="phone"
        onChange={changeHandler}
        floatingLabelText="phone"
        floatingLabelStyle={{ color: '#01579b' }}
        flagDropDownEnabled
        value={''}
      />
      <h2>WIthout flag dropdown</h2>
      <RTI
        flagsImagePath="./images/flags.png"
        name="phone"
        onChange={changeHandler}
        floatingLabelText="phone"
        floatingLabelStyle={{ color: '#01579b' }}
        flagDropDownEnabled={false}
        value={''}
      />
      <h2>With default country without value</h2>
      <RTI
        flagsImagePath="./images/flags.png"
        name="phone"
        onChange={changeHandler}
        floatingLabelText="phone"
        floatingLabelStyle={{ color: '#01579b' }}
        flagDropDownEnabled={false}
        defaultCountry={'de'}
        value={''}
      />
      <h2>With default country without value disabled</h2>
      <RTI
        flagsImagePath="./images/flags.png"
        name="phone"
        onChange={changeHandler}
        floatingLabelText="phone"
        floatingLabelStyle={{ color: '#01579b' }}
        flagDropDownEnabled={false}
        defaultCountry={'de'}
        value={''}
        disabled
      />
      <h2>With default country with value</h2>
      <RTI
        flagsImagePath="./images/flags.png"
        name="phone"
        onChange={changeHandler}
        floatingLabelText="phone"
        floatingLabelStyle={{ color: '#01579b' }}
        flagDropDownEnabled={false}
        defaultCountry={'de'}
        value={'649812'}
      />
      <h2>With default country with value disabled</h2>
      <RTI
        flagsImagePath="./images/flags.png"
        name="phone"
        onChange={changeHandler}
        floatingLabelText="phone"
        floatingLabelStyle={{ color: '#01579b' }}
        flagDropDownEnabled={false}
        defaultCountry={'de'}
        value={'649812'}
        disabled
      />
    </div>
  </MuiThemeProvider>
</div>)

render(<Demo />, document.querySelector('#demo'))
