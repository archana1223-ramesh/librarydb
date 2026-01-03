import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/books';

function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publishedYear: '',
    availableCopies: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Error fetching books. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        alert('Book updated successfully!');
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData);
        alert('Book added successfully!');
      }
      setFormData({
        title: '',
        author: '',
        category: '',
        publishedYear: '',
        availableCopies: ''
      });
      fetchBooks();
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      publishedYear: book.publishedYear,
      availableCopies: book.availableCopies
    });
    setEditingId(book._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert('Book deleted successfully!');
        fetchBooks();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + (error.response?.data?.message || 'Cannot delete book'));
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      author: '',
      category: '',
      publishedYear: '',
      availableCopies: ''
    });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Library Book Management System</h1>
        <p>CRUD Operations with MongoDB</p>
      </header>

      <div className="container">
        {/* Form Section */}
        <div className="form-section">
          <h2>{editingId ? '✏️ Update Book' : '➕ Add New Book'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Book Title *</label>
              <input
                type="text"
                name="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Author *</label>
              <input
                type="text"
                name="author"
                placeholder="Enter author name"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <input
                type="text"
                name="category"
                placeholder="e.g., Fiction, Technology"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Published Year *</label>
                <input
                  type="number"
                  name="publishedYear"
                  placeholder="e.g., 2020"
                  value={formData.publishedYear}
                  onChange={handleChange}
                  required
                  min="1800"
                  max="2030"
                />
              </div>

              <div className="form-group">
                <label>Available Copies *</label>
                <input
                  type="number"
                  name="availableCopies"
                  placeholder="Number of copies"
                  value={formData.availableCopies}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-primary">
                {editingId ? '💾 Update Book' : '➕ Add Book'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Books List Section */}
        <div className="books-section">
          <div className="section-header">
            <h2>📖 Books List ({books.length})</h2>
            <button onClick={fetchBooks} className="btn btn-refresh">
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading books...</div>
          ) : books.length === 0 ? (
            <div className="no-books">
              <p>📭 No books found. Add your first book!</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="books-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Year</th>
                    <th>Copies</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(book => (
                    <tr key={book._id}>
                      <td data-label="Title">{book.title}</td>
                      <td data-label="Author">{book.author}</td>
                      <td data-label="Category">
                        <span className="category-badge">{book.category}</span>
                      </td>
                      <td data-label="Year">{book.publishedYear}</td>
                      <td data-label="Copies">
                        <span className={`copies-badge ${book.availableCopies === 0 ? 'out-of-stock' : ''}`}>
                          {book.availableCopies}
                        </span>
                      </td>
                      <td data-label="Actions">
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleEdit(book)} 
                            className="btn-action btn-edit"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(book._id)} 
                            className="btn-action btn-delete"
                            title="Delete"
                            disabled={book.availableCopies > 0}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <footer className="app-footer">
        <p>© 2026 Library Management System | Gowtham V | AI & Data Science</p>
      </footer>
    </div>
  );
}

export default App;
