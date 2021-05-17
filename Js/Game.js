class Game
{
    constructor()
    {
    
    }
   
    getState()
    {
        var dbref = database.ref("gameState")
        dbref.on("value",function(data) {
          gameState = data.val()
        })
    }

    updateState(state)
    {
        database.ref("/").update({"gameState": state})
    }

    startGame()
    {
      form = new Form()
      player = new Player()
      player.getCount()
      form.display()

      car1 = createSprite(80,height)
      car1.addImage(car1_image)
      car2 = createSprite(280,height)
      car2.addImage(car2_image)
      car3 = createSprite(480,height)
      car3.addImage(car3_image)
      car4 = createSprite(680,height)
      car4.addImage(car4_image)

      cars = [car1,car2,car3,car4]

      

    }

    play()
    {
      form.hideform()
      Player.getAllPlayersInfo()
      player.getFinishedCars()
      //textSize(20)
      //text("Game Started",200,250)
      if(allPlayers != undefined)
      {
        image(track_image,0,-height*4,width,height*5)
        var index = 0
        var x = 400
        var y = height

        for(var plr in allPlayers)
        {
          cars[index].x = x
          y = height - allPlayers[plr].distance
          cars[index].y = y
          
          if(index + 1 === player.index)
          {
            if(allPlayers[plr].distance > 200)
            
            camera.position.y = cars[index].y
            camera.position.x = width/2

            //cars[index].setCollider("rectangle",0,0,cars[index].height,cars[index].width);
           //cars[index].shapeColor = "red"
           ellipseMode(RADIUS)
           ellipse(cars[index].x,cars[index].y,60,100)
           
           textSize(20)
           fill("red")
           text(allPlayers[plr].name,cars[index].x - 30,cars[index].y + 100)

          }
           else 
            cars[index].shapeColor = "black"

         
         //textY += 20
         
         index = index + 1
         x = x + 250
         

                  
        }
       
        

        if(keyIsDown  (UP_ARROW) && player.index != null)
        {
           player.distance += 50
           player.update()
          // console.log(player.distance)

           if(player.distance >= 500)
           {
             player.rank += 1
             player.update()
             Player.updateFinishedCars(player.rank)
             gameState = 2
             
           }

        }
         
        drawSprites()

      }
     

    }

    end()
    {
      console.log("finishedCars" + finishedCars)

      
      if(finishedCars < 4)
      {
        push()
        textSize(25)
        fill("red")
        text("Game is over!, Wait for other players.", width/2 -170 ,camera.position.y)
        pop()
      }
    }

    displayRank()
    {
      text("Leaderboard", width/2 - 130,camera.position.y)

      var textY = camera.position.y + 30
      

      for(var plr in allPlayers)
      {
        if(plr === "player" + player.index)
           fill("red")
           else 
             fill("black")
             
        text(allPlayers[plr].name + ": " + allPlayers[plr].rank,width/2, textY)
        textY = textY + 20
      }
     

    }

}