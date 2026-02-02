"use client";

import type { DocTreeNode } from "@/lib/docs/content";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

interface DocTreeViewProps {
  tree: DocTreeNode[];
  lang: string;
  activeSlug: string[];
}

interface TreeNodeProps {
  node: DocTreeNode;
  lang: string;
  activeSlug: string[];
  depth: number;
}

function TreeNode({ node, lang, activeSlug, depth }: TreeNodeProps) {
  const isActive = activeSlug.join("/") === node.slug.join("/");
  const hasActiveChild = node.children.some((child) =>
    activeSlug.join("/").startsWith(child.slug.join("/")),
  );
  const [isOpen, setIsOpen] = useState(
    node.isFolder && (hasActiveChild || depth === 0),
  );

  const href =
    node.slug.length === 0
      ? `/docs/${lang}`
      : `/docs/${lang}/${node.slug.join("/")}`;

  if (node.isFolder) {
    return (
      <div>
        <Flex
          align="center"
          gap="1"
          className={styles.folderItem}
          style={{ paddingLeft: `${depth * 12}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronDownIcon width={14} height={14} />
          ) : (
            <ChevronRightIcon width={14} height={14} />
          )}
          <span className={styles.folderName}>{node.name}</span>
        </Flex>
        {isOpen && (
          <div>
            {node.children.map((child) => (
              <TreeNode
                key={child.slug.join("/")}
                node={child}
                lang={lang}
                activeSlug={activeSlug}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={isActive ? styles.activeLink : styles.link}
      style={{ paddingLeft: `${depth * 12 + 16}px` }}
    >
      {node.name}
    </Link>
  );
}

export default function DocTreeView({
  tree,
  lang,
  activeSlug,
}: DocTreeViewProps) {
  return (
    <Flex direction="column" gap="1">
      {tree.map((node) => (
        <TreeNode
          key={node.slug.join("/")}
          node={node}
          lang={lang}
          activeSlug={activeSlug}
          depth={0}
        />
      ))}
    </Flex>
  );
}
