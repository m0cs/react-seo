import { Component } from 'react';
import './Currency.scss';

class Currency extends Component {
  // Component methods
  render() {
    const isBigFormat = this.props.big;
    const price = this.props.price;
    const bigClass = isBigFormat ? 'big' : '';
    const currency = price.currency === 'USD' ? 'U$S' : '$';
    const amount = Math.trunc(price.amount);
    const decimals = price.decimals < 10 ? price.decimals + '0' : price.decimals;
    const decimalSeparator = !isBigFormat ? <span>.</span> : '';
    return (
      <div className={'Currency-container ' + bigClass}>
        <div>
          <span className="Currency-tag">{currency}</span>
          <span>{amount.toLocaleString()}</span>
        </div>
        <div className="Currency-decimals-container">
          {decimalSeparator}
          <span className="Currency-decimals">{decimals}</span>
        </div>
      </div>
    );
  }
}

export default Currency;
