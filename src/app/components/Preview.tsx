import { HEADER_HEIGHT } from "@/lib/constants";
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
} from "@chakra-ui/react";
import { map } from "remeda";

type Props = {
  funnel: FunnelData;
  pageIndex: number;
};

export function Preview(props: Props) {
  const { funnel, pageIndex } = props;
  const page = funnel.pages[pageIndex];

  if (!page) {
    return null;
  }

  function renderBlock(block: Block) {
    if (block.type === "text") {
      return (
        <Text style={{ color: block.color, textAlign: block.align }}>
          {block.text}
        </Text>
      );
    }

    if (block.type === "image") {
      return <Image src={block.src} alt={block.alt} />;
    }

    if (block.type === "list") {
      return (
        <List>
          {map(block.items, (item) => (
            <ListItem key={item.id} display="flex" alignItems="center">
              <ListIcon as={Image} src={item.src} alt={item.title} />
              <Text>{item.title}</Text>
              <Text opacity="0.8">{item.description}</Text>
            </ListItem>
          ))}
        </List>
      );
    }

    if (block.type === "button") {
      return (
        <Button style={{ color: block.color, backgroundColor: block.bgColor }}>
          {block.text}
        </Button>
      );
    }
  }

  return (
    <Flex bgColor="white" height="100vh" pt={HEADER_HEIGHT}>
      <Container maxWidth="container.sm">
        <Flex
          flexDir="column"
          height="full"
          gap="2"
          padding="2"
          color="black"
          overflowY="auto"
          style={{ backgroundColor: funnel.bgColor }}
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