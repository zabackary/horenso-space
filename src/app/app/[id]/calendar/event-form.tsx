"use client";

import { useLingui } from "@lingui/react/macro";
import { CalendarIcon, GlobeIcon, TextIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import styles from "./create-event-card.module.css";

export interface EventFormData {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  notes: string;
}

export interface EventFormProps {
  data: EventFormData;
  onChange: (data: EventFormData) => void;
  readOnly?: boolean;
  error?: string | null;
  showTitle?: boolean;
}

export default function EventForm({
  data,
  onChange,
  readOnly = false,
  error,
  showTitle = true,
}: EventFormProps) {
  const { t } = useLingui();

  const handleChange = (field: keyof EventFormData, value: string) => {
    if (!readOnly) {
      onChange({ ...data, [field]: value });
    }
  };

  // For read-only mode, display formatted time
  const startDateTime = new Date(`${data.startDate}T${data.startTime}:00`);
  const endDateTime = new Date(`${data.endDate}T${data.endTime}:00`);

  if (readOnly) {
    return (
      <>
        {showTitle && (
          <Heading size="7" mb="4" mt="2">
            {data.title}
          </Heading>
        )}

        <Flex direction="row" gap="2" mb="4">
          <Box className={styles["row-icon"]}>
            <CalendarIcon />
          </Box>
          <Box>
            <Text>
              {startDateTime.toDateString() === endDateTime.toDateString()
                ? startDateTime.toLocaleDateString()
                : `${startDateTime.toLocaleDateString()} - ${endDateTime.toLocaleDateString()}`}
            </Text>{" "}
            <Text size="2" color="gray">
              {startDateTime.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              –{" "}
              {endDateTime.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Box>
        </Flex>

        {data.location && (
          <Flex direction="row" gap="2" mb="4">
            <Box className={styles["row-icon"]}>
              <GlobeIcon />
            </Box>
            <Text>{data.location}</Text>
          </Flex>
        )}

        {data.notes && (
          <Flex direction="row" gap="2" mb="4">
            <Box className={styles["row-icon"]}>
              <TextIcon />
            </Box>
            <Text style={{ whiteSpace: "pre-wrap" }}>{data.notes}</Text>
          </Flex>
        )}

        {error && (
          <div style={{ color: "var(--red-11)", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {showTitle && (
        <TextField.Root
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder={t`Event name`}
          size="3"
          variant="soft"
          className={styles.title}
          required
        />
      )}

      <Flex direction="row" gap="2">
        <Box className={styles["row-icon"]}>
          <CalendarIcon />
        </Box>
        <Grid columns="auto" gap="2" flexGrow="1">
          <Grid columns="2" gap="2">
            <TextField.Root
              type="date"
              value={data.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            <TextField.Root
              type="time"
              value={data.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
            />
          </Grid>
          <Grid columns="2" gap="2">
            <TextField.Root
              type="date"
              value={data.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
            <TextField.Root
              type="time"
              value={data.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
            />
          </Grid>
        </Grid>
      </Flex>

      <Flex direction="row" gap="2">
        <Box className={styles["row-icon"]}>
          <GlobeIcon />
        </Box>
        <TextField.Root
          value={data.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder={t`Location`}
          size="2"
          className={styles["location-textfield"]}
        />
      </Flex>

      <Flex direction="row" gap="2">
        <Box className={styles["row-icon"]}>
          <TextIcon />
        </Box>
        <TextArea
          value={data.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder={t`Notes`}
          className={styles["notes-textarea"]}
          size="2"
        />
      </Flex>

      {error && (
        <div style={{ color: "var(--red-11)", fontSize: "0.875rem" }}>
          {error}
        </div>
      )}
    </>
  );
}
