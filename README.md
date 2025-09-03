# School Management System

A full-stack web application for managing school data, built with React (Vite) for the frontend and Node.js/Express for the backend. The project supports image uploads, school registration, and viewing school details, with a CockroachDB database and Cloudinary for image storage.

## Features

- Add new schools with details and images
- View all registered schools
- Search/filter schools by name
- Responsive and modern UI
- RESTful API backend
- Secure environment variable management

## Technologies Used

- **Frontend:** React, Vite, TailwindCSS, React Router
- **Backend:** Node.js, Express, CockroachDB, Cloudinary
- **Deployment:** Vercel

## Folder Structure

```
SCHOOL/
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   └── schools.js
│   ├── schoolImages/
│   └── .env
├── frontend/
│   └── my-project/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── Pages/
│       │   │   ├── AddSchool.jsx
│       │   │   ├── ShowSchools.jsx
│       │   │   └── ImageUpload.jsx
│       │   ├── component/
│       │   │   ├── NavBar.jsx
│       │   │   ├── Hero.jsx
│       │   │   ├── Info.jsx
│       │   │   └── Footer.jsx
│       │   └── index.css
│       ├── public/
│       ├── package.json
│       ├── vite.config.js
│       ├── .env
│       └── vercel.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js & npm
- CockroachDB instance
- Cloudinary account

### Backend Setup

1. Go to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your credentials:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   DATABASE_URL=your_cockroachdb_url
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Setup

1. Go to the frontend project folder:
   ```sh
   cd frontend/my-project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. (Optional) Create a `.env` file for frontend environment variables:
   ```env
   VITE_BASE_URL=https://your-backend-url
   ```
4. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Deployment

### Vercel

- Deploy both `backend` and `frontend/my-project` folders separately on Vercel.
- Add environment variables in Vercel dashboard for both projects.
- For frontend, ensure `vercel.json` routes all paths to `index.html` for SPA support.

## API Endpoints

- `GET /schools` - List all schools
- `POST /schools` - Add a new school
- `GET /` - Health/status check

## License

This project is licensed under the MIT License.

## Author

Akshay Pratap Singh
