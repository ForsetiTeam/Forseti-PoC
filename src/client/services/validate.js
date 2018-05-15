const validate = (value, validators) => {
  for (const validator in validators) {
    if (!validator.hasOwnProperty(validator)) continue;

    const validatorValue = validators[validator];

    switch (validator) {
      case 'required':
        if (validatorValue && (!value || !value.length)) {
          return { isValid: false, error: 'Поле обязательно для заполнения' };
        }
        break;
      case 'maxLength':
        if (value.length > validatorValue) {
          return { isValid: false, error: `Не более ${validatorValue} символов` };
        }
        break;
      case 'minLength':
        if (value.length < validatorValue) {
          return { isValid: false, error: `Не менее ${validatorValue} символов` };
        }
        break;
      case 'equalsTo':
        if (value !== validatorValue) {
          return { isValid: false, error: 'Значения не совпадают' };
        }
        break;
      case 'email':
        if (validatorValue && !value.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)) {
          return { isValid: false, error: 'Email невалиден' };
        }
        break;
      case 'password':
        /* eslint-disable max-len */
        if (validatorValue && !value.match(/(?=.*[0-9])(?=.*[а-яёa-z])(?=.*[A-ZА-ЯЁ])[0-9a-zA-Z.,';\][{}:"<>?!@#$%^&*()_\-+=|/№А-Яа-яЁё]{6,}/)) {
          return { isValid: false, error: 'Пароль должен содержать цифры и буквы в верхнем и нижнем регистре' };
        }
        /* eslint-enable max-len */
        break;
      default:
        break;
    }
  }

  return { isValid: true, error: '' };
};

export default validate;
