Game = function(assets, song, gameOverCallback) {

    var cues = assets.cues;

    var score = 0;
    var ammo = Settings.initAmmo;
    var health = 1;

    this.isBeat = false;
    this.isGameOver = false;

    this.setLevel = function() {
        this.level = assets.levels.levelSettings[0];
        this.level.speed = this.level.initSpeed;
        health = this.level.maxHealth;
    }

    this.onHit = function() {
        if(this.isGameOver) return;

        score -= this.level.cargoScore * this.level.rockPenalty;
        score = Math.max(0, score);

        //health--;
        //health = Math.max(0, health);
    }

    this.onCargo = function(type) {
        if(this.isGameOver) return;
        score += this.level.cargoScore;
    }

    this.onRepair = function() {
        health++;
        health = Math.min(this.level.maxHealth, health);
    }

    this.onFire = function() {
        ammo--;
    }

    this.onRecharge = function(amount) {
        ammo += amount;
    }

    var levelName = document.getElementById("levelName");
    var scoreValue = document.getElementById("scoreValue");
    var energyValue = document.getElementById("energyValue");
    var timeValue = document.getElementById("timeValue");
    var gameOverDialog = document.getElementById("gameOverDialog");

    this.trackBeats = function() {
        this.isBeat = false;

        for (var i = 0; i < cues.length; i++) {
            if (song.currentTime > cues[i].start && !cues[i].pass) {
                cues[i].pass = true;

                switch(cues[i].label) {
                    case "B":
                        this.isBeat = true;
                        break;
                    case "K":
                        this.level.speed = this.level.initSpeed;
                        break;
                    case "E":
                        this.isGameOver = true;
                        gameOverDialog.innerHTML = "YOU MADE IT! | Your score: " + score;
                        gameOverDialog.style.display = "inline";
                        localStorage["bestScore"] = score;
                        break;
                }
            }
        }
    }

    this.updateState = function() {
        if (!this.level) return;

        this.level.speed *= 1.0005;
        this.level.speed = Math.min(this.level.speed, this.level.maxSpeed);

        timeValue.innerHTML = J3D.Time.formatTime(song.duration - song.currentTime, false);
        levelName.innerHTML = this.level.name;
        scoreValue.innerHTML = score;
        //energyValue.innerHTML = health;
    }

    this.reset = function() {
        score = 0;
        health = this.level.maxHealth;
        this.isGameOver = false;
    }

    this.shipDestroyed = function() {
        return health <= 0;
    }
}


