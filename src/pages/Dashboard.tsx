import { Flame, Target, Clock, TrendingUp, Zap, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const stats = [
  { label: "Workouts This Week", value: "4", target: "5", icon: Dumbbell, color: "text-primary" },
  { label: "Active Streak", value: "12", unit: "days", icon: Flame, color: "text-primary" },
  { label: "Training Time", value: "6.5", unit: "hrs", icon: Clock, color: "text-accent" },
  { label: "Progress Score", value: "87", unit: "%", icon: TrendingUp, color: "text-green-500" },
];

import { Dumbbell } from "lucide-react";

const upcomingWorkouts = [
  { day: "Today", name: "Push Day - Chest & Shoulders", time: "5:00 PM" },
  { day: "Tomorrow", name: "Pull Day - Back & Biceps", time: "6:00 PM" },
  { day: "Thursday", name: "Leg Day - Quads & Glutes", time: "5:30 PM" },
];

const recentExercises = [
  { name: "Bench Press", sets: "4x8", weight: "185 lbs", improvement: "+5 lbs" },
  { name: "Incline Dumbbell Press", sets: "3x10", weight: "65 lbs", improvement: "+5 lbs" },
  { name: "Cable Flyes", sets: "3x12", weight: "30 lbs", improvement: "—" },
];

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-foreground">
            WELCOME BACK, <span className="text-primary titan-text-glow">TITAN</span>
          </h1>
          <p className="text-muted-foreground mt-1">Ready to crush your goals today?</p>
        </div>
        <Link to="/coach">
          <Button className="titan-gradient titan-glow text-primary-foreground font-semibold px-6">
            <Zap className="w-4 h-4 mr-2" />
            Ask AI Coach
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                    {stat.unit && <span className="text-muted-foreground">{stat.unit}</span>}
                    {stat.target && <span className="text-muted-foreground">/ {stat.target}</span>}
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress */}
        <Card className="lg:col-span-2 glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-xl tracking-wide">
              <Target className="w-5 h-5 text-primary" />
              WEEKLY PROGRESS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Workout Completion</span>
                  <span className="text-foreground font-medium">4/5 sessions</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Volume Target</span>
                  <span className="text-foreground font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recovery Score</span>
                  <span className="text-foreground font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>

            {/* Recent Exercises */}
            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Recent Lifts</h4>
              <div className="space-y-3">
                {recentExercises.map((exercise) => (
                  <div key={exercise.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div>
                      <p className="font-medium text-foreground">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground">{exercise.sets} @ {exercise.weight}</p>
                    </div>
                    <span className={`text-sm font-medium ${exercise.improvement !== "—" ? "text-green-500" : "text-muted-foreground"}`}>
                      {exercise.improvement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Workouts */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-xl tracking-wide">
              <Calendar className="w-5 h-5 text-accent" />
              UPCOMING
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingWorkouts.map((workout, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border transition-all duration-200 hover:border-primary/50 ${
                  index === 0 ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${
                    index === 0 ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {workout.day}
                  </span>
                  <span className="text-xs text-muted-foreground">{workout.time}</span>
                </div>
                <p className="font-medium text-foreground">{workout.name}</p>
              </div>
            ))}
            <Link to="/workouts">
              <Button variant="outline" className="w-full mt-2 border-border hover:border-primary hover:text-primary">
                View All Workouts
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
