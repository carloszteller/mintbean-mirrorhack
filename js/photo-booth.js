const webcam = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
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

takePhotoButton.addEventListener('click', (e) => {
    e.preventDefault();
});