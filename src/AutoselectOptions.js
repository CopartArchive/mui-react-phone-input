import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import 'react-virtualized/styles.css';
import { AutoSizer, List as VirtualList } from 'react-virtualized'
import { ListItem } from 'material-ui/List';


const OPTIONS_ROW_HEIGHT = 50
const optionStyleProps = {
  rowHeight: 20,
  optionsMinHeight: 400,
}
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
      selectedOption: null,
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
      option => newSearchTerm && option && option.value.startsWith(newSearchTerm))
    this.setState({
      selectedOption: foundIndex,
    }, () => {
      if (this.virtualList) {
        console.log(this.virtualList.scrollToRow)
        this.virtualList.scrollToRow(foundIndex)
      }
    })
  }
  handleListItemTouchTap = option => () => {
    this.props.onListItemSelect(option.value)
  }
  render() {
    const { isOpen, options } = this.props
    const { width: optionsStyleWidth,
      rowHeight: optionStyleRowHeight,
      optionsMinHeight: optionStyleMinHeight } = optionStyleProps
    if (!isOpen) {
      return null
    }
    console.log(this.props.height, 'Selected option')
    return (
        <VirtualList
          name={name}
          ref={(elem) =>this.virtualList =elem}
          scrollToIndex={this.state.selectedOption}
          overscanRowCount={30}
          width={183}
          height={100}
          rowCount={500}
          rowHeight={20}
          tabIndex={-1}
          rowRenderer={({ index: i, key, style }) => (
          <div style={{height:'20px'}}>{options[i].value}</div>)}
        />)
  }
}
AutoselectOptions.propTypes = propTypes
AutoselectOptions.defaultProps = defaultProps

const AutoSizedAutoSelectOptions = props => (
  <AutoSizer disableHeight>
    {({ width }) => <AutoselectOptions {...props} width={width} />}
  </AutoSizer>
)
export default AutoSizedAutoSelectOptions
