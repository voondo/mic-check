var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var requestMediaPermissions_exports = {};
__export(requestMediaPermissions_exports, {
  MediaPermissionsErrorType: () => MediaPermissionsErrorType,
  requestAudioPermissions: () => requestAudioPermissions,
  requestMediaPermissions: () => requestMediaPermissions,
  requestVideoPermissions: () => requestVideoPermissions
});
module.exports = __toCommonJS(requestMediaPermissions_exports);
var import_bowser = __toESM(require("bowser"));
var MediaPermissionsErrorType;
(function(MediaPermissionsErrorType2) {
  MediaPermissionsErrorType2["SystemPermissionDenied"] = "SystemPermissionDenied";
  MediaPermissionsErrorType2["UserPermissionDenied"] = "UserPermissionDenied";
  MediaPermissionsErrorType2["CouldNotStartVideoSource"] = "CouldNotStartVideoSource";
  MediaPermissionsErrorType2["Generic"] = "Generic";
})(MediaPermissionsErrorType || (MediaPermissionsErrorType = {}));
const requestMediaPermissions = (constraints) => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia(constraints != null ? constraints : { audio: true, video: true }).then((stream) => {
      stream.getTracks().forEach((t) => {
        t.stop();
      });
      resolve(true);
    }).catch((err) => {
      const browser = import_bowser.default.getParser(window.navigator.userAgent);
      const browserName = browser.getBrowserName();
      const errName = err.name;
      const errMessage = err.message;
      let errorType = MediaPermissionsErrorType.Generic;
      if (browserName === "Chrome") {
        if (errName === "NotAllowedError") {
          if (errMessage === "Permission denied by system") {
            errorType = MediaPermissionsErrorType.SystemPermissionDenied;
          } else if (errMessage === "Permission denied" || errMessage === "Permission dismissed") {
            errorType = MediaPermissionsErrorType.UserPermissionDenied;
          }
        } else if (errName === "NotReadableError") {
          errorType = MediaPermissionsErrorType.CouldNotStartVideoSource;
        }
      } else if (browserName === "Safari") {
        if (errName === "NotAllowedError") {
          errorType = MediaPermissionsErrorType.UserPermissionDenied;
        }
      } else if (browserName === "Microsoft Edge") {
        if (errName === "NotAllowedError") {
          errorType = MediaPermissionsErrorType.UserPermissionDenied;
        } else if (errName === "NotReadableError") {
          errorType = MediaPermissionsErrorType.CouldNotStartVideoSource;
        }
      } else if (browserName === "Firefox") {
        if (errName === "NotFoundError") {
          errorType = MediaPermissionsErrorType.SystemPermissionDenied;
        } else if (errName === "NotReadableError") {
          errorType = MediaPermissionsErrorType.SystemPermissionDenied;
        } else if (errName === "NotAllowedError") {
          errorType = MediaPermissionsErrorType.UserPermissionDenied;
        } else if (errName === "AbortError") {
          errorType = MediaPermissionsErrorType.CouldNotStartVideoSource;
        }
      }
      reject({
        type: errorType,
        name: err.name,
        message: err.message
      });
    });
  });
};
const requestAudioPermissions = () => requestMediaPermissions({ audio: true, video: false });
const requestVideoPermissions = () => requestMediaPermissions({ audio: false, video: true });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaPermissionsErrorType,
  requestAudioPermissions,
  requestMediaPermissions,
  requestVideoPermissions
});
//# sourceMappingURL=requestMediaPermissions.js.map
