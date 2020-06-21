new Vue({
    el: '#app',
    data: {
        playerData: {
            maxHealth: 100,
            maxMana: 100,
            health: 100,
            mana: 100,
            maxDamage: 10,
            minDamage: 3,
            specialAttackManaCost: 20,
            healManaCost: 15
        },
        monsterData: {
            maxHealth: 100,
            health: 100,
            maxDamage: 12,
            minDamage: 5
        },
        isGameOn: false,
        turns: []
    },
    computed: {
        playerLowHealth() {
            return this.playerData.health < this.playerData.maxHealth * 0.3 ? true : false;
        },
        monsterLowHealth() {
            return this.monsterData.health < this.monsterData.maxHealth * 0.3 ? true : false;
        },
        isGameFinished() {
            return this.playerData.health <= 0 || this.monsterData.health <= 0;
        }
    },
    methods: {
        startGame() {
            this.isGameOn = true;
            this.playerData.health = this.playerData.maxHealth;
            this.playerData.mana = this.playerData.maxMana;;
            this.monsterData.health = this.monsterData.maxHealth;
            this.turns.length = 0;
        },
        attack() {
            console.log('Attack Action');
            this.playerAttack();
            if (this.checkPlayerWin()) {
                alert("Youre winner!");
                return;
            };

            this.monsterAttack();
            if (this.checkMonsterWin()) alert("You lost :(!");
        },
        specialAttack() {
            console.log('Special Attack Action');
            this.playerSpecialAttack();
            if (this.checkPlayerWin()) {
                alert("Youre winner!");
                return;
            };;

            this.monsterAttack();
            if (this.checkMonsterWin()) alert("You lost :(!");
        },
        heal() {
            console.log('Heal Action');
            this.playerHeal();
            this.monsterAttack();
            if (this.checkMonsterWin()) alert("You lost :(!");
        },
        playerSpecialAttack() {
            console.log('Player Special attack');

            let damage = this.calculateAttackDamage(this.playerData.minDamage + 4, this.playerData.maxDamage + 4);

            this.monsterData.health = this.monsterData.health - damage <= 0 ?
                0 : this.monsterData.health - damage;

            this.playerData.mana -= this.playerData.specialAttackManaCost;
            this.addLog(true, 'Special Attack! Damage done: ' + damage);

            console.log('Damage done: ' + damage);
        },
        playerHeal() {
            console.log('Player heal');

            let healthRegained = this.calculateAttackDamage(this.monsterData.minDamage + 4, this.monsterData.maxDamage + 4);

            //check if heal goes over max health
            if (this.playerData.health + healthRegained >= this.playerData.maxHealth)
                this.playerData.health = this.playerData.maxHealth;
            else
                this.playerData.health += healthRegained;
            this.playerData.mana -= this.playerData.healManaCost;
            this.addLog(true, 'Health regained: ' + healthRegained);

            console.log('Health regained: ' + healthRegained);
        },
        playerAttack() {
            console.log('Player attack');

            let damage = this.calculateAttackDamage(this.playerData.minDamage, this.playerData.maxDamage);

            this.monsterData.health = this.monsterData.health - damage <= 0 ?
                0 : this.monsterData.health - damage;

            this.playerData.mana + 10 >= this.playerData.maxMana ?
                this.playerData.mana = this.playerData.maxMana : this.playerData.mana += 10;

            this.addLog(true, 'Damage done: ' + damage);

            console.log('Damage done: ' + damage);
        },
        monsterAttack() {
            console.log('Monster attack');

            let damage = this.calculateAttackDamage(this.monsterData.minDamage, this.monsterData.maxDamage);

            this.playerData.health = this.playerData.health - damage <= 0 ?
                0 : this.playerData.health - damage;

            this.addLog(false, 'Damage done: ' + damage);

            console.log('Damage done: ' + damage);
        },
        calculateAttackDamage(min, max) {
            return Math.max((Math.floor(Math.random() * max) + 1), min);
        },
        checkPlayerWin() {
            return this.monsterData.health <= 0 ? true : false;
        },
        checkMonsterWin() {
            return this.playerData.health <= 0 ? true : false;
        },
        giveUp() {
            this.isGameOn = false;
        },
        addLog(isPlayerTurn, log) {

            log = isPlayerTurn ? log + ' by Player' : log + ' by Monster';

            this.turns.unshift({
                isPlayerTurn,
                log
            })
        }
    }
})