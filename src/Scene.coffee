DisplayObject = require './display/DisplayObject'
MovieClip = require './display/MovieClip'
Sprite = require './display/Sprite'

module.exports =
	class Scene extends DisplayObject

		@ENTER_FRAME: "Scene/ENTER_FRAME"
		@EXIT_FRAME: "Scene/EXIT_FRAME"
		@RENDER: "Scene/RENDER"

		@DISPLAY_OBJECT: "DisplayObject"
		@MOVIE_CLIP: "MovieClip"
		@SPRITE: "Sprite"

		@RENDER_BACKGROUND: "renderBackground"
		@RENDER_IMAGE: "renderImage"

		@MovieClip: MovieClip
		@Sprite: Sprite
		@displayObject: DisplayObject

		@INIT_DEFAULTS:
			fps: 25

		_fps: null
		_time: null
		_parent: null
		_previousFrameTime: null
		_children: []
		_paused: false
		_lastUpdateTime: 0
		_timeout: null
		_animationFrame: null

		constructor: (parent=document.getElementsByTagName("body")[0],options=null) ->

			super()

			@element.className += " scene"

			parent.appendChild(@element)

			@_children = []

			@_initOptions(options)

			@update()
			@render()


		#################################################################################
		# PUBLIC FUNCTIONS
		#################################################################################

		###
		The render tick
		###
		render: (time) =>

			if not @_paused
				@dispatch(Scene.RENDER)

				super()

				i = 0
				while i < @_children.length
					@_children[i].render()
					i++

				@_animationFrame = window.requestAnimationFrame(@render)
			else
				@_animationFrame = null


		###
		The animation frame tick
		###
		update: () =>

			if not @_paused
				@dispatch(Scene.ENTER_FRAME)

				i = 0
				while i < @_children.length

					@_children[i].update()
					i++

				@dispatch(Scene.EXIT_FRAME)

				@timeout = setTimeout(@update, @_time)
			else
				@timeout = null

		###
		Add a MovieClip to the stage
		###
		add: (value,data,options) ->
			console.log "value", value

			if value?
				if @_isString(value)
					if value is Scene.MOVIE_CLIP and data?
						child = new MovieClip(data,options)
					else if value is Scene.SPRITE and data?
						child = new Sprite(data,options)
					else
						return null
				else if value instanceof MovieClip or value instanceof Sprite
					child = value
				else
					return null

				# prevent adding more than once
				i = 0
				while i < @_children.length
					if @_children[i] is child
						return child
					i++

				@_children.push(child)
				@element.appendChild(child.element)

				return child

			return null

		###
		Remove a MovieClip from the stage
		###
		remove: (child) ->

			if child?
				@element.removeChild(child.element)

				i = 0
				while i < @_children.length
					if @_children[i] is child
						@_children.splice(i,1)
						return
					i++

		###
		Destroys the stage
		###
		destroy: () ->
			window.cancelAnimationFrame(@_animationFrame)

			clearTimeout(@_timeout)

			while @_children.length
				child = @_children[0]
				@removeChild(child)
				child.destroy()

			@_parent.removeChild(@element)
			@_children = []

			super()

		###
		Pauses updating and rendering
		###
		pause: () ->
			if not @_paused
				window.cancelAnimationFrame(@_animationFrame)
				@_animationFrame = null
				clearTimeout(@_timeout)
				@_timeout = null
				@_paused = true

		###
		Unpauses updating and rendering
		###
		unpause: () ->
			if @_paused
				@_paused = false

				@_previousFrameTime = null

				@update() if not @_timeout?
				@render() if not @_animationFrame?


		#################################################################################
		# GETTERS/SETTERS
		#################################################################################

		setFps: (value) ->
			return if value is @_fps
			@_fps = value
			@_time = 1000 / value


		getFps: (value) ->
			return @_fps

		#################################################################################
		# PRIVATE FUNCTIONS
		#################################################################################

		_initOptions: (options) ->
			super(options)
			@_setOptions(options,Scene.INIT_DEFAULTS)

		###
		Check if value is string
		###
		_isString: ( value ) -> {}.toString.call( value ) is '[object String]'
