const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
var xball = canvas.width/2;
var yball = canvas.height-30;
var speedx = -3;
var speedy = 0;
ballRadius = 10

class Pong {
    constructor({position, color ='red', velocity}){
    this.position = position
    this.velocity = velocity
    this.width = 25
    this.height = 100
    this.color = color
    this.lastkey

}

    draw() {

        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)


    }

        update(){
            this.draw()

            this.position.y += this.velocity.y
            this.position.x += this.velocity.x

        }
}

function drawBall () {
            // commencer un chemin de code et déssiner une balle avec c.arc
            c.beginPath();
            c.arc(xball, yball, ballRadius, 0, Math.PI*2);
            c.fillStyle = "#0095DD";
            c.fill();
            c.closePath();




}

const player1 = new Pong({

       position:{
       x:50,
       y:230
},
     velocity:{
        y:0,
        x:0
    }

})


console.log(player1)

const keys = {
    z: {
        pressed: false
    },
    s: {
        pressed:false
    },
}
function animate() {

    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    drawBall()

    player1.update()
    player1.velocity.y = 0

    if (keys.z.pressed && player1.lastkey === 'z') {
        player1.velocity.y -= 10;
        if (player1.position.y   === 0 ) {
            player1.velocity.y = 0;
        }


    }
    if (keys.s.pressed && player1.lastkey === 's') {
        player1.velocity.y += 10;
        if (player1.position.y + player1.height  > canvas.height) {
            player1.velocity.y = 0;
        }
    }
    if (yball + speedy < ballRadius || yball + speedy > canvas.height - ballRadius){
        speedy = -speedy;
    }
    /// ESSAYER DE FAIRE LE SYSTEME DE COLLISION
    // if (xball > canvas.width - player1.width) {
    //     collide();
    // } else if (game.ball.x < player1.width) {
    //     collide(player1);
    // } //// LA BALLE DETECTE SEULEMENT LA LARGEUR DU JOUEUR PAS SA POSITION
      //if (xball  <  player1.position.x ){
      //    speedx = -speedx; }
    //  } else if (xball + speedx > canvas.width - ballRadius) {
    //      if (xball > player1.position.x && xball < player1.position.x + player1.width){
    //          speedx = -speedx
    //     } else {
    //          alert("Joueur 1 marque !");
    //          document.location.reload();
    //          clearInterval(interval);
    //      }
    // }
    if (xball < player1.width + player1.position.x) {
           collide(player1);}

    xball += speedx;
    yball += speedy;
}

const interval =  setInterval(animate, 10);




window.addEventListener('keydown', (event) =>{
    switch (event.key) {
      case 'z':
        keys.z.pressed = true
        player1.lastkey = 'z'
        break
       case 's':
        keys.s.pressed = true
        player1.lastkey = 's'
        break

    }


})

window.addEventListener('keyup', (event) =>{
    switch (event.key) {
      case 'z':
        keys.z.pressed = false
        player1.velocity.y = 0

        case 's':
            keys.s.pressed = false
            player1.velocity.y = 0
    }

})



function collide() {
    // The player does not hit the ball
    if (yball < player1.position.y || yball > player1.position.y + player1.height) {
        // Set ball and players to the center
        xball = canvas.width / 2;
        yball = canvas.height / 2;
        player1.position.y = canvas.height / 2 - player1.height / 2;
      //  player2.position.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
        
        // Reset speed
        speedx = 2;
    } else {
        // Increase speed and change direction
        speedx *= -1.2;
    }
}