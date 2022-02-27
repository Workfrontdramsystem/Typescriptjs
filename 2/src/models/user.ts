export class User {
  public username: string;
  public avatarUrl: string;
  constructor(username, avatarUrl) {
    this.username = username;
    this.avatarUrl = avatarUrl;
  }

  getuser(): string {
    return this.username;
  }

  getAvatarUrl(): string {
    return this.avatarUrl;
  }
}
