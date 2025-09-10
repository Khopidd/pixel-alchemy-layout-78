import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Key, Eye, EyeOff, CheckCircle, Shield } from "lucide-react";

interface ApiKeyManagerProps {
  apiKeys: string[];
  hideKeys: boolean;
  onHideKeysChange: (hide: boolean) => void;
  onCheckApi: () => void;
}

export const ApiKeyManager = ({
  apiKeys,
  hideKeys,
  onHideKeysChange,
  onCheckApi,
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
    <Card className="h-full bg-gradient-card border-0 rounded-18 shadow-bento hover:shadow-hover transition-smooth">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-gradient-accent rounded-18">
              <Key className="w-5 h-5 text-primary-foreground" />
            </div>
            API Keys
          </CardTitle>
          <div className="flex items-center gap-3">
            <Switch
              checked={hideKeys}
              onCheckedChange={onHideKeysChange}
              className="data-[state=checked]:bg-primary"
            />
            <div className="p-1.5 bg-muted/50 rounded-full">
              {hideKeys ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin">
          {apiKeys.map((key, index) => (
            <div
              key={index}
              className="p-3 bg-background/30 rounded-18 border border-border/50 text-sm font-mono font-medium flex items-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="truncate">{maskKey(key)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Button
            onClick={handleCheckApi}
            disabled={apiStatus === 'checking'}
            className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold rounded-18"
          >
            {apiStatus === 'checking' ? (
              "Validating..."
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Check API
              </>
            )}
          </Button>
          {apiStatus === 'valid' && (
            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-18 font-medium">
              ✓ Valid
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};