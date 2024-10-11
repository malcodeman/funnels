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
} from "lucide-react";
import { nanoid } from "nanoid";
import { Fragment } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { isEmpty, map } from "remeda";

type Props = {
  selectedPageIndex: number;
  selectedBlock: null | Block;
  onSelectPage: (index: number) => void;
  onSelectBlock: (block: null | Block) => void;
};

export function PagesPanel(props: Props) {
  const { selectedPageIndex, selectedBlock, onSelectPage, onSelectBlock } =
    props;
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
          onClick={() => onSelectBlock(block)}
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
          onClick={() => onSelectBlock(block)}
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
          onClick={() => onSelectBlock(block)}
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
          onClick={() => onSelectBlock(block)}
        >
          {isEmpty(block.text) ? "Button" : block.text}
        </Button>
      );
    }
  }

  return (
    <Accordion index={selectedPageIndex} onChange={onSelectPage} pb="5">
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
        >
          Add page
        </Button>
      </Box>
      {pages.map((page, i) => (
        <AccordionItem key={page.id} borderTop="0" borderBottom="0">
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
