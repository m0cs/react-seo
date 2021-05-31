import { Component } from 'react';
import './Currency.scss';

class Currency extends Component {
  // Component methods
  render() {
    const bigClass = this.props.big ? 'big' : '';
    const currency = this.props.currency === 'USD' ? 'U$S' : '$';
    return (
      <div className={'Currency-container ' + bigClass}>
        <span className="Currency-tag">{currency}</span>
        <span>{this.props.amount.toLocaleString()}</span>
      </div>
    );
  }
}

export default Currency;
