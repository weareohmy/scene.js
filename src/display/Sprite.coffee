Vendor = require "../util/Vendor"
ImageVO = require "../vo/ImageVO"
DisplayObject = require "../display/DisplayObject"
BackgroundRender = require "../display/render/BackgroundRender"
ImageRender = require "../display/render/ImageRender"

module.exports =
	class Sprite extends DisplayObject

		_image: null
		_renderEngine: null

		constructor: (image, options) ->

			super(options)

			@_image = new ImageVO(image,0,0,@_contentWidth,@_contentHeight)

			@element.className += " sprite"
			@element.style.overflow = "hidden"

			if options?.renderMethod?
				switch options.renderMethod
					when "renderBackground"
						@_renderEngine = new BackgroundRender([@_image])
					when "renderImage"
						@_renderEngine = new ImageRender([@_image])
					else
						@_renderEngine = new BackgroundRender([@_image])
			else
				@_renderEngine = new BackgroundRender([@_image])

			@element.appendChild(@_renderEngine.element)

			@_dirtyInternals = true

		#################################################################################
		# PUBLIC FUNCTIONS
		#################################################################################

		destroy: () ->
			@_image = null
			super()

		#################################################################################
		# PRIVATE/PROTECTED FUNCTIONS
		#################################################################################

		###
		Renders updates
		###
		_renderInternals: () ->
			if @_dirtyInternals
				@_renderEngine.render(@_image)
				@_dirtyInternals = false
