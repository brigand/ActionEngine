build:
	coffee --output build/ --compile coffee/

docs:
	coffee --output demos/build/ --compile demos

clean:
	rm -rf build
	rm -rf demos/build/
	rm -rf demos/lit/

all: build docs

.PHONY: build clean docs
