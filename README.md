# react-seo
Just a react seo oriented, with a list of ML products.


## Prject structure
### BE
Multi process (# cores) api server.

* /api/items?q=:query
* /api/items/:id

### APP
React frontEnd.

## Running
### All
* npm run build
* npm run start

Default port: 3000

### Only BE
* npm install
* npm run start

Default port: 3000

#### Different port?
Override _PORT_ variable

* PORT=3006 npm run start

### Only APP
* npm install
* npm run start

Default port: 3001
