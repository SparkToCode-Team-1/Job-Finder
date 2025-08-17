# Job Finder - Frontend Application

A modern, responsive React TypeScript application for job searching and career management. This frontend application provides an intuitive interface for job seekers to discover opportunities, manage their profiles, and connect with potential employers.

## 🌟 Features

### Core Functionality

- **Job Search & Discovery**: Browse and search through job listings with advanced filters
- **Job Details**: Comprehensive job information including requirements, salary, and company details
- **User Profile Management**: Create and manage professional profiles
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations and interactions

### Pages & Components

- **Home Page**: Landing page with hero section and feature highlights
- **Jobs Listing**: Searchable and filterable job listings
- **Job Details**: Individual job posting pages with full descriptions
- **User Profile**: Personal and professional information management
- **About Us**: Company information and mission
- **Contact**: Contact form and company details

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Language**: TypeScript 4.7.4
- **Styling**: CSS3 with modern features (Grid, Flexbox, Animations)
- **Routing**: React Router DOM 6.3.0 (to be integrated)
- **Testing**: Jest & React Testing Library
- **Build Tool**: React Scripts 5.0.1
- **Code Quality**: ESLint & TypeScript strict mode

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation header component
│   └── Footer/         # Site footer component
├── pages/              # Main application pages
│   ├── Home/          # Landing page
│   ├── Jobs/          # Job listings page
│   ├── JobDetail/     # Individual job details
│   ├── Profile/       # User profile management
│   ├── About/         # About us page
│   └── Contact/       # Contact page
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and API helpers
├── hooks/             # Custom React hooks
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SparkToCode-Team-1/Job-Finder.git
   cd Job-Finder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install additional packages (if needed)**

   ```bash
   npm install react-router-dom @types/react-router-dom
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📜 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production to the `build` folder
- `npm run eject` - Removes the single build dependency (one-way operation)

## 🎨 Design System

### Color Palette

- **Primary**: #3498db (Blue)
- **Secondary**: #2c3e50 (Dark Blue)
- **Success**: #27ae60 (Green)
- **Text**: #2c3e50 (Dark)
- **Background**: #ffffff (White)
- **Footer**: #34495e (Dark Gray)

### Typography

- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
- **Responsive Design**: Mobile-first approach with breakpoints at 768px

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_APP_NAME=Job Finder
```

### TypeScript Configuration

The project uses strict TypeScript settings for better code quality and type safety.

## 🧪 Testing

The application includes:

- Unit tests for components using Jest and React Testing Library
- Test setup configuration in `src/setupTests.ts`
- Example test in `src/App.test.tsx`

Run tests with:

```bash
npm test
```

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first CSS design
- Flexible grid layouts using CSS Grid and Flexbox
- Responsive navigation that adapts to screen size

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting
- Write unit tests for new features
- Update documentation for significant changes
- Use semantic commit messages

## 📊 Performance

The application is optimized for:

- Fast initial load times
- Smooth animations and transitions
- Efficient re-rendering with React best practices
- Optimized bundle size

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**SparkToCode Team 1**

- Frontend Development
- UI/UX Design
- Quality Assurance

---

**Built with ❤️ by SparkToCode Team 1**

_Job Finder - Connecting talent with opportunity_
