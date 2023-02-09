type User = {
  uuid: string;
  name: string;
  picture: string | null;
};

type RoomStatus = {
  users: User[];
};
