import { FunnelData } from "@/types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export function DesignPanel() {
  const { register } = useFormContext<FunnelData>();

  return (
    <>
      <FormControl>
        <FormLabel>Background color</FormLabel>
        <Input
          variant="filled"
          size="sm"
          borderRadius="md"
          {...register("bgColor")}
        />
      </FormControl>
    </>
  );
}
