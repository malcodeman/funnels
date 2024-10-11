import { Block, FunnelData } from "@/types";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  ImageIcon,
  ListIcon,
  MousePointerClickIcon,
  TextIcon,
} from "lucide-react";
import { Fragment } from "react";
import { FieldArrayWithId } from "react-hook-form";
import { map } from "remeda";

type Props = {
  fields: FieldArrayWithId<FunnelData, "pages", "id">[];
  selectedPageIndex: number;
  selectedBlock: null | Block;
  onSelectPage: (index: number) => void;
  onSelectBlock: (block: null | Block) => void;
};

export function PagesPanel(props: Props) {
  const {
    fields,
    selectedPageIndex,
    selectedBlock,
    onSelectPage,
    onSelectBlock,
  } = props;

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
          {block.text}
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
          {block.alt ?? "Image"}
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
          {block.text}
        </Button>
      );
    }
  }

  return (
    <Accordion index={selectedPageIndex} onChange={onSelectPage} pb="5">
      {fields.map((page, i) => (
        <AccordionItem key={page.id} borderTop="0" borderBottom="0">
          <AccordionButton>
            <Text flexGrow="1" textAlign="left">
              Page {i + 1}
            </Text>
            <AccordionIcon size={10} />
          </AccordionButton>
          <AccordionPanel>
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
