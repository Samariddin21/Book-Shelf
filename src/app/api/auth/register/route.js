import fs from "fs/promises";
import path from "path";

const usersFile = path.join(process.cwd(), "src", "lib", "users.json"); 

export async function POST(req) {
  try {
    const { regNo, email, password } = await req.json();

    const usersData = await fs.readFile(usersFile, "utf-8");
    const users = JSON.parse(usersData);

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = { regNo, email, password };
    users.push(newUser);

    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

    return Response.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
