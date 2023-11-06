Webcam.set({
    width:350,
    heigth:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/OHht_Iisf/model.json',modelLoaded);
function modelLoaded(){
    console.log('Model Loaded!');
}

var prediction = "";

function speak(){
    var synth = window.speechSynthesis;
    speak_data = " The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = reuslts[0].label;
        prediction = results[0].label;
        if(results[0].label == "victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
            prediction = "That was the marvelous victory";
        }
        if(results[0].label == "best"){
            document.getElementById("update_emoji").innerHTML ="&#128077;";
            prediction = "All the best";
        }
        if(results[0].label == "amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
            prediction  ="This is looking amazing";
        }
    }
}