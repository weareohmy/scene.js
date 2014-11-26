module.exports =
	class SheetVO

		constructor: (@url, @x=0, @y=0, @width=0, @height=0, @offsetX=0, @offsetY=0) ->

		urlToString: () ->
			"url(#{@url})"

		positionToString: () ->
			"#{@x}px #{@y}px"
