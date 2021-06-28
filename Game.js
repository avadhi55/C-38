class Game{
    constructor(){}

    //Reads the gamestate from db
    getState(){
        db.ref("GameState").on("value", function(data){
            GS = data.val();
        });
    }

    //Updates the gamestate to db
    update(state){
        db.ref("/").update({
            GameState : state
        });
    }

    async start(){
        if(GS === 0){
            
            //New Player object
            player = new Player();
            var playerCountRef = await db.ref('PlayerCount').once("value");
            if(playerCountRef.exists()){
                PC = playerCountRef.val();
                player.getCount();
            }
            //New form object
            form = new Form();
            form.display();
            
        }

        car1 = createSprite(100,200);
        car2 = createSprite(300,200);
        car3 = createSprite(500,200);
        car4 = createSprite(700,200);
        cars = [car1,car2,car3,car4];
    }

    play(){
       form.hide();
       textSize(30);
       text("Game has started", 120, 100);
       Player.getPlayerInfo();

       //Game Starts Here
       if(allPlayers !== undefined){
           var x = 0, y;
           var index = 0;
           for(var i in allPlayers){
              index = index + 1;

                x = x+200
                y = displayHeight - allPlayers[i].distance
               cars[index-1].x = x;
               cars[index-1].y = y;

               //Identifying the currently active player
                if(index === player.index){
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y
                }
           } 

       }

       if(keyDown(UP_ARROW)&& player.index !== null){
          player.distance = player.distance+20;
          player.update();
          
       }

       drawSprites();
    }

    end(){}
}

/*
LOCAL FUNCTION
    function(){}

    normal --> function name(){}


"/" --> refers to the entire database
*/