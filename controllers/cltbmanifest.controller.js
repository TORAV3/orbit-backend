const {
  internalServerErrorResponse,
  successResponse,
  notfoundResponse,
  successCreatedResponse,
  badRequestResponse,
} = require("../configs/response");
const { cltbmanifest, cltbdmanifest, cldtracehtrans, cltbtlc } = require("../models/index.model");

const getAllManifestDataController = async (req, res) => {
  const startTime = Date.now();
  try {
    const manifests = await cltbmanifest.findAll({
      include: [
        {
          model: cltbtlc,
        },
      ],
    });

    const timeExecution = Date.now() - startTime;
    return successResponse(res, manifests, timeExecution);
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

const getManifestDataByIdController = async (req, res) => {
  const startTime = Date.now();

  const { id } = req.params;

  try {
    const manifestData = await cltbmanifest.findOne({
      where: {
        mnfid: id,
      },
    });

    if (!manifestData) {
      const timeExecution = Date.now() - startTime;
      return notfoundResponse(res, "Manifest tidak ditemukan", timeExecution);
    }

    const timeExecution = Date.now() - startTime;
    return successResponse(res, manifestData, timeExecution);
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

const addManifestController = async (req, res, startTime) => {
  Object.keys(req.body).forEach((key) => {
    if (req.body[key] === "") {
      req.body[key] = null;
    }
  });

  const {
    mnfid,
    mnfdate,
    mnftlcorg,
    mnftlcdst,
    mnfmoda,
    mnftypearmada,
    mnfvendordelivery,
    mnfplatno,
    mnfpic,
    mnfphone,
    mnfremark,
    awbs,
  } = req.body;

  try {
    await cltbmanifest.create({
      mnfid,
      mnfdate,
      mnftlcorg,
      mnftlcdst,
      mnfmoda,
      mnftypearmada,
      mnfvendordelivery,
      mnfplatno,
      mnfpic,
      mnfphone,
      mnfremark,
    });

    let failedAWBs = [];

    await Promise.all(
      awbs.map(async (awb) => {
        try {
          await cltbdmanifest.create({
            cltbmanifest_mnfid: mnfid,
            cldtracehtrans_trnnohawb: awb,
          });

          const awbData = await cldtracehtrans.findOne({
            attributes: ["trnnohawb"],
            where: { trnnohawb: awb },
          });

          awbData.cltbmanifest_mnfid = mnfid;
          await awbData.save();
        } catch (error) {
          console.log(`Error ketika menyimpan hawb: ${awb}`, error);
          failedAWBs.push(awb);
        }
      })
    );

    const timeExecution = Date.now() - startTime;

    if (failedAWBs.length > 0) {
      return res.status(207).json({
        message:
          "Manifest berhasil disimpan, tetapi terdapat beberapa HAWB yang gagal didaftarkan",
        failedAWBs,
        executionTime: timeExecution,
      });
    }

    return successCreatedResponse(
      res,
      "Manifest berhasil disimpan dan keseluruhan HAWB berhasil didaftarkan",
      timeExecution
    );
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

const deleteManifestController = async (req, res) => {
  const startTime = Date.now();
  try {
    const deleted = await cltbmanifest.destroy({
      attributes: ["mnfid"],
      where: { mnfid: req.params.id },
    });
    if (!deleted) {
      return notfoundResponse(
        res,
        "Manifest tidak ditemukan",
        Date.now() - startTime
      );
    }
    return successResponse(res, "Manifest berhasil dihapus", Date.now() - startTime);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, Date.now() - startTime);
  }
};

module.exports = {
  addManifestController,
  getAllManifestDataController,
  getManifestDataByIdController,
  deleteManifestController
};
