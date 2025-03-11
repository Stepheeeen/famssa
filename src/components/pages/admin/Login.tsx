import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { useState } from "react";
import { BASE_URL, COLORS } from "../../../constants";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      console.log("Login successful:", data);

      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto p-6 shadow-xl border-0 bg-white">
      <CardHeader>
        <CardTitle className="text-center text-xl">Admin Portal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-2"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="mt-2"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me">Remember me</Label>
            </div>
            {/* <a href="#" className="text-sm text-blue-600 underline">
              Forgot password?
            </a> */}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full text-white mt-4 ${loading ? "bg-gray-400" : ""}`}
          onClick={handleLogin}
          style={{ backgroundColor: loading ? "#ccc" : COLORS.Yellow }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
}
