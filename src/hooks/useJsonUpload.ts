import { useBoolean, useToast } from "@chakra-ui/react";
import { FunnelData } from "@/types";
import { ZodError } from "zod";
import { file2Text } from "@/lib/utils";
import { FUNNEL_DATA_SCHEMA } from "@/lib/constants";

type Props = {
  onImport: (funnel: FunnelData) => void;
};

export function useJsonUpload(props: Props) {
  const { onImport } = props;
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();

  async function onDrop(acceptedFiles: File[]) {
    try {
      setIsLoading.on();
      const text = await file2Text(acceptedFiles[0]);
      const funnel = FUNNEL_DATA_SCHEMA.parse(JSON.parse(text));

      onImport(funnel);
    } catch (err) {
      console.log("er", err);
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

  return { onDrop, isLoading };
}
