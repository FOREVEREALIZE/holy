import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
    <button id="holy-button" class="bg-orange-100 py-4 px-20 text-2xl inter-900 rounded-xl drop-shadow-glow">
        Holy.
    </button>
    <audio src="sound.mp3" id="holy-audio"></audio>
</div>
`

const holyButton = document.getElementById("holy-button") as HTMLButtonElement
const holyAudio = document.getElementById("holy-audio") as HTMLAudioElement

let firstTime = true
let clicked = false
let oldDistance = 0

document.addEventListener("mousemove", event => {
    const relativeX = event.clientX - (window.innerWidth / 2)
    const relativeY = event.clientY - (window.innerHeight / 2)
    const distance = Math.sqrt(Math.pow(relativeX, 2) + Math.pow(relativeY, 2))
    const maxDistance = Math.max(window.innerWidth, window.innerHeight)/2
    const distancePercent = distance / maxDistance

    if (firstTime && oldDistance > 0.8 && distancePercent < 0.8) {
        holyAudio.play().then()
        holyAudio.loop = true
        firstTime = false
    }


    holyAudio.volume = clicked ? 1 : Math.min(Math.max(1 - (distancePercent - 0.1), 0), 1)
    oldDistance = distancePercent

    console.log((distancePercent * 100) + "%")
});

holyButton.addEventListener("click", () => {
    if (clicked) return

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
