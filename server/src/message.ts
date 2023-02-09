export type MessageType = "Auth" | "RoomStatus";

export type AuthMessageData = {
  uuid: string;
  name: string;
  room_id: string;
  picture: string | null;
};

export type Message = {
  type: MessageType;
  data: AuthMessageData;
};
