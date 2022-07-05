import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

export const mongodb = async () => {
    const mongo = await MongoMemoryReplSet.create({
        replSet: {
            count: 1,
            dbName: 'unknown',
        },
    });

    const mongoUrl = mongo.getUri();

    mongoose
        .connect(mongoUrl, { connectTimeoutMS: 4000 })
        .then(() => console.log(`Mongodb connected at ${mongoUrl}`))
        .catch((err) => console.log(err));
};
