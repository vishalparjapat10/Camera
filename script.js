let video = document.querySelector('video');
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let transparentColor = 'transparent';
let recordBtnCont = document.querySelector('.record-btn-cont');
let recordBtn = document.querySelector('.record-btn');

let recorder;
let constraints = {
    video:true,
    audio:true
}

let shouldRecord = false; 

navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        video.srcObject = stream;// this stream contains data when we turn on the camera, the data which is producing by camera or we can say video, that stream of video we want to be displayed in the website, so we need to add this stream to our video tag so that we can show it
        
        recorder = new MediaRecorder(stream);
        // start is an event in defined for MediaRecorder
        recorder.addEventListener("start",() =>{

        })
});

// click photo
captureBtnCont.addEventListener("click",() => {
    let canvas = document.createElement("canvas");
    let tool = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    tool.drawImage(video,0,0,canvas.width,canvas.height);

    // applying filters on photo
    tool.fillStyle = transparentColor;
    tool.fillRect(0,0,canvas.width,canvas.height);


    let imageURL = canvas.toDataURL();
    let img = document.createElement("img");
    img.src = imageURL;
    document.body.append(img);
});

recordBtnCont.addEventListener("click",() =>{

    shouldRecord = !shouldRecord;
    if(shouldRecord){
        // recording start'
        // start timer
    }
    else{
        // stop the recording
        // stop the timer
    }

})