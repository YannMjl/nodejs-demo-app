// import Express and routes
import express from 'express';
import routes from './source/routes/route.js';

// vary these constants according to where you are running (GCS, VMs, K8S) and how many VMs you have, if that's the lesson)
// to do: this should be a command-line parameter that lets the app know how it is running
//const arrNodes = [ "localhost" ]                                    // for testing on GCS
const arrNodes = [ process.env.NODE_SVC_PUBLIC_SERVICE_HOST  ];       //  use this for K8S

// constant variables 
const app = express();
const PORT = process.env.PORT || 30002;
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
  console.log(`Server started and running on ${PORT}`);
});

function buildURL (strLevel) {
  // what is the formula for which node to call? 
  // given x levels and n nodes
  // x % n  where x>n, else n 
  let intCurrLevel = parseInt(strLevel);
  let nextLevel = intCurrLevel - 1;
  let numNodes = arrNodes.length; // to be derived from arrNodes
  let nextNode = nextLevel >= numNodes ? nextLevel % numNodes : nextLevel;
  let strURL = "http://"+ arrNodes[nextNode] + ":" + PORT + "/" + nextLevel;
    
  console.log ("returning URL " + strURL);
   return(strURL);

}
