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

export default function PlansView({ onBack }: { onBack: () => void }) {
  const plans = [
    {
      name: "Basic",
      price: "R$ 99",
      period: "/mês",
      features: [
        "Até 1.000 registros",
        "3 projeções por mês",
        "Dashboard básico",
        "Suporte por email",
      ],
      recommended: false,
    },
    {
      name: "Premium",
      price: "R$ 299",
      period: "/mês",
      features: [
        "Até 10.000 registros",
        "Projeções ilimitadas",
        "Dashboard avançado",
        "IA personalizada",
        "Suporte prioritário",
      ],
      recommended: true,
    },
    {
      name: "Business",
      price: "R$ 599",
      period: "/mês",
      features: [
        "Registros ilimitados",
        "API personalizada",
        "Múltiplos usuários",
        "Consultoria dedicada",
        "SLA garantido",
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Escolha seu Plano
          </h1>
          <Button className="cursor-pointer" variant="outline" onClick={onBack}>
            Voltar
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Planos que se adaptam ao seu negócio
            </h2>
            <p className="text-muted-foreground">
              Escolha o plano ideal para suas necessidades de projeção de vendas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`border-2 bg-card/80 backdrop-blur-sm relative ${
                  plan.recommended
                    ? "border-primary shadow-2xl shadow-primary/20 scale-105"
                    : "border-border/50"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Recomendado
                    </span>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`cursor-pointer w-full h-12 rounded-2xl font-semibold ${
                      plan.recommended
                        ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        : "bg-secondary hover:bg-secondary/90"
                    }`}
                  >
                    Assinar {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
