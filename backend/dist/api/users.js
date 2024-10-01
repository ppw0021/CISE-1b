"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = require("../utils/dbConnect");
const User_1 = require("../models/User");
const handler = async (req, res) => {
    await (0, dbConnect_1.default)();
    const { method } = req;
    switch (method) {
        case 'GET':
            try {
                const users = await User_1.default.find({});
                res.status(200).json({ success: true, data: users });
            }
            catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
    }
};
exports.default = handler;
//# sourceMappingURL=users.js.map