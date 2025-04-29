const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: 'mongodb+srv://yemularushikesh27:abNxtu37vAlNyMn2@cluster0.vkqhfgb.mongodb.net/pay4skill?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'pay4skill_secret_jwt_token',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

module.exports = config; 