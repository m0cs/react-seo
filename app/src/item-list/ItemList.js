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
    this.state = { items: [], categories: [] };
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
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (this.itemsRequest) {
      // abort request, prevent multiple calls
      abortController.abort();
    }
    this.itemsRequest = itemsApi.list(like, {
      signal,
    });
    this.itemsRequest.then(
      (response) => {
        if (response.error) {
          this.setState({ items: [], categories: [] });
        } else {
          this.setState({
            items: response.items,
            categories: response.categories,
          });
          this.props.onCategoryUpdate(response.categories);
        }
        this.itemsRequest = undefined;
      },
      (rejected) => {
        this.setState({ items: [], categories: [] });
        this.itemsRequest = undefined;
      }
    );
  }
}

export default ItemList;
