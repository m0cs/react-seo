import { Component } from 'react';
import './Button.scss';

class Button extends Component {
  // Component methods

  render() {
    return <button className="button">{this.props.label}</button>;
  }
}

export default Button;
