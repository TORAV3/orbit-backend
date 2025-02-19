const { Sequelize } = require("sequelize");
const { cltbtypeofpackage } = require("../models/index.model");
const {
  badRequestResponse,
  successCreatedResponse,
  internalServerErrorResponse,
  notfoundResponse,
  successResponse,
} = require("../configs/response");
const { validationResult } = require("express-validator");

const getAllCltbtypeofpackageController = async (req, res) => {
  const startTime = Date.now();
  try {
    const packages = await cltbtypeofpackage.findAll();
    return successResponse(res, packages, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const getCltbtypeofpackageByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const packageData = await cltbtypeofpackage.findOne({
      where: { pkid: req.params.id },
    });
    if (!packageData) {
      return notfoundResponse(res, "Data not found", Date.now() - startTime);
    }
    return successResponse(res, packageData, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const postCltbtypeofpackageController = async (req, res, startTime) => {
  try {
    const newPackage = await cltbtypeofpackage.create(req.body);
    return successCreatedResponse(res, newPackage, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const updateCltbtypeofpackageController = async (req, res, startTime) => {
  try {
    const [updated] = await cltbtypeofpackage.update(req.body, {
      where: { pkid: req.params.id },
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

const deleteCltbtypeofpackageByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const deleted = await cltbtypeofpackage.destroy({
      where: { pkid: req.params.id },
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
  getAllCltbtypeofpackageController,
  getCltbtypeofpackageByIdController,
  postCltbtypeofpackageController,
  updateCltbtypeofpackageController,
  deleteCltbtypeofpackageByIdController,
};
