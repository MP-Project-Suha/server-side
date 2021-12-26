const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require('body-parser')
const helmet = require("helmet");

const app = express();

require("dotenv").config();



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());


//Role Router
const roleRouter = require("./routers/routes/role");
app.use(roleRouter);

//User Router
const userRouter = require("./routers/routes/user");
app.use(userRouter);

//Event Router
const eventRouter = require("./routers/routes/event");
app.use(eventRouter);

//Ticket Router
const ticketRouter = require("./routers/routes/ticket");
app.use(ticketRouter);

//Rate Router
const rateRouter = require("./routers/routes/rate");
app.use(rateRouter);

//Order Router
const orderRouter = require("./routers/routes/order");
app.use(orderRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});