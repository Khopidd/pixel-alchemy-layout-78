import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Key, Eye, EyeOff, CheckCircle, Shield, Upload, Save } from "lucide-react";

interface ApiKeyManagerProps {
  apiKeys: string[];
  hideKeys: boolean;
  onHideKeysChange: (hide: boolean) => void;
  onCheckApi: () => void;
  onLoad: () => void;
  onSave: () => void;
}

export const ApiKeyManager = ({
  apiKeys,
  hideKeys,
  onHideKeysChange,
  onCheckApi,
  onLoad,
  onSave,
}: ApiKeyManagerProps) => {
  const [apiStatus, setApiStatus] = useState<'checking' | 'valid' | 'invalid' | null>(null);

  const handleCheckApi = () => {
    setApiStatus('checking');
    onCheckApi();
    // Simulate API check
    setTimeout(() => {
      setApiStatus('valid');
    }, 2000);
  };

  const maskKey = (key: string) => {
    if (!hideKeys) return key;
    return key.substring(0, 8) + "•".repeat(Math.max(0, key.length - 12)) + key.slice(-4);
  };

  return (
    <Card className="h-full bg-gradient-card border-0 rounded-lg shadow-bento hover:shadow-hover transition-smooth">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="p-1.5 bg-gradient-accent rounded-lg">
              <Key className="w-4 h-4 text-primary-foreground" />
            </div>
            API Keys
          </CardTitle>
          <div className="flex items-center gap-2">
            <Switch
              checked={hideKeys}
              onCheckedChange={onHideKeysChange}
              className="data-[state=checked]:bg-primary scale-75"
            />
            <div className="p-1 bg-muted/50 rounded-full">
              {hideKeys ? <EyeOff className="w-3 h-3 text-muted-foreground" /> : <Eye className="w-3 h-3 text-muted-foreground" />}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1 max-h-20 overflow-y-auto scrollbar-thin">
          {apiKeys.slice(0, 3).map((key, index) => (
            <div
              key={index}
              className="p-2 bg-background/30 rounded-lg border border-border/50 text-xs font-mono font-medium flex items-center gap-2"
            >
              <Shield className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="truncate">{maskKey(key)}</span>
            </div>
          ))}
          {apiKeys.length > 3 && (
            <div className="text-xs text-muted-foreground text-center py-1">
              +{apiKeys.length - 3} more keys
            </div>
          )}
        </div>
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleCheckApi}
              disabled={apiStatus === 'checking'}
              className="flex-1 h-8 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold rounded-lg text-xs"
            >
              {apiStatus === 'checking' ? (
                "Validating..."
              ) : (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Check API
                </>
              )}
            </Button>
            {apiStatus === 'valid' && (
              <Badge className="bg-primary/10 text-primary border-primary/20 rounded-lg font-medium text-xs">
                ✓ Valid
              </Badge>
            )}
          </div>
          
          {/* Load and Save buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={onLoad} 
              variant="outline" 
              className="h-7 text-xs border-border/50 rounded-lg hover:border-primary hover:bg-primary/10 hover:text-primary font-medium transition-smooth"
            >
              <Upload className="w-3 h-3 mr-1" />
              Load
            </Button>
            
            <Button 
              onClick={onSave} 
              variant="outline" 
              className="h-7 text-xs border-border/50 rounded-lg hover:border-primary hover:bg-primary/10 hover:text-primary font-medium transition-smooth"
            >
              <Save className="w-3 h-3 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};