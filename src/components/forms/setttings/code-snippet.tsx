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

  const snippet = `
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
    max-height: 80vh;
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
  if(e.origin !== "http://localhost:3000") return null;
  let dimensions = JSON.parse(e.data);
  iframe.style.width = \`\${Math.min(dimensions.width, window.innerWidth * 0.9)}px\`;
  iframe.style.height = \`\${Math.min(dimensions.height, window.innerHeight * 0.8)}px\`;
  iframe.contentWindow.postMessage("${id}", "http://localhost:3000/");
});
  `.trim();

  const previewSnippet = snippet.split('\n').slice(0, 3).join('\n') + '\n...';

  return (
    <div className="mt-10 flex flex-col gap-5 items-start w-full max-w-full overflow-hidden">
      <Section
        label="Code snippet"
        message="Copy and paste this snippet into the header tag of your website"
      />
      <div className="bg-muted p-4 sm:p-6 rounded-lg relative w-full overflow-hidden">
        <Copy
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
          size={20}
          onClick={() => {
            navigator.clipboard.writeText(snippet);
            toast({
              title: "Copied to clipboard",
              description: "You can now paste the code inside your website"
            });
          }}
        />
        <pre className="text-sm sm:text-base overflow-x-auto">
          <code className="text-gray-500 whitespace-pre-wrap break-words">
            {isMobile ? (isExpanded ? snippet : previewSnippet) : snippet}
          </code>
        </pre>
        {isMobile && (
          <button
            className="mt-2 flex items-center text-gray-500  transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp size={20} className="mr-1" /> Show less
              </>
            ) : (
              <>
                <ChevronDown size={20} className="mr-1" /> Show full code
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CodeSnippet;