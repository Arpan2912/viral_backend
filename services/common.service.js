const AppLogger = require("../config/app.logger");
const { common } = require("../constants/constant.message");

const commonMsg = common.defaultErrorMessage;
module.exports = class CommonService {
  static prepareSuccessResponse(message, data) {
    const obj = {
      data,
      message,
      success: true
    };
    return obj;
  }

  static prepareErrorResponse(message, data) {
    const obj = {
      data,
      message,
      success: false
    };
    return obj;
  }

  static logErrorAndSendResponse(e, res, data) {
    // const msg = e.msg ? e.msg : "commonMsg.defaultErrorMessage";
    const msg = e.msg ? e.msg : commonMsg.defaultErrorMessage;
    const code = e.code ? e.code : 500;
    // eslint-disable-next-line no-console
    console.error(e);
    if (e instanceof Error) {
      AppLogger.error(e);
    }
    const errorObj = CommonService.prepareErrorResponse(msg, data);
    return res.status(code).send(errorObj);
  }
};
