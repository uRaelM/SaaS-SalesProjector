"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  BarChart3,
  TrendingUp,
  DollarSign,
  FileText,
  Target,
  MapPin,
  ShoppingCart,
} from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";
import DashboardView from "@/components/dashboard-view";
import LoginView from "@/components/login-view";
import PlansView from "@/components/plans-view";

export default function App() {
  const [currentView, setCurrentView] = useState("main");
  const [formData, setFormData] = useState({
    salesFile: null as File | null,
    budget: "",
    niche: "",
    context: "",
    growthGoal: "",
    fixedCosts: "",
    variableCosts: "",
    productMargins: "",
    salesChannels: "",
    region: "",
    seasonality: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormData((prev) => ({ ...prev, salesFile: file || null }));
  };

  if (currentView === "dashboard") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return (
      <DashboardView
        onBack={() => setCurrentView("main")}
        formData={formData}
      />
    );
  }
  if (currentView === "login") {
    return <LoginView onBack={() => setCurrentView("main")} />;
  }

  if (currentView === "plans") {
    return <PlansView onBack={() => setCurrentView("main")} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Navigation */}
      <AnimatedBackground />

      <nav className="relative z-10 flex justify-end items-center p-6">
        <div className="flex gap-4">
          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => setCurrentView("plans")}
          >
            Planos
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => setCurrentView("login")}
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="w-full max-w-4xl space-y-8">
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
              Configure os parâmetros da sua empresa e receba projeções precisas
              com IA
            </p>
          </div>

          {/* Main Input Card */}
          <Card className="border-2 border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Configuração de Dados Empresariais
              </CardTitle>
              <CardDescription>
                Preencha as informações da sua empresa para gerar projeções
                precisas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload de Arquivo */}
              <div className="space-y-2">
                <Label htmlFor="file-upload">
                  Histórico de Vendas (CSV/Excel)
                </Label>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {formData.salesFile
                        ? formData.salesFile.name
                        : "Clique para fazer upload ou arraste seu arquivo aqui"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Suporta CSV, Excel (.xlsx, .xls)
                    </p>
                  </label>
                </div>
              </div>

              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento da Empresa (R$)</Label>
                  <Input
                    id="budget"
                    placeholder="100000"
                    className="rounded-2xl"
                    value={formData.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="niche">Nicho de Atuação</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("niche", value)}
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Selecione o nicho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="varejo">Varejo</SelectItem>
                      <SelectItem value="servicos">Serviços</SelectItem>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="alimentacao">Alimentação</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Metas e Custos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="growth-goal">Meta de Crescimento (%)</Label>
                  <Input
                    id="growth-goal"
                    placeholder="20"
                    className="rounded-2xl"
                    value={formData.growthGoal}
                    onChange={(e) =>
                      handleInputChange("growthGoal", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fixed-costs">Custos Fixos Mensais (R$)</Label>
                  <Input
                    id="fixed-costs"
                    placeholder="15000"
                    className="rounded-2xl"
                    value={formData.fixedCosts}
                    onChange={(e) =>
                      handleInputChange("fixedCosts", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variable-costs">Custos Variáveis (%)</Label>
                  <Input
                    id="variable-costs"
                    placeholder="30"
                    className="rounded-2xl"
                    value={formData.variableCosts}
                    onChange={(e) =>
                      handleInputChange("variableCosts", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Canais de Venda e Região */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sales-channels">Canais de Vendas</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("salesChannels", value)
                    }
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Principal canal de vendas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="loja-fisica">Loja Física</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="whatsapp">
                        WhatsApp Business
                      </SelectItem>
                      <SelectItem value="redes-sociais">
                        Redes Sociais
                      </SelectItem>
                      <SelectItem value="vendas-diretas">
                        Vendas Diretas
                      </SelectItem>
                      <SelectItem value="multiplos">
                        Múltiplos Canais
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Região Principal de Atuação</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("region", value)
                    }
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Selecione a região" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sudeste">Sudeste</SelectItem>
                      <SelectItem value="sul">Sul</SelectItem>
                      <SelectItem value="nordeste">Nordeste</SelectItem>
                      <SelectItem value="centro-oeste">Centro-Oeste</SelectItem>
                      <SelectItem value="norte">Norte</SelectItem>
                      <SelectItem value="nacional">Nacional</SelectItem>
                      <SelectItem value="internacional">
                        Internacional
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Margem de Lucro por Produto */}
              <div className="space-y-2">
                <Label htmlFor="product-margins">
                  Margem de Lucro por Produto (%)
                </Label>
                <Textarea
                  id="product-margins"
                  placeholder="Ex: Produto A: 40%, Produto B: 25%, Produto C: 60%..."
                  className="min-h-[80px] rounded-2xl"
                  value={formData.productMargins}
                  onChange={(e) =>
                    handleInputChange("productMargins", e.target.value)
                  }
                />
              </div>

              {/* Contexto da Análise */}
              <div className="space-y-2">
                <Label htmlFor="context">
                  Contexto e Observações Adicionais
                </Label>
                <Textarea
                  id="context"
                  placeholder="Ex: Empresa em crescimento, foco em expansão digital, sazonalidade no final do ano..."
                  className="min-h-[100px] rounded-2xl"
                  value={formData.context}
                  onChange={(e) => handleInputChange("context", e.target.value)}
                />
              </div>

              <Button
                className="cursor-pointer w-full h-12 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg"
                onClick={() => setCurrentView("dashboard")}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Gerar Projeções e Análises
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Projeções de Crescimento</h3>
                <p className="text-sm text-muted-foreground">
                  Análise de vendas futuras
                </p>
              </CardContent>
            </Card>
            <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Análise de Lucro</h3>
                <p className="text-sm text-muted-foreground">
                  Receita vs custos detalhados
                </p>
              </CardContent>
            </Card>
            <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  Distribuição de Investimentos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Otimização de recursos
                </p>
              </CardContent>
            </Card>
            <Card className="border border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Dashboards Avançados</h3>
                <p className="text-sm text-muted-foreground">
                  8 tipos de análises
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
