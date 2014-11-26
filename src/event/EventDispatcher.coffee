module.exports =
	class EventDispatcher

		destroy: () ->
			@_events = null

		on: (type, listener, scope) ->

			# Create array if doesn't exist
			@_events = {} unless @_events?
			@_events[type] = [] unless @_events[type]?

			i = 0
			while i < @_events[type].length
				return @ if @_events[type][i].listener is listener
				i++

			@_events[type].push({listener:listener,scope:scope})

			return @


		off: (type = null, listener = null) ->

			if not @_events?
				return @
			# If there is no type defined remove all events
			if not type?
				@_events = {}
				return @

			# If listener is not defined and event type exists clear all listeners for that type
			if @_events[type]? and not listener?
				@_events[type] = []
				return @

			# If type has listeners remove all
			if @_events[type]?
				for event, i in @_events[type]
					@_events[type].splice(i, 1) if event? and event.listener == listener

			return @


		dispatch: (type, obj) ->

			# If events of that type exist
			if @_events? and @_events[type]?
				# Create event object and add the target
				obj = {} if not obj?
				obj.target = @

				for event in @_events[type]
					event.scope = @ if not event.scope?
					event.listener.call(event.scope, obj)
