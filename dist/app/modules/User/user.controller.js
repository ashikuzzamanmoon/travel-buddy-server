"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, profile } = req.body;
    const user = yield user_service_1.userServices.registerUser(name, email, password, profile);
    // Exclude password from the response
    const { password: _ } = user, userData = __rest(user, ["password"]);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "User registered successfully",
        data: userData,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_service_1.userServices.loginUser(email, password);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: user,
    });
}));
exports.userController = {
    registerUser,
    loginUser,
};
