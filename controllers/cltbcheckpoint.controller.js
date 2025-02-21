const { Sequelize } = require("sequelize");
const { cltbcheckpoint } = require("../models/index.model");
const {
  badRequestResponse,
  successCreatedResponse,
  internalServerErrorResponse,
  notfoundResponse,
  successResponse,
} = require("../configs/response");
const { validationResult } = require("express-validator");

const getCheckpointsByHAWBController = async (req, res) => {
  const startTime = Date.now();
  try {
    const checkpoints = await cltbcheckpoint.findAll({
      where: { checkhawb: req.params.hawb },
    });

    if (!checkpoints.length) {
      return notfoundResponse(
        res,
        "No checkpoints found for this HAWB",
        Date.now() - startTime
      );
    }

    return successResponse(res, checkpoints, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const postCheckpointController = async (req, res) => {
  const startTime = Date.now();
  try {
    const { checkhawb, checkdate, checktime, checkstatus, checkremarks } =
      req.body;

    if (!checkhawb || !checkdate || !checktime || !checkstatus) {
      return badRequestResponse(
        res,
        "Missing required fields",
        Date.now() - startTime
      );
    }

    const newCheckpoint = await cltbcheckpoint.create({
      checkhawb,
      checkdate,
      checktime,
      checkstatus,
      checkremarks,
    });

    return successCreatedResponse(res, newCheckpoint, Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

const deleteCheckpointController = async (req, res) => {
  const startTime = Date.now();
  try {
    const { checkid } = req.params;

    // Cek apakah checkpoint dengan ID yang diberikan ada di database
    const checkpoint = await cltbcheckpoint.findOne({ where: { checkid } });

    if (!checkpoint) {
      return notfoundResponse(
        res,
        "Checkpoint tidak ditemukan!",
        Date.now() - startTime
      );
    }

    // Hapus checkpoint
    await cltbcheckpoint.destroy({ where: { checkid } });

    return successResponse(
      res,
      "Checkpoint berhasil dihapus!",
      Date.now() - startTime
    );
  } catch (error) {
    console.error("Error deleting checkpoint:", error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

module.exports = {
  getCheckpointsByHAWBController,
  postCheckpointController,
  deleteCheckpointController,
};
