import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()),
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
  value: PropTypes.number.isRequired,
  onListItemSelect: PropTypes.func.isRequired,
}
const AutoselectOptions = ({ options, onListItemSelect }) => (
  <List>
    {options.map(
      option => (
        <AutoSelectOptionsItem
          key={option.value}
          value={option.value}
          onListItemSelect={onListItemSelect}
        />))}
  </List>)
AutoselectOptions.propTypes = propTypes
AutoselectOptions.defaultProps = defaultProps
export default AutoselectOptions
