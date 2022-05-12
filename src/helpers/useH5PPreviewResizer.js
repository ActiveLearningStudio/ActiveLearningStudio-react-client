import { useEffect, useState } from 'react';

export default function useH5PPreviewResizer(currikiH5PWrapper) {
  const [adjustedWidth, setAdjustedWidth] = useState(0);

  useEffect(() => {
    function calculateWidth() {
      var H5P; // eslint-disable-line no-var
      const h5pLibData = window.H5PIntegration ? Object.values(window.H5PIntegration.contents) : null;
      const h5pLib = Array.isArray(h5pLibData) && h5pLibData.length > 0 ? h5pLibData[0].library.split(' ')[0] : null;
      const resizeFor = ['H5P.InteractiveVideo', 'H5P.CurrikiInteractiveVideo', 'H5P.BrightcoveInteractiveVideo'];
      const isActvityResizeable = resizeFor.find((lib) => lib === h5pLib) ? true : false; // eslint-disable-line no-unneeded-ternary

      if (isActvityResizeable && currikiH5PWrapper && currikiH5PWrapper.current && H5P !== undefined) { // eslint-disable-line no-undef
        const aspectRatio = 1.778; // standard aspect ratio of video width and height

        // if activity is iframe based
        if (H5P.jQuery('#curriki-h5p-wrapper .h5p-iframe').length) { // eslint-disable-line no-undef
          const h5pHeight = H5P.jQuery('#curriki-h5p-wrapper .h5p-iframe').height(); // eslint-disable-line no-undef
          let h5pVideoWrapperEl = H5P.jQuery('.h5p-video-wrapper', H5P.jQuery('#curriki-h5p-wrapper .h5p-iframe').contents()); // eslint-disable-line no-undef

          let h5pVideoContentHeightDiff = 0;
          h5pVideoWrapperEl = h5pVideoWrapperEl.length ? h5pVideoWrapperEl[0] : null;
          if (h5pVideoWrapperEl) {
            const h5pVideoHeight = H5P.jQuery(h5pVideoWrapperEl).children().first().height(); // eslint-disable-line no-undef
            h5pVideoContentHeightDiff = h5pHeight - h5pVideoHeight;
          }

          const currentHeight = currikiH5PWrapper.current.offsetHeight - h5pVideoContentHeightDiff; // current height with some margin
          const adjustedWidthVal = currentHeight * aspectRatio;
          const parentWidth = currikiH5PWrapper.current.parentElement.offsetWidth;

          if (adjustedWidthVal < parentWidth) {
            currikiH5PWrapper.current.style.width = `${adjustedWidthVal}px`; // eslint-disable-line no-param-reassign
          } else {
            currikiH5PWrapper.current.style.width = `${parentWidth - 10}px`; // eslint-disable-line no-param-reassign
          }
          H5P.jQuery('#curriki-h5p-wrapper .h5p-iframe')[0].contentWindow.H5P.instances[0].trigger('resize'); // eslint-disable-line no-undef
          setAdjustedWidth(adjustedWidthVal);
        } else {
          // if activity is div based
          const currentHeight = currikiH5PWrapper.current.offsetHeight - 65; // current height with some margin
          const adjustedWidthVal = currentHeight * aspectRatio;
          const parentWidth = currikiH5PWrapper.current.parentElement.offsetWidth;
          if (adjustedWidthVal < parentWidth) {
            currikiH5PWrapper.current.style.width = `${adjustedWidthVal}px`; // eslint-disable-line no-param-reassign
          } else {
            currikiH5PWrapper.current.style.width = `${parentWidth - 10}px`; // eslint-disable-line no-param-reassign
          }
          H5P.instances[0].trigger('resize'); // eslint-disable-line no-undef
          setAdjustedWidth(adjustedWidthVal);
        }
      }
    }

    window.addEventListener('resize', calculateWidth);

    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  });

  return adjustedWidth;
}
