"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
var user_model_1 = require("./user-model");
var mongoose_1 = require("mongoose");
var CartSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    products: [{
            _id: {
                type: mongoose_1.Schema.Types.ObjectId,
            },
            quantity: {
                type: Number,
                default: 1
            },
            size: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            imageName: {
                type: String,
                required: true
            },
        }],
    isOpen: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    timestamps: true // Create createdAt and updatedAt fields
});
// Virtual Fields:
CartSchema.virtual("user", {
    ref: user_model_1.UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});
exports.CartModel = (0, mongoose_1.model)("CartModel", CartSchema, "carts");
