class ItemFormApi {
  constructor() {
    this.itemsUrl = '/api/items';
  }

  findById(itemId) {
    itemId = itemId || '';
    return fetch(`${this.itemsUrl}/${itemId}`).then((res) => res.json());
  }
}

export default ItemFormApi;
