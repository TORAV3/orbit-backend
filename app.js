const express = require("express");
const { validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models/index.model");

const { errorValidationResponse } = require("./configs/response");

const verifyToken = require("./middlewares/authMiddleware");

const {
  getAllCltbgroupController,
  getAllCltbgroupByIdController,
  postCltbgroupController,
  updateCltbgroupController,
  deleteCltbgroupByIdController,
} = require("./controllers/cltbgroup.controller");

const {
  getAllCltbcustController,
  getCltbcustByIdController,
  postCltbcustController,
  updateCltbcustController,
  deleteCltbcustByIdController,
} = require("./controllers/cltbcust.controller");

const { body } = require("express-validator");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const allowedOrigins = ["http://127.0.0.1:3001", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const router = express.Router();

router.get("/cltbgroup/data", getAllCltbgroupController);
router.get("/cltbgroup/data/:id", getAllCltbgroupByIdController);

router.post("/cltbgroup/tambah", (req, res) => {
  const startTime = Date.now();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const timeExecution = Date.now() - startTime;

    return errorValidationResponse(res, errors, timeExecution);
  }

  postCltbgroupController(req, res, startTime);
});

router.put("/cltbgroup/edit/:id", (req, res) => {
  const startTime = Date.now();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const timeExecution = Date.now() - startTime;

    return errorValidationResponse(res, errors, timeExecution);
  }

  updateCltbgroupController(req, res, startTime);
});

router.delete("/cltbgroup/delete/:id", deleteCltbgroupByIdController);

router.get("/cltbcust/data", getAllCltbcustController);
router.get("/cltbcust/data/:id", getCltbcustByIdController);

router.post(
  "/cltbcust/tambah",
  [body("csacc").notEmpty().withMessage("Account code is required")],
  (req, res) => {
    const startTime = Date.now();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorValidationResponse(res, errors, Date.now() - startTime);
    }
    postCltbcustController(req, res, startTime);
  }
);

router.put("/cltbcust/edit/:id", (req, res) => {
  const startTime = Date.now();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorValidationResponse(res, errors, Date.now() - startTime);
  }
  updateCltbcustController(req, res, startTime);
});

router.delete("/cltbcust/delete/:id", deleteCltbcustByIdController);

app.use("/orbit/api", router);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
