import { useLocation } from 'react-router-dom';
import ItemList from './ItemList';

function ItemListRouter(props) {
  const { search } = useLocation();
  const queryString = search.replace('?', '');
  const searchValue = queryString.split('=')[1];

  function handleItemSelect(item) {
    props.onItemSelect(item);
  }

  return <ItemList like={searchValue} onItemSelect={handleItemSelect} />;
}

export default ItemListRouter;
