"use client";

import { FC, useState } from "react";
import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface RenderMarkdownProps {
  children: any;
}

type GetCoreProps = {
  children?: React.ReactNode;
  "data-sourcepos"?: any;
};

function getCoreProps(props: GetCoreProps): any {
  return props["data-sourcepos"] ? { "data-sourcepos": props["data-sourcepos"] } : {};
}

export const RenderMarkdown: FC<RenderMarkdownProps> = ({ children }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const codeTheme = theme === "dark" ? themes.nightOwl : themes.nightOwlLight;

  const components = {
    h1: ({ node, ...props }: any) => (
      <h1 className="mb-1 text-xl font-semibold" {...props}>
        {props.children}
      </h1>
    ),
    h2: ({ node, ...props }: any) => (
      <h2 className="mb-[-0.5rem] text-xl font-semibold" {...props}>
        {props.children}
      </h2>
    ),
    h3: ({ node, ...props }: any) => (
      <h3 className="mb-[-0.5rem] text-lg font-semibold" {...props}>
        {props.children}
      </h3>
    ),
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const [codeCopied, setCodeCopied] = useState(false);

      return !inline && match ? (
        <div
          className={`my-4 rounded-md border relative ${
            theme === "dark" ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <CopyToClipboard
            text={String(children).replace(/\n$/, "")}
            onCopy={() => {
              setCodeCopied(true);
              setTimeout(() => setCodeCopied(false), 2000);
            }}
          >
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
            >
              {codeCopied ? "Copied!" : "Copy"}
            </Button>
          </CopyToClipboard>
          <Highlight
            code={String(children).replace(/\n$/, "")}
            language={match[1]}
            theme={codeTheme}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={className}
                style={{ ...style, overflowX: "auto", paddingLeft: "10px" }}
              >
                {tokens.map((line, i) => (
                  <div key={i} className="ml-2" {...getLineProps({ line })}>
                    <span className="mr-4 opacity-50">{i + 1}</span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      ) : (
        <code
          className="rounded-none bg-muted px-1 py-0.5 text-sm"
          {...props}
        >
          {children}
        </code>
      );
    },
    p: ({ node, ...props }: any) => (
      <p className="mb-2" {...props}>
        {props.children}
      </p>
    ),
    em: ({ node, ...props }: any) => (
      <em {...props}>{props.children}</em>
    ),
    ul: ({ node, ...props }: any) => {
      const { ordered, children, depth } = props;
      const attrs = getCoreProps(props);
      let styleType = "disc";
      if (ordered) {
        styleType = "decimal";
      }
      if (depth === 1) styleType = "circle";
      return (
        <ul
          className="my-4 space-y-2 pl-4"
          style={{ listStyleType: styleType }}
          {...attrs}
        >
          {children}
        </ul>
      );
    },
    ol: ({ node, ...props }: any) => {
      const { ordered, children, depth } = props;
      const attrs = getCoreProps(props);
      let styleType = "decimal";
      if (depth === 1) styleType = "circle";
      return (
        <ol
          className="my-4 space-y-2 pl-4"
          style={{ listStyleType: styleType }}
          {...attrs}
        >
          {children}
        </ol>
      );
    },
    li: ({ node, ...props }: any) => {
      const { children, checked } = props;
      let checkbox = null;
      if (checked !== null && checked !== undefined) {
        checkbox = (
          <Checkbox checked={checked} disabled>
            {children}
          </Checkbox>
        );
      }
      return (
        <li
          className={checked !== null ? "list-[circle]" : ""}
          {...getCoreProps(props)}
        >
          {checkbox || children}
        </li>
      );
    },
    img: ({ node, ...props }: any) => (
      <img
        className="my-4 border border-gray-300"
        {...props}
      />
    ),
    a: ({ node, ...props }: any) => (
      <a
        className="underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {props.children}
      </a>
    ),
    text: ({ node, ...props }: any) => <span {...props} />,
    table: ({ node, ...props }: any) => (
      <Table className="my-2 mb-6" {...props} />
    ),
    thead: ({ node, ...props }: any) => <TableHeader {...props} />,
    tbody: ({ node, ...props }: any) => <TableBody {...props} />,
    tr: ({ node, ...props }: any) => <TableRow {...props} />,
    td: ({ node, isHeader, ...props }: any) => <TableCell {...props} />,
    th: ({ node, isHeader, ...props }: any) => <TableHead {...props} />,
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
      {children}
    </ReactMarkdown>
  );
};
