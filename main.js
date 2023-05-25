song = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
ScoreLeftWrist = 0;
ScoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("PoseNet is initialized.");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist =" + ScoreLeftWrist)

        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist =" + ScoreRightWrist)

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + LeftWristX + ", left wrist y = " + LeftWristY);

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + RightWristX + ", right wrist y = " + RightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    stroke("#FF6347");
    fill("#FF6347");
    circle(RightWristX, RightWristY, 20);

    if (ScoreRightWrist > 0.2) {
        if (RightWristY > 0 && RightWristY <= 100) {
            document.getElementById("Speed") = "Speed = 0.5x";
            song.rate(0.5);
        }
        if (RightWristY > 100 && RightWristY <= 200) {
            document.getElementById("Speed") = "Speed = 1x";
            song.rate(1);
        }
        if (RightWristY > 200 && RightWristY <= 300) {
            document.getElementById("Speed") = "Speed = 1.5x";
            song.rate(1.5);
        }
        if (RightWristY > 300 && RightWristY <= 400) {
            document.getElementById("Speed") = "Speed = 2x";
            song.rate(2);
        }
        if (RightWristY > 400 && RightWristY <= 500) {
            document.getElementById("Speed") = "Speed = 2.5x";
            song.rate(2.5);
        }
    }


    if (ScoreLeftWrist > 0.2) {
        circle(LeftWristX, LeftWristY, 20);
        InNumberLeftWristY = Number(LeftWristY);
        Remove_Decimals = floor(InNumberLeftWristY);
        Volume = Remove_Decimals / 500;

        document.getElementById("Volume").innerHTML = "Volume = " + Volume;
        song.setVolume(Volume);
    }
}