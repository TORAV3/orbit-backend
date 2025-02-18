const { Sequelize } = require("sequelize");
const { cltbcust } = require("../models/index.model");
const {
  badRequestResponse,
  successCreatedResponse,
  internalServerErrorResponse,
  notfoundResponse,
  successResponse,
} = require("../configs/response");
const { validationResult } = require("express-validator");

const getAllCltbcustController = async (req, res) => {
  const startTime = Date.now();
  try {
    const cltbcusts = await cltbcust.findAll();
    const timeExecution = Date.now() - startTime;
    return successResponse(res, cltbcusts, timeExecution);
  } catch (error) {
    console.error(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

const getCltbcustByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const cltbcustData = await cltbcust.findOne({
      where: { csacc: req.params.id },
    });
    if (!cltbcustData) {
      return notfoundResponse(res, "Data not found", Date.now() - startTime);
    }
    return successResponse(res, cltbcustData, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const postCltbcustController = async (req, res, startTime) => {
  try {
    const newCltbcust = await cltbcust.create(req.body);
    return successCreatedResponse(res, newCltbcust, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const updateCltbcustController = async (req, res, startTime) => {
  try {
    const [updated] = await cltbcust.update(req.body, {
      where: { csacc: req.params.id },
    });
    if (!updated) {
      return notfoundResponse(res, "Data not found", Date.now() - startTime);
    }
    return successResponse(
      res,
      "Data updated successfully",
      Date.now() - startTime
    );
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const deleteCltbcustByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const deleted = await cltbcust.destroy({ where: { csacc: req.params.id } });
    if (!deleted) {
      return notfoundResponse(res, "Data not found", Date.now() - startTime);
    }
    return successResponse(
      res,
      "Data deleted successfully",
      Date.now() - startTime
    );
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

module.exports = {
  getAllCltbcustController,
  getCltbcustByIdController,
  postCltbcustController,
  updateCltbcustController,
  deleteCltbcustByIdController,
};
