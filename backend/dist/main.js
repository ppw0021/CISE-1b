"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("mongoose");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    try {
        const connection = await (0, mongoose_1.connect)(process.env.DB_URI);
        console.log('Connected to MongoDB:', connection.connection.name);
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
    app.enableCors({ origin: true, credentials: true });
    const port = process.env.PORT || 8082;
    await app.listen(8082);
    console.log('Nest application is running on: http://localhost:8082');
}
bootstrap();
//# sourceMappingURL=main.js.map