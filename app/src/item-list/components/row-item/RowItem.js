import { Component } from 'react';
import './RowItem.scss';
import Currency from '../../../shared/components/currency/Currency';
import Condition from '../../../shared/components/condition/Condition';

class RowItem extends Component {
  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  // Component methods

  render() {
    const { item } = this.props;

    return (
      <div className="RowItem-container">
        <div className="RowItem-image-container">
          <img
            className="RowItem-image"
            alt="product"
            src={item.picture}
            onClick={(e) => this.handleRowClick(item.id, e)}
          />
        </div>
        <div className="RowItem-details">
          <Currency price={item.price} />
          <div className="RowItem-title" onClick={(e) => this.handleRowClick(item.id, e)}>
            <span>{item.title}</span>
          </div>
          <Condition condition={item.condition} />
        </div>
      </div>
    );
  }

  // Handlers

  handleRowClick(itemId, event) {
    this.props.onRowClick(itemId);
  }
}

export default RowItem;
