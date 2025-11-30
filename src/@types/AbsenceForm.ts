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
