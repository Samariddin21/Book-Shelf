import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const usersFile = path.join(process.cwd(), "src", "lib", "users.json");

export function getUsers() {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
}

// Saving users
export function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Registration
export function registerUser(email, password) {
  const users = getUsers();

  if (users.find((user) => user.email === email)) {
    throw new Error("User already exists!");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ email, password: hashedPassword });
  saveUsers(users);

  return { email };
}

// Authorization
export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error("Invalid email or password!");
  }

  return { email };
}
