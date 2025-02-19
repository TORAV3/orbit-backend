const { Sequelize } = require("sequelize");
const { cltbtlc } = require("../models/index.model");
const {
  badRequestResponse,
  successCreatedResponse,
  internalServerErrorResponse,
  notfoundResponse,
  successResponse,
} = require("../configs/response");
const { validationResult } = require("express-validator");

const getAllCltbtlcController = async (req, res) => {
  const startTime = Date.now();
  try {
    const tlcData = await cltbtlc.findAll();
    return successResponse(res, tlcData, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const getCltbtlcByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const tlcData = await cltbtlc.findOne({
      where: { tltlccode: req.params.id },
    });
    if (!tlcData) {
      return notfoundResponse(res, "Data not found", Date.now() - startTime);
    }
    return successResponse(res, tlcData, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const postCltbtlcController = async (req, res, startTime) => {
  try {
    const newTlc = await cltbtlc.create(req.body);
    return successCreatedResponse(res, newTlc, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const updateCltbtlcController = async (req, res, startTime) => {
  try {
    const [updated] = await cltbtlc.update(req.body, {
      where: { tltlccode: req.params.id },
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

const deleteCltbtlcByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const deleted = await cltbtlc.destroy({
      where: { tltlccode: req.params.id },
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
  getAllCltbtlcController,
  getCltbtlcByIdController,
  postCltbtlcController,
  updateCltbtlcController,
  deleteCltbtlcByIdController,
};
