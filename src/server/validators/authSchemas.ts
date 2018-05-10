function signUpSchema(req) {
  return {
    email: {
      isCustomEmail: { errorMessage: "Неверный формат электронной почты." },
      isUserExistsByEmail: {
        errorMessage: "Пользователь с таким адресом электронной почты уже зарегистрирован в системе.",
      },
      notEmpty: { errorMessage: "Поле должно быть заполнено." },
    },
    account: {
      isUserExistsByAccount: {
          errorMessage: "Пользователь с таким кошельком уже зарегистрирован в системе.",
      },
      notEmpty: { errorMessage: "Поле должно быть заполнено." },
    },
    sign: {
      notEmpty: { errorMessage: "Поле должно быть заполнено." },
    }
  };
}

function signInSchema(req) {
  return {
    email: {
      notEmpty: { errorMessage: "Поле должно быть заполнено." },
    },
    password: {
      notEmpty: {errorMessage: "Поле должно быть заполнено."},
    },
  };
}

function confirmEmailSchema(req) {
  return {
    confirmationToken: {
      notEmpty: { errorMessage: "Токен должен присутствовать в теле запроса." },
    },
  };
}

function passwordRecoverSchema(req) {
  return {
    email: {
      notEmpty: { errorMessage: "Поле должно быть заполнено." },
      isUserNotExistsByEmail: {
        errorMessage: "Введен несуществующий e-mail",
      },
    },
  };
}

function passwordSetSchema(req) {
  return {
    password: {
      isLength: {
        options: [{ min: 6 }],
        errorMessage: "Минимальная длина пароля 6 символов.",
      },
      isPassword: {
        errorMessage:
          "Пароль должен содержать не менее 6 символов, хотя бы одну цифру, одну прописную и одну строчную буквы.",
      },
      notEmpty: { errorMessage: "Поле должно быть заполнено." },
    },
    passwordRecoverToken: {
      notEmpty: { errorMessage: "Токен должен присутствовать в теле запроса." },
    },
  };
}

export {
  signUpSchema,
  signInSchema,
  confirmEmailSchema,
  passwordRecoverSchema,
  passwordSetSchema,
};
