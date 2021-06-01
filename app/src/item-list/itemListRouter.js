import { useLocation } from 'react-router-dom';
import ItemList from './ItemList';

function ItemListRouter(props) {
  const { search } = useLocation();
  // remove ? and split by separator &
  let queryValue;
  const queryString = search.replace('?', '').split('&');
  queryString.find((query) => {
    const queryArr = query.split('=');
    const key = queryArr[0];
    const value = queryArr[1];
    if (key === 'search') {
      queryValue = value;
    }

    return key === 'search';
  });

  function handleItemSelect(item) {
    props.onItemSelect(item);
  }

  if (!queryValue) {
    return <div></div>;
  } else {
    return <ItemList like={queryValue} onItemSelect={handleItemSelect} />;
  }
}

export default ItemListRouter;
