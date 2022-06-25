// connect to database
let db;
let openRequest = indexedDB.open('myDatabase');

openRequest.addEventListener('success',() =>{
    console.log("DB connected");
    db = openRequest.result;// it will give access to database
});

openRequest.addEventListener('upgradeneeded',() =>{
    console.log("DB upgraded OR initialized DB");
    // this event is triggered everytime when there is upgrade going on/version changes or when we create DB for the first time then DB intialize through this event
    db = openRequest.result;// it will give access to database

    db.createObjectStore('video',{keyPath:"id"});
    db.createObjectStore('image',{keyPath:"id"});
});

openRequest.addEventListener('error',() =>{
    console.log("DB error");
});