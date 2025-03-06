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
import { COLORS } from "../../../constants";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log({ email, password });
    // Handle authentication logic
    navigate("/admin/dashboard");
  };

  return (
    <Card className="w-full max-w-sm mx-auto p-6 shadow-xl border-0 bg-white">
      <CardHeader>
        <CardTitle className="text-center text-xl">Admin Portal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
            <a href="#" className="text-sm text-blue-600 underline">
              Forgot password?
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full cursor-pointer text-white mt-4"
          onClick={handleLogin}
          style={{ backgroundColor: COLORS.Yellow }}
        >
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
