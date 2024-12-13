const holyButton = document.getElementById("holy-button")
const holyAudio = document.getElementById("holy-audio")

let firstTime = true
let clicked = false
let oldDistance = 0

document.addEventListener("mousemove", event => {
	const relativeX = event.clientX - (window.innerWidth / 2)
	const relativeY = event.clientY - (window.innerHeight / 2)
	const distance = Math.sqrt(Math.pow(relativeX, 2) + Math.pow(relativeY, 2))
	const maxDistance = Math.min(window.innerWidth, window.innerHeight)/2
	const distancePercent = distance / maxDistance

	if (firstTime && oldDistance > 0.8 && distancePercent < 0.8) {
		holyAudio.play()
		holyAudio.loop = true
		firstTime = false
	}


	holyAudio.volume = clicked ? 1 : Math.min(Math.max(1 - (distancePercent - 0.1), 0), 1)
	oldDistance = distancePercent

	console.log((distancePercent * 100) + "%")
});

holyButton.addEventListener("click", () => {
	let scale = 100
	let textOpacity = 100

	setInterval(() => {
		holyButton.style.scale = `${scale}% ${scale}%`
		holyButton.style.color = `rgba(0, 0, 0, ${textOpacity}%)`
		scale = scale + 0.2
		textOpacity = textOpacity - 0.2
	}, 4)

	clicked = true
})
