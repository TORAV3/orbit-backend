const { Sequelize } = require("sequelize");
const { cldtsrv } = require("../models/index.model");
const {
  badRequestResponse,
  successCreatedResponse,
  internalServerErrorResponse,
  notfoundResponse,
  successResponse,
} = require("../configs/response");
const { validationResult } = require("express-validator");

const getAllCldtsrvController = async (req, res) => {
  const startTime = Date.now();
  try {
    const services = await cldtsrv.findAll();
    return successResponse(res, services, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const getCldtsrvByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const serviceData = await cldtsrv.findOne({
      where: { svsrv: req.params.id },
    });
    if (!serviceData) {
      return notfoundResponse(res, "Data not found", Date.now() - startTime);
    }
    return successResponse(res, serviceData, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const postCldtsrvController = async (req, res, startTime) => {
  try {
    const newService = await cldtsrv.create(req.body);
    return successCreatedResponse(res, newService, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const updateCldtsrvController = async (req, res, startTime) => {
  try {
    const [updated] = await cldtsrv.update(req.body, {
      where: { svsrv: req.params.id },
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

const deleteCldtsrvByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const deleted = await cldtsrv.destroy({ where: { svsrv: req.params.id } });
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
  getAllCldtsrvController,
  getCldtsrvByIdController,
  postCldtsrvController,
  updateCldtsrvController,
  deleteCldtsrvByIdController,
};
