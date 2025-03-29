"use client";

import { useEffect, useState } from "react";
import WelcomeScreen from "@/components/ui/WelcomeScreen";
import LoginForm from "@/components/ui/LoginForm"; 

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOutWelcome, setFadeOutWelcome] = useState(false);
  const [fadeInForm, setFadeInForm] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeOutWelcome(true);
    }, 1500);

    const showFormTimer = setTimeout(() => {
      setShowWelcome(false);
      setFadeInForm(true);
    }, 2000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(showFormTimer);
    };
  }, []);

  return (
    <>
      {showWelcome && <WelcomeScreen fadeOut={fadeOutWelcome} />}
      <div className={`transition-opacity duration-700 ${fadeInForm ? "opacity-100" : "opacity-0"}`}>
        <LoginForm /> 
      </div>
    </>
  );
}
