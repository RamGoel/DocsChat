export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  type: "bot" | "user";
}
