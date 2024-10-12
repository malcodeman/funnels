import { FileUploader } from "@/components/FileUploader";
import { FILE_UPLOAD_ACCEPT } from "@/lib/constants";
import { useJsonUpload } from "@/hooks/useJsonUpload";
import { FunnelData } from "@/types";
import { Container, Flex, Heading } from "@chakra-ui/react";

type Props = {
  onImport: (funnel: FunnelData) => void;
};

export function EmptyState(props: Props) {
  const { onImport } = props;
  const { isLoading, onDrop } = useJsonUpload({
    onImport,
  });

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Container maxW="md">
        <Heading fontSize="2xl" textAlign="center" mb="2">
          Import JSON
        </Heading>
        <FileUploader
          onDrop={onDrop}
          accept={FILE_UPLOAD_ACCEPT}
          isLoading={isLoading}
        />
      </Container>
    </Flex>
  );
}
