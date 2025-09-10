import { useState } from "react";
import { FolderSelector } from "@/components/FolderSelector";
import { ApiKeyManager } from "@/components/ApiKeyManager";
import { ProcessingSettings } from "@/components/ProcessingSettings";
import { ProcessingControls } from "@/components/ProcessingControls";
import { ProcessingLogs } from "@/components/ProcessingLogs";
import { Sparkles, Zap, Bot } from "lucide-react";

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

const ImageUpscaler = () => {
  const [inputFolder, setInputFolder] = useState("C:/Users/Khopida/Downloads/upscalee image");
  const [outputFolder, setOutputFolder] = useState("C:/Users/Khopida/Downloads/upscalee image/metadata");
  const [hideKeys, setHideKeys] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [settings, setSettings] = useState({
    keywords: 49,
    workers: 4,
    delay: 2,
    theme: "dark",
    models: "auto-retouch",
    quality: "detailed",
    renameFile: true,
    autoCategory: true,
    autoFoldering: false,
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      timestamp: "09:02:37",
      message: "Installation ID found: bf20ac4b...",
      type: "info",
    },
    {
      timestamp: "09:02:37", 
      message: "Other settings loaded from configuration",
      type: "success",
    },
  ]);

  const apiKeys = [
    "AlzaSyDnRQkirGlnK9ZjK0H3_jivG8W83T1B3Is",
    "AlzaSyQfTmrpBzqjCSkr\LTD/5YJMYq_2FM88",
    "AlzaSyA2NnNdvJ18xkp3qG-p2q/2589jQjUGxY",
    "AlzaSyAQMGDB-JczuK6m62&rP0WesgLSYEBw",
    "AlzaSyMjBJAF-LLYgb4l4VXqY46LcQVgQqBsE",
    "AlzaSyB_nygIMOUW12uJEnTnRVjqGXAG1Qdc",
    "AlzaSyDWXsWob3jEK-kPIqA6a1lWAPBZ291Tpg",
  ];

  const handleSettingsChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      message: "Starting image processing...",
      type: "info",
    };
    setLogs(prev => [newLog, ...prev]);

    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          const completeLog: LogEntry = {
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            message: "Processing completed successfully!",
            type: "success",
          };
          setLogs(current => [completeLog, ...current]);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleStopProcessing = () => {
    setIsProcessing(false);
    setProgress(0);
    const stopLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      message: "Processing stopped by user",
      type: "error",
    };
    setLogs(prev => [stopLog, ...prev]);
  };

  const handleCheckApi = () => {
    const checkLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      message: "API keys validated successfully",
      type: "success",
    };
    setLogs(prev => [checkLog, ...prev]);
  };

  const handleLoad = () => {
    const loadLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      message: "Configuration loaded from file",
      type: "info",
    };
    setLogs(prev => [loadLog, ...prev]);
  };

  const handleSave = () => {
    const saveLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      message: "Configuration saved successfully",
      type: "success",
    };
    setLogs(prev => [saveLog, ...prev]);
  };

  const handleDelete = () => {
    const deleteLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      message: "Selected files deleted",
      type: "info",
    };
    setLogs(prev => [deleteLog, ...prev]);
  };

  const handleClearLog = () => {
    setLogs([]);
  };

  return (
    <div className="h-screen bg-gradient-secondary font-outfit p-2">
      <div className="h-full max-w-7xl mx-auto flex flex-col">
        {/* Bento Grid Layout - Compact spacing */}
        <div className="flex-1 grid grid-cols-12 gap-2 min-h-0" style={{gridTemplateRows: 'auto auto 1fr 1fr'}}>
          {/* Row 1: Folder Configuration - Full Width (Compact) */}
          <div className="col-span-12">
            <FolderSelector
              inputFolder={inputFolder}
              outputFolder={outputFolder}
              onInputFolderChange={setInputFolder}
              onOutputFolderChange={setOutputFolder}
            />
          </div>

          {/* Row 2: API Keys and Processing Control (Compact) */}
          <div className="col-span-12 lg:col-span-6">
            <ApiKeyManager
              apiKeys={apiKeys}
              hideKeys={hideKeys}
              onHideKeysChange={setHideKeys}
              onCheckApi={handleCheckApi}
              onLoad={handleLoad}
              onSave={handleSave}
            />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <ProcessingControls
              isProcessing={isProcessing}
              progress={progress}
              onStartProcessing={handleStartProcessing}
              onStopProcessing={handleStopProcessing}
              onDelete={handleDelete}
              onClearLog={handleClearLog}
            />
          </div>

          {/* Row 3: Processing Settings - Full Width (Flexible) */}
          <div className="col-span-12">
            <ProcessingSettings
              settings={settings}
              onSettingsChange={handleSettingsChange}
            />
          </div>

          {/* Row 4: Logs - Full Width (Flexible) */}
          <div className="col-span-12">
            <ProcessingLogs logs={logs} />
          </div>
        </div>
        
        {/* Footer - Minimal */}
        <div className="text-center py-1 flex-shrink-0">
          <div className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-card/50 px-2 py-1 rounded-lg">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-xs">Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpscaler;