class ItemListApi {
  constructor() {
    this.itemsUrl = '/api/items';
  }

  list(like) {
    like = like || '';
    return fetch(`${this.itemsUrl}?q=${like}`).then((res) => res.json());
  }
}

export default ItemListApi;
