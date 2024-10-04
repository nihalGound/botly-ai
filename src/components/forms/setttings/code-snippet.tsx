import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import Section from '@/components/section-label';

type Props = {
  id: string;
};

const CodeSnippet = ({ id }: Props) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  let snippet = `
  const iframe = document.createElement("iframe");

  const iframeStyles = (styleString) => {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }

  iframeStyles(\`
    .chat-frame {
      position: fixed;
      bottom: 20px;
      right: 20px;
      border: none;
      max-width: 90vw;
    }
    @media (min-width: 768px) {
      .chat-frame {
        bottom: 50px;
        right: 50px;
      }
    }
  \`);

  iframe.src = "http://localhost:3000/chatbot";
  iframe.classList.add('chat-frame');
  document.body.appendChild(iframe);

  window.addEventListener("message", (e) => {
    if (e.origin !== "http://localhost:3000") return;
    let dimensions = JSON.parse(e.data);
    iframe.style.width = \`\${Math.min(dimensions.width, window.innerWidth * 0.9)}px\`;
    iframe.style.height = \`\${Math.min(dimensions.height, window.innerHeight)}px\`;

    iframe.contentWindow.postMessage("${id}", "http://localhost:3000/");
  });
`;



  const previewSnippet = snippet.split('\n').slice(0, 3).join('\n') + '\n...';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-full dark:bg-black">
      <div className="p-4">
        <pre className="text-sm overflow-x-auto dark:bg-black">
          <code className="language-javascript">
            {isExpanded ? snippet : previewSnippet}
          </code>
        </pre>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center dark:bg-[#2e2d2d]">
        <button
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-white"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show full code'}
        </button>
        <Copy
          className="text-gray-400 cursor-pointer hover:text-gray-600"
          size={20}
          onClick={() => {
            navigator.clipboard.writeText(snippet);
            toast({
              title: "Code snippet copied to clipboard !!"
            })
          }}
        />
      </div>
    </div>
  );
};

export default CodeSnippet;
