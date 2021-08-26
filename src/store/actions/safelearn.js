/* eslint-disable import/prefer-default-export */
import html2canvas from 'html2canvas';
import service from 'services/safelearn.service';

// Generates a screenshot based on the statement data
export const saveResultScreenshotAction = (org, statement, title, studentName) => async (dispatch) => {
  const parsedStatement = JSON.parse(statement);

  if (
    parsedStatement?.result?.response
    && parsedStatement?.verb?.display['en-US'] === 'interacted'
    && parsedStatement?.context?.contextActivities?.category[0]?.id === 'http://h5p.org/libraries/H5P.OpenEndedQuestion-1.0'
    && org.account_id
    && org.api_key
    && org.unit_path
    && org.name
  ) {
    const safeData = await service.safeApiAuth(org.account_id, org.api_key);
    const customhtml = document.createElement('div');
    customhtml.setAttribute('id', 'specfic-detail-safe-learn');
    customhtml.innerHTML = `
      <div>
        <h3>${parsedStatement?.object?.definition?.description?.['en-US']}</h3>
        <hr />
        <h4>${parsedStatement?.result?.response}</h4>
      </div>`;
    document.body.prepend(customhtml);
    html2canvas(customhtml, { scrollY: -window.scrollY })
      .then((canvas) => {
        document.getElementById('specfic-detail-safe-learn')?.remove();
        const base64image = canvas.toDataURL('image/png');
        if (safeData.data) {
          const timeSafe = new Date();
          service.safeApiCheck(
            safeData.data.token,
            org.account_id,
            org.unit_path,
            org.name,
            base64image,
            parsedStatement?.result?.response,
            timeSafe.getTime(),
            studentName,
            title,
          );
        }
      }).catch((err) => console.log(err));
  }
  dispatch({ type: 'SAFELEARN_ACTION' });
};
