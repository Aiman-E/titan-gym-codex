import { TrendingUp, Scale, Ruler, Target, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const strengthData = [
  { week: "W1", bench: 175, squat: 225, deadlift: 275 },
  { week: "W2", bench: 180, squat: 230, deadlift: 285 },
  { week: "W3", bench: 180, squat: 235, deadlift: 290 },
  { week: "W4", bench: 185, squat: 240, deadlift: 295 },
  { week: "W5", bench: 185, squat: 245, deadlift: 305 },
  { week: "W6", bench: 190, squat: 250, deadlift: 315 },
  { week: "W7", bench: 195, squat: 255, deadlift: 320 },
  { week: "W8", bench: 200, squat: 260, deadlift: 330 },
];

const volumeData = [
  { week: "W1", volume: 45000 },
  { week: "W2", volume: 48000 },
  { week: "W3", volume: 52000 },
  { week: "W4", volume: 42000 },
  { week: "W5", volume: 55000 },
  { week: "W6", volume: 58000 },
  { week: "W7", volume: 62000 },
  { week: "W8", volume: 65000 },
];

const personalRecords = [
  { exercise: "Bench Press", weight: "200 lbs", date: "Dec 20", improvement: "+25 lbs" },
  { exercise: "Squat", weight: "260 lbs", date: "Dec 18", improvement: "+35 lbs" },
  { exercise: "Deadlift", weight: "330 lbs", date: "Dec 22", improvement: "+55 lbs" },
  { exercise: "Overhead Press", weight: "135 lbs", date: "Dec 15", improvement: "+15 lbs" },
];

const bodyMetrics = [
  { label: "Weight", value: "185", unit: "lbs", change: "+3", trend: "up" },
  { label: "Body Fat", value: "14", unit: "%", change: "-1.5", trend: "down" },
  { label: "Muscle Mass", value: "156", unit: "lbs", change: "+5", trend: "up" },
];

export default function Progress() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl tracking-wide text-foreground">
          YOUR <span className="text-primary titan-text-glow">PROGRESS</span>
        </h1>
        <p className="text-muted-foreground mt-1">Track your gains and celebrate your wins</p>
      </div>

      {/* Body Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bodyMetrics.map((metric) => (
          <Card key={metric.label} className="glass-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-foreground">{metric.value}</span>
                    <span className="text-muted-foreground">{metric.unit}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === "up" ? "text-green-500" : "text-accent"
                }`}>
                  <TrendingUp className={`w-4 h-4 ${metric.trend === "down" && "rotate-180"}`} />
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strength Progress */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="font-display text-xl tracking-wide flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              STRENGTH PROGRESS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={strengthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bench"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                  name="Bench Press"
                />
                <Line
                  type="monotone"
                  dataKey="squat"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--accent))" }}
                  name="Squat"
                />
                <Line
                  type="monotone"
                  dataKey="deadlift"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e" }}
                  name="Deadlift"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Bench</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Squat</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Deadlift</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Volume */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="font-display text-xl tracking-wide flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              WEEKLY VOLUME
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} lbs`, "Volume"]}
                />
                <defs>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  fill="url(#volumeGradient)"
                  name="Total Volume"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Personal Records */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="font-display text-xl tracking-wide flex items-center gap-2">
            🏆 PERSONAL RECORDS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {personalRecords.map((pr) => (
              <div
                key={pr.exercise}
                className="p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-colors"
              >
                <p className="text-sm text-muted-foreground">{pr.exercise}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{pr.weight}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {pr.date}
                  </span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {pr.improvement}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
