ImageVO = require '../../vo/ImageVO'

module.exports =
	class BasicLayout

		images: null
		totalFrames: null

		constructor: (@_data, width, height) ->

			@images = []

			i = 0
			while i < @_data.images.length
				@images.push(new ImageVO(@_data.images[i],0,0,width,height))
				i++

			@totalFrames = @_data.images.length

			@update(0)


		#################################################################################
		# PUBLIC FUNCTIONS
		#################################################################################

		destroy: () ->
			super()
			@_images = null


		#################################################################################
		# PRIVATE FUNCTIONS
		#################################################################################

		###
		Calculates which image to display and at what position
		###
		update: (frame) ->
			@current = @images[frame]
			# console.log @current.url
			# @current.width = 500
			# @current.height = 500
