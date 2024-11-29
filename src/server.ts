import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const prisma = new PrismaClient();

export type UserType = {
  id: string;
  name: string;
  email: string;
  age: string;
  createdAt: string;
  updatedAt: string;
};

app.post("/create", async (req, res): Promise<void> => {
  const createdUser = await prisma.user.create({ data: req.body });
  res.json(createdUser);
});

app.get("/get", async (req, res): Promise<void> => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.put("/update/:id", async (req, res): Promise<void> => {
  const id = req.params.id;
  const newAge = req.body.age;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { age: newAge },
  });
  res.json(updatedUser);
});

app.delete("/delete/:id", async (req, res): Promise<void> => {
  const id = req.params.id;
  // id will be in string and we need to convert into number to match with database stored id
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedUser);
});

const PORT: number = Number(process.env?.PORT) || 3500;
app.listen(PORT, () => {
  console.log(`🚀 Server is Running at PORT:- http://localhost:${PORT}`);
});
