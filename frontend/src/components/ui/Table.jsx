import React from "react";

export function Table({ children, className = "" }) {
  return <table className={`min-w-full border-collapse border ${className}`}>{children}</table>;
}

export function TableHeader({ children, className = "" }) {
  return <thead className={className}>{children}</thead>;
}

export function TableRow({ children, className = "" }) {
  return <tr className={className}>{children}</tr>;
}

export function TableCell({ children, className = "", header }) {
  const Tag = header ? "th" : "td";
  return (
    <Tag
      className={`border border-gray-300 px-4 py-2 text-left ${className}`}
      scope={header ? "col" : undefined}
    >
      {children}
    </Tag>
  );
}

export function TableBody({ children, className = "" }) {
  return <tbody className={className}>{children}</tbody>;
}
