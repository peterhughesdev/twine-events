Twine Events
============

A simple macro/js framework for Twine that adds pub/sub events. Kind of useful if you're doing fairly complicated scripting and want to simplify things, or otherwise wish to decouple functionality within your Twine game.

How it works
------------
Either from Twine or JS, you can trigger *Events* which are sent to *Listeners*. *Events* have a name and optional data attached to them. *Listeners* are functions, that specify a particular *Event* name that they're interested in. When an *Event* of that name is triggered, any applicable *Listener* functions will be called with that *Event*. 

This allows you to send data and call functions between Passages, without the source of the data having to know who's interested (and vice-versa). You can have an unlimited amount of *Listeners*, and call your *Events* whatever you want.

Check out the example `example/simple_events.twee` file to see how this can be used.

***In Twine***

* To trigger a 'foo' event, use:
	`<<event triger foo>>`

	or as a convenience method:

	`<<event foo>>`
* To provide some data with the event, do:
	`<<event foo val1 val2 ... valn>>`
* To attach a listener for 'foo' events, do:
	```
	<<set 
	func = function fn(e){ alert(e.data[0]); } 
	$handler = func
	>>

	<<event on foo handler>>
	```

***In Javascript***

* To trigger events, call:
	 `Events.trigger('foo', ["val1", "val2"]);`
* To register a listener, use:
	`Events.on('foo', function(e){ alert(e,data[0]); });`


Events
------

The data structure of the Event Object is as follows:

```javascript
	event.type; 		//the base part of the event name. If the event was fired for 'foo.bar.baz', the type will equal 'foo'
	event.namespace; 	//the full name of the event
	event.data; 		//an array containing whatever values were passed when the event was triggered
	event.passage; 		//a reference to the Passage object from which this event was triggered
	event.currentTarget; 	//a reference to the DOM object corresponding to the Event's Passage instance
	event.timestamp; 	//Epoch timestamp indicating when the Event object was created
```

Namespaces
----------
Events require names (the 'foo' bit in the examples above). However, these can be broken into dot-separated parts - so, you can do `<<event foo.bar>>` for example.

This way, you can register multiple listeners with different orders of specificity. A listener registered to *'foo'* will get any events that start with *"foo"*, including *"foo.bar"*, whereas a listener matching *'foo.bar'* will only ever be called against events for *"foo.bar"*. Feel free to email me if that doesn't makes sense, but trust me, it's useful.



Removing listeners
------------------

If you add a listener in JS, the method will return an integer index of the listener you have added.
`var index = Events.on('foo', function(e) {});`

You can use this index to remove the same event listener at a later point, by doing:
`Events.off(index);`


To-do
-----
Allow the removal of handlers via Twine macro. Add proper bubbling/containment to events.

Comments, forks and pull-requests welcome :)
