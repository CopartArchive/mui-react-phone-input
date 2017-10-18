import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List, ListItem, MakeSelectable } from 'material-ui/List';

const SelectableList = MakeSelectable(List);
const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()),
  isOpen: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onListItemSelect: PropTypes.func.isRequired,
}
const defaultProps = {
  options: [],
}

const styles = {
  highlightedItem: { backgroundColor: 'rgba(0,0,0,0.1)' }
}
const AutoSelectOptionsItem = ({ value, isHighlighted }) => (<ListItem
  innerDivStyle={isHighlighted ? styles.highlightedItem : {}}
  primaryText={value}
  value={value}
/>)
AutoSelectOptionsItem.propTypes = {
  value: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
}
class AutoselectOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: '-1',
    }
  }
  componentWillReceiveProps(nextProps) {
    const currentSearchTerm = this.props.searchTerm
    const newSearchTerm = nextProps.searchTerm
    if (currentSearchTerm !== newSearchTerm) {
      this.updateHighlightedItem(newSearchTerm)
    }
  }
  updateHighlightedItem = (newSearchTerm) => {
    const { options } = this.props
    const foundIndex = options.findIndex(
      option => newSearchTerm && option && option.value.indexOf(newSearchTerm) !== -1)
    this.setState({
      selectedOption: foundIndex,
    })
  }
  handleRequestChange = (evt, index) => {
    this.setState({
      selectedOption: index
    })
    const selectedValue = this.props.options[index].value
    this.props.onListItemSelect(selectedValue)
  }
  render() {
    const { options, isOpen } = this.props
    if (!isOpen) {
      return null
    }
    return (
      <Paper>
        <SelectableList value={this.state.selectedOption} onChange={this.handleRequestChange} >
          {options.map(
            (option, index) => (
              (<ListItem
                key={option.value}
                primaryText={option.value}
                value={index}
              />)
            ))}
        </SelectableList>
      </Paper>)
  }
}
AutoselectOptions.propTypes = propTypes
AutoselectOptions.defaultProps = defaultProps
export default AutoselectOptions
