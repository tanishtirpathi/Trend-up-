import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import AuthRouter from "./routes/auth.route.js";
import MessageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app ,server} from "./config/socket.js"
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";


//imports till here
dotenv.config({
  path: "../env",
});

//cors issue
app.use(
  cors({
    origin: ["https://trend-up.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// other things 
app.use(helmet());//for sec
app.use(compression());// for fast json data like compression type 
app.use(morgan("dev"));// for good visibility 


// rate limits 
app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 requests per IP
  message: {
    status: 429,
    message: "Too many requests. Try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);


// just for json data
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

//useless work
connectDB(); //database connection;
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/auth", AuthRouter); //authentication routes
app.use("/api/messages", MessageRoute); //Message routes
app.get("/", (req, res) => {
  res.send("Backend is alive 🚀");
});//healthCheck 

//error handling global 
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

//real time 
server.listen(PORT, () => {
  console.log(`server is running here : http://localhost:${PORT}`);
});

//for not real time 
// app.listen(PORT, () => {
//   console.log(`server is running here : http://localhost:${PORT}`);
// });
