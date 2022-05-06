import { useEffect, useState } from 'react';

export default function useH5PPreviewResizer(currikiH5PWrapper) {
  const [adjustedWidth, setAdjustedWidth] = useState(0);

  useEffect(() => {
    function calculateWidth() {
      if (currikiH5PWrapper && currikiH5PWrapper.current) {
        const aspectRatio = 1.778; // standard aspect ratio of video width and height
        const currentHeight = currikiH5PWrapper.current.offsetHeight - 65; // current height with some margin
        const adjustedWidthVal = currentHeight * aspectRatio;
        const parentWidth = currikiH5PWrapper.current.parentElement.offsetWidth;
        if (adjustedWidthVal < parentWidth) {
          currikiH5PWrapper.current.style.width = `${adjustedWidthVal}px`; // eslint-disable-line no-param-reassign
        }
        setAdjustedWidth(adjustedWidthVal);
      }
    }
    window.addEventListener('resize', calculateWidth);

    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  });

  return adjustedWidth;
}
