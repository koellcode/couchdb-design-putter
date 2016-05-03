# couchdb-design-putter
Aggregates views to designs via globbing and puts them into your couchdb

given the following folder structure

- feature
	- views
		- testview1.js
		- testview2.js

results in a design document named 'feature', containing both views (testview1, testview2)

your view file must export a map or a reduce function (or both) otherwhise it will be ignored

# Installation
	$ npm install -g couchdb-design-putter
# Usage
In your target directory:
	
	$ couchdb-design-putter start
	
Or with globbing pattern
	
	$ couchdb-design-putter start -d '**/_design/*.js'
	
With specific couchdb url

	$ couchdb-design-putter start -b 'http://myserver/mybucket'

# Authentication

You can use Basic Auth via Environment Variables

	USER, PASSWORD

# Note
it works only with node.js 6.x 


[![Build Status](https://travis-ci.org/koellcode/couchdb-design-putter.svg?branch=master)](https://travis-ci.org/koellcode/couchdb-design-putter)
