"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Для навигации
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Хук для переходов

  const handleRegister = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/login"); // Перенаправляем после успешной регистрации
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Vector 2.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      {/* Карточка */}
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-xl bg-white relative z-10">
        {/* Логотип */}
        <div className="flex justify-center">
          <Image src="/logo.png" alt="My Book Shelf Logo" width={120} height={50} />
        </div>

        <p className="text-center text-black-900">Registration</p>
        <p className="text-center text-sm text-gray-400">
          For Both Staff & Students
        </p>

        <div className="space-y-5 mt-4">
          <div>
            <label className="text-gray-600 text-sm">Reg No.</label>
            <Input
              type="text"
              placeholder="College Reg. No."
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">College Email ID</label>
            <Input
              type="email"
              placeholder="username@collegename.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-gray-600 text-sm">Confirm Password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Ошибка при регистрации */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            onClick={handleRegister}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            Register
          </Button>

          <div className="flex justify-between text-sm text-gray-600">
            <p>
              Already a User?{" "}
              <Link href="/login" className="text-orange-500">
                Login now
              </Link>
            </p>
            <p>Use as Guest</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
