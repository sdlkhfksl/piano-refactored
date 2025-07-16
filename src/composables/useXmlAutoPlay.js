import { ref, onBeforeUnmount } from 'vue'

export function useXmlAutoPlay(playNote) {
  const lastNote = ref({
    noteName: ''
  })
  const xmlstop = ref(false)
  const xmlPlayQueue = ref([])

  // Simple event emitter for internal events
  const xmlEventEmitter = new EventTarget()

  xmlEventEmitter.addEventListener('xml-music-stop', () => {
    if (xmlPlayQueue.value && xmlPlayQueue.value.length > 0) {
      xmlPlayQueue.value.shift()
      if (xmlPlayQueue.value[0]) {
        playXMLScore(xmlPlayQueue.value[0])
      }
    }
  })

  const addToPlayQueue = (score) => {
    if (xmlPlayQueue.value.length <= 0) {
      playXMLScore(score)
    }
    xmlPlayQueue.value.push(score)
  }

  const initXMLPlayState = () => {
    xmlstop.value = false
    // measures and measures_len are part of the score object, not component state
    lastNote.value = {
      noteName: ''
    }
  }

  const pauseXMLPlay = () => {
    xmlstop.value = true
    document.querySelectorAll('.piano-key').forEach(el => el.classList.remove('auto-key-active'))
  }

  const playXMLScore = async (musicScore) => {
    // NOTE: This function requires the actual XML score data (musicScore.measures)
    // which was not found in the original repository. This implementation is a placeholder.
    initXMLPlayState()
    const measures = musicScore.measures
    const measures_len = measures ? measures.length : 0

    for (let i = 0; i < measures_len; i++) {
      let measure = measures[i]
      let awaitAll = []

      for (let staff_key in measure) {
        let staff = measure[staff_key]

        for (let voice_key in staff) {
          let notes = staff[voice_key] || []
          awaitAll.push(playNotesArr(notes))
        }
      }
      await Promise.all(awaitAll)
      if (xmlstop.value) {
        xmlEventEmitter.dispatchEvent(new Event('xml-music-stop'))
        break
      }
      if (i == measures_len - 1) {
        xmlEventEmitter.dispatchEvent(new Event('xml-music-stop'))
      }
    }
  }

  const playNotesArr = (noteArr) => {
    return new Promise((resolve) => {
      let i = 0
      let initTime = new Date()
      let playedTime = 0
      // let pressedNotes = [] // Not used in original mixin

      const loop = () => {
        if (xmlstop.value) {
          clearInterval(playTimer)
          resolve()
          return
        }
        let curTime = new Date()
        let delta = curTime - initTime

        // Original mixin had more logic here for playing notes based on time
        // This is a simplified placeholder.
        if (i < noteArr.length) {
          const note = noteArr[i]
          // Assuming note has a 'name' and 'duration' property
          // You'll need to adjust this based on the actual XML score structure
          if (note.name) {
            playNote(note.name, note.duration || '8n')
            // Add/remove active classes for keys if needed, similar to pianoAutoPlayMixin
          }
          i++
        } else {
          clearInterval(playTimer)
          resolve()
        }
      }
      let playTimer = setInterval(() => {
        loop()
      }, 17)
    })
  }

  onBeforeUnmount(() => {
    // Cleanup any active timers if the component is unmounted
    xmlstop.value = true
  })

  return {
    addToPlayQueue,
    pauseXMLPlay
  }
}