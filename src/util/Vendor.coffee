module.exports =
	class Vendor

		@support3D: null

		@prefix: () ->
			return arguments.callee.result if "result" of arguments.callee
			regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/
			someScript = document.getElementsByTagName("script")[0]
			for prop of someScript.style
				return arguments.callee.result = "#{prop.match(regex)[0]}" if regex.test(prop)
			return arguments.callee.result = "webkit".toLowerCase() if "WebkitOpacity" of someScript.style
			return arguments.callee.result = "khtml".toLowerCase() if "KhtmlOpacity" of someScript.style
			arguments.callee.result = ""

		@pre: (value) ->
			str = Vendor.prefix()
			if str.length > 0 then return str + value.charAt(0).toUpperCase() + value.slice(1)
			return value

		@css: (value) ->
			str = Vendor.prefix()
			if str.length > 0 then return "-" + str + "-" + value
			return value

		@origin: (x, y) ->
			x += "px" if !isNaN(x)
			y += "px" if !isNaN(y)

			if not Vendor.support3D?
				Vendor.check3D()

			if Vendor.support3D
				return "#{x} #{y} 0"
			else
				return "#{x} #{y}"


		@translate: (x, y) ->

			if not Vendor.support3D?
				Vendor.check3D()

			if Vendor.support3D
				return "translate3d(#{x}px, #{y}px, 0)"
			else
				return "translate(#{x}px, #{y}px)"

		@check3D: () ->
			temp = document.createElement("div");
			temp.style[Vendor.pre("transform")] = "translate3d(0px, 0px, 0px)"

			rxTranslate = /translate3d\(0px, 0px, 0px\)/g
			asSupport = temp.style.cssText.match(rxTranslate)
			Vendor.support3D = (asSupport isnt null and asSupport.length is 1)
