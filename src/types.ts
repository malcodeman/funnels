export type TextBlock = {
  id: string;
  type: "text";
  text: string;
  color: string;
  align: "left" | "center" | "right" | "justify";
  size?: string;
};

export type ImageBlock = {
  id: string;
  type: "image";
  alt?: string;
  src: string;
};

export type ListBlock = {
  id: string;
  type: "list";
  items: {
    id: string;
    title: string;
    description: string;
    src: string;
  }[];
};

export type ButtonBlock = {
  id: string;
  type: "button";
  text: string;
  color: string;
  bgColor: string;
};

export type VideoBlock = {
  id: string;
  type: "video";
  src: string;
};

export type LoomBlock = {
  id: string;
  type: "loom";
  src: string;
};

export type Block =
  | TextBlock
  | ImageBlock
  | ListBlock
  | ButtonBlock
  | VideoBlock
  | LoomBlock;

export type FunnelData = {
  name: string;
  bgColor: string;
  branding?: boolean;
  pages: {
    id: string;
    blocks: Block[];
  }[];
};
