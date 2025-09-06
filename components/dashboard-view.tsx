import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/animated-background";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import GaugeChart from "react-gauge-chart";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  Calendar,
  MapPin,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

// Dados simulados para os gráficos
const salesProjectionData = [
  { month: "Jan", vendas_reais: 45000, projecao: 48000 },
  { month: "Fev", vendas_reais: 52000, projecao: 55000 },
  { month: "Mar", vendas_reais: 48000, projecao: 52000 },
  { month: "Abr", vendas_reais: 61000, projecao: 65000 },
  { month: "Mai", vendas_reais: 55000, projecao: 60000 },
  { month: "Jun", vendas_reais: 67000, projecao: 72000 },
  { month: "Jul", vendas_reais: null, projecao: 75000 },
  { month: "Ago", vendas_reais: null, projecao: 78000 },
  { month: "Set", vendas_reais: null, projecao: 82000 },
  { month: "Out", vendas_reais: null, projecao: 85000 },
  { month: "Nov", vendas_reais: null, projecao: 90000 },
  { month: "Dez", vendas_reais: null, projecao: 95000 },
];

const profitProjectionData = [
  { month: "Jan", receita: 45000, custos: 32000, lucro: 13000 },
  { month: "Fev", receita: 52000, custos: 35000, lucro: 17000 },
  { month: "Mar", receita: 48000, custos: 33000, lucro: 15000 },
  { month: "Abr", receita: 61000, custos: 38000, lucro: 23000 },
  { month: "Mai", receita: 55000, custos: 36000, lucro: 19000 },
  { month: "Jun", receita: 67000, custos: 40000, lucro: 27000 },
  { month: "Jul", receita: 75000, custos: 42000, lucro: 33000 },
  { month: "Ago", receita: 78000, custos: 43000, lucro: 35000 },
  { month: "Set", receita: 82000, custos: 45000, lucro: 37000 },
  { month: "Out", receita: 85000, custos: 46000, lucro: 39000 },
  { month: "Nov", receita: 90000, custos: 48000, lucro: 42000 },
  { month: "Dez", receita: 95000, custos: 50000, lucro: 45000 },
];

const investmentDistributionData = [
  { name: "Marketing", value: 35, color: "#3b82f6" },
  { name: "Estoque", value: 25, color: "#8b5cf6" },
  { name: "RH", value: 20, color: "#10b981" },
  { name: "Infraestrutura", value: 15, color: "#f59e0b" },
  { name: "P&D", value: 5, color: "#ef4444" },
];

const productRankingData = [
  { produto: "Produto A", potencial: 85, margem: 45 },
  { produto: "Produto B", potencial: 72, margem: 38 },
  { produto: "Produto C", potencial: 68, margem: 42 },
  { produto: "Produto D", potencial: 55, margem: 28 },
  { produto: "Produto E", potencial: 48, margem: 35 },
];

const seasonalityData = [
  { mes: "Jan", vendas: 45 },
  { mes: "Fev", vendas: 52 },
  { mes: "Mar", vendas: 48 },
  { mes: "Abr", vendas: 61 },
  { mes: "Mai", vendas: 55 },
  { mes: "Jun", vendas: 67 },
  { mes: "Jul", vendas: 58 },
  { mes: "Ago", vendas: 62 },
  { mes: "Set", vendas: 70 },
  { mes: "Out", vendas: 75 },
  { mes: "Nov", vendas: 85 },
  { mes: "Dez", vendas: 95 },
];

const regionData = [
  { regiao: "Sudeste", atual: 45, projecao: 52 },
  { regiao: "Sul", atual: 28, projecao: 35 },
  { regiao: "Nordeste", atual: 18, projecao: 25 },
  { regiao: "Centro-Oeste", atual: 12, projecao: 18 },
  { regiao: "Norte", atual: 8, projecao: 12 },
];

const salesChannelsData = [
  { canal: "E-commerce", vendas: 45, roi: 4.2 },
  { canal: "Loja Física", vendas: 35, roi: 3.8 },
  { canal: "Marketplace", vendas: 28, roi: 3.5 },
  { canal: "WhatsApp", vendas: 22, roi: 5.1 },
  { canal: "Redes Sociais", vendas: 18, roi: 4.8 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

export default function DashboardView({ onBack, formData }) {
  const riskLevel = 0.25; // 25% de risco (baixo)

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      <div className="relative z-10 p-6">
        <div className="flex justify-end items-center mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Projeção de Crescimento da Empresa */}
          <div className="lg:col-span-8">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Projeção de Crescimento da Empresa
                </CardTitle>
                <CardDescription>
                  Vendas reais vs projeção futura (próximos 12 meses)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesProjectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#f9fafb" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="vendas_reais"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Vendas Reais"
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="projecao"
                      stroke="#10b981"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Projeção"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 8. Indicador de Risco Financeiro */}
          <div className="lg:col-span-4">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Indicador de Risco Financeiro
                </CardTitle>
                <CardDescription>
                  Risco de fluxo de caixa negativo
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="w-48 h-32">
                  <GaugeChart
                    id="risk-gauge"
                    nrOfLevels={3}
                    colors={["#10b981", "#f59e0b", "#ef4444"]}
                    arcWidth={0.3}
                    percent={riskLevel}
                    textColor="#f9fafb"
                    needleColor="#f9fafb"
                    needleBaseColor="#374151"
                  />
                </div>
                <div className="text-center mt-4">
                  <p className="text-2xl font-bold text-accent">Baixo Risco</p>
                  <p className="text-sm text-muted-foreground">
                    Fluxo de caixa estável
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 2. Projeção de Lucro */}
          <div className="lg:col-span-8">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-secondary" />
                  Projeção de Lucro
                </CardTitle>
                <CardDescription>
                  Receita vs custos e lucro líquido projetado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={profitProjectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#f9fafb" }}
                    />
                    <Legend />
                    <Bar dataKey="receita" fill="#3b82f6" name="Receita" />
                    <Bar dataKey="custos" fill="#ef4444" name="Custos" />
                    <Line
                      type="monotone"
                      dataKey="lucro"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Lucro Líquido"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 3. Distribuição de Investimentos Ideais */}
          <div className="lg:col-span-4">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Distribuição de Investimentos Ideais
                </CardTitle>
                <CardDescription>
                  Alocação otimizada de recursos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={investmentDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {investmentDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 4. Produtos/Serviços com Maior Potencial */}
          <div className="lg:col-span-6">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Produtos com Maior Potencial
                </CardTitle>
                <CardDescription>
                  Ranking de rentabilidade e crescimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={productRankingData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis
                      dataKey="produto"
                      type="category"
                      stroke="#9ca3af"
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#f9fafb" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="potencial"
                      fill="#8b5cf6"
                      name="Potencial %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 5. Mapa de Sazonalidade */}
          <div className="lg:col-span-6">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  Mapa de Sazonalidade
                </CardTitle>
                <CardDescription>
                  Padrões de vendas ao longo do ano
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={seasonalityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="mes" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#f9fafb" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="vendas"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      name="Vendas (mil)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 6. Projeção de Demanda por Região */}
          <div className="lg:col-span-6">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Projeção de Demanda por Região
                </CardTitle>
                <CardDescription>Análise regional de vendas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="regiao" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#f9fafb" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="atual"
                      fill="#3b82f6"
                      name="Vendas Atuais %"
                    />
                    <Bar dataKey="projecao" fill="#10b981" name="Projeção %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 7. Análise de Canais de Vendas */}
          <div className="lg:col-span-6">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Análise de Canais de Vendas
                </CardTitle>
                <CardDescription>Performance e ROI por canal</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={salesChannelsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="canal" stroke="#9ca3af" />
                    <YAxis yAxisId="left" stroke="#9ca3af" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#9ca3af"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#f9fafb" }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="vendas"
                      fill="#8b5cf6"
                      name="Vendas %"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="roi"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      name="ROI"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resumo Executivo */}
        <div className="mt-8">
          <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Resumo Executivo</CardTitle>
              <CardDescription>
                Principais insights baseados nos dados configurados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    R$ 95k
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Projeção de vendas para dezembro
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">35%</div>
                  <p className="text-sm text-muted-foreground">
                    Recomendação de investimento em marketing
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    WhatsApp
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Canal com melhor ROI (5.1x)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
