
export interface DBTypes {
  type: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize?: boolean;
}

export interface JWTTypes {
  secret: string;
  expiresIn?: number
}

export interface RedisTypes {
  port: number
  host?: string
  password?: string
}

export interface SwaggerTypes {
  enable?: boolean
}

export interface ServerType {
  origin?: string;
  port?: number;
}
