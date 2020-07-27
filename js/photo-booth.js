const photoBoothContainer = document.getElementById('photo-booth-container');
const webcam = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const timer = document.getElementById('timer');
const takePhotoButton = document.getElementById('take-photo');
const clearPhotosButton = document.getElementById('clear-photos');
const downloadPhotoStripButton = document.getElementById('download-photo-strip');
const ctx = canvas.getContext('2d');

// Initialize webcam, set video source to webcam
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then((stream) => {
    webcam.srcObject = stream;
    webcam.play();
}).catch((err) => {
    console.log(`Error: ${err}`);
});

// Set webcam and canvas sizes, draw "photo stip"
webcam.addEventListener('canplay', () => {
    webcam.setAttribute('width', photoBoothContainer.offsetWidth);
    webcam.setAttribute('height', webcam.videoHeight / (webcam.videoWidth / 500));

    canvas.setAttribute('width', webcam.width / 2);
    canvas.setAttribute('height', ((webcam.height / 2) * 4) - 30);

    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
});

// Event listener for when someone
takePhotoButton.addEventListener('click', (e) => {
    e.preventDefault();

    takePhotoButton.style.display = 'none';

    photoTimer();
    takePhotos();
});

// Timer - countdown from 3 seconds to "Say Cheese!"
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

// Take 4 photos and add them to the canvas
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

        if(photoCount > 4) {
            clearPhotosButton.style.display = 'block';
            downloadPhotoStripButton.style.display = 'block';
        }
    }, 5000);
}

// Clear all photos from the canvas
clearPhotosButton.addEventListener('click', (e) => {
    e.preventDefault();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    takePhotoButton.style.display = 'block';
    clearPhotosButton.style.display = 'none';
    downloadPhotoStripButton.style.display = 'none';
});

// Download the "photo strip" -- a souvenir of sorts
downloadPhotoStripButton.addEventListener('click', (e) => {
    e.preventDefault();

    const a = document.createElement('a');
    const imgURL = canvas.toDataURL('image/jpg');
    
    a.download = 'mintbean-mirrorhack-photo-strip.jpg';
    a.href = imgURL;
    a.click();
})