declare namespace API {
  type User = {
    username: string;
    password: string;
  }
  type UserInfo = {
    userId: string | number;
    username: string;
    avatar: string;
  }
}