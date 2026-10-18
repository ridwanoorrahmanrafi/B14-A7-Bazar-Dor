/**
 * Authentication is provided by Firebase Auth (@/lib/firebase).
 * This module provides a safe session getter fallback so that no native SQLite
 * compiled bindings or file system writes are executed in serverless environments.
 */

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface Session {
  user: SessionUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}

export const auth = {
  api: {
    getSession: async (): Promise<Session | null> => {
      return null;
    },
  },
};
