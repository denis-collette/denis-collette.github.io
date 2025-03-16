const Pokemilton = require('./Pokemilton');
const Master = require('./Master');
const Arena = require('./Arena');
const World = require('./World');
const rl = require('./Readline');
const fs = require('fs');

let master = new Master()
let world = new World()
let arena = new Arena()

function load() {
    savefile = fs.readFileSync("Save.json", "utf8");
    return savefile = JSON.parse(savefile)
}

function save() {
    savefile = {
        saved_on: new Date().toLocaleString(),
        Master: {
            name: master.name,
            collection: master.collection,
            healingItems: master.healingItems,
            reviveItems: master.reviveItems,
            pokeballs: master.pokeballs,
            coins: master.coins,
            alive: master.alive
        },
        World: {
            day: world.day,
            log: world.log,
            status: true
        }
    };
    fs.writeFileSync("Save.json", JSON.stringify(savefile, null, 2));
    console.log("\nGame saved!\n");
}

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve)
    })
}

async function askForName() {
    const answer = await ask("Welcome in the wonderful world of Pokemilton!\nChoose your name:\n")
    master = new Master(answer)
}

async function proposeFirstPokemilton(master) {
    let collection = master.collection
    const choice1 = new Pokemilton();
    const choice2 = new Pokemilton();
    const choice3 = new Pokemilton();
    let chosen
    console.log(`You can choose one of the three next starter:\n----------\n1.\nname: ${choice1.name}\nattack: ${choice1.attackRange}\ndefense: ${choice1.defenseRange}\nHP: ${choice1.healthPool}\n----------\n2.\nname: ${choice2.name}\nattack: ${choice2.attackRange}\ndefense: ${choice2.defenseRange}\nHP: ${choice2.healthPool}\n----------\n3.\nname: ${choice3.name}\nattack: ${choice3.attackRange}\ndefense: ${choice3.defenseRange}\nHP: ${choice3.healthPool}\n----------\n`);
    while (true) {
        let answer = await ask("Choose your first Pokemilton:\n")
        switch (answer) {
            case "1":
                chosen = choice1;
                break;
            case "2":
                chosen = choice2;
                break;
            case "3":
                chosen = choice3;
                break;
            default:
                console.log("Choose a number between 1 & 3");
                continue
        }
        break
    }
    collection.push(chosen)
    master.collection = collection
}

async function menuDay(master, world) {
    console.log(`Starting day ${world.day}!\n----------`)
    while (true) {
        console.log(`1. Show collection\n2. Shop\n3. Next day\n4. Options\n----------`)
        let choice = await ask("Your choice:\n")
        switch (choice) {
            case "1":
                await menuPoke(master, world)
                break
            case "2":
                await menuShop(master, world)
                break
            case "3":
                break
            case "4":
                while (true) {
                    console.log(`1. Show logs\n2. Save\n3. Start new game\n4. Quit\n5. Back\n----------`)
                    let menu = await ask("Your choice:\n")
                    switch (menu) {
                        case "1":
                            world.displayLog()
                            continue
                        case "2":
                            save()
                            continue
                        case "3": // Working ???
                            master = new Master()
                            world = new World()
                            save()
                            await startGame()
                            break
                        case "4":
                            console.log(`Goodbye ${master.name}\n----------`)
                            world.status = false
                            break
                        case "5":
                            await menuDay(master, world)
                            break
                        default:
                            console.log("Choose a number between 1 & 4");
                            continue
                    }
                    break
                }
                break
            default:
                console.log("Choose a number between 1 & 3");
                continue
        }
        break
    }
}

async function menuPoke(master, world) {
    console.log(`Here is your team:`)
    master.showCollection()
    let answer = await ask("Choose a Pokemilton:\n")
    let index = +answer - 1
    collection = master.collection
    let selectPoke = collection[index]
    if (selectPoke === undefined) {
        console.log("This is not a correct number.");
        await menuPoke(master, world)
    } else {
        console.log(`----------\nYou choose: ${selectPoke.name}.\nLVL: ${selectPoke.level}\nXP: ${selectPoke.experienceMeter}/${selectPoke.level * 20}\nHP: ${selectPoke.healthPool}/${selectPoke.initialHealthPool}\nATK: ${selectPoke.attackRange}\nDEF: ${selectPoke.defenseRange}\nSay: ${selectPoke.catchPhrase}\n----------`)
    }
    while (true) {
        console.log(`1. Heal (${master.healingItems} left)\n2. Revive(${master.reviveItems} left)\n3. Rename\n4. Release\n5. Back\n----------`)
        let choice = await ask("Your choice:\n")
        switch (choice) {
            case "1":
                master.healPokemilton(selectPoke)
                break
            case "2":
                master.revivePokemilton(selectPoke)
                break
            case "3":
                let newName = await ask(`Which name do you want to give to ${selectPoke.name}:\n`)
                master.renamePokemilton(selectPoke, newName)
                break
            case "4":
                if (collection.length < 2) {
                    console.log("This is your last Pokemilton, you can't walk alone!")
                    continue
                } else {
                    master.releasePokemilton(selectPoke)
                }
                break
            case "5":
                await menuDay(master, world)
                break
            default:
                console.log("Choose a number between 1 & 5");
                continue
        }
        break
    }
}

async function engage() {
    while (true) {
        console.log(`1. Fight\n2. Flee`)
        let accept = await ask("Your choice:\n")
        switch (accept) {
            case "1":
                return true
            case "2":
                return false
            default:
                console.log("Choose 1 or 2.")
                continue
        }
    }
}

async function choosePokemilton(master, arena) {
    console.log(`Here is your team:\n----------`)
    master.showCollection()
    let answer = await ask("Choose a Pokemilton:\n")
    let index = +answer - 1
    let choice = master.collection[index]
    if (choice === undefined) {
        console.log(`Choose a correct number.`)
        await choosePokemilton(master, arena)
    } else if (choice.healthPool > 0) {
        arena.indexFighter = index
        arena.setFighter(choice)
    } else if (choice.healthPool <= 0) {
        console.log(`This Pokemilton can't fight.`)
        await choosePokemilton(master, arena)
    } else {
        console.log("Sorry, Pokemilton encountered an issue in ChoosePokemilton in Game.js")
    }
}

async function playerAction(master, arena) {
    while (true) {
        console.log(`1. Attack              3. Use object\n2. Change Pokemilton   4. Flee`)
        let choice = await ask("What do you want to do:\n")
        switch (choice) {
            case "1":
                arena.fighter.attack(arena.wild)
                break;
            case "2":
                await choosePokemilton(master, arena)
                console.log(`Let's go `, arena.fighter.name)
                break;
            case "3":
                await menuArenaObject(master, arena)
                break;
            case "4":
                arena.tryToFlee()
                break
            default:
                console.log("Choose a number between 1 & 4");
                continue
        }
        break
    }
}

async function menuArenaObject(master, arena) { //////////////// Healing and revive issue ???
    console.log(`1. ${master.healingItems} healing potion.\n2. ${master.reviveItems} revive potion.\n3. ${master.pokeballs} Pokeballs.\n4. Back`)
    if ((master.healingItems > 0) || (master.reviveItems > 0) || (master.pokeballs > 0)) {
        while (true) {
            let object = await ask("What do you want to use:\n")
            switch (object) {
                case "1":
                    master.showCollection()
                    choice = await ask("Who do you want to heal?\n")
                    toHeal = master.collection[+choice - 1]
                    if (toHeal === undefined) {
                        console.log("This is not a correct number.")
                        await menuArenaObject(master, arena)
                        break
                    } else if (master.healingItems <= 0) {
                        console.log("No healing item left!\n----------");
                        await menuArenaObject()
                        break
                    } else {
                        master.healPokemilton(master.collection[+choice - 1])
                        break
                    }
                case "2":
                    master.showCollection()
                    choice = await ask("Who do you want to revive?\n")
                    toRevive = master.collection[+choice - 1]
                    if (toHeal === undefined) {
                        console.log("This is not a correct number.")
                        await menuArenaObject(master, arena)
                        break
                    } else if (master.reviveItems <= 0) {
                        console.log("No revive item left!\n----------");
                        await menuArenaObject()
                        break
                    } else {
                        master.revivePokemilton(master.collection[+choice - 1])
                        break;
                    }
                case "3":
                    if (master.collection.length >= 10) {
                        console.log("You don't have enough space in your collection")
                        await playerAction(master, arena);
                        break;
                    } else if (master.pokeballs <= 0) {
                        console.log("You don't have any Pokeballs")
                        await playerAction(master, arena);
                        break
                    } else {
                        arena.tryToCatch(master)
                        break;
                    }
                case "4":
                    await playerAction(master, arena)
                    break
                default:
                    continue
            }
            break
        }
    }
}

async function menuShop(master, world) {
    while (true) {
        console.log(`You have ${master.coins} coins, ${master.healingItems} healing items, ${master.reviveItems} revive items and ${master.pokeballs} pokeballs:\n----------\nSHOP:\n----------\n1. Healing item (20 coins)\n2. Revive item (50 coins)\n3. Pokeballs (75 coins)\n4. Back\n----------`)
        let choice = await ask("What do you want to buy?\n")
        switch (choice) {
            case "1":
                if (master.coins < 20) {
                    console.log("You don't have enough coins!")
                } else {
                    master.coins -= 20
                    master.healingItems++
                }
                await menuShop(master, world)
                break
            case "2":
                if (master.coins < 50) {
                    console.log("You don't have enough coins!")
                } else {
                    master.coins -= 50
                    master.reviveItems++
                }
                await menuShop(master, world)
                break
            case "3":
                if (master.coins < 75) {
                    console.log("You don't have enough coins!")
                } else {
                    master.coins -= 75
                    master.pokeballs++
                }
                await menuShop(master, world)
                break
            case "4":
                await menuDay(master, world)
                break
            default:
                console.log("Choose a number between 1 and 4.\n")
                continue
        }
        break
    }
}

async function startGame() {
    load()
    master = new Master()
    world = new World()

    if (savefile.Master.name === undefined) {
        await askForName()
    } else if (savefile.Master.name !== "") {
        console.log(`Welcome back ${savefile.Master.name}.\nLast time you saved: ${savefile.saved_on}\n1. Continue\n2. Start new game\n----------`)
        starting = await ask("Your choice:\n")
        while (true) {
            switch (starting) {
                case "1":
                    master.name = savefile.Master.name
                    master.collection = savefile.Master.collection
                    master.healingItems = savefile.Master.healingItems
                    master.reviveItems = savefile.Master.reviveItems
                    master.pokeballs = savefile.Master.pokeballs
                    master.coins = savefile.Master.coins
                    world.day = savefile.World.day
                    world.log = savefile.World.log
                    break
                case "2":
                    master = new Master()
                    world = new World()
                    save()
                    await startGame()
                    break
                default:
                    continue
            }
            break
        }
    } else {
        console.log("It seems there is a problem somewhere at the start of startGame...")
    }

    if (master.collection[0] === undefined) {
        await proposeFirstPokemilton(master)
    }

    console.log(`----------\nGet ready ${master.name}!\nHere is your team:`)
    master.showCollection()

    world.status = true
    while (world.status === true) {
        await menuDay(master, world)

        if (world.status === true) {
            let result = "Nothing happened"
            arena = new Arena()
            let fight = world.randomizeEvent()
            if (fight === true) {
                arena.status = "starting"
                arena.wild = new Pokemilton()
                arena.fighter = new Pokemilton()
                console.log(`A wild ${arena.wild.name} (${arena.wild.healthPool} HP) appeared! `)
                console.log(arena.wild.catchPhrase)
                await engage() ? true : arena.tryToFlee()

                while (arena.status == 'starting' || arena.status == 'ongoing') {
                    if (arena.status == 'starting') {
                        await choosePokemilton(master, arena)
                        arena.startBattle()
                    }
                    while (arena.status == 'ongoing') {
                        console.log(`----------\n${arena.fighter.name} (HP: ${arena.fighter.healthPool}/${arena.fighter.initialHealthPool}) VS ${arena.wild.name} (HP: ${arena.wild.healthPool}/${arena.wild.initialHealthPool})!`)
                        await playerAction(master, arena)
                        arena.wildPokemiltonAction()
                        master.injectFighter(arena)
                        arena.checkStatus(master)
                    }
                }
                result = arena.endBattle(master)
                master.injectFighter(arena) /////////////////////////////////// Check if working correctly

            }
            if (master.alive === false) {
                result = result + " and lost the game."
            }
            world.addLog(result)
            world.oneDayPasses()
            // save() /////////////////////////////////////////// Auto save at end of day ????? => NO
        }

        if (master.alive === false) {
            console.log("All your pokemiltons are dead, what do you want to do?\n----------\n")
            while (true) {
                let startAgain = await ask("1. Revive all Pokemilton (and loose up to 500 coins).\n2. Start new game\n3. Quit game\n")
                switch (startAgain) {
                    case "1":
                        for (let element of master.collection) {
                            element.healthPool = element.initialHealthPool
                        }
                        if (master.coins - 500 < 0) {
                            master.coins = 0
                        } else {
                            master.coins -= 500
                        }
                        master.alive = true
                        save()
                        await startGame()
                        break
                    case "2":
                        master = new Master()
                        world = new World()
                        save()
                        await startGame()
                        break
                    case "3":
                        console.log(`Goodbye ${master.name}\n----------`)
                        world.status = false
                        break
                    default:
                        console.log("Choose a number between 1 and 3.")
                        continue
                }
                break
            }
        }

    }
    // save() ////////////////////////////////////////////////// Auto save when closing game ?????? => NO
    rl.close()
}


startGame()