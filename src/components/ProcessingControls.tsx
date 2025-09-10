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
    <Card className="h-full bg-gradient-card border-0 rounded-18 shadow-bento hover:shadow-hover transition-smooth">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
          <div className="p-2 bg-gradient-accent rounded-18">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          Processing Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Section */}
        {isProcessing && (
          <div className="space-y-3 p-4 bg-primary/5 rounded-18 border border-primary/20">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">Processing...</span>
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="font-bold text-primary">{Math.round(progress)}%</span>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-background/50" />
          </div>
        )}
        
        {/* Main Action Button */}
        <div className="space-y-3">
          {!isProcessing ? (
            <Button 
              onClick={onStartProcessing}
              className="w-full h-12 bg-gradient-primary hover:opacity-90 text-primary-foreground font-bold text-base rounded-18 shadow-bento"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Processing
            </Button>
          ) : (
            <Button 
              onClick={onStopProcessing}
              variant="destructive"
              className="w-full h-12 font-bold text-base rounded-18"
            >
              <Square className="w-5 h-5 mr-2" />
              Stop Processing
            </Button>
          )}
        </div>
        
        {/* Utility Buttons */}
        <div className="space-y-3 pt-2 border-t border-border/30">
          <Button 
            onClick={onDelete} 
            variant="outline" 
            className="w-full h-10 border-border/50 rounded-18 hover:border-destructive hover:text-destructive hover:bg-destructive/5 font-medium"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Files
          </Button>
          
          <Button 
            onClick={onClearLog} 
            variant="secondary" 
            className="w-full h-10 bg-muted/50 hover:bg-muted rounded-18 font-medium"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear Log
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};