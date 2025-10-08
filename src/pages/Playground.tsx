import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import CodePlayground from '@/components/CodePlayground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Sparkles } from 'lucide-react';

export default function Playground() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code2 className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Code <span className="gradient-text">Playground</span>
              </h1>
              <Sparkles className="h-10 w-10 text-yellow-500" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Write, test, and experiment with code in JavaScript, Python, HTML/CSS, Java, and C++
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Multi-Language</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Support for 5 languages with syntax highlighting
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Auto-Save</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your code is automatically saved to local storage
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Multi-File</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create and manage multiple code files with tabs
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Playground */}
          <CodePlayground />

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 bg-muted/50 rounded-lg border"
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Click the <strong>+</strong> button to create multiple files</li>
              <li>• Switch languages from the dropdown to see starter templates</li>
              <li>• Use <kbd className="px-2 py-1 bg-background rounded">Ctrl+Enter</kbd> to run code quickly</li>
              <li>• Press <kbd className="px-2 py-1 bg-background rounded">Shift+Alt+F</kbd> to format your code</li>
              <li>• Copy code with one click using the copy button</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
