const express = require('express');
const port = 4000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log('Error occured in starting the server', err);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});
