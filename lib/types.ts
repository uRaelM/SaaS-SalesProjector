import { z } from "zod";

// Zod schemas for validation
export const dashboardSchema = z.object({
  salesProjection: z.array(
    z.object({
      month: z.string(),
      vendas_reais: z.number().nullable(),
      projecao: z.number(),
    })
  ),
  profitProjection: z.array(
    z.object({
      month: z.string(),
      receita: z.number(),
      custos: z.number(),
      lucro: z.number(),
    })
  ),
  investmentDistribution: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
      color: z.string(),
    })
  ),
  productRanking: z.array(
    z.object({
      produto: z.string(),
      potencial: z.number(),
      margem: z.number(),
    })
  ),
  seasonality: z.array(
    z.object({
      mes: z.string(),
      vendas: z.number(),
    })
  ),
  regionData: z.array(
    z.object({
      regiao: z.string(),
      atual: z.number(),
      projecao: z.number(),
    })
  ),
  salesChannels: z.array(
    z.object({
      canal: z.string(),
      vendas: z.number(),
      roi: z.number(),
    })
  ),
  riskLevel: z.number().min(0).max(1),
  executiveSummary: z.object({
    decemberProjection: z.string(),
    marketingRecommendation: z.number(),
    bestChannel: z.object({
      name: z.string(),
      roi: z.number(),
    }),
  }),
  aiInsights: z.string(),
});

// TypeScript types derived from schemas
export type DashboardData = z.infer<typeof dashboardSchema>;
export type SalesProjection = z.infer<typeof dashboardSchema.shape.salesProjection>;
export type ProfitProjection = z.infer<typeof dashboardSchema.shape.profitProjection>;
export type InvestmentDistribution = z.infer<typeof dashboardSchema.shape.investmentDistribution>;
export type ProductRanking = z.infer<typeof dashboardSchema.shape.productRanking>;
export type Seasonality = z.infer<typeof dashboardSchema.shape.seasonality>;
export type RegionData = z.infer<typeof dashboardSchema.shape.regionData>;
export type SalesChannels = z.infer<typeof dashboardSchema.shape.salesChannels>;
export type ExecutiveSummary = z.infer<typeof dashboardSchema.shape.executiveSummary>;
