const searchClient = algoliasearch(
    'Z2GY2O042H',
    '11954ecaedd13fbfd783200ad0959bd7'
);

const search = instantsearch({
  indexName: 'shopify_storemycode_products', // your Algolia products index name
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '.template-search__header', // update this selector to match your search page
  }),

  instantsearch.widgets.hits({
    container: '.product-grid-container', // update this selector to match your search page
  })
]);

search.start();
