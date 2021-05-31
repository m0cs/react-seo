import { Component } from 'react';
import searchIcon from '../../..//assets/svg/search-24px.svg';
import './InputSearch.scss';

class InputSearch extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClickSearchIcon = this.handleClickSearchIcon.bind(this);

    this.state = {
      value: '',
    };
  }

  // Component methods

  render() {
    return (
      <div className="InputSearch-container">
        <input
          className="InputSearch-input"
          placeholder="Buscar productos"
          onKeyUp={this.handleKeyUp}
          onChange={this.handleOnChange}
          value={this.state.value}
        ></input>
        <div className="InputSearch-logo-container">
          <img
            src={searchIcon}
            onClick={this.handleClickSearchIcon}
            className="InputSearch-logo"
            alt="searchIcon"
          />
        </div>
      </div>
    );
  }

  // Handlers

  handleKeyUp(event) {
    const ENTER_KEY_CODE = 13;
    // Emit event on press Enter key.
    if (event.keyCode === ENTER_KEY_CODE) {
      this.props.onSearchChange(event.target.value);
    }
  }

  handleOnChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleClickSearchIcon() {
    this.props.onSearchChange(this.state.value);
  }

  // Custom methods

  clear() {
    this.setState({
      value: '',
    });
  }
}

export default InputSearch;
