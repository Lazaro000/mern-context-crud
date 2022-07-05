import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import express from 'express';
// import { connectDB } from './database/db.js';
import { mongodb } from './database/tempDb.js';
import router from './routes/posts.routes.js';

dotenvConfig();

export const bootstrap = async () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    /**
     * * Normal connection to a database
     */
    // connectDB();

    /**
     * * Connection to a temporal database while dev
     */
    await mongodb();

    /**
     * Routes
     */
    app.use('/api', router);

    app.listen(process.env.PORT, () =>
        console.log(
            `Servidor levantado en el puerto ${process.env.PORT || 3000}`
        )
    );
};
