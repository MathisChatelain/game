class Player{
    size = 100;            // Soit un rayon de size/2 
    speed = 100;           // Valeur en pixels par seconde
    id = "00000000"        // Un identifiant à 8 chiffres doit être déclaré à la création d'un joueur
    posX = 0;
    posY = 0;
    playerElement = document.createElement('div');

    constructor(id) {
        this.id = id;
        this.playerElement.classList.add("player");
        document.getElementById("playerList").append(this.playerElement);
    }

    // addMovementsListener() {
    // document.addEventListener('mousemove', e => {
    //     let x = e.clientX -this.size/2;
    //     let y = e.clientY -this.size/2;;
    //     this.playerElement.style.top = y.toString()+"px";
    //     this.playerElement.style.left = x.toString()+"px";
    // });
    // }


    addMovementsListener() {                            // Clique droit
    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        let x = e.clientX -this.size/2;
        let y = e.clientY -this.size/2;
        this.posX = x;
        this.posY = y;
        this.playerElement.style.top = y.toString()+"px";
        this.playerElement.style.left = x.toString()+"px";
    });
    }
}

let player = new Player("00000000");
player.addMovementsListener();