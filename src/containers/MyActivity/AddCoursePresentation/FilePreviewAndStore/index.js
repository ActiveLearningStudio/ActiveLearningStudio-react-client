/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Alert } from "react-bootstrap";
import './style.scss';

const FilePreviewAndStore = ({ file, setEnableDescribeBtn, setLoading }) => {
  const [filename, setFilename] = useState(null);
  const [previewImageSource, setPreviewImageSource] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setFilename(null);
    setError(null);
    setPreviewImageSource(null);

    if (file === null) return;

    if (file.size > 5 * 1024 * 1024) return setError('The presentation file you\'re trying to upload exceeds the 5mb limit.');

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('coursePresentationFromFile', reader.result);

      const PDFJS = window.pdfjsLib;
      var _PDF_DOC = PDFJS.getDocument({ data: atob(reader.result.split(',')[1]) });
      _PDF_DOC.promise.then((pdf) => {
        pdf.getPage(1).then((page) => {
          var scale = 1;
          var viewport = page.getViewport({scale: scale});
          var ar = viewport.width / viewport.height;
          var canvas = document.createElement('canvas');
          canvas.height = viewport.height;
          canvas.width = (ar === 2) ? viewport.width : Math.floor((2 * viewport.width) / ar);
          var blackBarWidth = (canvas.width - viewport.width) / 2;
          var ctx = canvas.getContext('2d');
          var render_context = {
            canvasContext: ctx,
            viewport: viewport,
            background: 'black',
          };
          var renderTask = page.render(render_context);
          renderTask.promise.then(() => {
            // adding black bars
            ctx.drawImage(ctx.canvas, 0, 0, canvas.width-blackBarWidth, canvas.height, blackBarWidth, 0, canvas.width-blackBarWidth, canvas.height);
            ctx.beginPath();
            ctx.rect(0, 0, blackBarWidth, canvas.height);
            ctx.fillStyle = "black";
            ctx.fill();
            setPreviewImageSource(canvas.toDataURL('image/png'));
            setEnableDescribeBtn(true);
            setLoading(false);
          });
        });
      });
    };

    reader.readAsDataURL(file);
    setLoading(true);
    setFilename(file.name);
  }, [file]);

  return (
    <div>
      {error && <Alert variant={'warning'}>{error}</Alert> }
      {previewImageSource !== null && (
        <div>
          <p>Preview:</p>
          <img className="preview-image" src={previewImageSource} />
          <p>{filename}</p>
        </div>
      )}
    </div>
  );
};

export default FilePreviewAndStore;