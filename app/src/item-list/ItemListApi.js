class ItemListApi {
  constructor() {
    this.itemsUrl = '/api/items';
  }

  list(like, options) {
    like = like || '';
    options = options || {};
    const signal = options.signal;
    return fetch(`${this.itemsUrl}?q=${like}`, {
      method: 'get',
      signal,
    }).then((res) => res.json());
  }
}

export default ItemListApi;
