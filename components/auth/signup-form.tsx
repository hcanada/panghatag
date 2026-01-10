"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirectTo =
    redirectParam && redirectParam.startsWith("/") ? redirectParam : "/";

  const supabase = createClient();
  const route = useRouter();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstname,
          lastname,
        },
      },
    });
    if (error) {
      console.error(error.message);
      return;
    }
    route.push(redirectTo);
    route.refresh();
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="johndoe123"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                pattern="^[a-zA-Z0-9]*$"
                title="Username must only contain letters and numbers"
                required
              />
            </Field> */}
            <FieldGroup className="flex-row">
              <Field>
                <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="John"
                  value={firstname}
                  onChange={(e) => setFirstname(e.currentTarget.value)}
                  pattern="^[A-Za-z ]+$"
                  title="First name must only contain letters and numbers"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                  value={lastname}
                  onChange={(e) => setLastname(e.currentTarget.value)}
                  pattern="^[A-Za-z ]+$"
                  title="Last name must only contain letters"
                  required
                />
              </Field>
            </FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="johndoe@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
                minLength={8}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                required
                minLength={8}
              />
            </Field>
            {error && <p className="text-red-600">{error}</p>}
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
