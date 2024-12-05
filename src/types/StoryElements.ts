export interface StoryElement {
  id: string;
  value: string;
}

export interface StoryCategory {
  id: 'protagonist' | 'setting' | 'world';
  label: string;
  elements: StoryElement[];
}