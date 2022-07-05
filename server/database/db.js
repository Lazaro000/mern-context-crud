import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error(error);
    }
};

mongoose.connection.on('connected', () => {
    console.log('Mongodb is connected to', mongoose.connection.db.databaseName);
});
