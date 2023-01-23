"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: false
    },
    imageName: {
        type: String,
        imageName: true
    },
    categories: {
        type: [String],
        required: true
    },
    size: {
        type: [String],
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true
    },
    quantity: {
        type: Number,
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.ProductModel = (0, mongoose_1.model)("ProductModel", ProductSchema, "products");
