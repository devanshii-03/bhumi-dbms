````md
<div align="center">

# 🗓️ NGO Calendar Management System - Bhumi

<p>
  <img src="https://img.shields.io/badge/status-active-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/github/license/your-username/ngo-calendar?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/github/last-commit/your-username/ngo-calendar?style=for-the-badge" alt="Last Commit" />
</p>

A centralized web-based system for efficient event, volunteer, inventory, and feedback management, built to support the operations of **Bhumi**, a leading NGO in India. This system aims to streamline administrative workflows, enable data-driven decision-making, and facilitate coordination across events and programs like Ignite, Catalyse, and Refresh.

</div>

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack & Tools](#-tech-stack--tools)
- [System Architecture](#-system-architecture)
  - [ER Diagram](#er-diagram)
  - [Project Structure](#project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Usage & API Testing](#-usage--api-testing)
- [Business Impact](#-business-impact)
- [How to Contribute](#-how-to-contribute)
- [License](#-license)
- [Developed By](#-developed-by)

---

## ✨ Key Features

-   🔐 **User Authentication**: Role-based login for Admins and Volunteers.
-   📅 **Event Management**: Full CRUD (Create, Read, Update, Delete) functionality for events.
-   📦 **Inventory Management**: Track and allocate items required for various events.
-   🧍‍♂️ **Volunteer Tracking**: Monitor and manage volunteer data and participation.
-   📝 **Feedback Collection**: Submit and review feedback on a per-event, per-role basis.
-   🔗 **Google Calendar Sync**: Events are automatically synced to a shared Google Calendar.
-   📊 **Data Analytics Ready**: A clean and normalized database schema ready for future reporting.
-   🔄 **RESTful APIs**: Fully developed and tested backend APIs using Thunder Client.

---

## 🔧 Tech Stack & Tools

<table>
  <tr>
    <td align="center"><strong>Frontend</strong></td>
    <td align="center"><strong>Backend</strong></td>
    <td align="center"><strong>Database</strong></td>
    <td align="center"><strong>Tools & APIs</strong></td>
  </tr>
  <tr>
    <td>
      <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
      <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
      <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
      <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
    </td>
    <td>
        <img src="https://img.shields.io/badge/Thunder_Client-2563EB?style=for-the-badge&logo=thunder-client&logoColor=white" alt="Thunder Client" />
        <img src="https://img.shields.io/badge/Google_Calendar-4285F4?style=for-the-badge&logo=google-calendar&logoColor=white" alt="Google Calendar API" />
        <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" alt="dotenv" />
    </td>
  </tr>
</table>

---

## 🧩 System Architecture

### ER Diagram

<details>
<summary>Click to expand/collapse</summary>

![ER Diagram](https://i.imgur.com/your-er-diagram-image.png)

</details>

### Project Structure

<details>
<summary>Click to expand/collapse</summary>

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
````

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
