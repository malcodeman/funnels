export type TextBlock = {
  id: string;
  type: "text";
  text: string;
  color: string;
  align: "left" | "center" | "right";
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

export type Block = TextBlock | ImageBlock | ListBlock | ButtonBlock;

export type FunnelData = {
  name: string;
  bgColor: string;
  pages: {
    id: string;
    blocks: Block[];
  }[];
};
