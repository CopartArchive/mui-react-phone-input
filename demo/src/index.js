import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RTI from '../../src/withStyles'

injectTapEventPlugin();
const Demo = () => (<div>
  <h1>React Telephone Input Demo</h1>
  <MuiThemeProvider>

    <RTI
      defaultCountry="in"
      flagsImagePath="./images/flags.png"
      name="phone"
      onChange={(target,formattedNumber) => console.log(`${target.value} - ${formattedNumber}`, 'Target object and current value')}
      floatingLabelText="phone"
      floatingLabelStyle={{ color: '#01579b' }}
    />
  </MuiThemeProvider>
</div>)

render(<Demo />, document.querySelector('#demo'))
