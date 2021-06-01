import { Component } from 'react';
import './Currency.scss';

class Currency extends Component {
  // Component methods
  render() {
    const price = this.props.price;
    const bigClass = this.props.big ? 'big' : '';
    const currency = price.currency === 'USD' ? 'U$S' : '$';
    const amount = Math.trunc(price.amount);
    const decimals = price.decimals < 10 ? price.decimals + '0' : price.decimals;
    return (
      <div className={'Currency-container ' + bigClass}>
        <span className="Currency-tag">{currency}</span>
        <span>{amount.toLocaleString()}</span>
        <span>.{decimals}</span>
        <span></span>
      </div>
    );
  }
}

export default Currency;
