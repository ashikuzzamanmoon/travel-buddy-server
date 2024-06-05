"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripValidation = void 0;
const zod_1 = require("zod");
const createTripValidation = zod_1.z.object({
    destination: zod_1.z.string().min(1, "Destination is required"),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    budget: zod_1.z.number().min(0, "Budget must be a positive number"),
    activities: zod_1.z.array(zod_1.z.string()).min(1, "At least one activity is required"),
});
exports.tripValidation = { createTripValidation };
