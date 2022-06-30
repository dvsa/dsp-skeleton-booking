export type ClassList = string[];

export type Hint = {
  text: string
  id?: string
};

export type Checkbox = {
  text: string
  hint?: Hint
  value: string
};

export type TextElement = {
  text?: string
  html?: string
  classes?: ClassList
};

export type SummaryListKey = TextElement

export type SummaryListValue = TextElement

export type SummaryListRow = {
  classes?: ClassList
  key: SummaryListKey
  value: SummaryListValue
};

export type SummaryList = {
  rows: SummaryListRow[]
  classes?: ClassList
};
