"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var salt = "MakeThingsGoRight";
//hash password:
function hash(plainText) {
    if (!plainText)
        return null;
    var hashedText = crypto_1.default.createHmac("sha512", salt).update(plainText).digest("hex"); // hex ----> convert to string 
    return hashedText;
}
var secretKey = "KittensAreCute";
function getNewToken(user) {
    var payload = { user: user };
    var token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1d" });
    return token;
}
;
function verifyToken(authorizationHeader) {
    return new Promise(function (resolve, reject) {
        if (!authorizationHeader) {
            resolve(false);
            return;
        }
        ;
        var token = authorizationHeader.split(" ")[1];
        if (!token) {
            resolve(false);
            return;
        }
        jsonwebtoken_1.default.verify(token, secretKey, function (err) {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
}
;
function getUserFromToken(authorizationHeader) {
    var token = authorizationHeader.split(" ")[1];
    var payload = jsonwebtoken_1.default.decode(token);
    var user = payload.user;
    return user;
}
;
function extractUserId(authorizationHeader) {
    // If there is no authorization header: 
    if (!authorizationHeader) {
        console.log("no header");
        return null;
    }
    // Extract the token ("Bearer given-token"): 
    var token = authorizationHeader.split(" ")[1];
    // If there is no token: 
    if (!token) {
        console.log("no token");
        return null;
    }
    // Here we have a token: 
    var encodedObject = (0, jwt_decode_1.default)(token);
    return encodedObject.user;
}
exports.default = {
    getNewToken: getNewToken,
    verifyToken: verifyToken,
    getUserFromToken: getUserFromToken,
    hash: hash,
    extractUserId: extractUserId
};
