noseXCoordinate = 0;
noseYCoordinate = 0;
differenceBetweenWrists = 0;
rightWristXCoordinate = 0;
leftWristXCoordinate = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(470, 470);

    canvas = createCanvas(470, 470);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    background("#ffbcbc");
    document.getElementById("widthAndHeight").innerHTML = differenceBetweenWrists + "px";
    fill("#ffffff");
    stroke("#b0d9ff");
    square(noseXCoordinate, noseYCoordinate, differenceBetweenWrists);
}

function modelLoaded() {
    console.log("inside model loaded function");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        noseYCoordinate = results[0].pose.nose.y;
        noseXCoordinate = results[0].pose.nose.x;
        console.log("X Coordinate Of Nose: " + noseXCoordinate + ", Y Coordinate Of Nose: " + noseYCoordinate);
        leftWristXCoordinate = results[0].pose.leftWrist.x;
        rightWristXCoordinate = results[0].pose.rightWrist.x;
        differenceBetweenWrists = floor(leftWristXCoordinate - rightWristXCoordinate);
        console.log("X Coordinate Of Left Wrist: " + leftWristXCoordinate + ", X Coordinate Of Right Wrist: " + rightWristXCoordinate + ", Difference Between Wrists' X Coordinates: " + differenceBetweenWrists);
    }
}