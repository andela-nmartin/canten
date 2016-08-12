var envVariables =  {
  'port': process.env.PORT,
  'secretKey': process.env.SECRET_KEY
};

module.exports = {
  development: envVariables,
  staging: envVariables,
  production: envVariables,
  test: envVariables
};
