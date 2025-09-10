import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Square, 
  Trash2, 
  RotateCcw, 
  Zap,
  Loader2
} from "lucide-react";

interface ProcessingControlsProps {
  isProcessing: boolean;
  progress: number;
  onStartProcessing: () => void;
  onStopProcessing: () => void;
  onDelete: () => void;
  onClearLog: () => void;
}

export const ProcessingControls = ({
  isProcessing,
  progress,
  onStartProcessing,
  onStopProcessing,
  onDelete,
  onClearLog,
}: ProcessingControlsProps) => {
  return (
    <Card className="h-full bg-gradient-card border-0 rounded-lg shadow-bento hover:shadow-hover transition-smooth">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="p-1.5 bg-gradient-accent rounded-lg">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          Processing Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Progress Section */}
        {isProcessing && (
          <div className="space-y-2 p-2 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-foreground">Processing...</span>
              <div className="flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin text-primary" />
                <span className="font-bold text-primary text-xs">{Math.round(progress)}%</span>
              </div>
            </div>
            <Progress value={progress} className="h-1.5 bg-background/50" />
          </div>
        )}
        
        {/* Main Action Button */}
        <div className="space-y-2">
          {!isProcessing ? (
            <Button 
              onClick={onStartProcessing}
              className="w-full h-9 bg-gradient-primary hover:opacity-90 text-primary-foreground font-bold text-sm rounded-lg shadow-bento"
            >
              <Play className="w-4 h-4 mr-1" />
              Start Processing
            </Button>
          ) : (
            <Button 
              onClick={onStopProcessing}
              variant="destructive"
              className="w-full h-9 font-bold text-sm rounded-lg"
            >
              <Square className="w-4 h-4 mr-1" />
              Stop Processing
            </Button>
          )}
        </div>
        
        {/* Utility Buttons */}
        <div className="space-y-2 pt-1 border-t border-border/30">
          <Button 
            onClick={onDelete} 
            variant="outline" 
            className="w-full h-7 text-xs border-border/50 rounded-lg hover:border-destructive hover:text-destructive hover:bg-destructive/5 font-medium"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete Files
          </Button>
          
          <Button 
            onClick={onClearLog} 
            variant="secondary" 
            className="w-full h-7 text-xs bg-muted/50 hover:bg-muted rounded-lg font-medium"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Clear Log
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};