const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('url');
    const url = urlInput.value;
    const size = document.getElementById('size').value;

    console.log(url, size);

    if (url === "") {
        // Change border to red
        urlInput.style.border = '2px solid red';
        // Change placeholder color to red
        urlInput.placeholder = 'Please enter a URL';
        urlInput.style.setProperty('color', 'red', 'important'); // Ensure placeholder color is set to red

        // Optional: Scroll to the input field for better user experience
        urlInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // Reset the border and placeholder styles if input is valid
        urlInput.style.border = '';
        urlInput.style.color = ''; // Reset the color to default
        clearUI(); // Reset
        showspinner();
        setTimeout(() => {
            hidespinner();
            generateQRCode(url, size);
            setTimeout(() => {
                const saveurl = qr.querySelector('img').src; //src; //src;
                createSaveButton(saveurl) //
            }, 100);
        }, 1500);
    }
}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

const clearUI = () => {
    qr.innerHTML = '';
    const savebtn = document.getElementById('savelink');
    if (savebtn) {
        savebtn.remove();
    }
}

const showspinner = () => {
    document.getElementById('spinner').style.display = 'block';
}
const hidespinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

const createSaveButton = (saveURL) => {
    const link = document.createElement('a');
    link.id = "savelink";
    link.classList = "download-btn";
    link.href = saveURL;
    link.download = "qrcode.png";
    link.innerHTML = "Save Image";
    document.getElementById("generated").appendChild(link)
}

hidespinner();

form.addEventListener('submit', onGenerateSubmit);
