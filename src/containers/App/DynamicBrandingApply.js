/* eslint-disable */
export const DynamicBrandingApply = (data) => {
  document.querySelector(':root').style.setProperty('--main-primary-color', data?.branding['primary_color']);
  document.querySelector(':root').style.setProperty('--main-secondary-color', data?.branding['secondary_color']);
  document.querySelector(':root').style.setProperty('--main-paragraph-text-color', data?.branding['tertiary_color']);
  document.querySelector(':root').style.setProperty('--main-heading-font', data?.branding['primary_font_family']);
  document.querySelector(':root').style.setProperty('--main-text-font', data?.branding['secondary_font_family']);
};

export const getGlobalColor = (colorType) => {
  let element = document.querySelector(':root'),
    style = window.getComputedStyle(element),
    color = style.getPropertyValue(colorType);

  return color;
};
