const imageUpload = document.getElementById('imageUpload');
const toggleButton = document.getElementById('toggleButton');
const downloadButton = document.getElementById('downloadButton');
const uploadedImage = document.getElementById('uploadedImage');
const spinner = document.getElementById('spinner');
const speedControl = document.getElementById('speedControl');
const borderColorControl = document.getElementById('borderColorControl');
const borderWidthControl = document.getElementById('borderWidthControl');
const centerDotSizeControl = document.getElementById('centerDotSizeControl');
const centerDotColorControl = document.getElementById('centerDotColorControl');
const zoomControl = document.getElementById('zoomControl');
const horizontalPositionControl = document.getElementById('horizontalPositionControl');
const verticalPositionControl = document.getElementById('verticalPositionControl');
const imageContainer = document.getElementById('imageContainer');
const centerDot = document.getElementById('centerDot');

let isSpinning = false;

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            spinner.style.display = 'block';
            toggleButton.disabled = false;
            downloadButton.disabled = false;
            updateSpinAnimation();
        }
        reader.readAsDataURL(file);
    }
});

toggleButton.addEventListener('click', function() {
    isSpinning = !isSpinning;
    this.textContent = isSpinning ? 'Stop Spinning' : 'Start Spinning';
    updateSpinAnimation();
});

downloadButton.addEventListener('click', simulateDownload);

speedControl.addEventListener('input', updateSpinAnimation);
borderColorControl.addEventListener('input', updateStyles);
borderWidthControl.addEventListener('input', updateStyles);
centerDotSizeControl.addEventListener('input', updateStyles);
centerDotColorControl.addEventListener('input', updateStyles);
zoomControl.addEventListener('input', updateStyles);
horizontalPositionControl.addEventListener('input', updateStyles);
verticalPositionControl.addEventListener('input', updateStyles);

function updateSpinAnimation() {
    const speed = speedControl.value;
    if (isSpinning) {
        spinner.style.animation = `spin ${11 - speed}s linear infinite`;
    } else {
        spinner.style.animation = 'none';
    }
}

function updateStyles() {
    imageContainer.style.borderColor = borderColorControl.value;
    imageContainer.style.borderWidth = `${borderWidthControl.value}px`;
    centerDot.style.width = `${centerDotSizeControl.value}px`;
    centerDot.style.height = `${centerDotSizeControl.value}px`;
    centerDot.style.backgroundColor = centerDotColorControl.value;
    uploadedImage.style.transform = `scale(${zoomControl.value / 100}) translate(${horizontalPositionControl.value}px, ${verticalPositionControl.value}px)`;
}

function simulateDownload() {
    downloadButton.disabled = true;
    downloadButton.textContent = 'Preparing Download...';

    setTimeout(() => {
        const containerToCapture = document.getElementById('canvasWrapper');

        html2canvas(containerToCapture, {
            useCORS: true, 
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'spinning_image.png';
            link.href = canvas.toDataURL();
            link.click();

            downloadButton.textContent = 'Download Complete!';
            setTimeout(() => {
                downloadButton.textContent = 'Download Animation';
                downloadButton.disabled = false;
            }, 3000);
        }).catch(error => {
            console.error('Error capturing the canvas:', error);
            downloadButton.textContent = 'Download Failed';
            setTimeout(() => {
                downloadButton.textContent = 'Download Animation';
                downloadButton.disabled = false;
            }, 3000);
        });
    }, 2000);
}
