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
    <Card className="h-full bg-gradient-card border-0 rounded-lg shadow-bento hover:shadow-hover transition-smooth">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="p-1.5 bg-gradient-primary rounded-lg">
            <FolderOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          Folder Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <div className="p-1 bg-primary/10 rounded-full">
              <Upload className="w-3 h-3 text-primary" />
            </div>
            Input Folder
          </label>
          <div className="flex gap-2">
            <Input
              value={inputFolder}
              onChange={(e) => onInputFolderChange(e.target.value)}
              placeholder="Select input folder..."
              className="flex-1 h-8 text-xs bg-background/50 border-border rounded-lg focus:border-primary transition-smooth"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="px-3 h-8 text-xs rounded-lg border-border hover:border-primary hover:bg-primary/10 hover:text-primary font-medium transition-smooth"
            >
              Browse
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            <div className="p-1 bg-accent/10 rounded-full">
              <Download className="w-3 h-3 text-accent" />
            </div>
            Output Folder
          </label>
          <div className="flex gap-2">
            <Input
              value={outputFolder}
              onChange={(e) => onOutputFolderChange(e.target.value)}
              placeholder="Select output folder..."
              className="flex-1 h-8 text-xs bg-background/50 border-border rounded-lg focus:border-primary transition-smooth"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="px-3 h-8 text-xs rounded-lg border-border hover:border-primary hover:bg-primary/10 hover:text-primary font-medium transition-smooth"
            >
              Browse
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};