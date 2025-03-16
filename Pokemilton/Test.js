let savefile = {
    "Master": {
        "name": "Hamilton10",
        "collection": [
            {
                "name": "Bouboulle",
                "level": 1,
                "experienceMeter": 99,
                "attackRange": 8,
                "defenseRange": 2,
                "healthPool": 7,
                "initialHealthPool": 19,
                "catchPhrase": "I choose you!"
            },
            {
                "name": "SkinnyBoy",
                "level": 1,
                "experienceMeter": 0,
                "attackRange": 4,
                "defenseRange": 2,
                "healthPool": 4,
                "initialHealthPool": 15,
                "catchPhrase": "I choose you!"
            },
            {
                "name": "Bibou",
                "level": 1,
                "experienceMeter": 0,
                "attackRange": 5,
                "defenseRange": 3,
                "healthPool": 2,
                "initialHealthPool": 19,
                "catchPhrase": "Let the battle begin!"
            }
        ],
        "healingItems": 5,
        "reviveItems": 3,
        "pokeballs": 9,
        "coins": 0,
        "alive": true
    },
    "World": {
        "day": 4,
        "log": [
            "Day 3: Nothing happened",
            "Day 2: You captured a new Pokemilton: ricrob",
            "Day 1: You won against Pioupiou, congratulation!"
        ],
        "status": true
    }
}

const Pokemilton = require('./Pokemilton');
const Master = require('./Master'); // Replace 'your_classes_filename' with the actual filename
const Arena = require('./Arena');
const World = require('./World');
const rl = require('./Readline');
const fs = require('fs');

/*
let test = new Pokemilton()
console.log(`test : ${test}`)
console.log("test ", test)
console.log(test)
let collection = savefile.PokemiltonMaster.pokemiltonCollection
console.log(`collection vide : ${collection}`)
console.log("collection vide : ",collection)
collection.push(test)
console.log(`collection avec poke : ${collection}`)
console.log('collection avec poke : ', collection)
console.log(`collection : ${collection[0].name}`)

console.log(savefile.PokemiltonMaster)
*/

/*
let test2 = new Pokemilton()
collection.push(test2)
console.log(collection)

Object.entries(test).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
})
*/
/*
Launch game

Check save => Yes / no
If no :
    ask name => ""                              // Game
        > pokemaster.name                       // json
    propose first poke => 1-2-3                 // Game
        > pokemaster.collection                 // json
    => Start day                                // World
If yes :
    Load => Yes / no                            // Game
        If yes : load save => Start day         // Game + json
        If no : reset save => Start day         // Game + json

Start Day                                       // World
    => choice                                   // Game
        > show collection > select poke / back  // Master
            > heal > random poke                // Master
            > revive > random poke              // Master
            > release > random poke             // Master
            > rename > random poke              // Master
            > back                              // Game
        > do nothing => next day                // Game
        > menu                                  // Game
            > log ?                             // Game + json
            > save                              // Game + json
            > quit                              // Game
            > back                              // Game
    => random poke apparition : yes/no          // World
        If yes => Fight                         // Arena
        If no => next day

Fight => choose poke                            // Arena
    Attack                                      // Arena
        => 
    Change                                      // Arena
    Object => heal/revive/ball                  // Arena
    Flee                                        // Arena
*/