import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());
const api_key = "uu6gh4c9m79e";
const api_secret =
    "4xkhhdjz43kvwxuwpukkzwe3ghte898nxjq2hv8drps4s9h8bnswr5d9sjgbbdyz";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
    try {
        const { username } = req.body;
        const userId = uuidv4();
        const token = serverClient.createToken(userId);
        res.json({
            token,
            userId,
            username,
        });
    } catch (e) {
        res.json(e);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username } = req.body;
        const { users } = await serverClient.queryUsers({ name: username });
        if (users.length === 0) return res.json({ message: "user not found" });

        const token = serverClient.createToken(users[0].id);

        res.json({
            token,
            username,
            userId: users[0].id,
        });
    } catch (e) {
        res.json(e);
    }
});

app.listen(3001, () => {
    console.log(`Server listening on port: 3001`);
});
