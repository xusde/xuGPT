import React, { memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
const Markdown = ({ children, ...props }: Options) => {
  return <ReactMarkdown {...props}>{children}</ReactMarkdown>;
};

export default memo(Markdown);
