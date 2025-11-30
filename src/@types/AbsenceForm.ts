export interface AbsenceForm {
  items: AbsenceFormItem[];
  description?: string;
}

export interface MultipleChoiceItem {
  type: "multipleChoice";
  options: {
    label: string;
    children?: AbsenceFormItem[];
  }[];
}

export interface TimeItem {
  type: "time";
}

export interface TextItem {
  type: "text";
  multiline: boolean;
}

export interface SimpleTextItem {
  type: "simpleText";
  text: string;
}

export interface AbsenceFormItem {
  title: string;
  item: MultipleChoiceItem | TimeItem | TextItem | SimpleTextItem;
}

export const DEFAULT_ABSENCE_FORM: AbsenceForm = {
  items: [
    {
      title: "Type of absence",
      item: {
        type: "multipleChoice",
        options: [
          {
            label: "Late arrival",
            children: [
              {
                title: "Expected arrival time",
                item: {
                  type: "time",
                },
              },
            ],
          },
          {
            label: "Early departure",
            children: [
              {
                title: "Expected departure time",
                item: {
                  type: "time",
                },
              },
            ],
          },
          {
            label: "Absence",
          },
        ],
      },
    },
    {
      title: "Reason for absence",
      item: {
        type: "multipleChoice",
        options: [
          {
            label: "Other extracurricular activity",
            children: [
              {
                title: "Please provide more details",
                item: {
                  type: "text",
                  multiline: true,
                },
              },
            ],
          },
          {
            label: "Other",
            children: [
              {
                title: "Please specify",
                item: {
                  type: "text",
                  multiline: false,
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
