const { Sequelize } = require("sequelize");
const {
  internalServerErrorResponse,
  successResponse,
  notfoundResponse,
  successCreatedResponse,
  badRequestResponse,
} = require("../configs/response");
const { cldtracehtrans } = require("../models/index.model");

const getAllAwbDataController = async (req, res) => {
  const startTime = Date.now();
  try {
    const awbs = await cldtracehtrans.findAll({
      attributes: [
        "trnnohawb",
        "cltbcust_csacc",
        "trndate",
        "trntypeofservice",
        "trntypeofpackage",
        "trnorg",
        "trndest",
        "trnsubdest",
        "trntotalcharge",
        "trntypeofpayment",
      ],
    });

    const timeExecution = Date.now() - startTime;
    return successResponse(res, awbs, timeExecution);
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

const getAwbDataByIdController = async (req, res) => {
  const startTime = Date.now();

  const { id } = req.params;

  try {
    const awbData = await cldtracehtrans.findOne({
      where: {
        trnnohawb: id,
      },
    });

    if (!awbData) {
      const timeExecution = Date.now() - startTime;
      return notfoundResponse(res, "AWB tidak ditemukan", timeExecution);
    }

    const timeExecution = Date.now() - startTime;
    return successResponse(res, awbData, timeExecution);
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

const addAwbController = async (req, res, startTime) => {
  Object.keys(req.body).forEach((key) => {
    if (req.body[key] === "") {
      req.body[key] = null;
    }
  });

  const {
    trnnohawb,
    cltbcust_csacc,
    trndate,
    trntypeofservice,
    trntypeofpackage,
    trnorg,
    trndest,
    trnsubdest,
    trntypeofpayment,
    trnweight,
    trnkoli,
    trndim_l,
    trndim_w,
    trndim_h,
    trnvalue,
    trnunit,
    trnpickupbyname,
    trnpickupdate,
    trnpickuptime,
    trnname,
    trnalm1,
    trnalm2,
    trnalm3,
    trncity,
    trnpost,
    trnfax,
    trnphone,
    trncontact,
    trnconsname,
    trnconsalm1,
    trnconsalm2,
    trnconsalm3,
    trnconscity,
    trnconspost,
    trnconsfax,
    trnconsphone,
    trnconscontact,
    trncharge1stkg,
    trnchargekg,
    trnchargepacking,
    trnchargeinsurance,
    trnchargeothers,
    trndisc,
    trndiscamount,
    trntotalcharge,
    trnspecialinstruction,
    trncustref,
    trninsuranceid,
  } = req.body;

  try {
    const countDimension = (trndim_h * trndim_l * trndim_w) / 6000;
    const maxcharge = trnweight < countDimension ? countDimension : trnweight;
    const trnchargeswt = Math.ceil(maxcharge);

    const awbCreated = await cldtracehtrans.create({
      trnnohawb,
      cltbcust_csacc,
      trndate,
      trntypeofservice,
      trntypeofpackage,
      trnorg,
      trndest,
      trnsubdest,
      trntypeofpayment,
      trnweight,
      trnkoli,
      trndim_l,
      trndim_w,
      trndim_h,
      trnvalue,
      trnunit,
      trnpickupbyname,
      trnpickupdate,
      trnpickuptime,
      trnname,
      trnalm1,
      trnalm2,
      trnalm3,
      trncity,
      trnpost,
      trnfax,
      trnphone,
      trncontact,
      trnconsname,
      trnconsalm1,
      trnconsalm2,
      trnconsalm3,
      trnconscity,
      trnconspost,
      trnconsfax,
      trnconsphone,
      trnconscontact,
      trncharge1stkg,
      trnchargekg,
      trnchargepacking,
      trnchargeinsurance,
      trnchargeothers,
      trndisc,
      trndiscamount,
      trntotalcharge,
      trnchargeswt,
      trnspecialinstruction,
      trncustref,
      trninsuranceid,
    });

    const timeExecution = Date.now() - startTime;
    return successCreatedResponse(
      res,
      "AWB berhasil didaftarkan",
      timeExecution
    );
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

const editAwbController = async (req, res, startTime) => {
  Object.keys(req.body).forEach((key) => {
    if (req.body[key] === "") {
      req.body[key] = null;
    }
  });

  const {
    trnnohawb,
    cltbcust_csacc,
    trndate,
    trntypeofservice,
    trntypeofpackage,
    trnorg,
    trndest,
    trnsubdest,
    trntypeofpayment,
    trnweight,
    trnkoli,
    trndim_l,
    trndim_w,
    trndim_h,
    trnvalue,
    trnunit,
    trnpickupbyname,
    trnpickupdate,
    trnpickuptime,
    trnname,
    trnalm1,
    trnalm2,
    trnalm3,
    trncity,
    trnpost,
    trnfax,
    trnphone,
    trncontact,
    trnconsname,
    trnconsalm1,
    trnconsalm2,
    trnconsalm3,
    trnconscity,
    trnconspost,
    trnconsfax,
    trnconsphone,
    trnconscontact,
    trncharge1stkg,
    trnchargekg,
    trnchargepacking,
    trnchargeinsurance,
    trnchargeothers,
    trndisc,
    trndiscamount,
    trntotalcharge,
    trnspecialinstruction,
    trncustref,
    trninsuranceid,
  } = req.body;

  const { id } = req.params;

  try {
    const awbData = await cldtracehtrans.findOne({
      attributes: ["trnnohawb"],
      where: {
        trnnohawb: id,
      },
    });

    if (!awbData) {
      const timeExecution = Date.now() - startTime;
      return notfoundResponse(res, "Data awb tidak ditemukan", timeExecution);
    }

    const countDimension = (trndim_h * trndim_l * trndim_w) / 6000;
    const maxcharge = trnweight < countDimension ? countDimension : trnweight;
    const trnchargeswt = Math.ceil(maxcharge);

    awbData.cltbcust_csacc = cltbcust_csacc;
    awbData.trndate = trndate;
    awbData.trntypeofservice = trntypeofservice;
    awbData.trntypeofpackage = trntypeofpackage;
    awbData.trnorg = trnorg;
    awbData.trndest = trndest;
    awbData.trnsubdest = trnsubdest;
    awbData.trntypeofpayment = trntypeofpayment;
    awbData.trnweight = trnweight;
    awbData.trnkoli = trnkoli;
    awbData.trndim_l = trndim_l;
    awbData.trndim_w = trndim_w;
    awbData.trndim_h = trndim_h;
    awbData.trnvalue = trnvalue;
    awbData.trnunit = trnunit;
    awbData.trnpickupbyname = trnpickupbyname;
    awbData.trnpickupdate = trnpickupdate;
    awbData.trnpickuptime = trnpickuptime;
    awbData.trnname = trnname;
    awbData.trnalm1 = trnalm1;
    awbData.trnalm2 = trnalm2;
    awbData.trnalm3 = trnalm3;
    awbData.trncity = trncity;
    awbData.trnpost = trnpost;
    awbData.trnfax = trnfax;
    awbData.trnphone = trnphone;
    awbData.trncontact = trncontact;
    awbData.trnconsname = trnconsname;
    awbData.trnconsalm1 = trnconsalm1;
    awbData.trnconsalm2 = trnconsalm2;
    awbData.trnconsalm3 = trnconsalm3;
    awbData.trnconscity = trnconscity;
    awbData.trnconspost = trnconspost;
    awbData.trnconsfax = trnconsfax;
    awbData.trnconsphone = trnconsphone;
    awbData.trnconscontact = trnconscontact;
    awbData.trncharge1stkg = trncharge1stkg;
    awbData.trnchargekg = trnchargekg;
    awbData.trnchargepacking = trnchargepacking;
    awbData.trnchargeinsurance = trnchargeinsurance;
    awbData.trnchargeothers = trnchargeothers;
    awbData.trndisc = trndisc;
    awbData.trndiscamount = trndiscamount;
    awbData.trntotalcharge = trntotalcharge;
    awbData.trnspecialinstruction = trnspecialinstruction;
    awbData.trncustref = trncustref;
    awbData.trninsuranceid = trninsuranceid;
    awbData.trnchargeswt = trnchargeswt;

    await awbData.save();

    const timeExecution = Date.now() - startTime;
    return successResponse(
      res,
      "Data AWB berhasil diperbaharui",
      timeExecution
    );
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

module.exports = {
  getAllAwbDataController,
  getAwbDataByIdController,
  addAwbController,
  editAwbController,
};
