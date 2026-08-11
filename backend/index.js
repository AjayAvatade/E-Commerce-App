// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const AuthRouter = require('./Routes/authRouter');
// const orderRoutes = require("./routes/orderRoutes");

// require('dotenv').config();
// require('./config/db');

// const PORT = process.env.PORT || 8080;

// app.get('/hii', (rep, res) =>{
//     res.send('Hello Ajay!');
// })

// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/auth', AuthRouter);
// app.use("/api/orders", orderRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// })