import { Component } from 'react';
import './Condition.scss';

class Condition extends Component {
  render() {
    const condition = this.props.condition === 'new' ? 'Nuevo' : 'Usado';
    return (
      <div className="Condition-container">
        <span>{condition}</span>
      </div>
    );
  }
}

export default Condition;
