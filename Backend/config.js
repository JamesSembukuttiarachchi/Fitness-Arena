import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 6005;

export const mongoDBUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fitness-arena.xbjjljd.mongodb.net/`
