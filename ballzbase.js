var SOCKET = io.connect("http://76.28.150.193:8888");
var info = {studentname: "Tyler Braden", statename: "BallzState"};

var saveDemBallz = function() {
	 console.log("saving called");
	
	info.circles = [];
	
	for (var i = 0; i < gameEngine.entities.length; i++) {
		if (gameEngine.entities[i] instanceof Circle) {
			var circ = gameEngine.entities[i];
			info.circles.push({x: circ.x, y: circ.y, velocity: circ.velocity, speed: circ.speed});
		}
	}
	
	SOCKET.emit("save", info);


};

var loadDemBallz = function() {
	
  SOCKET.emit("load", {studentname: info.studentname,
                       statename: info.statename});
};

SOCKET.on("load", function(info) {
	 console.log("load called");

	
	for (var i = 0; i < gameEngine.entities.length; i++) {
		if (gameEngine.entities[i] instanceof Circle) {
			gameEngine.entities[i].removeFromWorld = true;
		}
	}
	
	for (var i = 0; i < info.circles.length; i++) {
		var temp = info.circles[i];
		var circleTemp = new Circle(gameEngine, temp.x, temp.y);
		circleTemp.velocity = temp.velocity;
		circleTemp.speed = temp.speed;
		gameEngine.entities.push(circleTemp);
	}
});
	
