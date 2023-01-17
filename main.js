function setup(){
    canvas = createCanvas(200, 200);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function clearCanvas(){
    background("white");
} 
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(15);
    stroke("red");
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function gotResult(error, results){
 if (error){
    console.log(error);
 }
 else{
    console.log(results);
    document.getElementById('label').innerHTML='label : ' + results[0].label;
    document.getElementById('confidence').innerHTML='confidence : ' + Math.round(results[0].confidence *100)+'%';

    utterThis= new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
 }
}