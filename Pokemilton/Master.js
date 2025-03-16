class Master {
  constructor(name) {
    this.name = name;
    this.collection = [];
    this.healingItems = 5; // Initial number of healing items
    this.reviveItems = 3; // Initial number of revive items
    this.pokeballs = 10; // Initial number of POKEBALLS
    this.coins = 50
    this.alive = true
  }

  showCollection() {
    for (let i = 0; i < this.collection.length; i++){
      console.log(`${i+1}. Name: ${this.collection[i].name}. HP: ${this.collection[i].healthPool}/${this.collection[i].initialHealthPool}. ATK: ${this.collection[i].attackRange}. DEF: ${this.collection[i].defenseRange}\n----------`)
    }
  }

  healPokemilton(pokemilton) {
    if (pokemilton.healthPool <= 0) {
      console.log(`You can't heal ${pokemilton.name}, he's dead.\n----------`)
    } else if (pokemilton.healthPool >= pokemilton.initialHealthPool) {
      console.log(`You can't heal ${pokemilton.name}, HP are at max.\n----------`)
    } else if (this.healingItems <= 0){
      console.log("No healing item left!\n----------");
    } else if (this.healingItems > 0 && pokemilton.healthPool < pokemilton.initialHealthPool) {
      pokemilton.healthPool = pokemilton.initialHealthPool
      this.healingItems--;
      console.log(`${pokemilton.name} has been healed!\n----------`);
    } else {
      console.log("You shouldn't see this message... It seems there is a problem in healpokemilton in master...")
    }
  }

  revivePokemilton(pokemilton) {
    if (this.reviveItems <= 0){
      console.log("No revive item left!\n----------");
    } else if (pokemilton.healthPool > 0) {
      console.log(`You can't revive ${pokemilton.name}, he still have some HP.\n----------`)
    } else if (this.reviveItems > 0 && pokemilton.healthPool <= 0) {
      pokemilton.healthPool = pokemilton.initialHealthPool /2;
      this.reviveItems--;
      console.log(`${pokemilton.name} has been revived!\n----------`);
    }else {
      console.log("You shouldn't see this message... It seems there is a problem in revivepokemilton in master...")
    }
  }

  renamePokemilton(pokemilton, name) {
    console.log(`${pokemilton.name} is now renamed ${name}\n----------`);
    pokemilton.name = name;
  }

  releasePokemilton(pokemilton) {    
    const index = this.collection.indexOf(pokemilton);
    this.collection.splice(index, 1);
    console.log(`${pokemilton.name} has been released!\n----------`);
    if (this.collection[1] === undefined && this.collection[0].healthPool == 0){
      this.collection[0].healthPool = 1
    }
  }

  injectFighter(arena){
    this.collection[arena.indexFighter].name = arena.fighter.name
    this.collection[arena.indexFighter].level = arena.fighter.level
    this.collection[arena.indexFighter].experienceMeter = arena.fighter.experienceMeter
    this.collection[arena.indexFighter].attackRange = arena.fighter.attackRange
    this.collection[arena.indexFighter].defenseRange = arena.fighter.defenseRange
    this.collection[arena.indexFighter].healthPool = arena.fighter.healthPool
    this.collection[arena.indexFighter].initialHealthPool = arena.fighter.initialHealthPool
    this.collection[arena.indexFighter].catchPhrase = arena.fighter.catchPhrase
  }

}

module.exports = Master