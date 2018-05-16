function setEthAddressSchema(req) {
  return {
    ethAddress: {
      notEmpty: {errorMessage: "Field is required"},
    },
  };
}

function changeEmailSchema(req) {
  return {
    email: {
      isCustomEmail: { errorMessage: "Invalid email." },
      notEmpty: { errorMessage: "Field is required." },
      isUserExistsByEmailUpdate: {
        errorMessage: "Email is used.",
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
        errorMessage: "Min 6 characters.",
      },
      isPassword: {
        errorMessage:
          "The password must contain at least 6 characters, at least one number, one uppercase letter and one lowercase letter.",
      },
    },
  };
}

function confirmEmailChangeSchema(req) {
  return {
    emailChangeToken: {
      notEmpty: { errorMessage: "Token not found." },
    },
  };
}

function confirmPasswordChangeSchema(req) {
  return {
    passwordChangeToken: {
      notEmpty: { errorMessage: "Token not found." },
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
