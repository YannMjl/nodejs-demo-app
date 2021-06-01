// import Express and routes
import express from 'express';
import routes from './source/routes/route.js';

// constant variables 
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// body parser setup for Express v4.16.0 and higher
app.use(express.json());
app.use(express.urlencoded(
	{
  		extended: true
	}
));

// We'll use our routes function that we setup and imported above
// and then pass it to our app Express 
routes(app);

// Setting the server to listen at port 3000
app.listen(PORT, HOST, function () {
  console.log(`Server started on http://${HOST}:${PORT}`);
});
