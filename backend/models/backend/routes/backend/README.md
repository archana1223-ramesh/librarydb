# Library Book Management System

A CRUD (Create, Read, Update, Delete) application for managing library books using MongoDB.

## Features
- Create new book records
- Read/View all books
- Update book details
- Delete books (only when availableCopies = 0)

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Tools:** MongoDB Shell (mongosh), Postman

## Database Schema
```javascript
{
  title: String,
  author: String,
  category: String,
  publishedYear: Number,
  availableCopies: Number
}
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/gowtham-gk-jj/librarydb.git
cd librarydb
```

2. Install dependencies
```bash
npm install
```

3. Start MongoDB service

4. Run the server
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## Author
Archana R  
Artificial Intelligence & Data Science  
Velammal Institute of Technology
```

4. Commit message: "Update README with project documentation"
5. Click **"Commit changes"**

---

### **Step 9: Create `.gitignore`**

1. Click **"Add file"** → **"Create new file"**
2. Filename: `.gitignore`
3. Paste this:
```
node_modules/
.env
*.log
.DS_Store
```

4. Commit message: "Add gitignore file"
5. Click **"Commit new file"**

---

## **Final Repository Structure**

Your GitHub repository will now have:
```
librarydb/
├── backend/
│   ├── models/
│   │   └── Book.js
│   ├── routes/
│   │   └── books.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
