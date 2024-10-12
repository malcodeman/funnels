import { HEADER_HEIGHT } from "@/lib/constants";
import { Block, FunnelData } from "@/types";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { ListBlock } from "./blocks/ListBlock";
import { TextBlock } from "./blocks/TextBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { ButtonBlock } from "./blocks/ButtonBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { LoomBlock } from "./blocks/LoomBlock";

type Props = {
  selectedPageIndex: number;
  selectedBlock: null | Block;
};

export function PropertiesPanel(props: Props) {
  const { selectedPageIndex, selectedBlock } = props;
  const { control } = useFormContext<FunnelData>();
  const pages = useWatch({
    control,
    name: "pages",
  });
  const blocks = pages[selectedPageIndex].blocks;
  const block = blocks.find((block) => block.id === selectedBlock?.id);
  const blockIndex = blocks.findIndex(
    (block) => block.id === selectedBlock?.id
  );
  const backgroundColor = useColorModeValue("white", "gray.800");

  function renderBlock(block: null | Block) {
    if (!block) {
      return null;
    }

    if (block.type === "text") {
      return (
        <TextBlock
          pageIndex={selectedPageIndex}
          blockIndex={blockIndex}
          block={block}
        />
      );
    }

    if (block.type === "image") {
      return (
        <ImageBlock
          pageIndex={selectedPageIndex}
          blockIndex={blockIndex}
          block={block}
        />
      );
    }

    if (block.type === "list") {
      return (
        <ListBlock
          pageIndex={selectedPageIndex}
          blockIndex={blockIndex}
          block={block}
        />
      );
    }

    if (block.type === "button") {
      return (
        <ButtonBlock
          pageIndex={selectedPageIndex}
          blockIndex={blockIndex}
          block={block}
        />
      );
    }

    if (block.type === "video") {
      return (
        <VideoBlock
          pageIndex={selectedPageIndex}
          blockIndex={blockIndex}
          block={block}
        />
      );
    }

    if (block.type === "loom") {
      return (
        <LoomBlock
          pageIndex={selectedPageIndex}
          blockIndex={blockIndex}
          block={block}
        />
      );
    }
  }

  return (
    <Box
      top={HEADER_HEIGHT}
      bgColor={backgroundColor}
      height={`calc(100vh - ${HEADER_HEIGHT})`}
      position="fixed"
      right="0"
      bottom="0"
      width="260px"
      pt="2"
      px="4"
      pb="5"
      overflowY="auto"
    >
      {block ? renderBlock(block) : null}
    </Box>
  );
}
