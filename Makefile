PHANTOMJS	?= phantomjs
SOURCES		= src/lib/jquery.form $(wildcard src/*.js) $(wildcard src/*/*.js)
TARGETS		= bundles/patterns.js bundles/patterns.min.js bundles/require-patterns.js bundles/require-patterns.min.js

all:: $(TARGETS)

bundles/patterns.js: $(SOURCES)
	node lib/r.js -o src/app.build.js out=$@ optimize=none

bundles/patterns.min.js: $(SOURCES)
	node lib/r.js -o src/app.build.js out=$@ optimize=uglify

bundles/require-patterns.js: 
	node lib/r.js -o src/app.build.js out=$@ \
		name=3rdparty/almond include=main wrap=true optimize=none

bundles/require-patterns.min.js: 
	node lib/r.js -o src/app.build.js out=$@ \
		name=3rdparty/almond include=main wrap=true optimize=uglify

lib/phantom-jasmine src/lib/jquery.form lib/requirejs:
	git submodule update --init --recursive

all:: build/docs/index.html

build/docs/index.html: docs/conf.py $(wildcard docs/*.rst) $(wildcard docs/*/*.rst)
	sphinx-build -b html docs build/docs

check: lib/phantom-jasmine
	$(PHANTOMJS) lib/phantom-jasmine/lib/run_jasmine_test.coffee tests/index.html

clean:
	rm -f $(TARGETS)

upgrade-require-jquery:
	rm -f src/3rdparty/require-jquery.zip
	curl -o src/3rdparty/require-jquery.zip $(curl http://requirejs.org/docs/download.html 2>/dev/null | grep download |grep jquery-require |cut -d'"' -f4)
	unzip -p src/3rdparty/require-jquery.zip jquery-require-sample/webapp/scripts/require-jquery.js > src/3rdparty/require-jquery.js
	rm src/3rdparty/require-jquery.zip

upgrade-rjs:
	curl -o lib/r.js $(curl http://requirejs.org/docs/download.html 2>/dev/null | grep download |grep 'r\.js' |cut -d'"' -f4)

.PHONY: all clean check
