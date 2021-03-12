/* eslint-disable import/prefer-default-export */
import html2canvas from 'html2canvas';
import service from 'services/safelearn.service';

// Generates a screenshot based on the statement data
export const saveResultScreenshotAction = (statement, title, studentName) => async (dispatch) => {
  if (
    statement?.result?.response
    && statement?.verb?.display['en-US'] === 'interacted'
    && statement?.context?.contextActivities?.category[0]?.id === 'http://h5p.org/libraries/H5P.OpenEndedQuestion-1.0'
  ) {
    const safeData = await service.safeApiAuth();
    const customhtml = document.createElement('div');
    customhtml.innerHTML = `
      <div id="specfic-detail-safe-learn" class="customhtml" style="padding:20px;margin:0 auto;max-width:1280px;">
        <h3>${statement?.object?.definition?.description?.['en-US']}</h3>
        <hr />
        <h4>${statement?.result?.response}</h4>
      </div>`;
    document.body.append(customhtml);
    html2canvas(customhtml, { scrollY: -window.scrollY })
      .then((canvas) => {
        document.getElementById('specfic-detail-safe-learn')?.remove();
        const base64image = canvas.toDataURL('image/png');
        if (safeData.data) {
          const timeSafe = new Date();
          service.safeApiCheck(safeData.data.token, base64image, statement?.result?.response, timeSafe.getTime(), studentName, title);
        }
      }).catch((err) => console.log(err));
  }
  dispatch({ type: 'SAFELEARN_ACTION' });
};
