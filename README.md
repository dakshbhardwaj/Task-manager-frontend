# Task Manager Frontend

A React Native mobile application for managing tasks, built with Expo and Redux Toolkit.

## Architecture

The application follows a modular architecture with the following structure:

```plaintext
task-manager-frontend/
├── app/                      # Main application routes
│   ├── (auth)/              # Authentication related screens
│   │   ├── _layout.js       # Auth navigation layout
│   │   ├── login.js         # Login screen
│   │   ├── signup.js        # Signup screen
│   │   ├── forgot-password.js
│   │   └── reset-password.js
│   ├── (tabs)/              # Main app tabs
│   │   ├── _layout.js       # Tab navigation layout
│   │   ├── index.js         # Tasks list screen
│   │   └── profile.js       # User profile screen
│   ├── task/                # Task related screens
│   │   └── [id].js          # Task detail/edit screen
│   └── _layout.js           # Root layout with providers
├── src/
│   ├── context/             # React Context providers
│   │   └── AuthContext.js   # Authentication context
│   ├── services/            # API services
│   │   ├── auth.js          # Authentication service
│   │   └── task.js          # Task management service
│   └── store/               # Redux store configuration
│       ├── index.js         # Store setup
│       └── slices/          # Redux slices
│           └── authSlice.js # Auth state management
```

## Features

- User Authentication (Login/Signup)
- Password Reset Functionality
- Task Management (CRUD operations)
- Gesture Handler for smooth animations
- Persistent Authentication
- Error Handling
- Loading States

## Tech Stack

- React Native
- Expo Router
- Redux Toolkit
- React Native Paper
- Axios
- AsyncStorage
- React Native Gesture Handler

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dakshbhardwaj/Task-manager-frontend.git
cd Task-manager-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

## Running on Simulators/Emulators

- For iOS (requires macOS):
```bash
npx expo run:ios
```

- For Android:
```bash
npx expo run:android
```

## Environment Setup

The application uses a backend API hosted at:
```
https://task-manager-backend-wxdz.onrender.com
```

## Building for Production

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Build for Android:
```bash
eas build -p android --profile preview
```

3. Build for iOS:
```bash
eas build -p ios
```

## Project Structure Details

### Authentication Flow
- Uses Context API for managing auth state
- JWT token-based authentication
- Persistent login using AsyncStorage
- Protected routes for authenticated users

### State Management
- Redux Toolkit for global state management
- Auth slice for managing user authentication state
- Async thunks for handling API calls

### Navigation
- File-based routing using Expo Router
- Tab navigation for main app screens
- Stack navigation for auth flows
- Dynamic routing for task details

### UI Components
- React Native Paper components
- Custom styled components
- Gesture handler integration
- Loading and error states
