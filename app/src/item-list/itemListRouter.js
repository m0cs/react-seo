import { useLocation } from 'react-router-dom';
import ItemList from './ItemList';

function ItemListRouter(props) {
  const { search } = useLocation();
  // remove ? and split by separator &
  let queryValue;
  // clean the querystring string, removing ? and passed to array.
  const queryString = search.replace('?', '').split('&');
  queryString.find((query) => {
    const queryArr = query.split('=');
    const key = queryArr[0];
    const value = queryArr[1];
    const isQuerySearch = key === 'search';

    if (isQuerySearch) {
      queryValue = value;
    }

    return isQuerySearch;
  });

  function handleItemSelect(item) {
    props.onItemSelect(item);
  }

  function handleCategoryUpdate(categories) {
    props.onCategoryUpdate(categories);
  }

  if (!queryValue) {
    return <div></div>;
  } else {
    return (
      <ItemList
        like={queryValue}
        onCategoryUpdate={handleCategoryUpdate}
        onItemSelect={handleItemSelect}
      />
    );
  }
}

export default ItemListRouter;
