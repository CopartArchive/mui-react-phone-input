import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RTI from '../../src/withStyles'

injectTapEventPlugin();
const changeHandler = (target, formattedNumber, selectedCountry, rawValue) => {
  console.log(`${target.value} - ${formattedNumber} - ${rawValue}`, 'Target object and current value')
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
    <h2>With autoselect and flag dropdown</h2>
      <RTI
        flagsImagePath="./images/flags.png"
        name="phone"
        onChange={changeHandler}
        floatingLabelText="phone"
        floatingLabelStyle={{ color: '#01579b' }}
        flagDropDownEnabled={false}
        autoSelect
        autoSelectOptions={[{ value: '917981249819' }, { value: '19029325192' }]}
        value={''}
      />
    </div>
  </MuiThemeProvider>
</div>)

render(<Demo />, document.querySelector('#demo'))
