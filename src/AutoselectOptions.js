import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { AutoSizer, List as VirtualList } from 'react-virtualized'
import { ListItem } from 'material-ui/List';

const OPTIONS_ROW_HEIGHT = 50
const optionStyleProps = {
  rowHeight: 72,
  optionsMinHeight: 200,
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
    return (
      <Paper>
        <VirtualList
          name={name}
          scrollToIndex={this.state.selectedOption}
          width={Math.max((optionsStyleWidth || 200), 190)}
          height={Math.min(options.length * optionStyleRowHeight, optionStyleMinHeight)}
          rowCount={options.length}
          rowHeight={optionStyleProps.rowHeight || OPTIONS_ROW_HEIGHT}
          className={styles.options}
          tabIndex={-1}
          rowRenderer={({ index: i, key, style }) => (
            <ListItem
              key={key}
              primaryText={options[i].value}
              value={i}
              innerDivStyle={i === this.state.selectedOption ? styles.highlightedItem : {}}
              onClick={this.handleListItemTouchTap(options[i])}
            />)}
        />
      </Paper>)
  }
}
AutoselectOptions.propTypes = propTypes
AutoselectOptions.defaultProps = defaultProps

const AutoSizedAutoSelectOptions = props => (
  <AutoSizer>
    {({ width }) => <AutoselectOptions {...props} width={width} />}
  </AutoSizer>
)
export default AutoSizedAutoSelectOptions
