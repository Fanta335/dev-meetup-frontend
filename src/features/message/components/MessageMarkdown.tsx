import { FC, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
  markdown: string;
};

export const MessageMarkdown: FC<Props> = memo(({ markdown }: Props) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, style, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter style={okaidia} language={match[1]} PreTag="div" {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
});

MessageMarkdown.displayName = 'MessageMarkdown';
