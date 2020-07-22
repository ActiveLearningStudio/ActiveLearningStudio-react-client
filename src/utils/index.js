export function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }

  return '';
}

export function getErrors(e) {
  if (e.errors) {
    if (!Array.isArray(e.errors) && typeof e.errors === 'object') {
      let errors = [];
      Object.keys(e.errors).forEach((key) => {
        if (Array.isArray(e.errors[key])) {
          errors = errors.concat(e.errors[key]);
        }
      });

      return { errors };
    }
  }

  return e;
}
