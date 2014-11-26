DisplayObject = require "../display/DisplayObject"
Vendor = require "../util/Vendor"
BasicLayout = require "../display/layout/BasicLayout"
ZoeLayout = require "../display/layout/ZoeLayout"
BackgroundRender = require "../display/render/BackgroundRender"
ImageRender = require "../display/render/ImageRender"

module.exports =
	class MovieClip extends DisplayObject

		@REPEAT: "MovieClip/REPEAT"
		@COMPLETE: "MovieClip/COMPLETE"
		@CUE_POINT: "MovieClip/CUE_POINT"

		@DATA_TYPES:
			zoe: "zoe"
			basic: "basic"

		# play options
		_repeat: null
		_speed: null
		_maxFrame: null
		_minFrame: null
		_delay: null

		_totalFrames: 0
		_playhead: 0
		_currentFrame: 0
		_count: 0
		_playing: false
		_animations: null
		_cuePointsByFrame: null
		_cuePointsByName: null
		_queue: null
		_sheets: null

		_layoutEngine: null
		_renderEngine: null

		constructor: (data, options=null) ->

			super(options)

			@_animations = {}
			@_cuePointsByFrame = {}
			@_cuePointsByName = {}
			@_queue = []

			@element.className += " movieClip"
			@element.style.overflow = "hidden"

			switch @_getDataType(data)
				when MovieClip.DATA_TYPES.zoe
					@_layoutEngine = new ZoeLayout(data)
				when MovieClip.DATA_TYPES.basic
					@_layoutEngine = new BasicLayout(data,@_contentWidth,@_contentHeight)
				else console.error("Invalid data")

			if options?.renderMethod?
				switch options.renderMethod
					when "renderBackground"
						@_renderEngine = new BackgroundRender(@_layoutEngine.images)
					when "renderImage"
						@_renderEngine = new ImageRender(@_layoutEngine.images)
					else
						@_renderEngine = new BackgroundRender(@_layoutEngine.images)
			else
				@_renderEngine = new BackgroundRender(@_layoutEngine.images)

			@element.appendChild(@_renderEngine.element)

			@_totalFrames = @_layoutEngine.totalFrames

			@_layoutEngine.update(@_currentFrame)
			@_dirtyInternals = true


		#################################################################################
		# PUBLIC FUNCTIONS
		#################################################################################

		###
		Add an animation that can be played
		###
		addAnimation: (name,min,max) ->
			@_animations[name] = {min:min, max:max}
			return @

		###
		Remove an animation
		###
		removeAnimation: (name) ->
			@_animations[name] = null
			return @

		destroy: () ->
			@_animations = null
			@_cuePointsByFrame = null
			@_cuePointsByName = null
			@_queue = null

			super()

		# update play options without calling play
		updatePlayOptions: (options) ->
			@_updatePlayOptions(options)
			return @

		###
		Clear all the items in the queue
		###
		clearQueue: () ->
			@_queue = []
			return @

		###
		After the current animation add another to the queue
		###
		then: (func) ->
			@_queue.push(func)
			return @

		clearDelay: () ->
			@_delay = 0
			return @

		###
		Wait for a number of frames
		###
		addDelay: (frames) ->
			@_delay = frames
			return @

		###
		Play the animation
		Options are:
		- repeat - whether to repeat the movieClip | default: false
		- direction - the direction 1 for forward -1 for backward | default: 1 (forward)
		- max - the maximum frame to play to (inclusive) | default: last frame
		- min - the minimum frame to play to (inclusive) | default: 0 (first frame)
		###
		play: (options) ->
			@_updatePlayOptions(options)
			@_count = 0
			@_playing = true
			return @

		###
		Stop the animation
		###
		stop:() ->
			@_playing = false
			return @

		###
		Moves to the next frame and stops
		###
		nextFrame: () ->
			@_playing = false
			frame = @_currentFrame + 1
			@_playhead = frame
			@_currentFrame = frame
			@_layoutEngine.update(@_currentFrame)
			@_dirtyInternals = true
			return @

		###
		Moves to the previous frame and stops
		###
		previousFrame: () ->
			@_playing = false
			frame = @_currentFrame - 1
			@_playhead = frame
			@_currentFrame = frame
			@_layoutEngine.update(@_currentFrame)
			@_dirtyInternals = true
			return @


		###
		Go to a frame and play the animation
		###
		gotoAndPlay: (frame, options) ->
			frame = @_frame(frame)

			if frame?
				@_playhead = frame
				@_currentFrame = frame
				@_layoutEngine.update(@_currentFrame)
				# @_dirtyInternals = true

				@_updatePlayOptions(options)
				@_count = 0
				@_playing = true

			return @

		###
		Go to and frame and stop on it
		###
		gotoAndStop: (frame) ->
			frame = @_frame(frame)

			if frame?
				@_playing = false

				@_playhead = frame
				@_currentFrame = frame

				@_layoutEngine.update(@_currentFrame)
				@_dirtyInternals = true

			return @

		###
		Update the animation if playing, only to be called from the stage
		###
		update: () ->

			return if not @_playing

			return @_delay-- if @_delay > 0

			@_playhead += @_speed
			@_currentFrame = Math.floor(@_playhead)

			if @_cuePointsByFrame[@_currentFrame]?
				for name in @_cuePointsByFrame[@_currentFrame]
					@dispatch(MovieClip.CUE_POINT, {name:name})

			if @_speed > 0 and @_currentFrame > @_maxFrame
				if @_repeat isnt @_count
					@_playhead = @_minFrame + @_currentFrame - @_maxFrame - 1
					@_currentFrame = Math.floor(@_playhead)
					@dispatch(MovieClip.REPEAT)
					@_count++
				else
					@_playhead = @_maxFrame
					@_currentFrame = @_maxFrame
					@stop()

					if @_queue.length > 0
						@_next()
					else
						@dispatch(MovieClip.COMPLETE)
			else if @_speed < 0 and @_currentFrame < @_minFrame
				if @_repeat isnt @_count
					@_playhead = @_maxFrame + @_currentFrame - @_minFrame + 1
					@_currentFrame = Math.floor(@_playhead)
					@dispatch(MovieClip.REPEAT)
					@_count++
				else
					@_playhead = @_minFrame
					@_currentFrame = @_minFrame
					@stop()

					if @_queue.length > 0
						@_next()
					else
						@dispatch(MovieClip.COMPLETE)

			@_layoutEngine.update(@_currentFrame)

			@_dirtyInternals = true

		###
		Add a cue point
		###
		addCuePoint: (name,frame) ->
			@_cuePointsByFrame[frame] ?= []
			@_cuePointsByFrame[frame].push(name)
			@_cuePointsByName[name] = frame
			return @

		###
		Stop any repeating
		###
		stopRepeating: () ->
			@_count = -1
			@_repeat = -1
			return @


		#################################################################################
		# GETTERS/SETTERS
		#################################################################################

		getAnimationByName: (name) -> return @_animations[name]

		getCurrentFrame: () -> return @_currentFrame

		getTotalFrames: () -> return @_totalFrames

		getPlaying: () -> return @_playing

		getSpeed: () -> return @_speed

		#################################################################################
		# PRIVATE FUNCTIONS
		#################################################################################

		_getDataType: (data) ->

			if not @_isString(data) and not @_isNumber(data)
				if data.frames? and data.images? and @_isArray(data.images) and @_isArray(data.frames) and data.images.length > 0 and data.frames.length > 0
					if @_isString(data.images[0]) and @_isArray(data.frames[0]) and data.frames[0].length is 7
						return MovieClip.DATA_TYPES.zoe
				else if data.images? and @_isArray(data.images)
					if @_isString(data.images[0])
						return MovieClip.DATA_TYPES.basic

			return null


		###
		Work out which frame to use
		###
		_frame: (value) ->

			if @_isString(value)
				if @_animations[value]?
					return @_animations[value].min
				else if @_cuePointsByName[value]?
					return @_cuePointsByName[value]
				else
					console.warn("No animations or cuepoints with that name")
					return null
			else if not @_isNumber(value)
				console.warn("No animations or cuepoints with that name")
				return null

			return value

		###
		Check if value is string
		###
		_isString: ( value ) -> {}.toString.call( value ) is '[object String]'

		###
		Check if value is number
		###
		_isNumber: ( value ) -> !isNaN(value)

		###
		Check if value is array
		###
		_isArray: Array.isArray || ( value ) -> {}.toString.call( value ) is '[object Array]'

		###
		Update options
		###
		_updatePlayOptions: (options) ->

			if options?.repeat?
				if options.repeat is true
					@_repeat = -1
				else if @_isNumber(options.repeat)
					@_repeat = Math.round(options.repeat)
				else
					@_repeat = 0
			else
				if not @_repeat? or @_repeat is not -1
					@_repeat = 0

			@_speed = if options?.speed? then options.speed else 1
			@_delay = if options?.delay? then options.delay else @_delay

			@_maxFrame = @_totalFrames - 1
			@_minFrame = 0
			# Sets the min and max based on animation
			if options?.animation?
				if @_animations[options.animation]?
					@_minFrame = @animations[options.animation].min
					@_maxFrame = @animations[options.animation].max
				else
					console.warn "Animation", options.animation, "doesn't exist"
			# Overrides min and max
			@_maxFrame = options.max if options?.max?
			@_minFrame = options.min if options?.min?

		###
		Render any updates
		###
		_renderInternals: () ->
			if @_dirtyInternals
				@_renderEngine.render(@_layoutEngine.current)
				@_dirtyInternals = false

		###
		Call the next function in the queue
		###
		_next: () => @_queue.shift().call(@) if @_queue?.length > 0
