const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles

const songs = ['Centuries', 'Demons', 'I like me better', 'Irrestible', 'One more light']

// Keep track of songs
 let songIndex = 0

 //Initially load song info DOM
loadSong(songs[songIndex])

//update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `Music/${song}.mp3`
  cover.src = `Images/${song}.jpg` 
}

// functions to play and pause the songs
function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

// functions to change to next or previous songs
function prevSong() {
  songIndex--

  if(songIndex < 0){
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  playSong()
}

function nextSong() {
  songIndex++

  if(songIndex > 4){
    songIndex = 0
  }

  loadSong(songs[songIndex])

  playSong()

}

// progress bars
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

// click progress bars to change
function setProgress(e){
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration 
}

//event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if(isPlaying){
    pauseSong()
  } else{
    playSong()
  }
})

// change song forward or back
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

//adding progress bars
audio.addEventListener('timeupdate', updateProgress)

// click to move through song
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)