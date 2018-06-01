export default (schemaFactory) => {
  return (req, res, next) => {
    const schema = schemaFactory(req);
    const paramsBackup = {...req.params};
    req.params = {...req.body, ...req.query, ...req.params};
    console.log('req.params', req.params)
    req.checkParams(schema);
    req.asyncValidationErrors(true)
      .then(() => {
        req.params = paramsBackup;
        return next();
      })
      .catch((err) => {
        delete err.isOperational;
        const errOptions = {
          errors: err,
        };
        return res.responses.validationError("Validation error", errOptions);
      });
  };
};
