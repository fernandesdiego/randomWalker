const d = document.getElementById('debug');

const canvas = document.getElementById("screen")


var c = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function walker(probUp, probDown, probLeft, probRight) {
    this.x = canvas.width/2,
    this.y = canvas.height/2,
    this.probUp = probUp,
    this.probDown = probDown,
    this.probLeft = probLeft,
    this.probRight = probRight,
    this.color = "#" + ((1<<24)*Math.random() | 0).toString(16),
    this.updatePos = function() {
        let rand = Math.random() * 101;

        if (rand < this.probRight) {
            this.x++;
        }
        else if (rand < this.probLeft) {
            this.x--;
        }
        else if (rand < this.probDown) {
            this.y++;
        }
        else if (rand < this.probUp) {
            this.y--;
        }  
        // console.log(`X:${this.x},Y:${this.y}`)  
    }
}

function generateProbability() {
    const n = 4;
    var totalSum = 0;
    var probs = [];

    // generate rand
    for (let i = 0; i < n; i++) {
        probs[i] = Math.random() * 101;    
    }
    // compute sum
    for (let j = 0; j < n; j++) {
        totalSum += probs[j];
    }
    // divide each by the sum and multiply by M(100)
    for (let k = 0; k < n; k++) {
        probs[k] = (probs[k]/totalSum) * 100
    }    

    return probs;
}


var probs = generateProbability();

var probList = [];
var walkerList = [];

for (let i = 0; i < 100 ; i++) {
    probList[i] = generateProbability();
    walkerList[i] = new walker(probList[i][0],probList[i][1],probList[i][2],probList[i][3])
}



function draw() {
    walkerList.forEach(walker => {        
        c.fillStyle = walker.color;
        c.fillRect(walker.x, walker.y, 4, 4);
    });    
}

function animate() {
    walkerList.forEach(walker => {
        walker.updatePos();
    });
    draw();
    requestAnimationFrame(animate);
}

animate()

