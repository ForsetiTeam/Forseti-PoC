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
    account: {
      notEmpty: { errorMessage: "Поле должно быть заполнено." },
    },
  };
}


export {
  signUpSchema,
  signInSchema
};
