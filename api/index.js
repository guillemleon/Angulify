const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/angulify', (err, res) => {
    if(err) {
        console.log('Error: ' + err);
        throw err;
    } else {
        console.log('Connected to database...');
        
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        })
    }
});