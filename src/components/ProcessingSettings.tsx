import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings2, Hash, Users, Clock, Palette, Sparkles, ToggleLeft } from "lucide-react";

interface ProcessingSettingsProps {
  settings: {
    keywords: number;
    workers: number;
    delay: number;
    theme: string;
    models: string;
    quality: string;
    renameFile: boolean;
    autoCategory: boolean;
    autoFoldering: boolean;
  };
  onSettingsChange: (key: string, value: any) => void;
}

export const ProcessingSettings = ({ settings, onSettingsChange }: ProcessingSettingsProps) => {
  return (
    <Card className="h-full bg-gradient-card border-0 rounded-18 shadow-bento hover:shadow-hover transition-smooth">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-18">
            <Settings2 className="w-5 h-5 text-primary-foreground" />
          </div>
          Processing Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Sliders Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-full">
                <Hash className="w-3.5 h-3.5 text-primary" />
              </div>
              Keywords
              <span className="ml-auto bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-bold">
                {settings.keywords}
              </span>
            </label>
            <Slider
              value={[settings.keywords]}
              onValueChange={([value]) => onSettingsChange('keywords', value)}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="p-1.5 bg-accent/10 rounded-full">
                <Users className="w-3.5 h-3.5 text-accent" />
              </div>
              Workers
              <span className="ml-auto bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-bold">
                {settings.workers}
              </span>
            </label>
            <Slider
              value={[settings.workers]}
              onValueChange={([value]) => onSettingsChange('workers', value)}
              max={8}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-full">
                <Clock className="w-3.5 h-3.5 text-primary" />
              </div>
              Delay
              <span className="ml-auto bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-bold">
                {settings.delay}s
              </span>
            </label>
            <Slider
              value={[settings.delay]}
              onValueChange={([value]) => onSettingsChange('delay', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Dropdowns Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-full">
                <Palette className="w-3.5 h-3.5 text-primary" />
              </div>
              Theme
            </label>
            <Select value={settings.theme} onValueChange={(value) => onSettingsChange('theme', value)}>
              <SelectTrigger className="bg-background/50 border-border rounded-18 focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-18 border-border">
                <SelectItem value="dark">🌙 Dark</SelectItem>
                <SelectItem value="light">☀️ Light</SelectItem>
                <SelectItem value="auto">🔄 Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="p-1.5 bg-accent/10 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
              </div>
              Models
            </label>
            <Select value={settings.models} onValueChange={(value) => onSettingsChange('models', value)}>
              <SelectTrigger className="bg-background/50 border-border rounded-18 focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-18 border-border">
                <SelectItem value="auto-retouch">🤖 Auto Retouch</SelectItem>
                <SelectItem value="enhance-face">👤 Enhance Face</SelectItem>
                <SelectItem value="upscale-general">📈 Upscale General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
              Quality
            </label>
            <Select value={settings.quality} onValueChange={(value) => onSettingsChange('quality', value)}>
              <SelectTrigger className="bg-background/50 border-border rounded-18 focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-18 border-border">
                <SelectItem value="detailed">💎 Detailed</SelectItem>
                <SelectItem value="balanced">⚖️ Balanced</SelectItem>
                <SelectItem value="fast">⚡ Fast</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Toggles Section */}
        <div className="space-y-4 p-6 bg-background/30 rounded-18 border border-border/30">
          <h4 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <ToggleLeft className="w-5 h-5 text-primary" />
            Advanced Options
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-3 bg-card/50 rounded-18">
              <div className="space-y-1">
                <span className="text-sm font-medium text-foreground">Rename File</span>
                <p className="text-xs text-muted-foreground">Auto rename processed files</p>
              </div>
              <Switch
                checked={settings.renameFile}
                onCheckedChange={(checked) => onSettingsChange('renameFile', checked)}
                className="data-[state=checked]:bg-primary"
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-card/50 rounded-18">
              <div className="space-y-1">
                <span className="text-sm font-medium text-foreground">Auto Category</span>
                <p className="text-xs text-muted-foreground">Categorize by type</p>
              </div>
              <Switch
                checked={settings.autoCategory}
                onCheckedChange={(checked) => onSettingsChange('autoCategory', checked)}
                className="data-[state=checked]:bg-primary"
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-card/50 rounded-18">
              <div className="space-y-1">
                <span className="text-sm font-medium text-foreground">Auto Foldering</span>
                <p className="text-xs text-muted-foreground">Create organized folders</p>
              </div>
              <Switch
                checked={settings.autoFoldering}
                onCheckedChange={(checked) => onSettingsChange('autoFoldering', checked)}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};