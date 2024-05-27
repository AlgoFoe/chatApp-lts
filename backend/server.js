import express from 'express';
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongo from './db/connect.js';

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(express.json());
app.use(cookieParser()); 

app.use('/api/auth',authRoutes);    
app.use('/api/messages',messageRoutes);    
app.use('/api/users',userRoutes);    

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


app.listen(PORT, () => {
    connectToMongo()
  console.log(`Example app listening at http://localhost:${PORT}`);
});