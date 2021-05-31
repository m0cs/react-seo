import { Component } from 'react';
import './RowItem.scss';
import Currency from '../../../shared/components/currency/Currency';
import Condition from '../../../shared/components/condition/Condition';

class RowItem extends Component {
  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  render() {
    const { item } = this.props;

    return (
      <div className="RowItem-container">
        <div className="RowItem-image-container">
          <img className="RowItem-image" alt="product" src={item.picture} />
        </div>
        <div className="RowItem-details">
          <Currency amount={item.price.amount} currency={item.price.currency} />
          <div className="RowItem-title">
            <span onClick={(e) => this.handleRowClick(item.id, e)}>{item.title}</span>
          </div>
          <Condition condition={item.condition} />
        </div>
      </div>
    );
  }

  handleRowClick(itemId, event) {
    this.props.onRowClick(itemId);
  }
}

export default RowItem;
