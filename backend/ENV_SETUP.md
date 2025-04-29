# Backend Environment Variables Setup

## Local Development

Create a file named `.env` in the backend directory with the following content:

```
PORT=5000
MONGODB_URI=mongodb+srv://yemularushikesh27:abNxtu37vAlNyMn2@cluster0.vkqhfgb.mongodb.net/pay4skill?retryWrites=true&w=majority
JWT_SECRET=pay4skill_secret_jwt_token
NODE_ENV=development
```

## Production Deployment

When deploying to Render, add the following environment variables:

```
PORT=5000
MONGODB_URI=mongodb+srv://yemularushikesh27:abNxtu37vAlNyMn2@cluster0.vkqhfgb.mongodb.net/pay4skill?retryWrites=true&w=majority
JWT_SECRET=pay4skill_secret_jwt_token
NODE_ENV=production
```

## Note

For security in a production environment, you should consider:
1. Using a different JWT_SECRET for production
2. Setting up a separate MongoDB Atlas database for production
3. Ensuring all environment variables are properly configured in the Render dashboard 