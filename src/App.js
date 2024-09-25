import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [input, setInput] = useState('https://qr.cs-csc.online/');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgImage, setBgImage] = useState(null);
  const [qrColor, setQrColor] = useState('#000000');
  const [caption, setCaption] = useState('');
  const [captionColor, setCaptionColor] = useState('#000000');

  const handleDownload = () => {
    const qrCodeElement = document.getElementById('qr-code');
    html2canvas(qrCodeElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qr-code.png';
      link.click();
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBgImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <InputForm 
        input={input} 
        setInput={setInput} 
        bgColor={bgColor} 
        setBgColor={setBgColor} 
        bgImage={bgImage}
        handleImageUpload={handleImageUpload} 
        qrColor={qrColor} 
        setQrColor={setQrColor} 
        caption={caption} 
        setCaption={setCaption} 
        captionColor={captionColor} 
        setCaptionColor={setCaptionColor} 
      />
      <QRCodeDisplay 
        input={input} 
        bgColor={bgColor} 
        bgImage={bgImage}
        qrColor={qrColor} 
        caption={caption} 
        captionColor={captionColor} 
      />
      <div>
        <DownloadButton onDownload={handleDownload} />
      </div>
    </div>
  );
}

const InputForm = ({ input, setInput, bgColor, setBgColor, qrColor, setQrColor, caption, setCaption, captionColor, setCaptionColor }) => (
  <div>
    {/* Text Input */}
    <div className="color-section">
      <div className="tooltip">
        <label htmlFor="text-input">Enter Text or Link for QR Code:</label>
        <input type="text" id="text-input" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text" />
        <span className="tooltiptext">Input the text you want to encode in the QR code.</span>
      </div>
    </div>

    {/* Background Color and QR Code Color on the Same Line */}
    <div className="color-section">
      <label>Background Color and QR Code Color:</label>
      <div className="color-picker-container">
        <div className="tooltip">
          <div className="color-picker" style={{ backgroundColor: bgColor }} onClick={() => document.getElementById('bg-color-input').click()} />
          <input type="color" id="bg-color-input" className="color-input" value={bgColor} onChange={e => setBgColor(e.target.value)} />
          <span className="tooltiptext">Select the background color for the QR code.</span>
        </div>
        <div className="tooltip">
          <div className="color-picker" style={{ backgroundColor: qrColor }} onClick={() => document.getElementById('qr-color-input').click()} />
          <input type="color" id="qr-color-input" className="color-input" value={qrColor} onChange={e => setQrColor(e.target.value)} />
          <span className="tooltiptext">Select the color of the QR code itself.</span>
        </div>
      </div>
    </div>

    {/* Caption and Caption Color on the Same Line */}
    <div className="caption-section">
      <label htmlFor="caption-input">Caption and Caption Color:</label>
      <div className="caption-picker-container">
        <input type="text" id="caption-input" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Add a caption" />
        <div className="tooltip">
          <div className="color-picker" style={{ backgroundColor: captionColor }} onClick={() => document.getElementById('caption-color-input').click()} />
          <input type="color" id="caption-color-input" className="color-input" value={captionColor} onChange={e => setCaptionColor(e.target.value)} />
          <span className="tooltiptext">Select the color of the caption text.</span>
        </div>
      </div>
    </div>

    {/* QR Code Display Info */}
    <div>
      <p>Preview of the QR Code:</p>
    </div>
  </div>
);


const QRCodeDisplay = ({ input, bgColor, bgImage, qrColor, caption, captionColor }) => (
  <div 
    id="qr-code" 
    style={{ 
      backgroundColor: bgImage ? 'transparent' : bgColor, 
      backgroundImage: bgImage ? `url(${bgImage})` : 'none',
      backgroundSize: 'cover',
      padding: '20px',
      display: 'inline-block'
    }}
  >
    <QRCodeCanvas value={input} fgColor={qrColor} />
    {caption && <p style={{ color: captionColor }}>{caption}</p>}
  </div>
);

const DownloadButton = ({ onDownload }) => (
  <button onClick={onDownload}>Download QR Code</button>
);

export default App;
