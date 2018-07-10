const validate = (value, validators) => {
  for (const validator in validators) {
    if (!validators.hasOwnProperty(validator)) continue;

    const validatorValue = validators[validator];

    switch (validator) {
      case 'required':
        if (validatorValue && (!value || !value.length)) {
          return { isValid: false, error: 'Field is required' };
        }
        break;
      case 'minLength':
        if (value.length < validatorValue) {
          return { isValid: false, error: `Min ${validatorValue} characters` };
        }
        break;
      case 'maxLength':
        if (value.length > validatorValue) {
          return { isValid: false, error: `Max ${validatorValue} characters` };
        }
        break;
      case 'equalsTo':
        if (value !== validatorValue) {
          return { isValid: false, error: 'Values not equal' };
        }
        break;
      case 'number':
        if (isNaN(+value)) {
          return { isValid: false, error: 'Not a number' };
        }
        break;
      case 'integer':
        if (+value !== parseInt(value, 10)) {
          return { isValid: false, error: 'Not an integer' };
        }
        break;
      case 'minValue':
        if (+value < validatorValue) {
          return { isValid: false, error: `Min value is ${validatorValue}` };
        }
        break;
      case 'maxValue':
        if (+value > validatorValue) {
          return { isValid: false, error: `Max value is ${validatorValue}` };
        }
        break;
      case 'email':
        if (validatorValue && !value.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)) {
          return { isValid: false, error: 'Invalid email' };
        }
        break;
      case 'password':
        /* eslint-disable max-len */
        if (validatorValue && !value.match(/(?=.*[0-9])(?=.*[а-яёa-z])(?=.*[A-ZА-ЯЁ])[0-9a-zA-Z.,';\][{}:"<>?!@#$%^&*()_\-+=|/№А-Яа-яЁё]{6,}/)) {
          return { isValid: false, error: 'Invalid password characters' };
        }
        /* eslint-enable max-len */
        break;
      case 'list':
        break;
      default:
        break;
    }
  }

  return { isValid: true, error: '' };
};

export default validate;
