"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    accessToken: {
        type: String,
        required: false
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)("UserModel", UserSchema, "users");
