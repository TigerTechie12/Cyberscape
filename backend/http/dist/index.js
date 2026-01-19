import express from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const port = 3000;
app.use("/api/v1", Router);
app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map