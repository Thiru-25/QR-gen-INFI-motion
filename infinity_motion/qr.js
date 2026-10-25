
document.addEventListener('DOMContentLoaded', () => {
  const qrText = document.getElementById('qr-text');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  const qrcodeDiv = document.getElementById('qrcode');
  let qrcodeInstance = null;

  function generateQRCode(text) {
   
    qrcodeDiv.innerHTML = '';

    qrcodeInstance = new QRCode(qrcodeDiv, {
      text: text,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });


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

 
  downloadBtn.addEventListener('click', () => {
  
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
     
      link.href = img.src;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    
    alert('No QR code available to download.');
  });

  
  qrText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      generateBtn.click();
    }
  });
});
