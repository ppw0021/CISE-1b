"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, },
    isAdmin: { type: Boolean, default: false, required: true },
    authToken: { type: String, required: true },
});
const User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map