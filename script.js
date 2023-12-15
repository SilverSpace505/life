m = document.getElementById("life").getContext("2d")
newSim = document.getElementById("newSim")
save = document.getElementById("save")
load = document.getElementById("load")
copy = document.getElementById("copy")
paste = document.getElementById("paste")
code = document.getElementById("code")
size = 500

newSim.onclick = function () {
	ns()
}

copy.onclick = function () {
	code.focus()
	code.select()
	document.execCommand('copy');
}

copy.onclick = function () {
	code.focus()
	code.select()
	document.execCommand('paste');
}

save.onclick = function () {
	code.value = JSON.stringify(settings)
}

load.onclick = function () {
	ls(JSON.parse(code.value))
}

function ls(newSettings) {
	ns()
	settings = newSettings
}

function ss() {
	console.log(settings)
}

function ns() {
	settings = []
	for (let i = 0; i < 16; i++) {
		settings.push(Math.random() * 2 - 1)
	}
	particles = []
	red = create(100, "red")
	yellow = create(100, "yellow")
	green = create(100, "green")
	blue = create(100, "blue")
}

draw = (x, y, c, s) => {
	m.fillStyle = c
	m.fillRect(x, y, s, s)
}

particles = []
particle = (x, y, c) => {
	return { "x": x, "y": y, "vx": 0, "vy": 0, "color": c, "lx": x, "ly": y}
}

random = () => {
	return Math.random() * size - 100 + 50
}

create = (number, color) => {
	group = []
	for (let i = 0; i < number; i++) {
		group.push(particle(random(), random(), color))
		particles.push(group[i])
	}
	return group
}

rule = (particles1, particles2, g) => {
	for (let i = 0; i < particles1.length; i++) {
		fx = 0
		fy = 0
		for (let j = 0; j < particles2.length; j++) {
			a = particles1[i]
			b = particles2[j]
			dx = a.x - b.x
			dy = a.y - b.y
			d = Math.sqrt(dx * dx + dy * dy)
			if (d > 10 && d < 80) {
				F = g * 1 / d
				fx += (F * dx)
				fy += (F * dy)
			}
			if (d <= 10 && d > 0) {
				F = 1 / d
				// b.vx -= fx
				// b.vy -= fy
				fx = (F * dx)
				fy = (F * dy)
			}
		}
		a.vx = (a.vx + fx) * 0.5
		a.vy = (a.vy + fy) * 0.5
		a.lx = a.x
		a.ly = a.y
		a.x += a.vx
		a.y += a.vy
		// if (a.vx > 25) {a.vx = 25}
		// if (a.vx < -25) {a.vx = -25}
		// if (a.vy > 25) {a.vx = 25}
		// if (a.vy < -25) {a.vy = -25}
		if (a.x <= 0 || a.x >= size) { a.vx *= -1 }
		if (a.y <= 0 || a.y >= size) { a.vy *= -1 }
		if (a.x <= 0) { a.x = 1 }
		if (a.x >= size) { a.x = size - 1 }
		if (a.y <= 0) { a.y = 1 }
		if (a.y >= size) { a.y = size - 1 }
	}
}

red = []
yellow = []
green = []
blue = []

settings = []
for (let i = 0; i < 16; i++) {
	settings.push(Math.random() * 2 - 1)
}

ns()

update = () => {
	rule(red, yellow, settings[0])
	rule(red, red, settings[1])
	rule(red, green, settings[2])
	rule(red, blue, settings[3])

	rule(yellow, yellow, settings[4])
	rule(yellow, red, settings[5])
	rule(yellow, green, settings[6])
	rule(yellow, blue, settings[7])

	rule(green, yellow, settings[8])
	rule(green, red, settings[9])
	rule(green, green, settings[10])
	rule(green, blue, settings[11])

	rule(blue, yellow, settings[12])
	rule(blue, red, settings[13])
	rule(blue, green, settings[14])
	rule(blue, blue, settings[15])

	// rule(red, red, -1)
	// rule(blue, blue, -1)
	// rule(red, blue, 0)
	// rule(blue, red, 0)

	m.clearRect(0, 0, size, size)
	draw(0, 0, "black", size)
	for (i = 0; i < particles.length; i++) {
		draw(particles[i].x-2.5, particles[i].y-2.5, particles[i].color, 5)
	}
	requestAnimationFrame(update)
}

update()