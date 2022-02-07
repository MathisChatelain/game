class Player{
    // Gestion
    id = "00000000" // Un identifiant à 8 chiffres doit être déclaré à la création d'un joueur
    
    // Graphisme
    sizeX = 100;
    sizeY = 100;     
    
    // Physique
    vitesseActuelle = 0;       // pixels par update
    vitesseDeBase = 3;
    isMoving = false;
    posX = 700; // Centre le joueur au départ
    posY = 300;
    targetX = 0;
    targetY = 0;
    cosTarget = 0;          // angles de la vitesse par rapport à target ( plus pratique que l'orientation en degrés )
    sinTarget = 0;
    
    // DOM 
    playerElement = document.createElement('div');

    constructor(id) {
        this.id = id;
        this.playerElement.classList.add("player");
        document.getElementById("playerList").append(this.playerElement);
    }

    setMove(e){
        this.targetX = e.clientX;         // change la position que le player doit rejoindre
        this.targetY = e.clientY;          
        // note l'orientation relative à target
        let adjacent = this.targetX-this.posX;
        let oppose = this.targetY-this.posY;
        let hypotenuse = Math.hypot(oppose,adjacent);

        this.sinTarget = oppose/hypotenuse; 
        this.cosTarget = adjacent/hypotenuse;
        this.isMoving = true;
    }

    stopPlayer(){
        this.vitesseActuelle = 0;
        this.targetX = this.posX;
        this.targetY = this.posX;
        this.isMoving = false;
    }

    fire(e){
        this.stopPlayer();
        
        let X = e.clientX;         // change la position que le player doit rejoindre
        let Y = e.clientY;          
        let adjacent = X-this.posX;
        let oppose = Y-this.posY;
        let hypotenuse = Math.hypot(oppose,adjacent);

        let sinCible = oppose/hypotenuse; 
        let cosCible = adjacent/hypotenuse;
        
        let newProjectile = new Projectiles(this,"TypeDuProjectile",cosCible,sinCible);
        newProjectile.activate();
    }

    addMovementsListeners() {                            
        document.addEventListener('contextmenu', e => {         // Clique droit
            e.preventDefault();                                 // Empeche l'ouverture du menu déroulant du clique droit
        });

        document.addEventListener('mousedown', e => {      
            switch (e.button){ 
                case 0 :            // Clique gauche
                    this.fire(e);
                    break
                
                case 2 :             // Clique droit
                    this.setMove(e);
                    break
            }
        });
    }

    updateMovements() {
        let distanceToTarget = Math.hypot((this.targetX-this.posX),(this.targetY-this.posY));
        if( distanceToTarget > 5 && this.isMoving == true){ // Si on est pas très proche de la cible
            this.vitesseActuelle = this.vitesseDeBase;
            this.posX += this.vitesseActuelle*this.cosTarget; // Vitesse horizontale
            this.posY += this.vitesseActuelle*this.sinTarget; // Vitesse verticale
        }
        else{
            this.vitesseActuelle = 0;
            this.isMoving = false;
        }
    }

    updateRendering() {
        this.playerElement.style.top = this.posY.toString()+"px";
        this.playerElement.style.left = this.posX.toString()+"px";
    }
}

let player = new Player("00000000");
player.addMovementsListeners();

var frameUpdater = window.setInterval(function(){
    player.updateMovements();
    player.updateRendering();
  }, 8); // 60 FPS

// clearInterval(frameUpdater) 