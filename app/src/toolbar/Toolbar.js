import { Component } from 'react';
import logo from '../assets/svg/logo.svg';
import './Toolbar.scss';
import InputSearch from './components/input-search/InputSearch';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(value) {
    this.props.onSearch(value);
  }

  render() {
    return (
      <header className="Toolbar-header">
        <img src={logo} className="Toolbar-logo" alt="logo" />
        <InputSearch onSearchChange={this.handleSearchChange} />
      </header>
    );
  }
}

export default Toolbar;
