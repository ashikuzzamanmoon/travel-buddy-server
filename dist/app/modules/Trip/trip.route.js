"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRoutes = void 0;
const express_1 = __importDefault(require("express"));
// Assuming you have authentication middleware
const trip_controller_1 = require("./trip.controller");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const validateRequest_1 = __importDefault(require("../../middleWare/validateRequest"));
const trip_validation_1 = require("./trip.validation");
const router = express_1.default.Router();
router.post("/trips", (0, auth_1.default)(), (0, validateRequest_1.default)(trip_validation_1.tripValidation.createTripValidation), trip_controller_1.tripController.createTrip);
router.get("/trips", trip_controller_1.tripController.getFilteredTrips);
router.post("/trip/:tripId/request", (0, auth_1.default)(), trip_controller_1.tripController.sendTravelBuddyRequest);
router.get("/travel-buddies/:tripId", (0, auth_1.default)(), trip_controller_1.tripController.getPotentialTravelBuddies);
router.put("/travel-buddies/:buddyId/respond", (0, auth_1.default)(), trip_controller_1.tripController.respondToTravelBuddyRequest);
exports.tripRoutes = router;
