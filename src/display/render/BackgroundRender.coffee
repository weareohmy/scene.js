Vendor = require '../../util/Vendor'

module.exports =
	class BackgroundRender

		constructor: (@_images) ->

			@element = document.createElement("div")
			@element.style.position = "absolute"
			@element.style.overflow = "hidden"
			@element.style.backgroundRepeat = "no-repeat"
			@element.style.backgroundImage = (("url('" + img.url + "')") for img in @_images).join(", ")
			@element.style.backgroundPosition = (("0px 2048px") for img in @_images).join(", ")

		render: (current) ->

			positions = []
			for img in @_images
				if img is current
					positions.push(img.positionToString())
				else
					positions.push("0px 2048px")

			@element.style.backgroundPosition = positions.join(", ")
			@element.style.width = current.width + "px"
			@element.style.height = current.height + "px"
			@element.style[Vendor.pre("transform")] = Vendor.translate(-current.offsetX,-current.offsetY)
