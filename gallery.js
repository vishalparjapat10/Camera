// Transactions, https://javascript.info/indexeddb

setTimeout(() =>{
    if(db){
        // There were basically four steps:
    
        // Create a transaction, mentioning all the stores it’s going to access, at (1).
        // Get the store object using transaction.objectStore(name), at (2).
        // Perform the request to the object store books.add(book), at (3).
        // …Handle request success/error (4), then we can make other requests if needed, etc.
    
        let imageDBTransaction = db.transaction("image",'readonly');
        let imageStore = imageDBTransaction.objectStore('image');
        let imageRequest = imageStore.getAll();
    
        imageRequest.onsuccess = () =>{
            let imageResult = imageRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");
            imageResult.forEach((imageObj) =>{
                let imageElem = document.createElement("div");
                imageElem.setAttribute("class","media-cont");
                imageElem.setAttribute("id",imageObj.id);
                let url = imageObj.url;
    
                imageElem.innerHTML = `
                <div>
                <img src="${url}"/>
                </div>
                <div class="delete">DELETE</div>
                <div class="download">DOWNLOAD</div>
                `;
    
                galleryCont.appendChild(imageElem);
            })
        }
    
        let videoDBTransaction = db.transaction("video",'readonly');
        let videoStore = videoDBTransaction.objectStore('video');
        let videoeRequest = videoStore.getAll();
    
        videoeRequest.onsuccess = () =>{
            let videoResult = videoeRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");
            videoResult.forEach((videoObj) =>{
                let videoElem = document.createElement("div");
                videoElem.setAttribute("class","media-cont");
                videoElem.setAttribute("id",videoObj.id);
                let url = videoObj.url;
    
                videoElem.innerHTML = `
                <div>
                <video autoplay loop src="${url}"></video>
                </div>
                <div class="delete">DELETE</div>
                <div class="download">DOWNLOAD</div>
                `;
    
                galleryCont.appendChild(videoElem);
            })
        }
    }
},100);

function deleteListener(){

}

function downloadListener(){
    
}

