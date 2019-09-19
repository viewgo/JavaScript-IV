/* 

Prototype Refactor

1. Copy and paste your code or the solution from yesterday

2. Your goal is to refactor all of this code to use ES6 Classes. The console.log() statements should still return what is expected of them.

*/

/*=== GameObject ===*/
class GameObject {
    constructor(character) {
        this.createdAt = character.createdAt;
        this.name = character.name;
        this.dimensions = character.dimensions;
    }

    destroy() {
        console.log(`${this.name} was removed from the game.`);
    }
}

/*=== CharacterStats ===*/
class CharacterStats extends GameObject {
    constructor(character) {
        super(character);
        this.healthPoints = character.healthPoints;
    }

    takeDamage(damage) {
        this.healthPoints -= damage;

        if (damage > 5) {
            if (this.healthPoints < 1) {
                console.log(
                    `%cCRITICAL HIT!!! ${this.name} took ${damage} damage! ${this.name} died!`,
                    "background: #eeeeee; color: #990000"
                );
                this.destroy();
            } else {
                console.log(
                    `%cCRITICAL HIT!!! ${this.name} took ${damage} damage! ${this.name}'s HP is at ${this.healthPoints}!`,
                    "background: #eeeeee; color: #990000"
                );
            }
        } else {
            if (this.healthPoints < 1) {
                console.log(
                    `%c${this.name} took ${damage} damage. ${this.name} died!`,
                    "background: #eeeeee; color: #990000"
                );
                this.destroy();
            } else {
                console.log(
                    `%c${this.name} took ${damage} damage. ${this.name}'s HP is at ${this.healthPoints}!`,
                    "background: #eeeeee; color: #990000"
                );
            }
        }
    }
}

/*=== Humanoid ===*/
class Humanoid extends CharacterStats {
    constructor(character) {
        super(character);
        this.team = character.team;
        this.weapons = character.weapons;
        this.language = character.language;
    }

    greet() {
        return `${this.name} offers a greeting in ${this.language}.`;
    }
}

//Test you work by un-commenting these 3 objects and the list of console logs below:
const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
        length: 2,
        width: 1,
        height: 1
    },
    healthPoints: 5,
    name: "Bruce",
    team: "Mage Guild",
    weapons: ["Staff of Shamalama"],
    language: "Common Tongue"
});
const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
        length: 2,
        width: 2,
        height: 2
    },
    healthPoints: 15,
    name: "Sir Mustachio",
    team: "The Round Table",
    weapons: ["Giant Sword", "Shield"],
    language: "Common Tongue"
});
const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
        length: 1,
        width: 2,
        height: 4
    },
    healthPoints: 10,
    name: "Lilith",
    team: "Forest Kingdom",
    weapons: ["Bow", "Dagger"],
    language: "Elvish"
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
mage.takeDamage(1); // Bruce took damage.
swordsman.destroy(); // Sir Mustachio was removed from the game.

class Villian extends Humanoid {
    constructor(character) {
        super(character);
        this.alignment = "Evil";
    }

    attack(target) {
        console.log(
            `%c${this.name} is casting a dark spell from ${
                this.weapons[Math.floor(Math.random() * this.weapons.length)]
            } at ${target.name}.`,
            "background: #eeeeee; color: blue"
        );
        sleep(250);

        let critChance = Math.floor(Math.random() * (10 - 1)) + 1;
        let damage = 0;

        if (critChance > 7) {
            //20% CHANCE
            damage = Math.floor(Math.random() * (20 - 10)) + 10;
        } else {
            damage = Math.floor(Math.random() * (5 - 1)) + 1;
        }
        target.takeDamage(damage);

        //Can attack anyone, not just heroes because they're bad guys.
    }
}

class Hero extends Humanoid {
    constructor(character) {
        super(character);
        this.alignment = "Good";
    }

    attack(target) {
        if (target.alignment === "Evil") {
            console.log(
                `%c${this.name} is swinging their mighty weapon ${
                    this.weapons[
                        Math.floor(Math.random() * this.weapons.length)
                    ]
                } at ${target.name}.`,
                "background: #eeeeee; color: blue"
            );
            sleep(250);

            let critChance = Math.floor(Math.random() * (10 - 1)) + 1;
            let damage = 0;

            if (critChance > 7) {
                //20% CHANCE
                damage = Math.floor(Math.random() * (20 - 10)) + 10;
            } else {
                damage = Math.floor(Math.random() * (5 - 1)) + 1;
            }
            target.takeDamage(damage);
        } else {
            console.log(
                `${this.name} can't attack ${target.name}! They are an ally!`
            );
        }
    }
}

const zhor = new Villian({
    createdAt: new Date(),
    dimensions: {
        length: 2,
        width: 2,
        height: 5
    },
    healthPoints: 35,
    name: "Zhor",
    team: "Villian's Labor Union",
    weapons: [
        "Devine, Cleaver of the Insane",
        "Thunder-Forged Epitome",
        "Spectral-Forged Battletome",
        "Pride's Scroll",
        "Ash, Urn of Illuminated Dreams"
    ],
    language: "Common Tongue",
    alignment: "Chaotic Evil"
});
const loth = new Hero({
    createdAt: new Date(),
    dimensions: {
        length: 2,
        width: 2,
        height: 4
    },
    healthPoints: 45,
    name: "Loth Sacredsnow",
    team: "Alliance of Snowfall",
    weapons: [
        "Godslayer, Breaker of the Heavens",
        "Demonic Greathammer",
        "Howling Obsidian Shortsword"
    ],
    language: "Northern",
    alignment: "Neutral Good"
});

// BATTLE HERE
battleMembers = [loth, zhor];
let i = 0;

function battle() {
    if (
        battleMembers[0].healthPoints > 0 &&
        battleMembers[1].healthPoints > 0
    ) {
        console.log(`%cTURN ${i + 1}!`, "font-size: 20px; font-weight: 1000;");
        sleep(200);
        battleMembers[0].attack(battleMembers[1]);
        sleep(500);
    }
    if (
        battleMembers[0].healthPoints > 0 &&
        battleMembers[1].healthPoints > 0
    ) {
        battleMembers[1].attack(battleMembers[0]);
        sleep(500);
    }
    console.log(
        `%c[${battleMembers[0].name} HP: ${battleMembers[0].healthPoints}] // [${battleMembers[1].name} HP: ${battleMembers[1].healthPoints}]\n`,
        "font-size: 14px;"
    );
    i++;
}

function autoBattle() {
    do {
        if (
            battleMembers[0].healthPoints > 0 &&
            battleMembers[1].healthPoints > 0
        ) {
            console.log(`%cTURN ${i + 1}!`, "font-size: 20px");
            battleMembers[0].attack(battleMembers[1]);
            sleep(100);
        }
        if (
            battleMembers[0].healthPoints > 0 &&
            battleMembers[1].healthPoints > 0
        ) {
            battleMembers[1].attack(battleMembers[0]);
            sleep(100);
        }

        i++;
    } while (
        battleMembers[0].healthPoints > 0 &&
        battleMembers[1].healthPoints > 0
    );
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
}
