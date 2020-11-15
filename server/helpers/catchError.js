// eslint-disable-next-line consistent-return
const wrap = handler => async function(req, res, next) {
  try {
    await handler(req, res, next);
  } catch (error) {
    return next(error);
  }
};

// Waiting for @decorators in stable
const wrapController = controller => {
  const result = {};

  Object.keys(controller).forEach(handlerKey => {
    result[handlerKey] = wrap(controller[handlerKey]);
  });

  return result;
};

module.exports = {
  wrap,
  wrapController,
};
