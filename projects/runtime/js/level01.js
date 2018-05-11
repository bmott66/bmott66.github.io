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
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'falcon',x:400,y:30},
                {type: 'falcon',x:600,y:110},
                {type: 'falcon',x:900,y:20},
                {type: 'falcon',x:1200,y:100},
                {type: 'falcon',x:1600,y:25},
                {type: 'falcon',x:1900,y:105},
                {type: 'falcon',x:2200,y:75},
                {type: 'meteor',x:400,y:10},
                {type: 'meteor',x:800,y:100},
                {type: 'meteor',x:1200,y:50},
                {type: 'meteor',x:1600,y:20},
                {type: 'meteor',x:1700,y:100},
                {type: 'core',x:2000,y: 100},
            ]
        };

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        var createFalcon = function(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 25;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = groundY-y;
            game.addGameItem(myObstacle);
            
            var obstacleImage = draw.bitmap('img/Falcon.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        
        var createMeteor = function(x,y) {
            var meteor = game.createGameItem('enemy',25);
            meteor.x = x;
            meteor.y = groundY-y;
            meteor.velocityX = -1;
            meteor.rotationalVelocity = 10;
            
            var meteorImage = draw.bitmap('img/meteor.png');
            meteorImage.x = -25;
            meteorImage.y = -25;
            meteor.addChild(meteorImage);
           
            meteor.onPlayerCollision = function() {
                game.changeIntegrity(-10);
                meteor.shrink();
            };
            
            meteor.onProjectileCollision = function () {
                game.increaseScore(100);
                meteor.shrink();
            }
            game.addGameItem(meteor);
        }
        
        var createCore = function(x,y) {
            var core = game.createGameItem('core',25);
            core.x = x;
            core.y = groundY-y;
            core.velocityX = -1;
            core.rotationalVelocity = 10;
            
            var coreImage = draw.bitmap('img/core.png');
            coreImage.x = -25;
            coreImage.y = -25;
            core.addChild(coreImage);
           
            core.onPlayerCollision = function() {
                game.increaseScore(10000);
                confirm("You have completed level 1 of this test. Press Okay Now or refresh to play again");
            }
               
            game.addGameItem(core);
        }

        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            if (gameItem.type === 'falcon') {
                createFalcon(gameItem.x, gameItem.y);
            }
            if (gameItem.type === 'meteor') {
                createMeteor(gameItem.x, gameItem.y);
            }
            if (gameItem.type === 'core') {
                createCore(gameItem.x, gameItem.y);
            }
        } 
    
    }
 
}    

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}