# Calendar Task Manager

A calendar-based task management application built with React, TypeScript, and Node.js.

Features

- **Monthly calendar view** with navigation between months
- **Inline task creation & editing** directly inside calendar cells
- **Drag & drop** to reorder tasks within a day or move them between days
- **Label system** with color-coded labels on tasks
- **Task filtering** via search bar
- **Worldwide holidays** displayed per day (via [Nager.Date API](https://date.nager.at/))
- **Country selector** to view holidays for any country
- **Persistent storage** with MongoDB


Tech Stack

Frontend - React 19, TypeScript, Vite, Styled Components
DnD - @dnd-kit/core, @dnd-kit/sortable
Backend - Node.js, Express, TypeScript
Database - MongoDB (Mongoose)  
API - [Nager.Date](https://date.nager.at/swagger/index.html) 

Prerequisites
- **Node.js** >= 18
- **MongoDB** running locally on `mongodb://localhost:27017`


Getting Started

```bash
# Install dependencies
npm install

# Start both client and server in development mode
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000



Environment Variables

Create `server/.env`:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/calendar-task-manager




API Endpoints

`GET`        `/api/tasks`           List tasks (with date range filter) 
`POST`       `/api/tasks`           Create a task
`PUT`        `/api/tasks/:id`       Update a task
`DELETE`     `/api/tasks/:id`       Delete a task
`PATCH`      `/api/tasks/reorder`   Bulk reorder/move tasks
