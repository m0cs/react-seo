import { Component } from 'react';
import './ItemForm.scss';

import ItemFormApi from './ItemFormApi';
import Currency from '../shared/components/currency/Currency';
import Condition from '../shared/components/condition/Condition';
import Button from './components/button/Button';

class ItemForm extends Component {
  constructor(props) {
    super(props);

    this.itemRequest = undefined;
    this.state = {
      item: undefined,
      itemNotFound: false,
    };
  }

  // Component methods

  componentDidMount() {
    const { itemId } = this.props;

    if (!!itemId) {
      this.findItemById(itemId);
    }
  }

  render() {
    const item = this.state.item;

    if (this.state.itemNotFound)
      return <div className="ItemForm-container">Producto no encontrado!</div>;
    if (!item) return <div></div>;
    return (
      <div className="ItemForm-container">
        <div className="ItemForm-left-section">
          <div className="ItemForm-image-container">
            <img className="ItemForm-image" alt="product" src={item.picture} />
          </div>
          <div className="ItemForm-description-container">
            <div className="ItemForm-description-title">Descripción del producto</div>
            <div className="ItemForm-description">{item.description}</div>
          </div>
        </div>
        <div className="ItemForm-right-section">
          <div className="ItemForm-details-container">
            <Condition condition={item.condition} />
            <div className="ItemForm-details-title">{item.title}</div>
            <Currency big={true} amount={item.price.amount} currency={item.price.currency} />
            <Button label="Comprar" />
          </div>
        </div>
      </div>
    );
  }

  // Custom methods

  findItemById(itemId) {
    const itemApi = new ItemFormApi();

    if (this.itemRequest) {
      this.itemRequest.abort();
    }
    this.itemRequest = itemApi.findById(itemId);
    this.itemRequest.then((response) => {
      if (response.statusCode) {
        this.setState({ itemNotFound: true });
      } else {
        this.setState({
          item: response.item,
          itemNotFound: false,
        });
      }
      this.itemRequest = undefined;
    });
  }
}

export default ItemForm;
