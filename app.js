const express = require('express');
const bodyPaser = require('body-parser');
const userRoutes = require('./routes/users');

const app = express();
app.use(bodyPaser.json());

app.get('/', (req,res) => {
    res.send('<form action="/login" method="POST"><input type="text" name="username"/><input type="password" name="password"/><button type="submit">Login</button></form>');
});

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});