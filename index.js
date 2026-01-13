import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json());

// Connection MongoDB
import mongoose from "mongoose";

import helmet from "helmet"
import { limiter } from "./middleWares/rateLimit.js";
import { swaggerSpec } from "./utils/swagger.js";
import swaggerUi from "swagger-ui-express";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import taskRoutes from "./routes/tasks.js"

import { loggers } from "./middleWares/loggers.js";
import { notFound } from "./middleWares/notFound.js";
import { globalErrHandler } from "./middleWares/globalErrHandler.js";
import morgan from "morgan";

app.use(loggers);
app.use(helmet())
app.use(limiter)

if(process.env.NODE_ENV == "development"){
  app.use(morgan('dev'))
}

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use('/admin', adminRoutes)
app.use('/tasks', taskRoutes)


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Route Errors-Level Middleware
app.use(notFound);

// Last middleware executed
app.use(globalErrHandler);




// ################################ PRACTICE START ##############################################



// practice imports
// import pracUserRoutes from "./Practice/routes/users.js";
// import pracAuthRoutes from "./Practice/routes/auth.js"
// import adminRoutes from "./Practice/routes/admin.js"
// import uploadRoutes from "./Practice/routes/uploads.js"
// import tasksRoutes from "./Practice/routes/tasks.js"

// import { notFound } from "./Practice/middlewares/notFound.js";
// import { logger } from "./Practice/middlewares/logger.js";
// import { globalErrHandler } from "./Practice/middlewares/globalErrorHandler.js";

// import helmet from "helmet";
// import { limiter } from "./Practice/middlewares/rateLimiter.js";
// import { swaggerSpec } from "./Practice/utils/swagger.js";
// import swaggerUi from 'swagger-ui-express'



// app.use(logger)

// app.use(helmet())
// app.use(limiter)

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Practice Routes
// app.use("/users", pracUserRoutes);
// app.use("/auth", pracAuthRoutes);
// app.use("/admin", adminRoutes);
// app.use("/uploads", uploadRoutes);
// app.use("/tasks", tasksRoutes);



// // ROUTE ERRORS
// app.use(notFound);

// // last middleware
// app.use(globalErrHandler)

// ################################ PRACTICE END ##############################################

mongoose
  .connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
  .then(() => console.log("connection Successfull"))
  .catch((err) => console.log("connection Failed: ", err));


app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
