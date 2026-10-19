# SkillBridge — Learning & Coaching Management Platform

SkillBridge is a full-stack web application designed to help learners explore learning programs, set personal development goals, track their progress, and support continuous learning.

The project is built using **React.js** for the frontend and **Django REST Framework** for the backend, with SQLite as the database.

## ✨ Features

### Dashboard
- View available learning programs.
- Track total personal goals.
- View completed goals and goal completion percentage.
- Navigate between different sections of the application.

### Learning Programs
- View available learning programs.
- Display program titles, descriptions, and durations.
- Retrieve program data from the Django REST API.
- Manage learning programs through Django Admin.

### Personal Goal Tracker
- Create personal development goals.
- Set optional target dates.
- Track goal status: Pending, In Progress, and Completed.
- Update goal status.
- Delete goals.
- View goal statistics on the dashboard.

### Responsive User Interface
- Sidebar navigation for desktop screens.
- Mobile-friendly navigation menu.
- Responsive cards and layouts.
- Interactive buttons and forms.
- Clean interface designed for ease of use.

### Coach Feedback
- Includes a placeholder interface for future coach feedback functionality.
- Backend API integration for coach feedback is planned for a future version.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| JavaScript | Application logic and interactivity |
| HTML5 | Web page structure |
| CSS3 | Styling and responsive design |
| Python | Backend programming |
| Django | Backend framework |
| Django REST Framework | REST API development |
| SQLite | Database |
| Axios | HTTP requests between frontend and backend |
| React Hooks | Component state and lifecycle management |
| Git and GitHub | Version control and source code hosting |
| Vite | Frontend development server and build tool |

## 📁 Project Structure

```text
SkillBridge/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── learning/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── ...
│   ├── manage.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

*Note: The `requirements.txt` file and `.gitignore` file should be created if they do not already exist. The Django database file is generated locally.*

## ⚙️ Installation and Setup

Follow these steps to run SkillBridge on your local machine.

### Prerequisites

Install the following:

- Python 3
- Node.js and npm
- Git
- Visual Studio Code (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/yashashwini2005-ai/SkillBridge
cd SkillBridge
```



### 2. Set up the Django backend

Open a terminal in the project directory and run:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install django djangorestframework django-cors-headers
```

Create the database tables:

```bash
python manage.py makemigrations
python manage.py migrate
```

Create an administrator account:

```bash
python manage.py createsuperuser
```

Start the backend server:

```bash
python manage.py runserver
```

The backend will run at:

http://127.0.0.1:8000/

### 3. Set up the React frontend

Open a **second terminal** in the project directory:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

http://localhost:5173/

Keep both development servers running while using the application.

### 4. Add sample learning programs

Open Django Admin:

http://127.0.0.1:8000/admin/

Log in with your administrator credentials and add learning programs with a title, description, and duration.

Return to the SkillBridge dashboard and refresh the page to view the programs.

## 🔗 REST API Endpoints

The backend exposes RESTful endpoints through Django REST Framework.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/programs/` | Retrieve all learning programs |
| POST | `/api/programs/` | Create a learning program |
| GET | `/api/programs/<id>/` | Retrieve a specific program |
| PATCH | `/api/programs/<id>/` | Update a program |
| DELETE | `/api/programs/<id>/` | Delete a program |
| GET | `/api/goals/` | Retrieve learning goals |
| POST | `/api/goals/` | Create a learning goal |
| GET | `/api/goals/<id>/` | Retrieve a specific goal |
| PATCH | `/api/goals/<id>/` | Update a goal |
| DELETE | `/api/goals/<id>/` | Delete a goal |

The React frontend communicates with these endpoints using Axios.

## 🗄️ Database Models

### LearningProgram
Stores learning program information:
- Title
- Description
- Duration
- Creation timestamp

### LearningGoal
Stores personal development goals:
- Goal title
- Optional deadline
- Status
- Creation timestamp
- Optional relationship to a Django user

SQLite is used for local development, and Django migrations manage the database schema.

## 🔒 Security and Limitations

This project is currently a development prototype.

- User authentication and registration are not yet implemented in the frontend.
- Goal ownership and authorization need to be enforced before multi-user deployment.
- The current API permissions allow unrestricted access to program and goal endpoints.
- Coach feedback functionality is not yet connected to a backend.
- Production deployment requires appropriate security settings, restricted CORS origins, and protected credentials.

Do not use real personal or confidential data in the current prototype.

## 🚀 Future Enhancements

- User registration and login.
- Role-based access for learners, coaches, and administrators.
- Secure, user-specific goal management.
- Coach feedback and session management.
- Learning progress visualizations.
- Program enrollment and completion tracking.
- Notifications and reminders.
- Automated testing.
- Deployment to a cloud hosting platform.

## 🎯 Learning Outcomes

This project provides practical experience with:

- Building reusable React components.
- Managing state and user interactions with React Hooks.
- Creating REST APIs using Django REST Framework.
- Designing database models and running migrations.
- Connecting a React frontend to a Django backend.
- Implementing CRUD operations.
- Using Git and GitHub for version control.
- Designing responsive web interfaces.

## 👩‍💻 Project Information

**Project Name:** SkillBridge — Learning & Coaching Management Platform

**Project Type:** Full-Stack Web Application

**Frontend:** React.js, JavaScript, CSS3

**Backend:** Python, Django, Django REST Framework

**Database:** SQLite

**Status:** In Development

---

SkillBridge aims to provide a simple platform for organizing learning opportunities and supporting personal development through goal tracking and progress monitoring.
