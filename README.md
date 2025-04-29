# Pay4Skills

Pay4Skills is a dynamic freelance marketplace designed specifically for college students to showcase their talents and get hired by employers or organizations through skill-based tasks.

## Project Overview

The platform focuses on smooth user experiences, real-time collaboration, transparent payment processes, and strong admin moderation with a clean, creative, and modern UI/UX.

### Website Objectives

- Enable students to earn by completing skill-based tasks
- Provide businesses access to capable student freelancers
- Support real-time collaboration via in-built chat
- Ensure transparent task closures through payment confirmation workflows
- Allow the admin to monitor, manage, and maintain platform integrity

## Main Features by User Role

### 1. Students 👩‍🎓
- Profile Management: Upload Resume, Skills, Bio, and Profile Picture
- Browse & Filter Available Tasks (by category, budget, deadline)
- Apply for Tasks
- Track Application Status: Applied → In Progress → Completed
- Confirm Payment (after viewing uploaded payment screenshots)
- Real-Time Chat with Employers (post-acceptance)
- View Earnings, Performance Stats, Badges, and Ratings

### 2. Employers 🧑‍💼
- Create & Manage Company Profile
- Post New Tasks (Title, Description, Skills Required, Budget, Deadline)
- View & Manage Applications: Accept, Reject, or Keep On Hold
- Upload Payment Screenshot on Task Completion
- Real-Time Chat with Students
- Access Hiring and Task Analytics

### 3. Admin 🛡
- View and Manage Users (Students and Employers)
- Remove or Block Users and Tasks
- Handle Payment Disputes and Reports
- Send Notices/Announcements to Users
- Platform-Wide Analytics and Monthly Reports

## Tech Stack

### Frontend
- React
- Material UI
- Socket.io (client)
- Chart.js
- Formik & Yup

### Backend
- Node.js with Express
- MongoDB (Atlas)
- JWT Authentication
- Socket.io (server)
- Multer for file uploads

## Database Collections
- Users (Students, Employers, Admin)
- Tasks
- Applications
- Chats
- Reports
- Payments
- Badges
- Notifications

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Rushikesh0927/pay4skills.git
   cd pay4skills
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

5. Start the backend server
   ```
   cd ../backend
   npm run dev
   ```

6. Start the frontend development server
   ```
   cd ../frontend
   npm start
   ```

## Deployment

- Frontend: Vercel
- Backend: Render

## Team

- Sai Siddeshwar (23H51A0430)
- Sowmya (22H51A0490)
- Pranay (23H51A0491)
- Srikar (23H51A04B5)
- Asvitha (23H51A04E3)
- Sai Venkat (23H51A04F1)

## License

This project is licensed under the MIT License.

## Acknowledgements

- CMRCET - ECE 2027 Batch 