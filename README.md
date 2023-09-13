## Meilisearch GitHub Actions

🤩 Actions index:

- `meilisearch/actions/cloud-crawler`: Call your Meilisearch Cloud configuration from a GH action!


```yml
name: Crawl my website with Meilisearch Cloud

on: [push]

jobs:
  crawler:
    runs-on: ubuntu-latest
    steps:
      - uses: meilisearch/actions/cloud-crawler@main
        with:
          token: ${{ secrets.MEILISEARCH_CLOUD_CRAWLER_TOKEN }} # required
          ignoreConcurrencyError: true                          # optional (default: true)
```


Enjoy! :seal:
