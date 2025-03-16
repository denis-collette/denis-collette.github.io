class World { 
    constructor() {
        this.day = 1;
        this.log = [];
        this.status = true
    }

    displayLog() {
        console.log("This is what happened lastly:")
        if (this.log[0] === undefined) {
            console.log(`Nothing happened yet...`)
        } else if (this.log[1] === undefined) {
            console.log(`${this.log[0]}`)
        } else if (this.log[2] === undefined) {
            console.log(`${this.log[1]}\n${this.log[0]}`)
        } else {
            console.log(`${this.log[2]}\n${this.log[1]}\n${this.log[0]}`)
        }
    }

    randomizeEvent() {
        let chance = Math.random()
        if (chance > 0.25) {
            return true
        } else {
            return false
        }
    }

    addLog(newLog) {
        console.log(`----------\nDay ${this.day}: ${newLog}`);
        this.log.unshift(`Day ${this.day}: ${newLog}`);
    }

    oneDayPasses() {
        console.log(`End of day ${this.day}!\n----------`);
        this.day++;
    }

}

module.exports = World