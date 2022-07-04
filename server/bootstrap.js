import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import { mongodb } from './database/mongodb.js';

dotenvConfig();

export const bootstrap = async () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    /**
     * * Normal connection to a database
     */
    // await mongoose.connect(process.env.MONGODB_URI, {
    //     connectTimeoutMS: 4000,
    // });

    /**
     * * Connection to a temporal database while dev
     */
    await mongodb();

    app.listen(process.env.PORT, () =>
        console.log(
            `Servidor levantado en el puerto ${process.env.PORT || 3000}`
        )
    );
};
