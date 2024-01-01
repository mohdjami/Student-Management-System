// fetchStudentById.ts

import { parseJwt } from "./parsejwt";

export async function fetchTaskByStudnetId(rawToken: string) {
  if (rawToken) {
    const token = parseJwt(rawToken);
    const id = token.id;
    if (id) {
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/students/${id}/task`
      );
      const data = await response.json();
      return data.tasks;
    }
  }
  return null;
}
