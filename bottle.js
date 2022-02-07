var img, status1
object = []

function preload() {
    img = loadImage("bottle.jpg")
    font = loadFont("ShortStack-Regular.ttf")
}

function setup() {
    canvas = createCanvas(640, 420)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded() {
    console.log("Model is Loaded")
    status1 = true
    objectDetector.detect(img, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.log("Error")
    }
    else {
        object = results
        console.log(results)
    }
}

function draw() {
    image(img, 0, 0, 640, 420)
    for (i = 0; i < object.length; i++) {
        code = object[i]
        strokeWeight(3)
        noFill()
        rect(code.x, code.y, code.width, code.height)
        stroke("red")
        strokeWeight(1)
        text(code.label + ", ", code.x + 10, code.y + 15)
        text(floor(code.confidence * 100) + "%", code.x + 75, code.y + 15)

        document.getElementById("status").innerHTML = "Status : " + object.length + " Object Detected"
    }
}