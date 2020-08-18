// eslint-disable-next-line import/prefer-default-export
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
