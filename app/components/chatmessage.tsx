import React, { useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface ChatMessageProps {
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content }) => {
  
  const markdownComponents: Components = {
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const [isCopied, setIsCopied] = useState<boolean>(false);

      const handleCopy = () => {
        navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      };

      return !inline && match ? (
        <div className="relative group rounded-md overflow-hidden my-4 border border-gray-700">
          <div className="flex items-center justify-between px-4 py-1 bg-gray-800 text-xs text-gray-400">
            <span>{match[1]}</span>
            <button
              onClick={handleCopy}
              className="hover:text-white transition-colors"
              title="Copy code"
              aria-label="Copy code"
            >
              {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
          <SyntaxHighlighter
            {...props}
            style={vscDarkPlus as any} 
            language={match[1]}
            PreTag="div"
            customStyle={{ margin: 0, borderRadius: '0 0 0.375rem 0.375rem' }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code {...props} className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
  };

  return (
    <div className="prose prose-invert max-w-none font-sans text-gray-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ChatMessage;