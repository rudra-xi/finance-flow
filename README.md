# FinanceFlow

FinanceFlow is a **MERN stack** (MongoDB, Express.js, React, Node.js) application designed to help users manage their budgets and expenses efficiently. With an intuitive user interface and robust backend, FinanceFlow simplifies personal finance management by allowing users to track their spending, set budget limits, and gain insights into their financial habits.

![FinanceFlow Preview](https://imgur.com/a/pRX7CBa.gif) <!-- Add the GIF here -->

---

## Features

- **User Authentication**: Secure login and registration system with password hashing.
- **Budget Management**: Create, update, and delete budgets for different categories.
- **Expense Tracking**: Record and categorize expenses with details like amount, date, and description.
- **Responsive Design**: Built with TailwindCSS for a seamless experience across devices.
- **Real-Time Updates**: Dynamic updates to budgets and expenses without page reloads.
- **Toast Notifications**: User-friendly notifications for actions like successful login, budget creation, or expense addition.

---

## Project Structure

The project is divided into two main parts:

- **`frontend`**: The client-side of the application built with **Vite React**.
- **`backend`**: The server-side of the application built with **Node.js** and **Express**.

---

## Clone Repository

To get started with FinanceFlow, clone the repository to your local machine:

     ```sh
     git clone https://github.com/rudra-xi/FinanceFlow.git
     cd FinanceFlow
     ```

---

## Setup Instructions

### Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (for database storage)

### Frontend Setup

1. Navigate to the `frontend` directory:

          ```sh
          cd frontend
          ```

2. Install dependencies:

          ```sh
          npm install
          ```

3. Start the development server:

          ```sh
          npm run dev
          ```

The frontend will be available at `http://localhost:5173`.

#### Frontend Dependencies

- **`axios`**: Promise-based HTTP client for making API requests.
- **`react-datepicker`**: A simple and reusable datepicker component for selecting dates.
- **`react-hot-toast`**: A lightweight library for displaying toast notifications.
- **`tailwindcss`**: A utility-first CSS framework for rapid UI development.

### Backend Setup

1. Navigate to the `backend` directory:

          ```sh
          cd backend
          ```

2. Install dependencies:

          ```sh
          npm install
          ```

3. Start the development server:

          ```sh
          npm run dev
          ```

The backend server will run on `http://localhost:5000`.

#### Backend Dependencies

- **`bcryptjs`**: Library for hashing passwords securely.
- **`body-parser`**: Middleware for parsing incoming request bodies.
- **`cors`**: Middleware to enable Cross-Origin Resource Sharing (CORS).
- **`express`**: Web framework for building the backend API.
- **`mongoose`**: MongoDB object modeling tool for asynchronous database operations.

---

## Pages

### 1. **SignIn**

The **SignIn** page allows users to log into their accounts using their credentials. It includes a form for entering the username and password. Upon successful login, users are redirected to the **Budget** page.

### 2. **Budget**

The **Budget** page enables users to create and manage their budgets. Users can:

> Set budget limits for different categories (e.g., groceries, entertainment, utilities).
> View a summary of their spending against the budget.
> Edit or delete existing budgets.

### 3. **Expense**

The **Expense** page allows users to record their expenses. Users can:

> Add new expenses with details like amount, date, category, and description.
> View a list of all recorded expenses.
> Filter expenses by category or date range.

### 4. **About**

The **About** page provides information about the FinanceFlow application, its features, and the team behind it. It also includes links to documentation and support.

---

## API Endpoints

The backend exposes the following RESTful API endpoints:

- **Auth**
  > `POST /api/auth/register`: Register a new user.
  > `POST /api/auth/login`: Log in an existing user.
  > `POST /api/auth/logout`: Log out the current user.

- **Budgets**
  > `GET /api/budgets`: Fetch all budgets for the logged-in user.
  > `POST /api/budgets`: Create a new budget.
  > `PUT /api/budgets/:id`: Update an existing budget.
  > `DELETE /api/budgets/:id`: Delete a budget.

- **Expenses**
  > `GET /api/expenses`: Fetch all expenses for the logged-in user.
  > `POST /api/expenses`: Add a new expense.
  > `DELETE /api/expenses/:id`: Delete an expense.

---

## Environment Variables

To run the application, you need to set up the following environment variables:

1. Create a `.env` file in the `backend` directory and add the following:

          ```env
          PORT=5000
          MONGO_URI=<your-mongodb-connection-string>
          JWT_SECRET=<your-jwt-secret-key>
          ```

2. Create a `.env` file in the `frontend` directory and add the following:

          ```env
          VITE_API_BASE_URL=http://localhost:5000
          ```

---

## Open for Contribution

FinanceFlow is an open-source project, and contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:

          ```sh
          git checkout -b feature/your-feature-name
          ```

3. Commit your changes:

          ```sh
          git commit -m "Add your commit message here"
          ```

4. Push your changes to your forked repository:

          ```sh
          git push origin feature/your-feature-name
          ```

5. Open a pull request with a detailed description of your changes.

---

## Future Enhancements

- **Data Visualization**: Add charts and graphs to visualize spending patterns.
- **Reports**: Generate monthly or yearly financial reports.
- **Multi-User Support**: Allow families or teams to share budgets and expenses.
- **Mobile App**: Develop a cross-platform mobile app using React Native.
- **Export Data**: Allow users to export their budget and expense data as CSV or PDF.
- **Dark Mode**: Add a dark mode option for better user experience.

---

## Acknowledgments

- Special thanks to the open-source community for providing the tools and libraries that made this project possible.

---

## Author

- **[Rudra-Xi](https://github.com/rudra-xi)**: Developer and maintainer of FinanceFlow.

---

## License

This project is licensed under the MIT License. See the [![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](/LICENSE) file for more information.
