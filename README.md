Task Management API
===================
**BACKEND**
===================
This is the backend of a Task Management Application built using **Node.js** and **Express**. It provides a RESTful API for handling CRUD operations for tasks and managing user authentication, including Google login. The backend stores task data and user information in a **MongoDB** database.

🚀 Features
-----------

-   🔄 **RESTful API** for handling **CRUD** operations for tasks.
-   🔑 **User authentication** (registration, login, and Google login).
-   🗄️ Data stored in **MongoDB**.
-   🛠️ Routes for creating, updating, deleting, and retrieving tasks.

🛠️ Tech Stack
--------------

-   **Node.js**: Server-side JavaScript runtime.
-   **Express**: Web framework for building the RESTful API.
-   **MongoDB**: Database for storing tasks and user data.
-   **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
-   **JWT**: For user authentication.
-   **Google OAuth**: For Google login.


**FRONTEND**
===================

🌟 Features
-----------

-   **Create, update, and manage tasks** across different columns.
-   **Drag-and-drop** functionality for task movement between columns.
-   **User authentication**: Sign up, log in, and log in via Google.
-   **User profiles** with avatars.
-   **Task sorting** and **searching** capabilities.
-   **Routing** is implemented throughout the application.
-   Authentication is required for **every page**.
  

🎨 User Interface
-----------------

-   Mock designs are provided to guide the UI development.
-   Ensure the UI is built according to the provided designs.
-   **Drag-and-drop** functionality is a core feature---use any library of your choice (e.g., **react-dnd**, **react-beautiful-dnd**).

🚀 Basic Features
-----------------

-   🔐 **User Profiles**: Each user has a profile with an avatar.
-   🔄 **Task Sorting & Searching**: Users can sort and search tasks easily.
-   🛠️ **Context API**: State management is handled using **Context API** in the frontend for managing global state across components.

🛠️ Tech Stack
--------------

-   **React**: For building the user interface.
-   **React Router**: For handling routing across pages.
-   **Authentication**: JWT-based or Google OAuth for secure login.
-   **Icon**: Heroicons React.
