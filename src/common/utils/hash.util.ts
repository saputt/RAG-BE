import * as bcrypt from 'bcrypt';

export class hashing {
  private static readonly SALT = 10;

  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT);
  }

  static async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
