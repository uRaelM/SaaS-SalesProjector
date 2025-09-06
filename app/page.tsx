"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedBackground } from "@/components/animated-background"
import { Upload, BarChart3, TrendingUp, DollarSign } from "lucide-react"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"main" | "dashboard" | "login" | "plans">("main")

  if (currentView === "login") {
    return <LoginView onBack={() => setCurrentView("main")} />
  }

  if (currentView === "dashboard") {
    return <DashboardView onBack={() => setCurrentView("main")} />
  }

  if (currentView === "plans") {
    return <PlansView onBack={() => setCurrentView("main")} />
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-foreground">Projeção Inteligente de Vendas</h1>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setCurrentView("plans")}>
            Planos
          </Button>
          <Button variant="outline" onClick={() => setCurrentView("login")}>
            Login
          </Button>
        </div>
      </nav>

      {/* Main Content - ChatGPT Style */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Transforme seus dados em
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}
                insights inteligentes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Faça upload dos seus dados de vendas e receba projeções precisas com IA
            </p>
          </div>

          {/* Main Input Card */}
          <Card className="border-2 border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload de Dados
              </CardTitle>
              <CardDescription>Envie seu arquivo CSV ou Excel com dados de vendas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Arquivo de Vendas</Label>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Clique para fazer upload ou arraste seu arquivo aqui</p>
                  <p className="text-xs text-muted-foreground mt-1">Suporta CSV, Excel (.xlsx, .xls)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Contexto da Análise</Label>
                <Textarea
                  id="context"
                  placeholder="Ex: Analisar vendas do setor de tecnologia para o próximo trimestre..."
                  className="min-h-[100px] rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento da Empresa</Label>
                  <Input id="budget" placeholder="R$ 100.000" className="rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="niche">Nicho de Atuação</Label>
                  <Input id="niche" placeholder="Ex: E-commerce, SaaS, Varejo..." className="rounded-2xl" />
                </div>
              </div>

              <Button
                className="w-full h-12 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg"
                onClick={() => setCurrentView("dashboard")}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Gerar Projeção
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Projeções Precisas</h3>
                <p className="text-sm text-muted-foreground">IA avançada para previsões de vendas</p>
              </CardContent>
            </Card>
            <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Dashboards Interativos</h3>
                <p className="text-sm text-muted-foreground">Visualize seus dados de forma clara</p>
              </CardContent>
            </Card>
            <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">ROI Otimizado</h3>
                <p className="text-sm text-muted-foreground">Maximize seus investimentos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginView({ onBack }: { onBack: () => void }) {
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
              <Input id="email" type="email" placeholder="seu@email.com" className="rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="••••••••" className="rounded-2xl" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Entrar
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-2xl bg-transparent">
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
  )
}

function DashboardView({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard de Projeções</h1>
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Projeção de Vendas - Próximos 12 Meses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-2xl flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de Linha - Projeção de Vendas</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Cards */}
          <div className="space-y-6">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Setor com Maior Potencial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent mb-2">Tecnologia</div>
                <p className="text-sm text-muted-foreground">Crescimento projetado de 35% no próximo trimestre</p>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Investimento Sugerido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">Marketing Digital</div>
                <p className="text-sm text-muted-foreground">ROI estimado de 4.2x em 6 meses</p>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Meta de Receita</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary mb-2">R$ 2.4M</div>
                <p className="text-sm text-muted-foreground">Projeção para os próximos 12 meses</p>
              </CardContent>
            </Card>
          </div>

          {/* Distribution Chart */}
          <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Distribuição de Investimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-2xl flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de Pizza - Distribuição</p>
              </div>
            </CardContent>
          </Card>

          {/* Ranking Chart */}
          <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Ranking de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-2xl flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de Barras - Ranking</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function PlansView({ onBack }: { onBack: () => void }) {
  const plans = [
    {
      name: "Basic",
      price: "R$ 99",
      period: "/mês",
      features: ["Até 1.000 registros", "3 projeções por mês", "Dashboard básico", "Suporte por email"],
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
  ]

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Escolha seu Plano</h1>
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Planos que se adaptam ao seu negócio</h2>
            <p className="text-muted-foreground">Escolha o plano ideal para suas necessidades de projeção de vendas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`border-2 bg-card/80 backdrop-blur-sm relative ${
                  plan.recommended ? "border-primary shadow-2xl shadow-primary/20 scale-105" : "border-border/50"
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
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
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
                    className={`w-full h-12 rounded-2xl font-semibold ${
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
  )
}
