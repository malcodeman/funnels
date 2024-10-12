import { FunnelData } from "@/types";
import {
  Divider,
  FormControl,
  FormLabel,
  Input,
  Switch,
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";

export function DesignPanel() {
  const { register, control, setValue } = useFormContext<FunnelData>();
  const branding = useWatch({
    control,
    name: "branding",
  });

  return (
    <>
      <FormControl
        mb="2"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormLabel
          htmlFor="branding"
          mb="0"
          cursor="pointer"
          marginInlineEnd="0"
          paddingInlineEnd="3"
          width="full"
        >
          Branding
        </FormLabel>
        <Switch
          isChecked={branding}
          onChange={() => setValue("branding", !branding)}
          id="branding"
          data-testid="branding-switch"
        />
      </FormControl>
      <Divider marginY="2" />
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
