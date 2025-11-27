import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/animated-background";
import { DashboardData } from "@/lib/types";
import ReactMarkdown from "react-markdown";
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
  MapPin,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

export default function DashboardView({
  onBack,
  dashboardData,
}: {
  onBack: () => void;
  dashboardData: DashboardData;
}) {
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <p className="text-xl text-muted-foreground">
            Nenhum dado disponível. Por favor, volte e gere uma nova análise.
          </p>
          <Button onClick={onBack} className="mt-4">
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const riskLevel = dashboardData.riskLevel;

  // Determine risk level text and color based on percentage
  const getRiskStatus = (risk: number) => {
    if (risk < 0.3) return { text: "Baixo Risco", color: "text-green-500" };
    if (risk < 0.7) return { text: "Risco Moderado", color: "text-yellow-500" };
    return { text: "Alto Risco", color: "text-red-500" };
  };

  const riskStatus = getRiskStatus(riskLevel);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      <div className="relative z-10 p-6">
        <div className="flex justify-end items-center mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="cursor-pointer flex items-center gap-2"
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
                  <LineChart data={dashboardData.salesProjection}>
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
                      dot={{ fill: "#3b82f6", r: 4 }}
                      activeDot={{ r: 6 }}
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
                  <p className={`text-2xl font-bold ${riskStatus.color}`}>
                    {riskStatus.text}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {riskLevel < 0.3
                      ? "Fluxo de caixa estável"
                      : riskLevel < 0.7
                      ? "Atenção ao fluxo de caixa"
                      : "Risco crítico de fluxo de caixa"}
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
                  <ComposedChart data={dashboardData.profitProjection}>
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
                      data={dashboardData.investmentDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dashboardData.investmentDistribution.map((entry, index) => (
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
                  <BarChart data={dashboardData.productRanking}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="produto" stroke="#9ca3af" />
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
                      dataKey="potencial"
                      fill="#8b5cf6"
                      name="Potencial %"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="margem"
                      fill="#10b981"
                      name="Margem %"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 5. Taxa de Crescimento Mensal */}
          <div className="lg:col-span-6">
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Taxa de Crescimento Mensal
                </CardTitle>
                <CardDescription>
                  Evolução percentual vs meta de crescimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={dashboardData.growthRate}>
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
                      formatter={(value: number) => `${value.toFixed(1)}%`}
                    />
                    <Legend />
                    <Bar
                      dataKey="taxa_crescimento"
                      fill="#3b82f6"
                      name="Taxa de Crescimento %"
                      radius={[8, 8, 0, 0]}
                    />
                    <Line
                      type="monotone"
                      dataKey="meta_crescimento"
                      stroke="#10b981"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Meta de Crescimento %"
                    />
                  </ComposedChart>
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
                  <BarChart data={dashboardData.regionData}>
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
                  <ComposedChart data={dashboardData.salesChannels}>
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
                    {dashboardData.executiveSummary.decemberProjection}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Projeção de vendas para dezembro
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {dashboardData.executiveSummary.marketingRecommendation}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recomendação de investimento em marketing
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    {dashboardData.executiveSummary.bestChannel.name}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Canal com melhor ROI (
                    {dashboardData.executiveSummary.bestChannel.roi}x)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Section */}
        {dashboardData.aiInsights && (
            <div className="mt-8">
              <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Análise Detalhada com IA</CardTitle>
                  <CardDescription>
                    Insights e recomendações gerados por inteligência artificial
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none text-foreground">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold mb-4 text-primary">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-semibold mb-3 text-accent">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold mb-2 text-foreground">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-3 text-muted-foreground leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-3 space-y-2">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-3 space-y-2">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-muted-foreground ml-4">
                            {children}
                          </li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold text-foreground">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-accent">{children}</em>
                        ),
                        code: ({ children }) => (
                          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                            {children}
                          </code>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {dashboardData.aiInsights}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
      </div>
    </div>
  );
}
