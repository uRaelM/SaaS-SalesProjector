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
import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { dashboardSchema, DashboardData } from "@/lib/types";

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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormData((prev) => ({ ...prev, salesFile: file || null }));
  };

  const isFormEmpty = () => {
    return (
      !formData.salesFile &&
      !formData.budget &&
      !formData.niche &&
      !formData.context &&
      !formData.growthGoal &&
      !formData.fixedCosts &&
      !formData.variableCosts &&
      !formData.productMargins &&
      !formData.salesChannels &&
      !formData.region
    );
  };

  const readCSVFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const generateAIInsights = async () => {
    setIsLoading(true);
    setLoadingStage("Preparando análise...");

    try {
      let csvContent = "";
      if (formData.salesFile) {
        setLoadingStage("Lendo arquivo CSV...");
        csvContent = await readCSVFile(formData.salesFile);
      }

      setLoadingStage("Analisando dados com IA...");

      const prompt = `
Você é um Analista de Inteligência Comercial Sênior, especialista em modelagem estatística, previsão de demanda, análise de sazonalidade brasileira, projeção de vendas realista, elasticidade de preço, comportamento do consumidor e estratégia de investimentos por nicho.

Seu objetivo é gerar projeções 100% realistas, coerentes e fundamentadas, levando em conta:

Tendências históricas (via CSV)

Sazonalidade REAL brasileira para o nicho informado

Elasticidade de demanda do nicho

Indicadores macroeconômicos (inflação, datas comemorativas, períodos fracos)

Metas de crescimento

Custos, margem, ROI por canal e região

Estimativa de investimento ideal para expansão

Seleção dos melhores setores de investimento

**DADOS HISTÓRICOS DE VENDAS (CSV)**

${
  csvContent ||
  "Não fornecido — utilize estimativas realistas baseadas no nicho e orçamento"
}

**DADOS DA EMPRESA:**

Orçamento: R$ ${formData.budget || "Não informado"}

Nicho: ${formData.niche || "Não informado"}

Meta de Crescimento: ${formData.growthGoal || "Não informado"}%

Custos Fixos: R$ ${formData.fixedCosts || "Não informado"}

Custos Variáveis (%): ${formData.variableCosts || "Não informado"}%

Margens por Produto: ${formData.productMargins || "Não informado"}

Canais de Venda: ${formData.salesChannels || "Não informado"}

Região: ${formData.region || "Não informado"}

Contexto Adicional: ${formData.context || "Não informado"}

**TAREFA PRINCIPAL:**

Gerar um diagnóstico completo e realista que inclua:

Projeção de vendas mensal realista para 12 meses

Aplicar média móvel, tendência linear/exponencial, decomposição sazonal (modelo multiplicativo)

Considerar datas fortes brasileiras: Janeiro fraco, Carnaval, Dia das Mães, Dia dos Pais, Black Friday, Natal etc.

Ajustar para o nicho (ex: moda, alimentação, saúde, tecnologia, estética etc.)

Projeção de lucro considerando:

Custos fixos

Custos variáveis %

Margens por produto

Elasticidade de demanda estimada

Ranking de produtos com maior potencial de crescimento no nicho

Canais ideais com melhor ROI baseado no nicho + região

Projeção regional baseada no comportamento real de consumo do Brasil

Recomendação de investimento:

Distribuição ideal

Setores mais estratégicos

% sugeridos

Justificativa técnica

Análise de risco quantitativa (0 a 1)

Resumo executivo para tomada de decisão

**FORMATO DE ENTREGA (OBRIGATÓRIO e EXATO):**

{
  "salesProjection": [
    {"month": "Jan", "vendas_reais": 45000, "projecao": 48000},
    {"month": "Fev", "vendas_reais": 52000, "projecao": 55000},
    {"month": "Mar", "vendas_reais": 48000, "projecao": 52000},
    {"month": "Abr", "vendas_reais": 61000, "projecao": 65000},
    {"month": "Mai", "vendas_reais": 55000, "projecao": 60000},
    {"month": "Jun", "vendas_reais": 67000, "projecao": 72000},
    {"month": "Jul", "vendas_reais": null, "projecao": 75000},
    {"month": "Ago", "vendas_reais": null, "projecao": 78000},
    {"month": "Set", "vendas_reais": null, "projecao": 82000},
    {"month": "Out", "vendas_reais": null, "projecao": 85000},
    {"month": "Nov", "vendas_reais": null, "projecao": 90000},
    {"month": "Dez", "vendas_reais": null, "projecao": 95000}
  ],
  "profitProjection": [
    {"month": "Jan", "receita": 45000, "custos": 32000, "lucro": 13000},
    {"month": "Fev", "receita": 52000, "custos": 35000, "lucro": 17000},
    {"month": "Mar", "receita": 48000, "custos": 33000, "lucro": 15000},
    {"month": "Abr", "receita": 61000, "custos": 38000, "lucro": 23000},
    {"month": "Mai", "receita": 55000, "custos": 36000, "lucro": 19000},
    {"month": "Jun", "receita": 67000, "custos": 40000, "lucro": 27000},
    {"month": "Jul", "receita": 75000, "custos": 42000, "lucro": 33000},
    {"month": "Ago", "receita": 78000, "custos": 43000, "lucro": 35000},
    {"month": "Set", "receita": 82000, "custos": 45000, "lucro": 37000},
    {"month": "Out", "receita": 85000, "custos": 46000, "lucro": 39000},
    {"month": "Nov", "receita": 90000, "custos": 48000, "lucro": 42000},
    {"month": "Dez", "receita": 95000, "custos": 50000, "lucro": 45000}
  ],
  "investmentDistribution": [
    {"name": "Marketing", "value": 35, "color": "#3b82f6"},
    {"name": "Estoque", "value": 25, "color": "#8b5cf6"},
    {"name": "RH", "value": 20, "color": "#10b981"},
    {"name": "Infraestrutura", "value": 15, "color": "#f59e0b"},
    {"name": "P&D", "value": 5, "color": "#ef4444"}
  ],
  "productRanking": [
    {"produto": "Produto A", "potencial": 85, "margem": 45},
    {"produto": "Produto B", "potencial": 72, "margem": 38},
    {"produto": "Produto C", "potencial": 68, "margem": 42},
    {"produto": "Produto D", "potencial": 55, "margem": 28},
    {"produto": "Produto E", "potencial": 48, "margem": 35}
  ],
  "growthRate": [
    {"month": "Jan", "taxa_crescimento": 0, "meta_crescimento": 5},
    {"month": "Fev", "taxa_crescimento": 15.5, "meta_crescimento": 5},
    {"month": "Mar", "taxa_crescimento": -7.7, "meta_crescimento": 5},
    {"month": "Abr", "taxa_crescimento": 27.1, "meta_crescimento": 5},
    {"month": "Mai", "taxa_crescimento": -9.8, "meta_crescimento": 5},
    {"month": "Jun", "taxa_crescimento": 21.8, "meta_crescimento": 5},
    {"month": "Jul", "taxa_crescimento": 4.2, "meta_crescimento": 5},
    {"month": "Ago", "taxa_crescimento": 4.0, "meta_crescimento": 5},
    {"month": "Set", "taxa_crescimento": 5.1, "meta_crescimento": 5},
    {"month": "Out", "taxa_crescimento": 3.7, "meta_crescimento": 5},
    {"month": "Nov", "taxa_crescimento": 5.9, "meta_crescimento": 5},
    {"month": "Dez", "taxa_crescimento": 5.5, "meta_crescimento": 5}
  ],
  "regionData": [
    {"regiao": "Sudeste", "atual": 45, "projecao": 52},
    {"regiao": "Sul", "atual": 28, "projecao": 35},
    {"regiao": "Nordeste", "atual": 18, "projecao": 25},
    {"regiao": "Centro-Oeste", "atual": 12, "projecao": 18},
    {"regiao": "Norte", "atual": 8, "projecao": 12}
  ],
  "salesChannels": [
    {"canal": "E-commerce", "vendas": 45, "roi": 4.2},
    {"canal": "Loja Física", "vendas": 35, "roi": 3.8},
    {"canal": "Marketplace", "vendas": 28, "roi": 3.5},
    {"canal": "WhatsApp", "vendas": 22, "roi": 5.1},
    {"canal": "Redes Sociais", "vendas": 18, "roi": 4.8}
  ],
  "riskLevel": 0.25,
  "executiveSummary": {
    "decemberProjection": "R$ 95k",
    "marketingRecommendation": 35,
    "bestChannel": {"name": "WhatsApp", "roi": 5.1}
  },
  "aiInsights": "Análise narrativa detalhada com insights, recomendações e estratégias baseadas nos dados fornecidos..."
}

**INSTRUÇÕES CRÍTICAS (OBRIGATÓRIAS):**

1. Se CSV foi fornecido, usar os dados reais, nunca ignorar, USE os dados reais para calcular projeções baseadas em tendências históricas
2. Calcule médias móveis, sazonalidade e tendências de crescimento do CSV
3. Aplique a meta de crescimento informada (${
        formData.growthGoal
      }%) nas projeções futuras
4. Use custos fixos (${formData.fixedCosts}) e variáveis (${
        formData.variableCosts
      }%) nos cálculos de lucro
5. Considere as margens por produto fornecidas: ${
        formData.productMargins || "use estimativas realistas"
      }
6. Adapte os canais de vendas à escolha do usuário: ${
        formData.salesChannels || "múltiplos canais"
      }
7. Ajuste a distribuição regional com foco em: ${formData.region || "nacional"}
8. O nicho ${formData.niche || "geral"} deve influenciar margens e ROI
9. Todos os valores numéricos devem ser CALCULADOS e REALISTAS, não aleatórios
10. vendas_reais deve ser null para meses futuros (a partir do mês atual)
11. Os valores devem mostrar uma progressão lógica e coerente
12. **CRÍTICO:** Em profitProjection, o campo "lucro" DEVE SEMPRE ser POSITIVO e calculado como: lucro = receita - custos. NUNCA retorne valores negativos ou valores absurdos como -1000000. Se os custos forem maiores que a receita, ajuste os custos ou a receita para garantir margem positiva realista.
13. **CRÍTICO:** O campo aiInsights DEVE SER FORMATADO EM MARKDOWN com:
    - Títulos usando ## e ###
    - Listas usando - ou *
    - Negrito usando **texto**
    - Itálico usando *texto*
    - Parágrafos separados por linha em branco
    - Estrutura clara: Resumo, Análise Detalhada, Oportunidades, Riscos, Recomendações
Exemplo de formato para aiInsights:

## Resumo Executivo

Baseado na análise dos dados fornecidos, identificamos **oportunidades significativas** de crescimento...

## Análise Detalhada

### Projeção de Vendas
- Janeiro a Junho mostram tendência de crescimento de X%
- Sazonalidade positiva esperada em novembro/dezembro

### Estrutura de Custos
O lucro líquido médio projetado é de **R$ XX mil/mês**...

## Recomendações Estratégicas

1. **Investimento em Marketing**: Alocar 35% do orçamento
2. **Expansão Regional**: Foco no Sudeste
3. **Canais Digitais**: Priorizar WhatsApp (ROI de 5.1x)

Aplicar:

Média móvel

Sazonalidade

Tendência

Adaptar margens ao nicho.

Ajustar canais reais escolhidos pelo usuário.

Adaptar tudo para a região selecionada.

NUNCA gerar números aleatórios.

Projeções devem ser coerentes e progressivas.

aiInsights deve trazer uma análise profunda, estratégica e acionável, escrita em português claro e persuasivo.

`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: zodToJsonSchema(dashboardSchema),
        },
      });

      setLoadingStage("Processando resultados...");

      const parsedData = JSON.parse(response.text || "{}");
      const validatedData = dashboardSchema.parse(parsedData);

      setDashboardData(validatedData);
      setCurrentView("dashboard");
    } catch (error) {
      console.error("Erro ao gerar insights:", error);
      if (error instanceof Error) {
        alert(
          `Erro ao processar dados: ${error.message}\n\nVerifique o arquivo CSV e os dados informados.`
        );
      } else {
        alert("Erro ao gerar insights. Por favor, tente novamente.");
      }
    } finally {
      setIsLoading(false);
      setLoadingStage("");
    }
  };

  if (currentView === "dashboard") {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!dashboardData) {
      setCurrentView("main");
      return null;
    }

    return (
      <DashboardView
        onBack={() => setCurrentView("main")}
        dashboardData={dashboardData}
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
                className="cursor-pointer w-full h-12 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={generateAIInsights}
                disabled={isLoading || isFormEmpty()}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                {isLoading
                  ? loadingStage || "Gerando insights com IA..."
                  : isFormEmpty()
                  ? "Preencha pelo menos um campo"
                  : "Gerar Projeções e Análises"}
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
