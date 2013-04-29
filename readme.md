Twine Events
============

A simple macro/js framework for Twine that adds pub/sub events. Kind of useful if you're doing fairly complicated scripting and want to simplify things, or otherwise wish to decouple functionality within your Twine game.

How it works
------------

Pretty simple. 

***In Twine***

* To trigger a 'foo' event, use:
	`<<event foo>>`
* To provide some data with the event, do:
	`<<event foo val1 val2 ... valn>>`

***in Javascript***

* To register a callback, use:
	`Events.on('foo', function(e){ ... });`
* To trigger events, call:
	 `Events.trigger('foo');`


Namespaces
----------

Events require names (the 'foo' bit in the examples above). However, these can be broken into dot-separated parts - so, you can do `<<event foo.bar>>` for example. This way, you can register multiple listeners with different orders of specificity. A listener registered to 'foo' will get any events that start with "foo", including "foo.bar", whereas a listener matching 'foo.bar.baz' will only be called against events for "foo.bar".

