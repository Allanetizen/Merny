(async () => {
  const express = require("express");
  const cors = require("cors");
  const bodyParser = require('body-parser');
  // const morgan = require('logger');
  const routes = require("./routes/record");


  require("dotenv").config();
  const app = express();
  const port = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());
  
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  
  // app.use(morgan('dev'));
  // get driver connection
  const dbo = require("./db/conn");

  try {
    const db = await dbo.connectToServer();

    app.use(routes(db));

    app.listen(port, () => {
      // perform a database connection when server start
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error)
  }
})();
