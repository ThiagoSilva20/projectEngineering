"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  return(
    <Card className="w-[550px]">
        <CardHeader>
            <CardTitle>Login Admin</CardTitle>

        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-y-4 mb-4">
                <label>Email</label>
                <Input type="text" placeholder="Email" />
            </div>
            <div className="flex flex-col gap-y-4 mb-4">
                <label>Password</label>
                <Input type="password" placeholder="Password" />
            </div>
        </CardContent>
        <CardFooter  className="flex justify-end">
            <Button onClick={() => {}}>Entrar</Button>
        </CardFooter>
  </Card>

  )
};

export default LoginForm;
