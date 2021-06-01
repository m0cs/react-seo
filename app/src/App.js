import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import Toolbar from './toolbar/Toolbar';
import ItemListRouter from './item-list/itemListRouter';
import ItemFormRouter from './item-form/ItemFormRouter';
import CategoryNav from './shared/components/category-nav/CategoryNav';

function App() {
  const history = useHistory();
  let [categories, setCategories] = useState([]);

  function handleSearch(value) {
    history.push(`/items?search=${value}`);
  }

  function handleItemSelect(itemId) {
    history.push(`/items/${itemId}`);
  }

  function handleNavigateToHome() {
    setCategories([]);
    history.push('/');
  }

  function handleCategoryUpdate(newCategories) {
    setCategories(newCategories);
  }

  return (
    <div className="App">
      <Toolbar onNavigateToHome={handleNavigateToHome} onSearch={handleSearch} />
      <div className="App-content">
        <CategoryNav categories={categories} />
        <Switch>
          <Route exact path="/items">
            <ItemListRouter
              onItemSelect={handleItemSelect}
              onCategoryUpdate={handleCategoryUpdate}
            />
          </Route>
          <Route path="/items/:id">
            <ItemFormRouter />
          </Route>
          <Route path="/"></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
