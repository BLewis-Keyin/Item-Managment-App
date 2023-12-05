// index.js
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Routes
// Add your routes for API and UI here

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const apiRoutes = require('./routes/apiRoutes');
const uiRoutes = require('./routes/uiRoutes');

// Routes
app.use('/api', apiRoutes);
app.use('/', uiRoutes);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));