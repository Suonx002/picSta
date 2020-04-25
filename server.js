const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const userRoute = require('./routes/userRoutes');

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/v1/users', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
