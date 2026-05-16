import { Trans } from "@lingui/react/macro";
import { Select } from "@radix-ui/themes";

interface ModePickerProps {
  mode: "year" | "month" | "day";
  setMode: (mode: "year" | "month" | "day") => void;
}

export function ModePicker({ mode, setMode }: ModePickerProps) {
  return (
    <Select.Root
      value={mode}
      onValueChange={(value) => setMode(value as "year" | "month" | "day")}
      size="3"
    >
      <Select.Trigger />
      <Select.Content position="popper">
        <Select.Item value="year">
          <Trans>Year</Trans>
        </Select.Item>
        <Select.Item value="month">
          <Trans>Month</Trans>
        </Select.Item>
        <Select.Item value="day">
          <Trans>Day</Trans>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
