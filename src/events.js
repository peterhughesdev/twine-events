;
// Put us in the global namespace with an obnoxiously generic instance name
window.Events = (function() {
	// Simple array of listener handlers
	var listeners = [];

	// Base class for events. Contain within closure to avoid overwriting
	// browser defaults
	var Event = function(name, passage, data, el) {
		var parts = name.split(".");

		// Get the base of the namespace.
		this.type = parts.shift();

		// The rest of the parts
		this.namespace = parts.join(".");
		
		// Payload. Optional array
		this.data = data;

		// Reference to Passage object this event was triggered from
		this.passage = passage;

		// Reference to the DOM element for the current Passage
		this.currentTarget = el;

		// Provide a nice little epoch timestamp
		this.timestamp = Math.round(new Date().getTime() / 1000);
	}

	// Returned closure
	return { 
		// Used to register listeners. Returns index if push is successful
		on : function(e, fn) {
			if (typeof fn === 'function') {
				return listeners.push({e:e, fn:fn}) - 1;
			}

			return -1;
		},
		// Used to deregister listeners. Requires index from 'on' call
		// Returns removed function handler
		off : function(i) {
			if (listeners[i])
				return listeners.splice(i, 1)[0];
		},
		// Create a new Event instance and dispatch to listeners
		// Returns the created Event
		trigger : function(name, args, el) {
			if (!name) return;

			var event = new Event(name, state.history[0], args, el);
			var listener, l = listeners.length, i = 0;

			for (;i<l;++i) {
				listener = listeners[i];
				if (name.indexOf(listener.e) === 0) {
					listener.fn(event);
				}
			}

			return event;
		}
	}
}());


// Bootstrap macro
try {
	version.extensions.loadMacro = { 
		major: 0, minor: 1, revision:0
	};

	macros.event = { 
		init: function(){},
		handler: function(el, name, params) {
			var fn = params.shift();
			if (fn === "on" && typeof state.history[0].variables[params[1]] === "function") {
				Events.on(params[0], state.history[0].variables[params[1]]);
			} else if (fn === "trigger") {
				Events.trigger(params.shift(), params, el);
			} else {
				Events.trigger(fn, params, el);
			}
		}
	};

} catch(e) {
	throwError(place, "Events error: " + e.message);
};