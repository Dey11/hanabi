"use client";

import { useActionState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { loginClient, type LoginState } from "@/app/portal/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Project = { slug: string; name: string };

export function LoginForm({ projects }: { projects: Project[] }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginClient,
    {},
  );
  const [slug, setSlug] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="flex flex-col gap-3">
      {/* Project */}
      {projects.length > 0 ? (
        <>
          <input type="hidden" name="slug" value={slug} />
          <Select value={slug} onValueChange={(v) => setSlug(v ?? "")}>
            <SelectTrigger
              className="bg-card h-11 w-full rounded-xl text-[0.9rem] shadow-xs"
              aria-label="Project"
            >
              <SelectValue placeholder="Select your project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.slug} value={p.slug}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : (
        <Input
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Project handle"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="h-11 rounded-xl text-[0.9rem] shadow-xs"
        />
      )}

      {/* Password */}
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
