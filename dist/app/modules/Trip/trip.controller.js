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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const trip_service_1 = require("./trip.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../shared/pick"));
const trip_constant_1 = require("./trip.constant");
const http_status_1 = __importDefault(require("http-status"));
const createTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure req.user is defined and contains userId
    const { userId } = req.user;
    if (!userId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized: User ID not found",
        });
        return;
    }
    const { destination, startDate, endDate, budget, activities } = req.body;
    const trip = yield trip_service_1.tripServices.createTrip(userId, destination, startDate, endDate, budget, activities);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Trip created successfully",
        data: trip,
    });
}));
const getFilteredTrips = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, trip_constant_1.tripFilterAbleFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield trip_service_1.tripServices.getFilteredTrips(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trips retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const sendTravelBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const { userId } = req.body;
    const request = yield trip_service_1.tripServices.sendTravelBuddyRequest(tripId, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Travel buddy request sent successfully",
        data: request,
    });
}));
const getPotentialTravelBuddies = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const potentialBuddies = yield trip_service_1.tripServices.getPotentialTravelBuddies(tripId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Potential travel buddies retrieved successfully",
        data: potentialBuddies,
    });
}));
const respondToTravelBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buddyId } = req.params;
    const { status } = req.body;
    const updatedRequest = yield trip_service_1.tripServices.respondToTravelBuddyRequest(buddyId, status);
    if (!updatedRequest) {
        res.status(404).json({
            success: false,
            message: "Travel buddy request not found.",
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Travel buddy request responded successfully",
        data: updatedRequest,
    });
}));
exports.tripController = {
    createTrip,
    getFilteredTrips,
    sendTravelBuddyRequest,
    getPotentialTravelBuddies,
    respondToTravelBuddyRequest,
};
