import fs from "fs/promises";
import path from "path";

const usersFile = path.join(process.cwd(), "src", "lib", "users.json");
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const usersData = await fs.readFile(usersFile, "utf-8");
    
    const users = JSON.parse(usersData);

    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return Response.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
