const Pokemilton = require('./Pokemilton');

class Arena {
  constructor(pokemilton_1, pokemilton_2) {
    this.fighter = new Pokemilton()
    this.fighter = pokemilton_1
    this.indexFighter = 0
    this.wild = new Pokemilton()
    this.wild = pokemilton_2
    this.status = "quit" // win - loose - capture - quit - starting - ongoing
  }

  tryToFlee() {
    let chance = Math.random()
    if (chance > 0.25) {
      console.log("You managed to flee!")
      return this.status = "quit"
    } else {
      console.log("You failed to flee...")
    }
  }

  setFighter(choice) {
    this.fighter.name = choice.name
    this.fighter.level = choice.level
    this.fighter.experienceMeter = choice.experienceMeter
    this.fighter.attackRange = choice.attackRange
    this.fighter.defenseRange = choice.defenseRange
    this.fighter.healthPool = choice.healthPool
    this.fighter.initialHealthPool = choice.initialHealthPool
    this.fighter.catchPhrase = choice.catchPhrase
  }

  startBattle() {
    console.log(this.fighter.name,` go!`)
    console.log(`${this.fighter.catchPhrase}`)
    if (this.fighter.level > 1) {
      this.wild.evolve() * (+this.fighter.level -1)
    }
    this.status = "ongoing"
  }

  wildPokemiltonAction() {
    if (this.status == "ongoing" && this.wild.healthPool > 0) {
      this.wild.attack(this.fighter)
    }
  }

  endBattle(master) {
    let result
    if (this.status == "win") {
      this.fighter.gainExperience(this.wild.level)
      let prize = ((Math.floor(Math.random() * 10) + 1) * this.wild.level)
      master.coins += prize
      return result = `You won against ${this.wild.name} and gain ${prize} coins, congratulation!`
    } else if (this.status == "loose") {
      return result = `You lost against ${this.wild.name}...`
    } else if (this.status == "quit") {
      return result = `You did not fight ${this.wild.name}.`
    } else if (this.status == "capture") {
      this.fighter.gainExperience(this.wild.level)
      return result = `You captured a new Pokemilton: ${this.wild.name}`
    }
  }

  checkStatus(master) {
    for (let i = 0; i < master.collection.length; i++) {
      if (master.collection[i].healthPool <= 0) {
        master.alive = false
      }
      if (master.collection[i].healthPool > 0) {
        master.alive = true
        break
      }
    }
    if (master.alive === false) {
      this.status = "loose"
    } else if (this.wild.healthPool <= 0) {
      this.status = "win" 
    } else if (this.fighter.healthPool <= 0) {
      this.status = "starting"
    }
  }

  tryToCatch(master) {
    console.log(`Launching Pokeball`)
    master.pokeballs -= 1
    let chance = Math.random()
    if (this.wild.healthPool <= (this.wild.initialHealthPool / 4) && chance > 0.25) {
      this.status = "capture"
      this.wild.healthPool = this.wild.initialHealthPool
      master.collection.push(this.wild)
      console.log(`You captured ${this.wild.name}!`)
    } else {
      console.log(`You failed...`)
    }
  }

}

module.exports = Arena