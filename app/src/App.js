import './App.scss';
import Toolbar from './toolbar/Toolbar';
import ItemListRouter from './item-list/itemListRouter';
import ItemFormRouter from './item-form/ItemFormRouter';

import { useHistory } from 'react-router-dom';

import { Switch, Route } from 'react-router-dom';

function App() {
  const history = useHistory();

  function handleSearch(value) {
    history.push(`/items?search=${value}`);
  }

  function handleItemSelect(itemId) {
    history.push(`/items/${itemId}`);
  }

  return (
    <div className="App">
      <Toolbar onSearch={handleSearch} />
      <div className="App-content">
        <Switch>
          <Route exact path="/items">
            <ItemListRouter onItemSelect={handleItemSelect} />
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
