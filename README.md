# Project Setup Guide

This project is a NestJS authentication and authorization system using JWT with refresh tokens and role-based actions, along with other features.

## Setup Instructions

1. **Clone the Repository**

    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd <project_directory>
    ```

3. **Build and Start Docker Compose**

    ```bash
    docker-compose up --build
    ```

4. **Install PNPM Globally (if not already installed)**

    ```bash
    npm install -g pnpm
    ```

5. **Install Project Dependencies**

    ```bash
    pnpm install
    ```

6. **Run in Development Mode**

    ```bash
    pnpm run dev
    ```

    OR

7. **Run the Production Build**

    ```bash
    pnpm run build
    ```

## Task Information

Project Setup: Created a new project using ReactJS and initialized it using Vite.

Authentication Pages: Developed a login page and home page using React Router DOM for routing. Additionally, implemented signup and admin privileged pages and integrated them with the REST API.

State Management: Utilized ReactJS with Redux Toolkit to manage state, specifically handling the login flow with credentials (username: haulmatic, password: 123456).

User Management Module: Implemented a new module to manage users, including functionalities for creating, updating, and deleting users. Used input fields for first name and last name. Ensured that these operations are securely managed and that admin-only features are implemented.

User Listing: Displayed users in tabular format, storing all user data inside the state. Restricted access to this list to only admin users.

Unit Testing: Acknowledged the need for unit tests for the create and update processes. While unit tests weren't developed due to a lack of expertise in frontend unit testing, there's a commitment to learning and implementing these tests in the future. Basic CRUD unit tests have been previously implemented using Jest for the backend.

## Contact

If you encounter any issues or require clarification, please feel free to reach out.
