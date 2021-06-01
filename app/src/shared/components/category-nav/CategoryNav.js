import { Component } from 'react';
import './CategoryNav.scss';

class CategoryNav extends Component {
  // Component methods

  render() {
    const categories = this.props.categories;
    const categoriesCount = categories.length;
    const categoryElements = categories.map((category, i) => {
      const separator = '>';
      if (categoriesCount - 1 > i) {
        return (
          <div key={category} className="CategoryNav-category-container">
            <span className="CategoryNav-category">{category}</span>
            <span className="CategoryNav-separator">{separator}</span>
          </div>
        );
      } else {
        return (
          <div key={category} className="CategoryNav-category-container">
            <span className="CategoryNav-category">{category}</span>
          </div>
        );
      }
    });
    return <div className="CategoryNav-container">{categoryElements}</div>;
  }
}

export default CategoryNav;
