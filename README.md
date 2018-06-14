# DCAT-AGO

Automates the metadata migration process between any open data site utilizing the (Data Catalog Vocabulary (DCAT))[https://www.w3.org/TR/vocab-dcat/] and ArcGIS Online.

Currently migrates metadata information for the following fields:

* `title`
* `description`
* `tags`

## Instructions
_Note: the following assumes node version 8+_

1. Clone or download repo
2. `cd` to the `dcat-ago` directory
3. Run `npm install` to install dependencies from `package.json`
3. Once dependencies are complete, run:
  ```
  node dcat-ago.js --site={{ site url }} --username={{ ArcGIS Online username }} --password={{ ArcGIS Online password }} --portal={{ ArcGIS Online organization URL }}
  ```