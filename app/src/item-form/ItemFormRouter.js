import { useParams } from 'react-router-dom';
import ItemForm from './ItemForm';

function ItemFormRouter(props) {
  const { id } = useParams();

  return <ItemForm itemId={id} />;
}

export default ItemFormRouter;
