// Sound Manager for playing game sounds
export class SoundManager {
  static swordAudio = null
  static bombAudio = null

  static init() {
    // Initialize audio elements
    this.swordAudio = new Audio('/swords-clash.wav')
    this.bombAudio = new Audio('/sword-slice.wav')
    this.winAudio = new Audio('/bitwin.wav')

    
    // Set volume
    this.swordAudio.volume = 0.7
    this.bombAudio.volume = 0.7
  }

  static playSword() {
    if (this.swordAudio) {
      this.swordAudio.currentTime = 0
      this.swordAudio.play().catch(() => {
        console.log('Could not play sword sound')
      })
    }
  }

  static playBomb() {
    if (this.bombAudio) {
      this.bombAudio.currentTime = 0
      this.bombAudio.play().catch(() => {
        console.log('Could not play bomb sound')
      })
    }
  }

  static playVictorySound() {
    if (this.winAudio) {
      this.winAudio.currentTime = 0
      this.winAudio.play().catch(() => {
        console.log('Could not play victory sound')
      })
    }
  }
}
