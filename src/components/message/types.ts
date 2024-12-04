export type TMessageProps = {
  position: 'right' | 'left';
  content?: string;
  type: 'text' | 'image' | 'video' | 'file' | 'location';
}
