import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen, Upload, Download } from "lucide-react";

interface FolderSelectorProps {
  inputFolder: string;
  outputFolder: string;
  onInputFolderChange: (folder: string) => void;
  onOutputFolderChange: (folder: string) => void;
}

export const FolderSelector = ({
  inputFolder,
  outputFolder,
  onInputFolderChange,
  onOutputFolderChange,
}: FolderSelectorProps) => {
  return (
    <Card className="h-full bg-gradient-card border-0 rounded-18 shadow-bento hover:shadow-hover transition-smooth">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-18">
            <FolderOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          Folder Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-full">
              <Upload className="w-3.5 h-3.5 text-primary" />
            </div>
            Input Folder
          </label>
          <div className="flex gap-3">
            <Input
              value={inputFolder}
              onChange={(e) => onInputFolderChange(e.target.value)}
              placeholder="Select input folder..."
              className="flex-1 bg-background/50 border-border rounded-18 focus:border-primary transition-smooth"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="px-4 rounded-18 border-border hover:border-primary hover:bg-primary/10 hover:text-primary font-medium transition-smooth"
            >
              Browse
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <div className="p-1.5 bg-accent/10 rounded-full">
              <Download className="w-3.5 h-3.5 text-accent" />
            </div>
            Output Folder
          </label>
          <div className="flex gap-3">
            <Input
              value={outputFolder}
              onChange={(e) => onOutputFolderChange(e.target.value)}
              placeholder="Select output folder..."
              className="flex-1 bg-background/50 border-border rounded-18 focus:border-primary transition-smooth"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="px-4 rounded-18 border-border hover:border-primary hover:bg-primary/10 hover:text-primary font-medium transition-smooth"
            >
              Browse
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};