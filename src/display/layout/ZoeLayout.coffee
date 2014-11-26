ImageVO = require '../../vo/ImageVO'

module.exports =
	class ZoeLayout

		images: null
		totalFrames: null

		_currentSheetNumber: null

		constructor: (@_data) ->

			@images = []

			i = 0
			while i < @_data.images.length
				@images.push(new ImageVO(@_data.images[i]))
				i++

			@totalFrames = @_data.frames.length

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
			frameData = @_data.frames[frame]
			if frameData?
				sheetNumber = frameData[4]

				# if @_currentSheetNumber? and sheetNumber isnt @_currentSheetNumber
				# 	currentSheet = @images[@_currentSheetNumber]
				# 	currentSheet.x = ZoeLayout.OFF_X
				# 	currentSheet.y = 0

				@_currentSheetNumber = sheetNumber
				currentSheet = @images[@_currentSheetNumber]
				currentSheet.x = -frameData[0]
				currentSheet.y = -frameData[1]
				currentSheet.offsetX = frameData[5]
				currentSheet.offsetY = frameData[6]
				currentSheet.width = frameData[2]
				currentSheet.height = frameData[3]
				@current = currentSheet
			else
				console.warn "Data doesn't exist for frame", frame
