var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                
                { "type": "sawblade", "x": 2200, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 1050,"y": groundY - 10 },
                { "type": "sawblade", "x": 300, "y": groundY - 100 },
                {"type": 'lazer', x:1000, y:300},
                {'type': 'lazer', x: 1300, y: 430 },
                {'type': 'lazer', x: 800, y: 430 },
                {'type': 'lazer', x: 1700, y: 430 },
                {'type': 'enemy', x: 500, y: groundY - 10},
                {'type': 'enemy', x: 2500, y: groundY - 10},
                {'type': 'enemy', x: 1500, y: groundY - 10},
                {'type': 'reward', x: 550, y: groundY - 10},

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
            function createSawBlade(x,y){
            
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            }
        
        
        for (i = 0; i < 4; i++){
            var firstGameItemObject = levelData.gameItems[i];
            var firstX = firstGameItemObject.x;
            var firstY = firstGameItemObject.y;
            createSawBlade(firstX, firstY);                


        }

        function createLazer(x,y){
             
            var hitZoneSize = 35;
            var damageFromObstacle = 15;
            var createLazerHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            createLazerHitZone.x = x;
            createLazerHitZone.y = y;
            game.addGameItem(createLazerHitZone);
            var obstacleImage2 = draw.bitmap('img/Laser3.png');
            createLazerHitZone.addChild(obstacleImage2);
            obstacleImage2.x = -25;
            obstacleImage2.y = -25;



        }
            for (i = 4; i < 9; i++){
            var firstGameItemObject = levelData.gameItems[i];
            var firstX = firstGameItemObject.x;
            var firstY = firstGameItemObject.y;
        
        


        
            createLazer(firstX, firstY);                
            }
           function createEnemy(x ,y ){

           
            var enemy =  game.createGameItem('enemy',75);
            var redSquare = draw.bitmap('img/monster2.png')
            redSquare.y = -75;
            redSquare.x = -75
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;

            enemy.rotationVelocity = 10
            enemy.onPlayerCollision = function() {
                    console.log('The enemy has hit Halle');
                game.changeIntegrity(-75);
                enemy.fadeOut();
};
            enemy.onProjectileCollision = function() {
            console.log('Halle has hit the enemy');
            game.increaseScore(100)
                enemy.shrink();
            
            
            
            };


        





            



    };
        



        
        createEnemy(800,groundY-100);
        createEnemy(1200,groundY-50);
         createEnemy(1700,groundY-10);
          createEnemy(600,groundY-10);
           createEnemy(1000,groundY-10);
            createEnemy(2200,groundY-10);
             createEnemy(1400,groundY-10);






             function createReward(x ,y ){

           
            var reward =  game.createGameItem('reward',40);
            var redSquare = draw.bitmap('img/reward.png')
            redSquare.y = -30
            redSquare.x = -50
            reward.addChild(redSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;

            reward.rotationVelocity = 10
            reward.onPlayerCollision = function() {
                    console.log('The reward has hit Halle');
                game.increaseScore(1500);
                reward.fadeOut();
};
            
            
            
            
            


        





            



    };

        createReward(550, groundY -110);
        createReward(700, groundY -110);
        createReward(900, groundY -110);
        createReward(1200, groundY -110);
//  halle takes damage on spawn



            // DO NOT EDIT CODE BELOW HERE
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
