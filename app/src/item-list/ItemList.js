import { Component } from 'react';
import './ItemList.scss';
import ItemListApi from './ItemListApi';
import RowItem from './components/row-item/RowItem';

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);

    // initialize request, prevent duplicated call.
    this.itemsRequest = undefined;

    // initialize state.
    this.state = { items: [] };
  }

  // Component methods

  componentDidMount() {
    const { like } = this.props;
    if (!!like) {
      this.listItems(like);
    }
  }

  componentDidUpdate(prevProps) {
    const { like } = this.props;
    if (like !== prevProps.like) {
      this.listItems(like);
    }
  }

  render() {
    const rows = this.state.items.map((item) => (
      <RowItem onRowClick={this.handleRowClick} key={item.id} item={item} />
    ));
    return <div className="list-container">{rows}</div>;
  }

  // Handlers

  handleRowClick(itemId) {
    this.props.onItemSelect(itemId);
  }

  // Custom methods

  listItems(like) {
    const itemsApi = new ItemListApi();

    if (this.itemsRequest) {
      // abort request, prevent multiple calls
    }
    this.itemsRequest = itemsApi.list(like);
    this.itemsRequest.then((response) => {
      this.setState({ items: response.items });
      this.itemsRequest = undefined;
    });
  }
}

export default ItemList;
