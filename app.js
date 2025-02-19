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
  getAllAwbDataController,
  getAwbDataByIdController,
  addAwbController,
  editAwbController,
  deleteAwbController,
} = require("./controllers/awb.controller");

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

const {
  getAllCltbtypeofpaymentController,
  getCltbtypeofpaymentByIdController,
  postCltbtypeofpaymentController,
  updateCltbtypeofpaymentController,
  deleteCltbtypeofpaymentByIdController,
} = require("./controllers/cltbtypeofpayment.controller");

const {
  getAllCltbtypeofpackageController,
  getCltbtypeofpackageByIdController,
  postCltbtypeofpackageController,
  updateCltbtypeofpackageController,
  deleteCltbtypeofpackageByIdController,
} = require("./controllers/cltbtypeofpackage.controller");

const {
  getAllCldtsrvController,
  getCldtsrvByIdController,
  postCldtsrvController,
  updateCldtsrvController,
  deleteCldtsrvByIdController,
} = require("./controllers/cldtsrv.controller");

const {
  getAllCltbtlcController,
  getCltbtlcByIdController,
  postCltbtlcController,
  updateCltbtlcController,
  deleteCltbtlcByIdController,
} = require("./controllers/cltbtlc.controller");

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

router.get("/master/groupcustomer/data", getAllCltbgroupController);
router.get("/master/groupcustomer/data/:id", getAllCltbgroupByIdController);
router.post("/master/groupcustomer/tambah", (req, res) => {
  const startTime = Date.now();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const timeExecution = Date.now() - startTime;

    return errorValidationResponse(res, errors, timeExecution);
  }

  postCltbgroupController(req, res, startTime);
});

router.put("/master/groupcustomer/edit/:id", (req, res) => {
  const startTime = Date.now();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const timeExecution = Date.now() - startTime;

    return errorValidationResponse(res, errors, timeExecution);
  }

  updateCltbgroupController(req, res, startTime);
});

router.delete(
  "/master/groupcustomer/delete/:id",
  deleteCltbgroupByIdController
);

router.get("/master/customer/data", getAllCltbcustController);
router.get("/master/customer/data/:id", getCltbcustByIdController);

router.post(
  "/master/customer/tambah",
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

router.put("/master/customer/edit/:id", (req, res) => {
  const startTime = Date.now();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorValidationResponse(res, errors, Date.now() - startTime);
  }
  updateCltbcustController(req, res, startTime);
});

router.delete("/master/customer/delete/:id", deleteCltbcustByIdController);

router.get("/master/typepayment/data", getAllCltbtypeofpaymentController);
router.get("/master/typepayment/data/:id", getCltbtypeofpaymentByIdController);

router.post(
  "/master/typepayment/tambah",
  [body("pyid").notEmpty().withMessage("Payment ID is required")],
  (req, res) => {
    const startTime = Date.now();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorValidationResponse(res, errors, Date.now() - startTime);
    }
    postCltbtypeofpaymentController(req, res, startTime);
  }
);

router.put("/master/typepayment/edit/:id", (req, res) => {
  const startTime = Date.now();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorValidationResponse(res, errors, Date.now() - startTime);
  }
  updateCltbtypeofpaymentController(req, res, startTime);
});

router.delete(
  "/master/typepayment/delete/:id",
  deleteCltbtypeofpaymentByIdController
);

router.get("/master/typepackage/data", getAllCltbtypeofpackageController);
router.get("/master/typepackage/data/:id", getCltbtypeofpackageByIdController);

router.post(
  "/master/typepackage/tambah",
  [body("pkid").notEmpty().withMessage("Package ID is required")],
  (req, res) => {
    const startTime = Date.now();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorValidationResponse(res, errors, Date.now() - startTime);
    }
    postCltbtypeofpackageController(req, res, startTime);
  }
);

router.put("/master/typepackage/edit/:id", (req, res) => {
  const startTime = Date.now();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorValidationResponse(res, errors, Date.now() - startTime);
  }
  updateCltbtypeofpackageController(req, res, startTime);
});

router.delete(
  "/master/typepackage/delete/:id",
  deleteCltbtypeofpackageByIdController
);

router.get("/master/service/data", getAllCldtsrvController);
router.get("/master/service/data/:id", getCldtsrvByIdController);

router.post(
  "/master/service/tambah",
  [body("svsrv").notEmpty().withMessage("Service ID is required")],
  (req, res) => {
    const startTime = Date.now();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorValidationResponse(res, errors, Date.now() - startTime);
    }
    postCldtsrvController(req, res, startTime);
  }
);

router.put("/master/service/edit/:id", (req, res) => {
  const startTime = Date.now();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorValidationResponse(res, errors, Date.now() - startTime);
  }
  updateCldtsrvController(req, res, startTime);
});

router.delete("/master/service/delete/:id", deleteCldtsrvByIdController);

router.get("/master/tlc/data", getAllCltbtlcController);
router.get("/master/tlc/data/:id", getCltbtlcByIdController);

router.post(
  "/master/tlc/tambah",
  [body("tltlccode").notEmpty().withMessage("TLC Code is required")],
  (req, res) => {
    const startTime = Date.now();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorValidationResponse(res, errors, Date.now() - startTime);
    }
    postCltbtlcController(req, res, startTime);
  }
);

router.put("/master/tlc/edit/:id", (req, res) => {
  const startTime = Date.now();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorValidationResponse(res, errors, Date.now() - startTime);
  }
  updateCltbtlcController(req, res, startTime);
});

router.delete("/master/tlc/delete/:id", deleteCltbtlcByIdController);

router.get("/transaksi/awb/data", getAllAwbDataController);
router.get("/transaksi/awb/data/byid/:id", getAwbDataByIdController);
router.post("/transaksi/awb/tambah", (req, res) => {
  const startTime = Date.now();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorValidationResponse(res, errors, Date.now() - startTime);
  }
  addAwbController(req, res, startTime);
});
router.put("/transaksi/awb/edit/:id", (req, res) => {
  const startTime = Date.now();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorValidationResponse(res, errors, Date.now() - startTime);
  }
  editAwbController(req, res, startTime);
});
router.delete("/transaksi/awb/delete/byid/:id", deleteAwbController);

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
