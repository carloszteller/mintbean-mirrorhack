const photoBoothContainer = document.getElementById('photo-booth-container');
const webcam = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const timer = document.getElementById('timer');
const takePhotoButton = document.getElementById('take-photo');
const clearPhotosButton = document.getElementById('clear-photos');
const downloadPhotoStripButton = document.getElementById('download-photo-strip');
const ctx = canvas.getContext('2d');

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then((stream) => {
    webcam.srcObject = stream;
    webcam.play();
}).catch((err) => {
    console.log(`Error: ${err}`);
});

webcam.addEventListener('canplay', () => {
    webcam.setAttribute('width', photoBoothContainer.offsetWidth);
    webcam.setAttribute('height', webcam.videoHeight / (webcam.videoWidth / 500));

    canvas.setAttribute('width', webcam.width / 2);
    canvas.setAttribute('height', ((webcam.height / 2) * 4) - 30);

    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.stroke();
});

takePhotoButton.addEventListener('click', (e) => {
    e.preventDefault();

    photoTimer();
    takePhotos();
});

photoTimer = () => {
    let seconds = 4;

    setInterval(() => {
        if(seconds > 0) {
            timer.innerHTML = seconds - 1;
        }
    
        if(seconds === 1) {
            timer.innerHTML = 'Say Cheese!';
        }
    
        if(seconds === 0) {
            timer.innerHTML = '';
            clearInterval();
        }

        seconds--;
    }, 1000);
}

takePhotos = () => {
    let photoCount = 1;

    setInterval(() => {
        switch(photoCount) {
            case 1:
                ctx.drawImage(webcam, 10, 10, canvas.width - 20, (webcam.height / 2) - 20);
                break;
            case 2:
                ctx.drawImage(webcam, 10, webcam.height / 2, canvas.width - 20, (webcam.height / 2) - 20);
                break;
            case 3:
                ctx.drawImage(webcam, 10, ((webcam.height / 2) * 2) - 10, canvas.width - 20, (webcam.height / 2) - 20);
                break;
            case 4:
                ctx.drawImage(webcam, 10, ((webcam.height / 2) * 3) - 20, canvas.width - 20, (webcam.height / 2) - 20);
                break;
            default:
                clearInterval();
                break;
        }

        photoCount++;

        if(photoCount <= 4) {
            photoTimer();
        }
    }, 5000);
}

downloadPhotoStripButton.addEventListener('click', (e) => {
    e.preventDefault();

    const a = document.createElement('a');
    const imgURL = canvas.toDataURL('image/jpg');
    
    a.download = 'my-photo-strip.jpg';
    a.href = imgURL;
    a.click();
})