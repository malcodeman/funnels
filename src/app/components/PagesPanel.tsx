import { Block, FunnelData } from "@/types";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  ImageIcon,
  ListIcon,
  MousePointerClickIcon,
  PlusIcon,
  TextIcon,
  VideoIcon,
} from "lucide-react";
import { nanoid } from "nanoid";
import { Fragment } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { isEmpty, map } from "remeda";
import { SiLoom } from "@icons-pack/react-simple-icons";
import { useBlockStore, usePageIndexStore } from "@/state";

export function PagesPanel() {
  const { selectedBlock, setSelectedBlock } = useBlockStore();
  const { selectedPageIndex, setSelectedPageIndex } = usePageIndexStore();
  const { control } = useFormContext<FunnelData>();
  const { append } = useFieldArray({
    control,
    name: "pages",
  });
  const pages = useWatch({
    control,
    name: "pages",
  });

  function renderBlock(block: Block) {
    if (block.type === "text") {
      return (
        <Button
          leftIcon={<TextIcon size={16} />}
          variant="ghost"
          justifyContent="flex-start"
          overflowX="hidden"
          size="sm"
          isActive={selectedBlock?.id === block.id}
          onClick={() => setSelectedBlock(block)}
        >
          {isEmpty(block.text) ? "Text" : block.text}
        </Button>
      );
    }

    if (block.type === "image") {
      return (
        <Button
          leftIcon={<ImageIcon size={16} />}
          variant="ghost"
          justifyContent="flex-start"
          overflowX="hidden"
          size="sm"
          isActive={selectedBlock?.id === block.id}
          onClick={() => setSelectedBlock(block)}
        >
          {isEmpty(block.alt) ? "Image" : block.alt}
        </Button>
      );
    }

    if (block.type === "list") {
      return (
        <Button
          leftIcon={<ListIcon size={16} />}
          variant="ghost"
          justifyContent="flex-start"
          size="sm"
          isActive={selectedBlock?.id === block.id}
          onClick={() => setSelectedBlock(block)}
        >
          List
        </Button>
      );
    }

    if (block.type === "button") {
      return (
        <Button
          leftIcon={<MousePointerClickIcon size={16} />}
          variant="ghost"
          justifyContent="flex-start"
          overflowX="hidden"
          size="sm"
          isActive={selectedBlock?.id === block.id}
          onClick={() => setSelectedBlock(block)}
        >
          {isEmpty(block.text) ? "Button" : block.text}
        </Button>
      );
    }

    if (block.type === "video") {
      return (
        <Button
          leftIcon={<VideoIcon size={16} />}
          variant="ghost"
          justifyContent="flex-start"
          overflowX="hidden"
          size="sm"
          isActive={selectedBlock?.id === block.id}
          onClick={() => setSelectedBlock(block)}
        >
          Video
        </Button>
      );
    }

    if (block.type === "loom") {
      return (
        <Button
          leftIcon={<SiLoom size={16} />}
          variant="ghost"
          justifyContent="flex-start"
          overflowX="hidden"
          size="sm"
          isActive={selectedBlock?.id === block.id}
          onClick={() => setSelectedBlock(block)}
        >
          Loom
        </Button>
      );
    }
  }

  return (
    <Accordion index={selectedPageIndex} onChange={setSelectedPageIndex} pb="5">
      <Box paddingX="4" paddingY="2">
        <Button
          size="sm"
          width="full"
          leftIcon={<PlusIcon size={16} />}
          onClick={() =>
            append({
              id: nanoid(),
              blocks: [],
            })
          }
          data-testid="add-page-button"
        >
          Add page
        </Button>
      </Box>
      {pages.map((page, i) => (
        <AccordionItem
          key={page.id}
          borderTop="0"
          borderBottom="0"
          data-testid="page-accordion-item"
        >
          <AccordionButton>
            <Text flexGrow="1" textAlign="left">
              Page {i + 1}
            </Text>
            <AccordionIcon size={10} />
          </AccordionButton>
          <AccordionPanel>
            {page.blocks.length === 0 ? (
              <Text fontSize="sm">Empty page </Text>
            ) : null}
            <Flex flexDirection="column" gap="4">
              {map(page.blocks, (block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
              ))}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
