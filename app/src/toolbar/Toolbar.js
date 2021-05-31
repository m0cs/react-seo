import { Component, createRef } from 'react';
import logo from '../assets/svg/logo.svg';
import './Toolbar.scss';
import InputSearch from './components/input-search/InputSearch';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    this.SearchRef = createRef();
  }

  // Component methods

  render() {
    return (
      <header className="Toolbar-header">
        <img src={logo} onClick={this.handleOnClick} className="Toolbar-logo" alt="logo" />
        <InputSearch ref={this.SearchRef} onSearchChange={this.handleSearchChange} />
      </header>
    );
  }

  // Handlers

  handleSearchChange(value) {
    this.props.onSearch(value);
  }

  handleOnClick() {
    this.SearchRef.current.clear();
    this.props.onNavigateToHome();
  }
}

export default Toolbar;
