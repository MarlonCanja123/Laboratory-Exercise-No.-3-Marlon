# Machine Learning Hub

A comprehensive web application for learning and sharing machine learning knowledge. Built with Next.js and React.

## 🚀 Features

### User Features
- **User Authentication**: Secure login system with role-based access
- **Profile Management**: User profiles with statistics and customization
- **Article System**: Create, read, and share ML articles
- **Comments & Replies**: Interactive discussion system with threading
- **Top Articles**: Trending content discovery with time-based filtering
- **Notifications**: Real-time updates for user interactions
- **Social Sharing**: Share articles across multiple platforms

### Admin Features
- **Admin Dashboard**: Comprehensive system overview with statistics
- **User Management**: Manage user accounts, roles, and permissions
- **Article Management**: Content moderation and approval system
- **Comment Moderation**: Review and manage user comments
- **Bulk Notifications**: Send announcements to all users
- **System Settings**: Configure platform preferences and limits

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Inline CSS (custom styling)
- **Authentication**: Mock authentication system
- **Storage**: LocalStorage for demo purposes
- **Deployment**: Static site generation

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd laboratory-exercise-no-3-marlon
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3002](http://localhost:3002) in your browser.

## 🔐 Default Credentials

### User Accounts
- **Username**: `user` | **Password**: `user123`
- **Username**: `john` | **Password**: `john123`
- **Username**: `sarah` | **Password**: `sarah123`

### Admin Account
- **Username**: `admin` | **Password**: `admin123`

## 🚀 Deployment

### Method 1: Static Export (Recommended for Demo)

1. Build the application:
```bash
npm run build
```

2. Export static files:
```bash
npm run export
```

3. Deploy the `out` folder to any static hosting service.

### Method 2: Node.js Server

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

3. The app will be available on port 3000.

### Method 3: Vercel (One-Click Deploy)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy

### Method 4: Netlify

1. Build the application:
```bash
npm run build
```

2. Drag and drop the `.next` folder to Netlify

## 📁 Project Structure

```
pages/
├── index.js                 # Home page
├── login.js                 # Authentication page
└── pages/
    ├── dashboard.js         # User dashboard
    ├── articles.js          # Articles listing
    ├── article/[id].js      # Individual article
    ├── top-articles.js      # Trending articles
    ├── profile.js           # User profile
    ├── notifications.js     # User notifications
    ├── navigation.js        # Navigation component
    └── admin/
        ├── dashboard.js     # Admin dashboard
        ├── users.js         # User management
        ├── articles.js      # Article management
        ├── comments.js      # Comment moderation
        ├── notify-users.js  # Bulk notifications
        └── settings.js      # System settings
```

## 🎯 Key Features

### Authentication System
- Role-based access control (User/Admin)
- Secure session management
- Protected routes and pages

### Content Management
- Article creation and publishing
- Comment threading system
- Content moderation workflow

### User Experience
- Responsive design
- Real-time notifications
- Social media integration

### Admin Capabilities
- Comprehensive user management
- Content approval system
- Bulk communication tools
- System configuration

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for production:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### Port Configuration
The development server runs on port 3002 by default. To change it:
```bash
npm run dev -- -p 3003
```

## 📊 Build Statistics

The application builds to approximately 80-85KB per page, optimized for fast loading times.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for educational purposes.

## 🆘 Support

For issues and questions, please check the documentation or create an issue in the repository.

---

**Note**: This is a demonstration application with mock data and localStorage for authentication. For production use, implement proper backend services and authentication.
