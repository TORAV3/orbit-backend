const {
  internalServerErrorResponse,
  successResponse,
  notfoundResponse,
  successCreatedResponse,
  badRequestResponse,
} = require("../configs/response");
const { cltbmanifest, cltbdmanifest, cldtracehtrans, cltbtlc } = require("../models/index.model");

const getAllManifestDetailByManifestIdController = async (req, res) => {
  const startTime = Date.now();

  const { id } = req.params;
  
  try {
    const mdets = await cltbdmanifest.findAll({
      where: {
        cltbmanifest_mnfid: id,
      },
    });

    const timeExecution = Date.now() - startTime;
    return successResponse(res, mdets, timeExecution);
  } catch (error) {
    console.log(error);
    const timeExecution = Date.now() - startTime;
    return internalServerErrorResponse(res, timeExecution);
  }
};

module.exports = {
  getAllManifestDetailByManifestIdController,
};
