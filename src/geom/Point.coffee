module.exports =
	class Point

		@createFromAngle: (angle, length) ->
			x = Math.sin(angle) * length
			y = Math.cos(angle) * length

			return new Point(x, y)

		constructor: (x = 0, y = 0) ->
			@x = x
			@y = y

		toString: () ->
			return @x + " " + @y

		equals: (p) ->
			return @x == p.x && @y == p.y

		clone: () ->
			return new Point(@x, @y)

		set: (x, y) ->
			@x = x
			@y = y

			return @

		reset: () ->
			return @set(0, 0)

		round: () ->
			@x = Math.round(@x)
			@y = Math.round(@y)

			return @

		overwrite: (p) ->
			@x = p.x
			@y = p.y

			return @

		add: (p) ->
			@x += p.x
			@y += p.y

			return @

		subtract: (p) ->
			@x -= p.x
			@y -= p.y

			return @

		multiply: (s) ->
			@x *= s
			@y *= s

			return @

		divide: (s) ->
			@x /= s
			@y /= s

			return @

		normalize: () ->
			length = @getLength()

			if length != 0
				@x /= length
				@y /= length

			return @

		dot: (p) ->
			return @x * p.x + @y * p.y

		invert: () ->
			@x = -@x
			@y = -@y

			return @

		getLength: () ->
			return Math.sqrt(@dot(@))

		getLengthNoSquareRoot: () ->
			return @dot(@)

		setLength: (newLength) ->
			length = @getLength()

			if length != 0
				@x = (@x / length) * newLength
				@y = (@y / length) * newLength

			return @

		getAngle: () ->
			return Math.atan2(@x, @y)

		setAngle: (angle, length) ->
			length = length or @getLength()

			@x = Math.sin(angle) * length
			@y = Math.cos(angle) * length

			return @
