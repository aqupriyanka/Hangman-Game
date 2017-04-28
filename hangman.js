
var word =["ACRES","ADULT","ADVICE","ARRANGEMENT","ATTEMPT","AUGUST","AUTUMN","BORDER","BREEZE","BRICK","CALM","CANAL","CASEY","CAST","CHOSE","CLAWS","COACH","CONSTANTLY","CONTRAST","COOKIES","CUSTOMS","DAMAGE","DANNY","DEEPLY","DEPTH","DISCUSSION","DOLL","DONKEY","EGYPT","ELLEN","ESSENTIAL","EXCHANGE","EXIST","EXPLANATION","FACING","FILM","FINEST","FIREPLACE","FLOATING","FOLKS","FORT","GARAGE","GRABBED","GRANDMOTHER","HABIT","HAPPILY","HARRY","HEADING","HUNTER","ILLINOIS","IMAGE","INDEPENDENT","INSTANT","JANUARY","KIDS","LABEL","LEE","LUNGS","MANUFACTURING","MARTIN","MATHEMATICS","MELTED","MEMORY","MILL","MISSION","MONKEY","MOUNT","MYSTERIOUS","NEIGHBORHOOD","NORWAY","NUTS","OCCASIONALLY","OFFICIAL","OURSELVES","PALACE","PENNSYLVANIA","PHILADELPHIA","PLATES","POETRY","POLICEMAN","POSITIVE","POSSIBLY","PRACTICAL","PRIDE","PROMISED","RECALL","RELATIONSHIP","REMARKABLE","REQUIRE","RHYME","ROCKY","RUBBED","RUSH","SALE","SATELLITES","SATISFIED","SCARED","SELECTION","SHAKE","SHAKING","SHALLOW","SHOUT","SILLY","SIMPLEST","SLIGHT","SLIP","SLOPE","SOAP","SOLAR","SPECIES","SPIN","STIFF","SWUNG","TALES","THUMB","TOBACCO","TOY","TRAP","TREATED","TUNE","UNIVERSITY","VAPOR","VESSELS","WEALTH","WOLF","ZOO"];
var word1 = "";
var index;
var wordFound = false;
var gameStarted = true;
var letterGuessed = [];
var noOfLettersFound = 0;
var chances = 0;
var audioElement = document.createElement("audio");

document.onkeyup = function(event){
	
	newGame();
}


function newGame(){
	if(gameStarted){
		gameStarted = false;
		reset();
		word1 = word[Math.floor(Math.random()*word.length)];
		printInput(word1);
		document.getElementById("pressKey").style.visibility = 'hidden';
		document.getElementsByClassName("progress-bar")[0].style.width = '0%';
	}
}


function printInput(word){
	document.getElementById("alphabets").style.visibility = 'visible';
	document.getElementById("progressBar").style.visibility = 'visible';
	if(wordFound){
		wordFound= false;
		document.getElementById("word").innerHTML = "";
		
	}
	for (var i = 0; i < word.length; i++) {
		document.getElementById("word").innerHTML += '<span id="'+i +'">'+ "_" +'</span>'+'\t';
	}
}

function letterClicked(char){
	
	if(checkChances()){
		var letterFound=false;
		for(var i=0; i < word1.length; i++){
			if(char == word1[i]){
				letterFound = true;
				printLetter(i,char);
				noOfLettersFound++;
			}
		}
		updateChances(letterFound);
	  }
		
	}

function printLetter(index,letter){
	
	document.getElementById(index).innerHTML = letter ;
		
}

function disable(obj){
	document.activeElement.href = '#';
	// document.activeElement.style.visibility = 'hidden';
}

function gameEnd(){
	gameStarted = true;wordFound=true;
	 document.getElementById("pressKey").style.visibility = 'visible';
	 document.getElementById("alphabets").style.visibility = 'hidden';
	 document.getElementById("progressBar").style.visibility = 'hidden';
}

function checkChances(){
	chances = parseInt(chances);
	noOfLettersFound = parseInt(noOfLettersFound);
	if(chances < 8 && noOfLettersFound != word1.length){
			return true;
	}else{
		return false;
	}

}

function updateChances(letterFound){
	if(letterFound){
		if(noOfLettersFound === word1.length){
			document.getElementById("win").innerHTML = 'YEYE!! You Saved me from Getting HANGED';
			document.getElementById("win").style.color = "green";
			audioElement.setAttribute("src", "ThemeSong.mp3");
			audioElement.play();
			gameEnd();
		}
	}else{
			letterGuessed.push(document.activeElement.text);
			chances++;
			
	}
	document.getElementById("chances").innerHTML = chances;
	document.getElementById("letters").innerHTML = letterGuessed;
	console.log(document.getElementsByClassName("progress-bar"));
	var chancePercentage = (noOfLettersFound/word1.length)*100;
	//(chances/5)*100;
	document.getElementsByClassName("progress-bar")[0].style.width = chancePercentage + '%';
	drawCanvas();
	if(chances == 8 && noOfLettersFound != word1.length){
		//show the word to user.
	  	for(var i=0;i<word1.length;i++){
	  		printLetter(i,word1[i]);
	  	}
	  	document.getElementById("win").innerHTML = 'You get me HANGED';
	  	document.getElementById("win").style.color = "red";
		gameEnd();
	}

}

function reset(){
	chances = 0;
	letterGuessed =[];
	noOfLettersFound = 0;
	word1 = null;
	document.getElementById("chances").innerHTML = "0";
	document.getElementById("letters").innerHTML = "";
	document.getElementById("win").innerHTML = "Save me from getting HANGED!!";
	document.getElementById("win").style.color="cyan";
	var links = document.links;
	for (var i = 0; i < document.links.length; i++) {
		links[i].href = "javascript:disable(this);letterClicked('"+links[i].innerHTML+"');";
	}
	var canvas = document.getElementById("canvas");
    var c = canvas.getContext('2d');
    console.log(c);
    c.clearRect(0, 0, canvas.width,canvas.height);
    c.beginPath();

    audioElement.pause();
}

// Draw the canvas
function drawCanvas() {
	var canvas = document.getElementById("canvas");
    var c = canvas.getContext('2d');
    //clears all previous states of canvas.
    c.clearRect(0, 0, canvas.width,canvas.height);
    
    c.lineWidth = 10;
    c.strokeStyle = 'red';
    c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = 'red';
    // draw the ground
    drawLine(c, [20,190], [180,190]);
    // start building the gallows if there's been a bad guess
    if (chances > 0) {
        // create the upright
        c.strokeStyle = '#A52A2A';
        drawLine(c, [30,185], [30,10]);
        if (chances > 1) {
            // create the arm of the gallows
            c.lineTo(150,10);
            c.stroke();
        }
        if (chances > 2) {
            c.strokeStyle = 'white';
            c.lineWidth = 3;
            // draw rope
            drawLine(c, [145,15], [145,30]);
            // draw head
            c.beginPath();
            c.moveTo(160, 45);
            c.arc(145, 45, 15, 0, (Math.PI/180)*360);
            c.stroke(); 
        }
        if (chances > 3) {
            // draw body
            drawLine(c, [145,60], [145,130]);
        }
        if (chances > 4) {
            // draw left arm
            drawLine(c, [145,80], [110,90]);
        }
        if (chances > 5) {
            // draw right arm
            drawLine(c, [145,80], [180,90]);
        }
        if (chances > 6) {
            // draw left leg
            drawLine(c, [145,130], [130,170]);
        }
        if (chances > 7) {
            // draw right leg and end game
            drawLine(c, [145,130], [160,170]);
            // c.fillText('Game over', 2, 220);
            
        }
    }
}

function drawLine(context, from, to) {
    // context.beginPath();
    context.moveTo(from[0], from[1]);
    context.lineTo(to[0], to[1]);
    context.stroke();
}