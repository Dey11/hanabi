"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginClient, type LoginState } from "@/app/portal/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginClient,
    {},
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="flex flex-col gap-3">
      <Input
        name="slug"
        placeholder="Project name"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        autoFocus
        className="h-11 rounded-xl text-[0.9rem] shadow-xs"
      />

      <div className="relative">
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          className="h-11 rounded-xl pr-10 text-[0.9rem] shadow-xs"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 grid w-10 place-items-center transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>

      {state.error ? (
        <p className="text-destructive text-center text-[0.8rem]">
          {state.error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="mt-1 h-11 rounded-xl text-[0.9rem]"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : "Continue"}
      </Button>
    </form>
  );
}
