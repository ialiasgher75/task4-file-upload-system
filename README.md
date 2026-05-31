# Task 4 - File Upload System

A file upload system built with Node.js, Express, MongoDB and Cloudinary for storing images in the cloud.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (Cloud Storage)
- Multer (File Handling)
- JWT Authentication

## Features
- User Registration & Login
- JWT Protected Upload Route
- Upload images to Cloudinary
- Save image URL in MongoDB
- File size restriction (Max 2MB)
- Only images allowed

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/register | Register user | No |
| POST | /auth/login | Login user | No |
| POST | /upload | Upload image | Yes |
| GET | /upload | Get all uploads | Yes |

## Setup

1. Clone the repository
   git clone https://github.com/your-username/task4-file-upload-system.git

2. Install dependencies
   npm install

3. Create .env file
   PORT=5003
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

4. Run the server
   npm run dev

## Testing

### Upload Image (Postman)
POST /upload
Authorization: Bearer your_token
Body → form-data:
  Key: image (type: File)
  Value: select any image (max 2MB)
