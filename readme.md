Twine Events
============

A simple macro/js framework for Twine that adds events. Kind of useful if you're doing fairly complicated scripting and want to simplify things.

Explain
-------

Pretty simple. Works very much like the jQuery event system - simply call `Events.on` to register a callback, and trigger events with `Events.trigger`. 
A macro is defined that lets you access these functions within Twine - the default use is `<<event foo>>`, but there are multiple optional arguments you can provide to allow more specific behaviour.

