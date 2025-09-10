import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, AlertCircle, Info, Clock } from "lucide-react";

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface ProcessingLogsProps {
  logs: LogEntry[];
}

export const ProcessingLogs = ({ logs }: ProcessingLogsProps) => {
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLogStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-700';
      case 'error':
        return 'bg-red-500/10 border-red-500/20 text-red-700';
      default:
        return 'bg-blue-500/10 border-blue-500/20 text-blue-700';
    }
  };

  return (
    <Card className="h-full bg-gradient-card border-0 rounded-lg shadow-bento hover:shadow-hover transition-smooth flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="p-1.5 bg-gradient-primary rounded-lg">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            Processing Logs
          </CardTitle>
          {logs.length > 0 && (
            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-lg font-semibold text-xs">
              {logs.length} entries
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full rounded-lg border border-border/30 bg-background/20">
          <div className="p-2 space-y-2">
            {logs.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <div className="mx-auto w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 opacity-50" />
                </div>
                <p className="font-medium mb-1 text-sm">No logs available</p>
                <p className="text-xs">Start processing to see activity here</p>
              </div>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 bg-card/30 rounded-lg hover:bg-card/50 transition-smooth border border-border/20"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getLogIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={`text-xs rounded-lg font-medium ${getLogStyles(log.type)}`}
                      >
                        <Clock className="w-2.5 h-2.5 mr-1" />
                        {log.timestamp}
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground/90 font-medium leading-relaxed">
                      {log.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};