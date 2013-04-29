Twine Events
============

A simple macro/js framework for Twine that adds pub/sub events. Kind of useful if you're doing fairly complicated scripting and want to simplify things, or otherwise wish to decouple functionality within your Twine game.

How it works
------------

***In Twine***

* To trigger a 'foo' event, use:
	`<<event foo>>`
* To provide some data with the event, do:
	`<<event foo val1 val2 ... valn>>`

***In Javascript***

* To register a callback, use:
	`Events.on('foo', function(e){ ... });`
* To trigger events, call:
	 `Events.trigger('foo');`


Using it
--------

To use the library, you will need to create a Twine passage to register this macro. 
Simply create a new passage, give it a *script* tag, and copy the contents of `src/events.min.js` into it.

As shown above, you can use the macro with the following syntax in Twine:
`<<event event.name val1 val2>>`

However, you can also explicity trigger events by doing:
`<<event trigger event.name val1, val2>>`

You can also attach listeners this way:
`<<event on event.name myfunc>>`

The last argument there, 'myfunc', needs to be a reference to a Javascript function within Twine. You can do this like so:
		<<set 
		handler = function fn(e){ alert(e.data[0]); } 
		$handle = handler
		>>

		<<event on foo handle>>

Now, within another passage, you can trigger these events:
		<<event foo default>>
		<<event trigger foo explicit>>

This will create two dialog boxes when the passage is navigated to, saying "default" and "explicit". Yay!

Whilst this is quite simple, it allows you do some quite complicated interactions relatively easy once you get used to how it all works.


Events
------

The data structure of the Event Object is as follows:

```javascript
	event.type; //the base part of the event name. If the event was fired for 'foo.bar.baz', the type will equal 'foo'
	event.namespace; //the full name of the event
	event.data; //an array containing whatever values were passed when the event was triggered
	event.passage; //a reference to the Passage object from which this event was triggered
	event.currentTarget; //a reference to the DOM object corresponding to the Event's Passage instance
	event.timestamp; //Epoch timestamp indicating when the Event object was created
```

Namespaces
----------
Events require names (the 'foo' bit in the examples above). However, these can be broken into dot-separated parts - so, you can do `<<event foo.bar>>` for example.

This way, you can register multiple listeners with different orders of specificity. A listener registered to *'foo'* will get any events that start with *"foo"*, including *"foo.bar"*, whereas a listener matching *'foo.bar.baz'* will only be called against events for *"foo.bar"*. Feel free to email me if that doesn't makes sense, but trust me, it's useful.



Removing listeners
------------------

If you add a listener in JS, the method will return an integer index of the listener you have added.
`var index = Events.on('foo', function(e) {});`

You can use this index to remove the same event listener at a later point, by doing:
`Events.off(index);`

This function will return the original listener callback

Comments, forks and pull-requests welcome :)

To-do
-----
Allow the removal of handlers via Twine macro. Add proper bubbling/containment to events.