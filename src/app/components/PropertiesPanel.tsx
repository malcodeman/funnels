import { HEADER_HEIGHT } from "@/lib/constants";
import { Block, FunnelData } from "@/types";
import { Box } from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ListBlock } from "./blocks/ListBlock";
import { TextBlock } from "./blocks/TextBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { ButtonBlock } from "./blocks/ButtonBlock";

type Props = {
  selectedPageIndex: number;
  selectedBlock: null | Block;
};

export function PropertiesPanel(props: Props) {
  const { selectedPageIndex, selectedBlock } = props;
  const { control } = useFormContext<FunnelData>();
  const { fields: pages } = useFieldArray({
    control,
    name: "pages",
  });
  const blocks = pages[selectedPageIndex].blocks;
  const block = blocks.find((block) => block.id === selectedBlock?.id);
  const blockIndex = blocks.findIndex(
    (block) => block.id === selectedBlock?.id
  );

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
  }

  return (
    <Box
      position="fixed"
      right="0"
      top={HEADER_HEIGHT}
      bottom="0"
      width="260px"
      height={`calc(100vh - ${HEADER_HEIGHT})`}
      bgColor="gray.800"
      pt="2"
      px="4"
      pb="5"
      overflowY="auto"
    >
      {block ? renderBlock(block) : null}
    </Box>
  );
}
