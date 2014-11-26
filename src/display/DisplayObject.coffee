EventDispatcher = require '../event/EventDispatcher'
Point = require '../geom/Point'
Vendor = require '../util/Vendor'

module.exports =
	class DisplayObject extends EventDispatcher

		@uidCounter: 0

		@READY: "DisplayObject/READY"

		@INIT_DEFAULTS:
			contentWidth: 100
			contentHeight: 100
			x: 0
			y: 0
			rotation: 0
			scaleX: 1
			scaleY: 1
			width: null
			height: null
			index: 0
			visible: true
			buttonMode: false
			interactive: false
			origin: {x:0,y:0}
			opacity: 1

		element: null

		_width: null
		_height: null
		_x: null
		_y: null
		_rotation: null
		_scaleX: null
		_scaleY: null
		_index: null
		_visible: null
		_buttonMode: null
		_interactive: null
		_origin: {}
		_opacity: null

		_id: null
		_name: null

		_visibility: null
		_uid: null
		_dirtyExternals: false
		_dirtyInternals: false

		constructor: (options=null) ->

			super()

			console.log "DisplayObject", @

			@element = document.createElement("div")
			@element.className = "display-object"
			@element.style.position = "absolute"
			@element.style[Vendor.pre("transformOrigin")] = Vendor.origin(0,0)

			@uid = DisplayObject.uidCounter.toString()
			DisplayObject.uidCounter++
			@element.setAttribute('data-uid',@uid)

			@_initOptions(options)


		#################################################################################
		# PUBLIC FUNCTIONS
		#################################################################################

		###
		Show
		###
		show: () ->
			@setVisible(true)
			return @

		###
		Hide
		###
		hide: () ->
			@setVisible(false)
			return @

		###
		Update this display object
		###
		update: () ->


		###
		Converts global coordinates to local ones
		###
		globalToLocal: (point) ->

			x = (point.x - @_x) / @_scaleX
			y = (point.y - @_y) / @_scaleY

			return new Point(x,y)

		###
		Converts local coordinates to global ones
		###
		localToGlobal: (point) ->

			x = (point.x * @_scaleX) + @_x
			y = (point.y * @_scaleY) + @_y

			return new Point(x,y)

		###
		Destroys the object
		###
		destroy: () ->
			@element = null
			super()

		transition: (duration,ease="linear",delay=0) ->

			if duration? and duration > 0
				@element.style[Vendor.pre("transition")] = Vendor.css("transform") + " " + duration + "s " + ease + " " + delay + "s"
			else
				@element.style[Vendor.pre("transition")] = "none"

		#################################################################################
		# GETTERS/SETTERS
		#################################################################################

		setVisible: (value) ->
			return if value is @_visible
			@_visible = value
			@_visibility = if value then "visible" else "hidden"
			@_dirtyExternals = true

		getVisible: () -> return @_visible

		setOpacity: (value) ->
			return if value is @_opacity
			@_opacity = value
			@_dirtyExternals = true

		getOpacity: () -> return @_opacity

		setButtonMode: (value) ->
			return if value is @_buttonMode
			@_buttonMode = value
			@element.style.cursor = if value then "pointer" else "default"

		getButtonMode: () -> return @_buttonMode

		setName: (value) ->
			return if value is @_name
			@name = value

		getName: () -> return @_name

		setId: (value) ->
			return if value is @_id
			@_id = value
			@element.id = value

		getId: () -> return @_id

		setIndex: (value) ->
			return if value is @_index
			@_index = value
			@element.style.zIndex = value

		getIndex: () -> return @_index

		setInteractive: (value) ->
			return if value is @_interactive
			@_interactive = value
			@element.style.pointerEvents = if value then "auto" else "none"

		getInteractive: () -> return @_interactive

		setOrigin: (value) ->
			return if @_origin and @_origin.x is value.x and @_origin.y is value.y
			@_origin.x = value.x
			@_origin.y = value.y
			@element.style[Vendor.pre("transformOrigin")] = Vendor.origin(value.x,value.y)

		getOrigin: () -> return @_origin

		setX: (value, force = false) ->
			return if value is @_x
			@_x = value
			@_dirtyExternals = true
			@render() if force
			return @

		getX: () -> return @_x

		setY: (value, force = false) ->
			return if value is @_y
			@_y = value
			@_dirtyExternals = true
			@render() if force
			return @

		getY: () -> return @_y

		setRotation: (value, force = false) ->
			return if value is @_rotation
			@_rotation = value
			@_dirtyExternals = true
			@render() if force
			return @

		getRotation: () -> return @

		setContentWidth: (value, force = false) ->
			return if value is @_contentWidth
			@_contentWidth = value
			@_scaleX = @_width / @_contentWidth
			@_dirtyExternals = true
			@render() if force
			return @

		getContentWidth: () -> return @_contentWidth

		setContentHeight: (value, force = false) ->
			return if value is @_contentHeight
			@_contentHeight = value
			@_scaleY = @_height / @_contentHeight
			@_dirtyExternals = true
			@render() if force
			return @

		getContentHeight: () -> return @_contentHeight

		setWidth: (value, force = false) ->
			return if value is @_width
			@_width = value
			@_scaleX = @_width / @_contentWidth
			@_dirtyExternals = true
			@render() if force
			return @

		getWidth: () -> return @_width

		setHeight: (value, force = false) ->
			return if value is @_height
			@_height = value
			@_scaleY = @_height / @_contentHeight
			@_dirtyExternals = true
			@render() if force
			return @

		getHeight: () -> return @_height

		setScaleX: (value, force = false) ->
			return if value is @_scaleX
			@_scaleX = value
			@_width = @_contentWidth * @_scaleX
			@_dirtyExternals = true
			@render() if force
			return @

		getScaleX: () -> return @_scaleX

		setScaleY: (value, force = false) ->
			return if value is @_scaleY
			@_scaleY = value
			@_height = @_contentHeight * @_scaleY
			@_dirtyExternals = true
			@render() if force
			return @

		getScaleY: () -> return @_scaleY

		#################################################################################
		# PRIVATE/PROTECTED FUNCTIONS
		#################################################################################

		_initOptions: (options) ->
			@_setOptions(options,DisplayObject.INIT_DEFAULTS)

		_setOptions: (options,defaults) ->
			for property of defaults
				fn = "set" + property.charAt(0).toUpperCase() + property.slice(1)
				if @[fn]?
					if options?[property]?
						@[fn](options[property])
					else if defaults[property]?
						@[fn](defaults[property])

		_renderInternals: () ->
			@_dirtyInternals = false

		_renderExternals: () ->
			if @_dirtyExternals
				@element.style.width = @_contentWidth + "px"
				@element.style.height = @_contentHeight + "px"
				@element.style.visibility = @_visibility
				@element.style.opacity = @_opacity
				@element.style[Vendor.pre("transform")] = Vendor.translate(@_x,@_y) + " scale(" + @_scaleX + "," + @_scaleY + ") rotate(" + @_rotation + "deg)"

				@_dirtyExternals = false

		render: () ->
			@_renderExternals()
			@_renderInternals()
