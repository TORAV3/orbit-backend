const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const {
  badRequestResponse,
  successCreatedResponse,
  internalServerErrorResponse,
  notfoundResponse,
  successResponse,
} = require("../configs/response");
const { cltbuser, cltbduser, cltbrole } = require("../models/index.model");

const loginController = async (req, res, startTime) => {
  const { username, password } = req.body;

  try {
    const userData = await cltbuser.findOne({
      where: {
        usrid: username,
      },
    });

    if (!userData) {
      const timeExecution = Date.now() - startTime;
      return notfoundResponse(res, "Akun belum terdaftar", timeExecution);
    }

    const token = jwt.sign(
      {
        id: userData.dataValues.usrid,
      },
      process.env.JWTSECRET,
      {
        expiresIn: "1h",
      }
    );

    const timeExecution = Date.now() - startTime;
    return successResponse(res, token, timeExecution);
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

const getLoginDataController = async (req, res) => {
  const startTime = Date.now();

  const { id } = req.userLoginData;

  try {
    const userData = await cltbuser.findOne({
      where: {
        usrid: id,
      },
      include: [
        {
          model: cltbduser,
        },
        {
          model: cltbrole,
        },
      ],
    });

    if (!userData) {
      const timeExecution = Date.now() - startTime;
      return notfoundResponse(res, "User tidak ditemukan", timeExecution);
    } else if (userData.usrstatus === "0") {
      const timeExecution = Date.now() - startTime;
      return badRequestResponse(
        res,
        "Akun inactive, hubungi admin utama",
        timeExecution
      );
    }

    const timeExecution = Date.now() - startTime;
    return successResponse(res, userData, timeExecution);
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

module.exports = {
  loginController,
  getLoginDataController,
};
