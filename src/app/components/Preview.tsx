import { Block, FunnelData } from "@/types";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { map } from "remeda";

type Props = {
  selectedPageIndex: number;
  selectedBlockId: string | undefined;
  onSelectBlock: (block: null | Block) => void;
};

export function Preview(props: Props) {
  const { selectedPageIndex, selectedBlockId, onSelectBlock } = props;
  const { control } = useFormContext<FunnelData>();
  const page = useWatch({ control, name: "pages" })[selectedPageIndex];
  const funnelBgColor = useWatch({ control, name: "bgColor" });
  const backgroundColor = useColorModeValue("#f5f5f5", "#191f2a");

  if (!page) {
    return null;
  }

  function renderBlock(block: Block) {
    if (block.type === "text") {
      return (
        <Text
          style={{ color: block.color, textAlign: block.align }}
          outline={
            selectedBlockId === block.id ? "1px solid #0071ec" : undefined
          }
          onClick={() => onSelectBlock(block)}
        >
          {block.text}
        </Text>
      );
    }

    if (block.type === "image") {
      return (
        <Image
          src={block.src}
          alt={block.alt}
          outline={
            selectedBlockId === block.id ? "1px solid #0071ec" : undefined
          }
          onClick={() => onSelectBlock(block)}
        />
      );
    }

    if (block.type === "list") {
      return (
        <List
          outline={
            selectedBlockId === block.id ? "1px solid #0071ec" : undefined
          }
          onClick={() => onSelectBlock(block)}
        >
          {map(block.items, (item) => (
            <ListItem key={item.id} display="flex" alignItems="center">
              <ListIcon as={Image} src={item.src} />
              <Text>{item.title}</Text>
              <Text opacity="0.8">{item.description}</Text>
            </ListItem>
          ))}
        </List>
      );
    }

    if (block.type === "button") {
      return (
        <Button
          style={{ color: block.color, backgroundColor: block.bgColor }}
          outline={
            selectedBlockId === block.id ? "1px solid #0071ec" : undefined
          }
          onClick={() => onSelectBlock(block)}
        >
          {block.text}
        </Button>
      );
    }
  }

  return (
    <Flex bgColor={backgroundColor} height="100vh" pt="50px">
      <Container maxWidth="container.sm">
        <Flex
          flexDir="column"
          height="full"
          gap="2"
          padding="2"
          color="black"
          overflowY="auto"
          style={{ backgroundColor: funnelBgColor }}
          position="relative"
        >
          {map(page.blocks, (block) => (
            <div key={block.id}>{renderBlock(block)}</div>
          ))}
          <Box position="absolute" bottom="1rem" right="1rem">
            <Text fontSize="sm">
              Powered by{" "}
              <Text as="span" fontWeight="bold">
                Funnels
              </Text>
            </Text>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
}
