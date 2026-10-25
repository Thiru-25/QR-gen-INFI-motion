// qr.js
document.addEventListener('DOMContentLoaded', () => {
  const qrText = document.getElementById('qr-text');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  const qrcodeDiv = document.getElementById('qrcode');
  let qrcodeInstance = null;

  function generateQRCode(text) {
    // clear previous
    qrcodeDiv.innerHTML = '';

    // create QR
    qrcodeInstance = new QRCode(qrcodeDiv, {
      text: text,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });

    // show download button
    downloadBtn.style.display = 'block';
  }

  generateBtn.addEventListener('click', () => {
    const text = qrText.value.trim();
    if (!text) {
      alert('Please enter some text or URL');
      return;
    }
    generateQRCode(text);
  });

  // download handler
  downloadBtn.addEventListener('click', () => {
    // The library renders either <img> (older browsers) or <canvas>.
    // Try canvas first, then fallback to img.
    const canvas = qrcodeDiv.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const img = qrcodeDiv.querySelector('img');
    if (img) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      // img.src is already a data URL with PNG
      link.href = img.src;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // nothing to download
    alert('No QR code available to download.');
  });

  // generate on Enter
  qrText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      generateBtn.click();
    }
  });
});
