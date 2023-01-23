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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_model_1 = require("./../03-models/order-model");
var error_model_1 = __importDefault(require("../03-models/error-model"));
function createOrder(order) {
    return __awaiter(this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            error = order.validateSync();
            if (error)
                throw new error_model_1.default(400, error.message);
            return [2 /*return*/, order_model_1.OrderModel.create(order)];
        });
    });
}
function deleteOrder(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.OrderModel.findByIdAndDelete({ _id: _id }).exec()];
                case 1:
                    deletedOrder = _a.sent();
                    if (!deletedOrder)
                        throw new error_model_1.default(404, "Order not found");
                    return [2 /*return*/];
            }
        });
    });
}
function getUserOrders(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.OrderModel.find({ userId: userId }).exec()];
                case 1:
                    orders = _a.sent();
                    return [2 /*return*/, orders];
            }
        });
    });
}
function updateOrder(order) {
    return __awaiter(this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            error = order.validateSync();
            if (error)
                throw new error_model_1.default(400, error.message);
            return [2 /*return*/, order_model_1.OrderModel.findByIdAndUpdate(order._id, order, { new: true }).exec()];
        });
    });
}
function getAllOrders() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, order_model_1.OrderModel.find({}).exec()];
        });
    });
}
function getIncome() {
    return __awaiter(this, void 0, void 0, function () {
        var date, lastMonth, previousMonth, income;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = new Date();
                    lastMonth = new Date(date.setMonth(date.getMonth() - 1));
                    previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
                    return [4 /*yield*/, order_model_1.OrderModel.aggregate([
                            { $match: { createdAt: { $gte: previousMonth } } },
                            { $project: {
                                    month: { $month: "$createdAt" },
                                    sales: '$amount',
                                } },
                            { $group: {
                                    _id: "$month",
                                    total: { $sum: '$sales' }
                                } },
                        ])];
                case 1:
                    income = _a.sent();
                    return [2 /*return*/, income];
            }
        });
    });
}
exports.default = {
    updateOrder: updateOrder,
    createOrder: createOrder,
    deleteOrder: deleteOrder,
    getUserOrders: getUserOrders,
    getAllOrders: getAllOrders,
    getIncome: getIncome
};
