import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Save, 
  Terminal,
  FileCode,
  Plus,
  X,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useThemeStore } from '@/stores/themeStore';
import { storage } from '@/utils/localStorage';
import { toast } from 'sonner';

interface CodeFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

const languageDefaults: Record<string, string> = {
  javascript: `// JavaScript Playground
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci sequence:');
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,
  
  python: `# Python Playground
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print('Fibonacci sequence:')
for i in range(10):
    print(f'F({i}) = {fibonacci(i)}')`,
  
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Playground</title>
  <style>
    body { font-family: system-ui; padding: 2rem; }
    h1 { color: #6366f1; }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Welcome to the HTML Playground!</p>
</body>
</html>`,

  java: `// Java Playground
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        
        for (int i = 0; i < 5; i++) {
            System.out.println("Count: " + i);
        }
    }
}`,

  cpp: `// C++ Playground
#include <iostream>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    
    for (int i = 0; i < 5; i++) {
        cout << "Count: " << i << endl;
    }
    
    return 0;
}`
};

interface CodePlaygroundProps {
  lessonId?: string;
  initialCode?: string;
  initialLanguage?: string;
}

export default function CodePlayground({ 
  lessonId, 
  initialCode, 
  initialLanguage = 'javascript' 
}: CodePlaygroundProps) {
  const { theme } = useThemeStore();
  const [files, setFiles] = useState<CodeFile[]>([
    {
      id: 'file-1',
      name: 'main.js',
      language: initialLanguage,
      content: initialCode || languageDefaults[initialLanguage],
    },
  ]);
  const [activeFileId, setActiveFileId] = useState('file-1');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const autoSaveTimer = useRef<NodeJS.Timeout>();

  const activeFile = files.find(f => f.id === activeFileId)!;

  // Auto-save to localStorage
  useEffect(() => {
    if (lessonId) {
      clearTimeout(autoSaveTimer.current);
      autoSaveTimer.current = setTimeout(() => {
        storage.setCodePlayground(lessonId, files);
        toast.success('Code auto-saved', { duration: 1000 });
      }, 2000);
    }
    return () => clearTimeout(autoSaveTimer.current);
  }, [files, lessonId]);

  // Load saved code on mount
  useEffect(() => {
    if (lessonId) {
      const saved = storage.getCodePlayground(lessonId);
      if (saved) {
        setFiles(saved);
      }
    }
  }, [lessonId]);

  const updateActiveFile = (content: string) => {
    setFiles(files.map(f => 
      f.id === activeFileId ? { ...f, content } : f
    ));
  };

  const addNewFile = () => {
    const newFile: CodeFile = {
      id: `file-${Date.now()}`,
      name: `untitled-${files.length + 1}.js`,
      language: 'javascript',
      content: languageDefaults.javascript,
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id);
    toast.success('New file created');
  };

  const deleteFile = (fileId: string) => {
    if (files.length === 1) {
      toast.error('Cannot delete the last file');
      return;
    }
    const newFiles = files.filter(f => f.id !== fileId);
    setFiles(newFiles);
    if (activeFileId === fileId) {
      setActiveFileId(newFiles[0].id);
    }
    toast.success('File deleted');
  };

  const changeLanguage = (language: string) => {
    const extension = {
      javascript: 'js',
      python: 'py',
      html: 'html',
      java: 'java',
      cpp: 'cpp',
    }[language];

    setFiles(files.map(f =>
      f.id === activeFileId
        ? {
            ...f,
            language,
            name: f.name.replace(/\.[^.]+$/, `.${extension}`),
            content: languageDefaults[language],
          }
        : f
    ));
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput(['> Running code...']);

    // Simulate code execution with delay
    setTimeout(() => {
      const mockOutput = [];
      
      if (activeFile.language === 'javascript') {
        try {
          // Mock JavaScript execution
          mockOutput.push('> Executing JavaScript...');
          mockOutput.push('Hello from JavaScript!');
          mockOutput.push('Fibonacci sequence:');
          for (let i = 0; i < 5; i++) {
            mockOutput.push(`F(${i}) = ${i <= 1 ? i : 'calculated'}`);
          }
        } catch (error) {
          mockOutput.push(`Error: ${error}`);
        }
      } else if (activeFile.language === 'python') {
        mockOutput.push('> Executing Python...');
        mockOutput.push('Hello from Python!');
        mockOutput.push('Fibonacci sequence:');
        for (let i = 0; i < 5; i++) {
          mockOutput.push(`F(${i}) = ${i <= 1 ? i : 'calculated'}`);
        }
      } else if (activeFile.language === 'html') {
        mockOutput.push('> Rendering HTML...');
        mockOutput.push('HTML rendered in preview pane →');
      } else if (activeFile.language === 'java') {
        mockOutput.push('> Compiling Java...');
        mockOutput.push('Hello from Java!');
        mockOutput.push('Count: 0');
        mockOutput.push('Count: 1');
        mockOutput.push('Count: 2');
        mockOutput.push('Count: 3');
        mockOutput.push('Count: 4');
      } else if (activeFile.language === 'cpp') {
        mockOutput.push('> Compiling C++...');
        mockOutput.push('Hello from C++!');
        mockOutput.push('Count: 0');
        mockOutput.push('Count: 1');
        mockOutput.push('Count: 2');
        mockOutput.push('Count: 3');
        mockOutput.push('Count: 4');
      }

      mockOutput.push('> Execution completed successfully ✓');
      setOutput(mockOutput);
      setIsRunning(false);
      toast.success('Code executed!');
    }, 1500);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setOutput(prev => [...prev, '> Execution stopped by user']);
    toast.info('Execution stopped');
  };

  const resetCode = () => {
    updateActiveFile(languageDefaults[activeFile.language]);
    setOutput([]);
    toast.success('Code reset to default');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(activeFile.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast.success('Code copied to clipboard');
  };

  return (
    <Card className="w-full border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            Code Playground
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={activeFile.language} onValueChange={changeLanguage}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="html">HTML/CSS</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={copyCode}>
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* File Tabs */}
        <div className="flex items-center gap-2 border-b pb-2">
          <div className="flex items-center gap-1 flex-1 overflow-x-auto">
            {files.map(file => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center"
              >
                <Button
                  variant={activeFileId === file.id ? 'default' : 'ghost'}
                  size="sm"
                  className="h-8 gap-2"
                  onClick={() => setActiveFileId(file.id)}
                >
                  {file.name}
                  {files.length > 1 && (
                    <X
                      className="h-3 w-3 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(file.id);
                      }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="h-8" onClick={addNewFile}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Editor */}
        <div className="border rounded-lg overflow-hidden">
          <Editor
            height="400px"
            language={activeFile.language}
            value={activeFile.content}
            onChange={(value) => updateActiveFile(value || '')}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {!isRunning ? (
            <Button onClick={runCode} variant="default" className="gap-2">
              <Play className="h-4 w-4" />
              Run Code
            </Button>
          ) : (
            <Button onClick={stopExecution} variant="destructive" className="gap-2">
              <Square className="h-4 w-4" />
              Stop
            </Button>
          )}
          <Button onClick={resetCode} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          {lessonId && (
            <Button variant="ghost" className="gap-2 ml-auto" disabled>
              <Save className="h-4 w-4" />
              Auto-saving...
            </Button>
          )}
        </div>

        {/* Output Console */}
        <div className="border rounded-lg bg-black/90 p-4 min-h-[150px] max-h-[200px] overflow-y-auto font-mono text-sm">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <Terminal className="h-4 w-4" />
            <span className="font-semibold">Console Output</span>
          </div>
          <AnimatePresence>
            {output.length === 0 ? (
              <p className="text-gray-500">Run code to see output...</p>
            ) : (
              output.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`${
                    line.startsWith('>')
                      ? 'text-blue-400'
                      : line.includes('Error')
                      ? 'text-red-400'
                      : 'text-green-300'
                  }`}
                >
                  {line}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Tips */}
        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <p className="font-semibold mb-1">💡 Keyboard Shortcuts:</p>
          <div className="grid grid-cols-2 gap-1">
            <span>Run: <kbd className="px-1 py-0.5 bg-background rounded">Ctrl+Enter</kbd></span>
            <span>Format: <kbd className="px-1 py-0.5 bg-background rounded">Shift+Alt+F</kbd></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
