# 💰 Expense Tracker

A full-stack web application for tracking personal income and expenses with a modern, responsive interface and comprehensive financial analytics.

## ✨ Features

- **User Authentication** - Secure login/signup with JWT tokens
- **Income Management** - Track multiple income sources with categories
- **Expense Tracking** - Monitor spending across different categories
- **Financial Dashboard** - Visual overview of financial health
- **Data Export** - Download financial data as Excel files
- **Profile Management** - Upload and manage profile pictures
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Live financial data and statistics

## 🏗️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Multer** - File upload handling
- **XLSX** - Excel file generation

### Frontend

- **React.js** - User interface library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart components for data visualization
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Notification system

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Create .env file
   cp .env.example .env
   # Edit .env with your configuration

   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/expense-tracker
   npm install
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=30d
CLIENT_URL=http://localhost:5173
```

## 📁 Project Structure

```
expense-tracker/
├── backend/                 # Backend server
│   ├── config/             # Database configuration
│   ├── controller/         # Business logic controllers
│   ├── middleware/         # Authentication & upload middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── uploads/            # File storage
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   └── expense-tracker/
│       ├── src/
│       │   ├── components/ # Reusable UI components
│       │   ├── context/    # React context providers
│       │   ├── hooks/      # Custom React hooks
│       │   ├── pages/      # Page components
│       │   └── Utils/      # Utility functions
│       └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/getuser` - Get user info
- `POST /api/v1/auth/upload-image` - Upload profile picture

### Dashboard

- `GET /api/v1/dashboard` - Get financial overview

### Income

- `POST /api/v1/income/add` - Add income entry
- `GET /api/v1/income/get` - Get all income
- `DELETE /api/v1/income/delete/:id` - Delete income
- `GET /api/v1/income/downloadexcel` - Export income data

### Expenses

- `POST /api/v1/expense/add` - Add expense entry
- `GET /api/v1/expense/get` - Get all expenses
- `DELETE /api/v1/expense/delete/:id` - Delete expense
- `GET /api/v1/expense/downloadexcel` - Export expense data

## 🎨 Key Components

### Backend Components

- **User Model** - Secure password hashing with bcrypt
- **Authentication Middleware** - JWT token validation
- **File Upload** - Image upload with validation
- **Data Export** - Excel file generation for financial reports

### Frontend Components

- **Dashboard Layout** - Responsive navigation and sidebar
- **Financial Charts** - Visual representation of income/expenses
- **Form Components** - Reusable input fields with validation
- **Modal System** - Confirmation dialogs and forms

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for user passwords
- **Protected Routes** - Middleware protection for sensitive endpoints
- **Input Validation** - Server-side validation for all inputs
- **File Type Validation** - Secure file upload restrictions

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers (1080px and above)
- Tablets (768px - 1079px)
- Mobile devices (below 768px)

## 🚀 Deployment

### Backend Deployment

1. Set up environment variables on your hosting platform
2. Ensure MongoDB connection is accessible
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment

1. Build the production version: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Charts from [Recharts](https://recharts.org/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you encounter any issues or have questions:

- Create an issue in the GitHub repository
- Check the existing issues for solutions
- Review the code comments for implementation details

---

**Happy Expense Tracking! 💸**
