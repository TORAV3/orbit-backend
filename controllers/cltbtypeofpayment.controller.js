const { Sequelize } = require("sequelize");
const { cltbtypeofpayment } = require("../models/index.model");
const {
  badRequestResponse,
  successCreatedResponse,
  internalServerErrorResponse,
  notfoundResponse,
  successResponse,
} = require("../configs/response");
const { validationResult } = require("express-validator");

const getAllCltbtypeofpaymentController = async (req, res) => {
  const startTime = Date.now();
  try {
    const payments = await cltbtypeofpayment.findAll();
    return successResponse(res, payments, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const getCltbtypeofpaymentByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const paymentData = await cltbtypeofpayment.findOne({
      where: { pyid: req.params.id },
    });
    if (!paymentData) {
      return notfoundResponse(res, "Data not found", Date.now() - startTime);
    }
    return successResponse(res, paymentData, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const postCltbtypeofpaymentController = async (req, res, startTime) => {
  try {
    const newPayment = await cltbtypeofpayment.create(req.body);
    return successCreatedResponse(res, newPayment, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const updateCltbtypeofpaymentController = async (req, res, startTime) => {
  try {
    const [updated] = await cltbtypeofpayment.update(req.body, {
      where: { pyid: req.params.id },
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

const deleteCltbtypeofpaymentByIdController = async (req, res) => {
  const startTime = Date.now();
  try {
    const deleted = await cltbtypeofpayment.destroy({
      where: { pyid: req.params.id },
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
  getAllCltbtypeofpaymentController,
  getCltbtypeofpaymentByIdController,
  postCltbtypeofpaymentController,
  updateCltbtypeofpaymentController,
  deleteCltbtypeofpaymentByIdController,
};
