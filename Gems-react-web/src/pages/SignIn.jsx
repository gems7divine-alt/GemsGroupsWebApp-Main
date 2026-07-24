import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import Button from "../components/Button";
import AnimatedBackground from "../components/AnimatedBackground";
import { LogIn, AlertCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

const SignIn = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setIsLoading(true);

    try {

      const data = await loginUser(email, password);

      console.log("Login Success :", data);

      // Save logged-in email
      localStorage.setItem("email", data.email);


      navigate("/employee-dashboard");

    } catch (err) {

      console.error(err);

      setError(err.message);

    } finally {

      setIsLoading(false);

    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-dark-bg text-white overflow-hidden px-4">

      <AnimatedBackground />

      <div className="absolute top-8 left-8 z-50">

        <Button
          variant="secondary"
          onClick={() => navigate("/")}
          className="!py-2 !px-4 !text-sm"
        >
          ← Back to Home
        </Button>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card w-full max-w-md relative z-20"
      >

        <div className="p-6 border-b border-gold-primary/20 flex flex-col items-center">

          <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center mb-3">

            <LogIn className="text-gold-primary" size={24} />

          </div>

          <h2 className="text-2xl font-bold">

            Sign In

          </h2>

          <p className="text-gray-400 text-sm">

            Access your employee account

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="p-8 flex flex-col gap-6"
        >

          <div>

            <label className="text-sm text-gray-300">

              Email Address

            </label>

            <input
              type="email"
              className="w-full mt-2 bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div>

            <label className="text-sm text-gray-300">

              Password

            </label>

            <input
              type="password"
              className="w-full mt-2 bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {error && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400"
            >

              <AlertCircle size={18} />

              {error}

            </motion.div>

          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full justify-center"
          >

            {isLoading ? "Signing In..." : "Sign In"}

          </Button>

          <div className="text-center text-gray-400">

            New here?{" "}

            <Link
              to="/create-account"
              className="text-gold-primary font-semibold"
            >

              Create an account

            </Link>

          </div>

        </form>

      </motion.div>

    </div>
  );
};

export default SignIn;