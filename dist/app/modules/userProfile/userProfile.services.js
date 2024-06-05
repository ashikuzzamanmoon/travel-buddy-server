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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        return null;
    }
    const userProfile = yield prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return userProfile;
});
const updateUserProfile = (userId, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProfile = yield prisma.user.update({
            where: { id: userId },
            data: { name, email },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updatedProfile;
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        return null;
    }
});
exports.userProfileService = {
    getUserProfile,
    updateUserProfile,
};
