build:
	coffee --output build/ --compile coffee/

clean:
	rm -rf build

all: build

.PHONY: build clean
