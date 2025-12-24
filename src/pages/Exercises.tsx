import { useState } from "react";
import { Search, Filter, Play, Info, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  type: "compound" | "isolation";
  description: string;
}

const exercises: Exercise[] = [
  { id: "1", name: "Barbell Bench Press", muscleGroup: "Chest", equipment: "Barbell", difficulty: "intermediate", type: "compound", description: "Primary chest builder. Focus on controlled eccentric and driving through the floor." },
  { id: "2", name: "Incline Dumbbell Press", muscleGroup: "Chest", equipment: "Dumbbells", difficulty: "intermediate", type: "compound", description: "Targets upper chest. 30-45° incline optimal for upper pec emphasis." },
  { id: "3", name: "Cable Flyes", muscleGroup: "Chest", equipment: "Cable", difficulty: "beginner", type: "isolation", description: "Chest isolation with constant tension. Focus on stretch and squeeze." },
  { id: "4", name: "Barbell Row", muscleGroup: "Back", equipment: "Barbell", difficulty: "intermediate", type: "compound", description: "Primary back thickness builder. Drive elbows back, squeeze lats at top." },
  { id: "5", name: "Pull-ups", muscleGroup: "Back", equipment: "Bodyweight", difficulty: "intermediate", type: "compound", description: "Fundamental lat builder. Full ROM, controlled negatives." },
  { id: "6", name: "Lat Pulldown", muscleGroup: "Back", equipment: "Cable", difficulty: "beginner", type: "compound", description: "Lat isolation/assistance. Lean slightly back, pull to upper chest." },
  { id: "7", name: "Barbell Squat", muscleGroup: "Legs", equipment: "Barbell", difficulty: "advanced", type: "compound", description: "King of leg exercises. Depth, bracing, and knee tracking are critical." },
  { id: "8", name: "Romanian Deadlift", muscleGroup: "Legs", equipment: "Barbell", difficulty: "intermediate", type: "compound", description: "Posterior chain emphasis. Hip hinge pattern, maintain tension in hamstrings." },
  { id: "9", name: "Leg Press", muscleGroup: "Legs", equipment: "Machine", difficulty: "beginner", type: "compound", description: "Quad-dominant machine movement. Control the eccentric, full ROM." },
  { id: "10", name: "Overhead Press", muscleGroup: "Shoulders", equipment: "Barbell", difficulty: "intermediate", type: "compound", description: "Primary shoulder builder. Strict form, avoid excessive back arch." },
  { id: "11", name: "Lateral Raises", muscleGroup: "Shoulders", equipment: "Dumbbells", difficulty: "beginner", type: "isolation", description: "Side delt isolation. Controlled tempo, slight forward lean." },
  { id: "12", name: "Face Pulls", muscleGroup: "Shoulders", equipment: "Cable", difficulty: "beginner", type: "isolation", description: "Rear delt and rotator cuff health. High reps, external rotation at top." },
];

const muscleGroups = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];
const equipmentTypes = ["All", "Barbell", "Dumbbells", "Cable", "Machine", "Bodyweight"];

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function Exercises() {
  const [searchQuery, setSearchQuery] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("All");
  const [equipmentFilter, setEquipmentFilter] = useState("All");
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = muscleFilter === "All" || exercise.muscleGroup === muscleFilter;
    const matchesEquipment = equipmentFilter === "All" || exercise.equipment === equipmentFilter;
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl tracking-wide text-foreground">
          EXERCISE <span className="text-primary titan-text-glow">LIBRARY</span>
        </h1>
        <p className="text-muted-foreground mt-1">Master your movements with proper technique</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises..."
            className="pl-10 bg-secondary border-border focus:border-primary"
          />
        </div>
        <Select value={muscleFilter} onValueChange={setMuscleFilter}>
          <SelectTrigger className="w-full md:w-48 bg-secondary border-border">
            <SelectValue placeholder="Muscle Group" />
          </SelectTrigger>
          <SelectContent>
            {muscleGroups.map((group) => (
              <SelectItem key={group} value={group}>{group}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
          <SelectTrigger className="w-full md:w-48 bg-secondary border-border">
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            {equipmentTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredExercises.length} of {exercises.length} exercises
      </p>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <Card 
            key={exercise.id}
            className={cn(
              "glass-card border-border/50 transition-all duration-200 hover:border-primary/30",
              expandedExercise === exercise.id && "border-primary/50"
            )}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                    {exercise.muscleGroup}
                  </Badge>
                  <Badge className={cn("text-xs", difficultyColors[exercise.difficulty])}>
                    {exercise.difficulty}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                  {exercise.type}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-lg text-foreground mb-2">{exercise.name}</h3>
              
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                Equipment: {exercise.equipment}
              </p>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-muted-foreground hover:text-foreground"
                onClick={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Technique Tips
                </span>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  expandedExercise === exercise.id && "rotate-180"
                )} />
              </Button>

              {expandedExercise === exercise.id && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-foreground leading-relaxed">
                    {exercise.description}
                  </p>
                  <Button className="w-full mt-4 titan-gradient text-primary-foreground" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
