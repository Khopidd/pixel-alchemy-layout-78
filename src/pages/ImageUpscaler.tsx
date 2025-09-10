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
    <div className="min-h-screen bg-gradient-secondary font-outfit p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="p-4 bg-gradient-primary rounded-18 shadow-bento">
              <Bot className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-2">
                AI Image Upscaler
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
                  Professional Edition
                </span>
              </div>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your images with cutting-edge AI technology. 
            Configure settings, manage API keys, and monitor processing with our intuitive bento interface.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 grid-rows-[auto] gap-6">
          {/* Folder Configuration - Top Left */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <FolderSelector
              inputFolder={inputFolder}
              outputFolder={outputFolder}
              onInputFolderChange={setInputFolder}
              onOutputFolderChange={setOutputFolder}
            />
          </div>

          {/* API Keys - Top Right */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <ApiKeyManager
              apiKeys={apiKeys}
              hideKeys={hideKeys}
              onHideKeysChange={setHideKeys}
              onCheckApi={handleCheckApi}
            />
          </div>

          {/* Processing Controls - Top Far Right */}
          <div className="col-span-12 xl:col-span-4">
            <ProcessingControls
              isProcessing={isProcessing}
              progress={progress}
              onStartProcessing={handleStartProcessing}
              onStopProcessing={handleStopProcessing}
              onLoad={handleLoad}
              onSave={handleSave}
              onDelete={handleDelete}
              onClearLog={handleClearLog}
            />
          </div>

          {/* Processing Settings - Middle Left (Larger) */}
          <div className="col-span-12 lg:col-span-8">
            <ProcessingSettings
              settings={settings}
              onSettingsChange={handleSettingsChange}
            />
          </div>

          {/* Logs - Bottom Full Width */}
          <div className="col-span-12">
            <ProcessingLogs logs={logs} />
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center pt-8">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-18 shadow-soft">
            <Zap className="w-4 h-4 text-primary" />
            <span>Powered by Advanced AI Technology • Made with ❤️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpscaler;