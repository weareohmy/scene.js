Vendor = require '../../util/Vendor'

module.exports =
	class ImageRender

		constructor: (@_images) ->

			@element=document.createElement("img")
			@element.style.position = "absolute"
			@element.style.left = 0
			@element.style.top = 0

		render: (current) ->

			@element.src = current.url
			# @element.style.width = current.width + "px"
			# @element.style.height = current.height + "px"
			@element.style[Vendor.pre("transform")] = Vendor.translate(current.x - current.offsetX,current.y - current.offsetY)
