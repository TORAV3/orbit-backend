const { Sequelize } = require("sequelize");
const { cltbgroup } = require("../models/index.model");
const {
  badRequestResponse,
  successCreatedResponse,
  internalServerErrorResponse,
  notfoundResponse,
  successResponse,
} = require("../configs/response");
const { validationResult } = require("express-validator");

const getAllCltbgroupController = async (req, res) => {
  const startTime = Date.now();
  try {
    const cltbgroups = await cltbgroup.findAll();
    const timeExecution = Date.now() - startTime;
    return successResponse(res, cltbgroups, timeExecution);
  } catch (error) {
    console.error(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

const getAllCltbgroupByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const cltbgroupData = await cltbgroup.findOne({
      where: { cltbcust_cspickupzone: req.params.id },
    });
    if (!cltbgroupData) {
      return notfoundResponse(res, "Data not found", Date.now() - startTime);
    }
    return successResponse(res, cltbgroupData, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const postCltbgroupController = async (req, res, startTime) => {
  try {
    const newCltbgroup = await cltbgroup.create(req.body);
    return successCreatedResponse(res, newCltbgroup, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const updateCltbgroupController = async (req, res, startTime) => {
  try {
    const [updated] = await cltbgroup.update(req.body, {
      where: { cltbcust_cspickupzone: req.params.id },
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

const deleteCltbgroupByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const deleted = await cltbgroup.destroy({
      where: { cltbcust_cspickupzone: req.params.id },
    });
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
  getAllCltbgroupController,
  getAllCltbgroupByIdController,
  postCltbgroupController,
  updateCltbgroupController,
  deleteCltbgroupByIdController,
};
