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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripServices = void 0;
const client_1 = require("@prisma/client");
const trip_constant_1 = require("./trip.constant");
const prisma = new client_1.PrismaClient();
const createTrip = (userId, destination, startDate, endDate, budget, activities) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield prisma.trip.create({
        data: {
            userId,
            destination,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            budget,
            activities,
        },
    });
    return trip;
});
const getFilteredTrips = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    // Calculate pagination parameters
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;
    // Destructure filter parameters
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    // Build where conditions based on filter parameters
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: trip_constant_1.tripSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        const { destination, startDate, endDate, budget } = filterData;
        // Build filter conditions
        if (destination) {
            andCondition.push({ destination: { contains: destination } });
        }
        if (startDate) {
            andCondition.push({ startDate: { gte: new Date(startDate) } });
        }
        if (endDate) {
            andCondition.push({ endDate: { lte: new Date(endDate) } });
        }
        if (budget && (budget.minBudget || budget.maxBudget)) {
            andCondition.push({
                budget: {
                    gte: budget.minBudget,
                    lte: budget.maxBudget,
                },
            });
        }
    }
    // Construct final where condition
    const whereConditions = { AND: andCondition };
    // Retrieve paginated and filtered trips
    const result = yield prisma.trip.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [options.sortBy || "createdAt"]: options.sortOrder || "desc",
        },
    });
    // Get total count of filtered trips
    const total = yield prisma.trip.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const sendTravelBuddyRequest = (tripId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield prisma.travelBuddyRequest.create({
        data: {
            tripId,
            userId,
            status: "PENDING",
        },
    });
    return request;
});
const getPotentialTravelBuddies = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const potentialBuddies = yield prisma.travelBuddyRequest.findMany({
        where: {
            tripId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    return potentialBuddies;
});
const respondToTravelBuddyRequest = (buddyId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRequest = yield prisma.travelBuddyRequest.update({
        where: {
            id: buddyId,
        },
        data: {
            status,
            updatedAt: new Date(),
        },
    });
    return updatedRequest;
});
exports.tripServices = {
    createTrip,
    getFilteredTrips,
    sendTravelBuddyRequest,
    getPotentialTravelBuddies,
    respondToTravelBuddyRequest,
};
