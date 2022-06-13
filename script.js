let video = document.querySelector('video');
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let transparentColor = 'transparent';
let recordBtnCont = document.querySelector('.record-btn-cont');
let recordBtn = document.querySelector('.record-btn');

let recorder;
let chunks = [];
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
            chunks = [];
            console.log('recording started');
        });

        recorder.addEventListener("dataavailable",(e) =>{
            chunks.push(e.data);    
            console.log('recording pushed in chunks');
        });

        recorder.addEventListener("stop",() =>{
            // convert video

            let blob = new Blob(chunks,{type:'video/mp4'});
            // let blob = new Blob(chunks,{type:'video/mp4'});
            console.log('recording stopped');
            // download video on desktop
            let videoURL = URL.createObjectURL(blob);
            console.log(videoURL);

            let a = document.createElement('a');
            a.href = videoURL
            a.download = 'myvideo.mp4';
            a.click();
            // store in database
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

    // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
    if(shouldRecord){
        // recording start
        recorder.start();// on calling this function 'start' event will be fired/run and scope will go to line 24. If we specify number of milliseconds in the argumnent , then after those milliseconds the 'dataavailable' event will be fired/run and will amount of recording/data is stored till that moment i.e data will be pushed to chunks array after each calling of 'dataavailable' event.
        // start timer
        startTimer();
    }
    else{
        // stop the recording
        recorder.stop();// on calling this function first 'dataavailable' event will be fired/run  and scope will go to line 28, and then 'stop' event will be fired/run and scope will go to line no 33
        // stop the timer
        stopTimer();  
    }

});

let timer = document.querySelector(".timer");
let counter  = 0;
let timerID;
function startTimer(){
    timer.style.display = 'block';
    function displayTimer(){
        let totalSeconds = counter;

        let minutes = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds%60;

        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds%3600;

        let seconds = totalSeconds;

        hours = (hours<10) ? `0${hours}` : hours;
        minutes = (minutes<10) ? `0${minutes}` : minutes;
        seconds = (seconds<10) ? `0${seconds}` : seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`;

        counter++;


    }

    timerID = setInterval(displayTimer,1000);// setInterval function returns unique id interval
}

function stopTimer(){
    clearInterval(timerID);
    timer.innerText = "00:00:00";
    timer.style.display = "none";
}