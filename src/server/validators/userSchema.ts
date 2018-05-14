function setEthAddressSchema(req) {
  return {
    ethAddress: {
      notEmpty: {errorMessage: "Поле должно быть заполнено"},
    },
  };
}

function changeEmailSchema(req) {
  return {
    email: {
      isCustomEmail: { errorMessage: "Неверный формат электронной почты." },
      notEmpty: { errorMessage: "Поле должно быть заполнено." },
      isUserExistsByEmailUpdate: {
        errorMessage: "Пользователь с таким адресом электронной почты уже зарегистрирован в системе.",
        options: [ req.user.email ],
      },
    },
  };
}

function changePasswordSchema(req) {
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
    },
  };
}

function confirmEmailChangeSchema(req) {
  return {
    emailChangeToken: {
      notEmpty: { errorMessage: "Токен должен присутствовать в теле запроса." },
    },
  };
}

function confirmPasswordChangeSchema(req) {
  return {
    passwordChangeToken: {
      notEmpty: { errorMessage: "Токен должен присутствовать в теле запроса." },
    },
  };
}

export {
  setEthAddressSchema,
  changeEmailSchema,
  changePasswordSchema,
  confirmEmailChangeSchema,
  confirmPasswordChangeSchema,
};
