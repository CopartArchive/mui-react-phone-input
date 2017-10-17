import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()),
  isOpen: PropTypes.bool.isRequired,
  onListItemSelect: PropTypes.func.isRequired,
}
const defaultProps = {
  options: [],
}


const AutoSelectOptionsItem = ({ value, onListItemSelect }) => {
  const handleAutoSelectTouchTap = selectedValue => () => onListItemSelect(selectedValue)
  return (<ListItem primaryText={value} onTouchTap={handleAutoSelectTouchTap(value)} />)
}
AutoSelectOptionsItem.propTypes = {
  value: PropTypes.string.isRequired,
  onListItemSelect: PropTypes.func.isRequired,
}
const AutoselectOptions = ({ options, onListItemSelect, isOpen }) => isOpen && (
  <Paper>
    <List>
      {options.map(
        option => (
          <AutoSelectOptionsItem
            key={option.value}
            value={option.value}
            onListItemSelect={onListItemSelect}
          />))}
    </List>
  </Paper>)
AutoselectOptions.propTypes = propTypes
AutoselectOptions.defaultProps = defaultProps
export default AutoselectOptions
