import { FileUploader } from "@/components/FileUploader";
import { FILE_UPLOAD_ACCEPT } from "@/lib/constants";
import { useJsonUpload } from "@/lib/hooks";
import { FunnelData } from "@/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onImport: (funnel: FunnelData) => void;
};

export function ImportJsonModal(props: Props) {
  const { isOpen, onClose, onImport } = props;
  const { isLoading, onDrop } = useJsonUpload({
    onImport: (funnel) => {
      onImport(funnel);
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Import JSON</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FileUploader
            onDrop={onDrop}
            accept={FILE_UPLOAD_ACCEPT}
            isLoading={isLoading}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
