import { createId } from "@paralleldrive/cuid2";
import { cookies } from "next/dist/client/components/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const SESSION_COOKIE_ID = "s_id";

export async function getSessionCookie() {
  const sessionId = cookies().get(SESSION_COOKIE_ID);

  return sessionId
    ? sessionId.value
    : (
        cookies()
          .set(SESSION_COOKIE_ID, createId())
          .get(SESSION_COOKIE_ID) as RequestCookie
      ).value;
}
