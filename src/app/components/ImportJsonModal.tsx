import { FileUploader } from "@/components/FileUploader";
import { FUNNEL_DATA_SCHEMA } from "@/lib/constants";
import { file2Text } from "@/lib/utils";
import { FunnelData } from "@/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { ZodError } from "zod";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onImport: (funnel: FunnelData) => void;
};

export function ImportJsonModal(props: Props) {
  const { isOpen, onClose, onImport } = props;
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();

  async function handleOnDrop(acceptedFiles: File[]) {
    try {
      setIsLoading.on();
      const text = await file2Text(acceptedFiles[0]);
      const funnel = FUNNEL_DATA_SCHEMA.parse(JSON.parse(text));

      onImport(funnel);
      onClose();
    } catch (err) {
      if (err instanceof ZodError) {
        toast({
          description: "Invalid JSON format.",
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          description: "Something went wrong.",
          status: "error",
          isClosable: true,
        });
      }
    } finally {
      setIsLoading.off();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Import JSON</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FileUploader
            onDrop={handleOnDrop}
            accept={{
              "application/json": [".json"],
            }}
            isLoading={isLoading}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
