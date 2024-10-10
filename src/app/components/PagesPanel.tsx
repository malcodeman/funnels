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
import { map } from "remeda";

type Props = {
  funnel: FunnelData;
  index: number;
  selectedBlock: null | Block;
  onChange: (index: number) => void;
  onSelectedBlock: (block: null | Block) => void;
};

export function PagesPanel(props: Props) {
  const { funnel, index, selectedBlock, onChange, onSelectedBlock } = props;

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
          onClick={() => onSelectedBlock(block)}
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
          onClick={() => onSelectedBlock(block)}
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
          onClick={() => onSelectedBlock(block)}
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
          onClick={() => onSelectedBlock(block)}
        >
          {block.text}
        </Button>
      );
    }
  }

  return (
    <Accordion index={index} onChange={onChange} pb="5">
      {funnel.pages.map((page, i) => (
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
