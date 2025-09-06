"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedBackground } from "@/components/animated-background";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginView({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md px-6">
        <Card className="border-2 border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>Entre na sua conta para continuar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-2xl"
              />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Entrar
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 rounded-2xl bg-transparent"
            >
              Continuar com Google
            </Button>
            <div className="text-center">
              <Button variant="link" onClick={onBack}>
                Voltar ao início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
