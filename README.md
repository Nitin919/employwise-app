# EmployWise

EmployWise is a user management application built with React and Vite. It allows users to log in, view a list of users, and manage user details, including editing and deleting users. The application is designed to be responsive and user-friendly.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with token storage
- View a list of users
- View detailed user information
- Edit user details
- Delete users with confirmation
- Responsive design for mobile and desktop
- Error handling and notifications
- Loading states during data fetching

## Technologies Used

- **Frontend**: 
  - React
  - Vite
  - React Router DOM
  - Framer Motion
  - Lucide React
  - Tailwind CSS
  - Prop Types
  - React Hot Toast

- **Backend**: 
  - Mock API from [ReqRes](https://reqres.in)

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/employwise.git
   cd employwise
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Login**: Use the provided credentials to log in.
   - Example credentials:
     - Email: `eve.holt@reqres.in`
     - Password: `cityslicka`

2. **User Management**:
   - View the list of users.
   - Click on a user to view their details.
   - Edit user information or delete a user.

3. **Responsive Design**: The application is designed to work on various screen sizes, including mobile and desktop.

## API Endpoints

The application interacts with the following API endpoints:

- **Login**: `POST https://reqres.in/api/login`
- **Get Users**: `GET https://reqres.in/api/users`
- **Get User by ID**: `GET https://reqres.in/api/users/{id}`
- **Delete User**: `DELETE https://reqres.in/api/users/{id}`

## Deployment

The application is deployed on Vercel. You can access it at [employwise.vercel.app](https://employwise-awa00bg28-nitin919s-projects.vercel.app).


1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

