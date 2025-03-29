"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Для навигации
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Хук для переходов

  const handleLogin = async () => {
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/home"); // Перенаправляем на домашнюю страницу
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f6f6f6] relative">
      {/* Фон с изображением */}
      <Image
        src="/Vector 2.png"
        alt="Background Wave"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-auto"
      />

      {/* Карточка логина */}
      <Card className="w-full max-w-md p-8 shadow-xl rounded-lg bg-white relative z-10">
        {/* Логотип */}
        <div className="flex justify-center">
          <Image src="/logo.png" alt="My Book Shelf Logo" width={120} height={50} />
        </div>

        {/* Заголовок */}
        <h2 className="text-xl font-semibold text-center text-gray-800 mt-4">
          Welcome Back!
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in to continue to your Digital Library
        </p>

        {/* Поля ввода */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Email</label>
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

          {/* Ошибка при входе */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Запомнить меня и забыли пароль */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <Checkbox id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-gray-600">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-orange-500">
              Forgot password?
            </Link>
          </div>

          {/* Кнопка логина */}
          <Button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            Login
          </Button>

          {/* Разделитель */}
          <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
            <span>
              New User?{" "}
              <Link href="/register" className="text-orange-500">
                Register Here
              </Link>
            </span>
            <span>Use as Guest</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
