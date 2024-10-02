# React Task Management App

This is a task management web application built with **React.js** and styled using **MUI (Material-UI)**. The app allows users to view, create, update, and delete tasks. It features a clean, responsive interface and utilizes context API for user management and global state handling.

## Features

- **Task Management**: Create, view, update, and delete tasks with ease.
- **Responsive Design**: The UI is fully responsive, ensuring a seamless experience across devices.
- **MUI Data Grid**: Used for displaying task data in a clean, sortable, and paginated grid.
- **MUI Date Picker**: Integrated date picker for selecting task due dates.
- **Context API**: Manages and stores user information across the app.

## Technology Stack

- **React.js**: Core framework for building the UI.
- **MUI (Material-UI)**: Used for designing the interface and creating a responsive layout.
- **Axios**: For making API calls to the backend.
- **Context API**: For managing global state, particularly user authentication.
- **Moment.js**: For handling and formatting dates.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 12.x)
- **npm** (>= 6.x)

### Environment Variables

You need to add the following environment variable to the `.env` file in the root of the project:

```bash
REACT_APP_API_URL=http://localhost:3000/api
```

This is used for configuring the API base URL for all API requests.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/poshitharavi/task-manager-front.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd react-task-management-app
   ```
3. **Install the required libraries**:
   ```bash
   npm install
   ```
   This will install all the dependencies required for the app to function correctly.

### Running the Application

Once all dependencies are installed, start the application by running:

```bash
npm start
```

This will launch the development server and the app will be accessible at `http://localhost:3000` in your browser.

### Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm build`: Builds the app for production to the `build` folder.
- `npm eject`: Exposes the configurations for further customization.

## Components Used

- **MUI Data Grid**: Displays the list of tasks with sortable columns, pagination, and edit/delete options.
- **MUI Date Picker**: Allows users to select due dates when creating or editing tasks.

## Code Structure

- **src/**: Contains the main source code for the application.
  - **api/**: Axios calls for handling API requests (fetching, creating, updating, and deleting tasks).
  - **components/**: Contains reusable components such as modals, forms, and grids.
  - **context/**: Handles user state and authentication across the app.
  - **pages/**: All the web pages are available in here.
  - **App.tsx**: Main entry point for the application.

## Key Functionality

- **Task Management**: Manage tasks with options to view details, edit, and delete.
- **Context API**: Persist user details across the application without the need for prop drilling.

## License

This project is licensed under the MIT License.
