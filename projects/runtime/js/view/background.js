var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();
               
            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'black');
            background.addChild(backgroundFill);
            var backgroundFill2 = draw.rect(canvasWidth,canvasHeight - groundY - 8,'#7c7f80') 
             background.addChild(backgroundFill2);
             backgroundFill2.y = groundY + 8;
             
             
            // TODO: 3 - Add a moon and starfield
            
            for(var i=0; i<100; i++) {
                circle = draw.circle(5,'#f1f5b0','LightGray',1);
                circle.x = canvasWidth*2 *Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            var moon = draw.bitmap('img/moon.png');
            moon.x = canvasWidth - 400;
            moon.y = 25;
            moon.scaleX = 0.4;
            moon.scaleY = 0.4;
            background.addChild(moon);
            var circle;
            buildings = [];
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<11;++i) {
                var buildingHeight = 150 + Math.random()*270;
                var building = draw.rect(75,buildingHeight,'Gray','lightGray',1.5);
                building.x = 200*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('https://internationaltreefoundation.org/wp-content/uploads/2016/05/tree-576848_1280.png');
            tree.x = canvasWidth - 600;
            tree.y = groundY - 770;
            background.addChild(tree)
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
            tree.x = tree.x - 6;
            if(tree.x < -900) {
                tree.x = canvasWidth;
            }
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++){
               // buildings is an array of building objects
               // you need to get out the buildings from the array, then
               // get out the x value from the individual buildings.
               
                var building = buildings[i];
                building.x = building.x - 1;
                if(building.x < -900) {
                    building.x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
