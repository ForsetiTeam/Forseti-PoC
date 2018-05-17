function signUpSchema(req) {
  return {
    email: {
      isCustomEmail: { errorMessage: "Invalid email." },
      isUserExistsByEmail: {
        errorMessage: "Email is used.",
      },
      notEmpty: { errorMessage: "Field is required." },
    },
    account: {
      isUserExistsByAccount: {
          errorMessage: "Account is used.",
      },
      notEmpty: { errorMessage: "Field is required." },
    },
    sign: {
      notEmpty: { errorMessage: "Field is required." },
    }
  };
}

function signInSchema(req) {
  return {
    account: {
      notEmpty: { errorMessage: "Field is required." },
    },
  };
}


export {
  signUpSchema,
  signInSchema
};
