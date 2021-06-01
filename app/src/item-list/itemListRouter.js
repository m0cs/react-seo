import { useLocation } from 'react-router-dom';
import ItemList from './ItemList';

function ItemListRouter(props) {
  const { search } = useLocation();
  // remove ? and split by separator &
  const queryString = search.replace('?', '').split('&');
  const searchValue = queryString.find((query) => {
    const queryArr = query.split('=');
    const key = queryArr[0];
    const value = queryArr[1];

    if (key === 'search') {
      return value;
    } else {
      return undefined;
    }
  });

  function handleItemSelect(item) {
    props.onItemSelect(item);
  }

  if (!searchValue) {
    return <div></div>;
  } else {
    return <ItemList like={searchValue} onItemSelect={handleItemSelect} />;
  }
}

export default ItemListRouter;
