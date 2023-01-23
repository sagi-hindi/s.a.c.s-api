"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var user_model_1 = require("./user-model");
var mongoose_1 = require("mongoose");
var OrderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    products: [{
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: "pending" }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    timestamps: true // Create createdAt and updatedAt fields
});
// Virtual Fields:
OrderSchema.virtual("user", {
    ref: user_model_1.UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});
exports.OrderModel = (0, mongoose_1.model)("OrderModel", OrderSchema, "orders");
