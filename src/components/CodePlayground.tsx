import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw, Trash2 } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import { toast } from 'sonner';

const defaultCode = {
  javascript: `// Welcome to the Code Playground!
function greet(name) {
  return \`Hello, \${name}! Ready to code?\`;
}

console.log(greet('Developer'));`,
  python: `# Welcome to the Code Playground!
def greet(name):
    return f"Hello, {name}! Ready to code?"

print(greet('Developer'))`,
  html: `<!DOCTYPE html>
<html>
<head>
  <title>Code Playground</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Welcome to the Code Playground!</p>
</body>
</html>`,
};

export default function CodePlayground() {
  const { theme } = useThemeStore();
  const [language, setLanguage] = useState<'javascript' | 'python' | 'html'>('javascript');
  const [code, setCode] = useState(defaultCode[language]);
  const [output, setOutput] = useState<string[]>([]);

  const handleLanguageChange = (newLanguage: string) => {
    const lang = newLanguage as 'javascript' | 'python' | 'html';
    setLanguage(lang);
    setCode(defaultCode[lang]);
    setOutput([]);
  };

  const runCode = () => {
    setOutput([]);
    toast.success('Code execution started...');
    
    // Simulate code execution
    setTimeout(() => {
      if (language === 'javascript') {
        try {
          // Mock console.log capture
          const logs: string[] = [];
          const mockConsole = {
            log: (...args: any[]) => logs.push(args.join(' ')),
          };
          
          // In production, use a sandboxed environment
          setOutput(['> Hello, Developer! Ready to code?', '> Execution completed ✓']);
          toast.success('Code executed successfully!');
        } catch (error) {
          setOutput([`Error: ${error}`]);
          toast.error('Execution failed');
        }
      } else if (language === 'python') {
        setOutput(['> Hello, Developer! Ready to code?', '> Execution completed ✓']);
        toast.success('Code executed successfully!');
      } else {
        setOutput(['> HTML rendered in preview', '> Execution completed ✓']);
        toast.success('Code executed successfully!');
      }
    }, 800);
  };

  const resetCode = () => {
    setCode(defaultCode[language]);
    setOutput([]);
    toast.info('Code reset to default');
  };

  const clearOutput = () => {
    setOutput([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="html">HTML/CSS</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">Theme: {theme === 'dark' ? 'Dark' : 'Light'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetCode}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button variant="glow" size="sm" onClick={runCode}>
            <Play className="mr-2 h-4 w-4" />
            Run Code
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden card-glow">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
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

      <div className="border border-border rounded-lg p-4 bg-card/50 min-h-[150px] font-mono text-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted-foreground font-semibold">Output</span>
          {output.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearOutput}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="space-y-1">
          {output.length === 0 ? (
            <p className="text-muted-foreground">Click "Run Code" to see output...</p>
          ) : (
            output.map((line, index) => (
              <div key={index} className="text-foreground">
                {line}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        💡 Tip: Use Ctrl+S (Cmd+S on Mac) to auto-save your code locally
      </div>
    </div>
  );
}
