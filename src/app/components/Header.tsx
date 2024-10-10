import { Box, Flex, Text } from "@chakra-ui/react";
import { WorkflowIcon } from "lucide-react";

type Props = {
  name: string;
};

export function Header(props: Props) {
  const { name } = props;

  return (
    <Flex
      as="header"
      position="fixed"
      justifyContent="space-between"
      width="full"
      bgColor="gray.800"
      padding="2"
      boxShadow="rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
      zIndex="1"
    >
      <Flex alignItems="center" gap="2">
        <WorkflowIcon size={16} color="#0071ec" />
        <Text>Funnels</Text>
      </Flex>
      <Text>{name}</Text>
      <Box />
    </Flex>
  );
}
