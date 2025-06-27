# 🗓️ NGO Calendar Management System - Bhumi

Status: active | License | Last Commit

A centralized web-based system for efficient event, volunteer, inventory, and feedback management, built to support the operations of **Bhumi**, a leading NGO in India. This system aims to streamline administrative workflows, enable data-driven decision-making, and facilitate coordination across events and programs like Ignite, Catalyse, and Refresh.

-----

## 📋 Table of Contents

  * Key Features
  * Tech Stack & Tools
  * System Architecture
      * ER Diagram
      * Project Structure
  * Getting Started
      * Prerequisites
      * Installation & Setup
  * Usage & API Testing
  * Business Impact
  * How to Contribute
  * License
  * Developed By

-----

## ✨ Key Features

  * 🔐 **User Authentication**: Role-based login for Admins and Volunteers.
  * 📅 **Event Management**: Full CRUD (Create, Read, Update, Delete) functionality for events.
  * 📦 **Inventory Management**: Track and allocate items required for various events.
  * 🧍‍♂️ **Volunteer Tracking**: Monitor and manage volunteer data and participation.
  * 📝 **Feedback Collection**: Submit and review feedback on a per-event, per-role basis.
  * 🔗 **Google Calendar Sync**: Events are automatically synced to a shared Google Calendar.
  * 📊 **Data Analytics Ready**: A clean and normalized database schema ready for future reporting.
  * 🔄 **RESTful APIs**: Fully developed and tested backend APIs using Thunder Client.

-----

## 🔧 Tech Stack & Tools

| Frontend | Backend | Database | Tools & APIs |
| :--- | :--- | :--- | :--- |
| HTML5, CSS3, JavaScript, Bootstrap | Node.js, Express.js | MySQL | Thunder Client, Google Calendar API, dotenv |

-----

## 🧩 System Architecture

### ER Diagram

(This section is collapsible)

An ER Diagram is linked here.

### Project Structure

(This section is collapsible)

```yaml
project-root/
├── public/              # All frontend static files (HTML, CSS, JS)
│   ├── index.html       # Main login page
│   ├── admin-dashboard.html
│   └── ...
├── models/              # Database connection logic
│   └── db.js
├── routes/              # Express API route definitions
│   ├── events.js
│   └── volunteers.js
├── sql/                 # SQL schema and seed files
│   └── schema.sql
├── .env                 # Environment configuration (Not committed to Git)
├── .gitignore           # Files and folders to ignore
├── app.js               # Main server entry point
└── package.json         # Project dependencies
```
\</details\>

-----

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

  - [Node.js](https://nodejs.org/) (v16 or higher)
  - [NPM](https://www.npmjs.com/) (usually comes with Node.js)
  - [XAMPP](https://www.apachefriends.org/index.html) or a standalone MySQL server

### Installation & Setup

1.  **Clone the Repository**

    ```bash
    git clone [https://github.com/devanshii-03/bhumi-dbms.git](https://github.com/devanshii-03/bhumi-dbms.git)
    cd bhumi-dbms
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Set up the Database**

      - Start your MySQL server using XAMPP or another tool.
      - Create a new database named `bhumi`.
      - Import the database schema located at `/sql/schema.sql` into the `bhumi` database.

4.  **Configure Environment Variables**

      - Create a new file named `.env` in the root directory of the project.
      - Copy the following content into it and adjust the values if necessary.

    <!-- end list -->

    ```env
    # Database Configuration
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=ngo_calendar

    # Server Configuration
    PORT=3000
    ```

5.  **Run the Application**

    ```bash
    node app.js
    ```

    The application should now be running\! Open your browser and navigate to `http://localhost:8080`.

-----

## 🕹️ Usage & API Testing

The application provides RESTful APIs for all core functionalities. You can test these endpoints using **Thunder Client** in VS Code or any other API client.

| Method | Endpoint             | Description                      |
| :----- | :------------------- | :------------------------------- |
| `GET`  | `/api/events`        | Get a list of all events.        |
| `POST` | `/api/events`        | Add a new event.                 |
| `GET`  | `/api/volunteers`    | Get a list of all volunteers.    |
| `POST` | `/api/feedback`      | Submit feedback for an event.    |
| `GET`  | `/api/inventory`     | View current inventory status.   |
| `PUT`  | `/api/inventory/:id` | Update an inventory item.        |

-----

## 📈 Business Impact

Prior to this system, Bhumi faced challenges with decentralized event data, manual volunteer coordination, and inefficient resource tracking. This project delivers significant value by:

  - ✅ **Reducing data entry errors** by an estimated 60%.
  - ⏰ **Enabling real-time event scheduling** and visibility for all stakeholders.
  - 🤝 **Improving transparency** in volunteer engagement and task allocation.
  - 📊 **Making inventory usage visible** across all events, preventing shortages.
  - 📈 **Simplifying reporting and planning** through a structured and clean data model.

-----

## 🙌 How to Contribute

Contributions are welcome\! If you'd like to improve the system, please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

-----

## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

-----

## 👩‍💻 Developed By

This project was developed by Devanshi Nikam, Rucha Musale and Sanjana Motaparti.

If you’re an NGO or social impact organization looking to customize this system for your operations, feel free to raise an issue or connect with us\!

```
