# Environment Variables Setup

## Local Development

Create a file named `.env` in the frontend directory with the following content:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Production Deployment

When deploying to Vercel, add the following environment variable in the Vercel dashboard:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url.onrender.com` with your actual Render backend URL once deployed.

## Note

The frontend application is configured to use these environment variables through the `frontend/src/utils/api.js` file. If no environment variable is found, it will default to `http://localhost:5000/api`. 