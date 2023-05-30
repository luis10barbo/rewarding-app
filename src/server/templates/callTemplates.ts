import { User } from "@prisma/client";
import { getUser } from "../session/user";

export class PublicCall {
  private async privateRun() {}
  setExecution<Return>(
    execution: () => Promise<Return> | (() => Promise<Return>)
  ) {
    this.privateRun = execution as typeof this.privateRun;
  }
  async execute<Return>(
    execution: () => Promise<Return> | (() => Promise<Return>)
  ): Promise<Return> {
    this.setExecution(execution);
    return (await this.run()) as Return;
  }
  async run() {
    return await this.privateRun();
  }
}

export class AuthenticatedCall {
  user!: User;
  constructor() {
    this.getUser();
  }
  private async getUser() {
    const user = await getUser();
    this.user = user as any;
  }
  private async privateRun({ user }: { user: User }): Promise<any> {}
  setExecution<Return>(
    execution: ({
      user,
    }: {
      user: User;
    }) => Promise<Return> | (() => Promise<Return>)
  ) {
    this.privateRun = execution as typeof this.privateRun;
  }
  async execute<Return>(
    execution: ({
      user,
    }: {
      user: User;
    }) => Promise<Return> | (() => Promise<Return>)
  ) {
    this.setExecution(execution);
    return await this.run<Return>();
  }
  async run<Return>() {
    if (!this.user) await this.getUser();
    if (this.user === null) return createError("Error logging in");

    const result = await this.privateRun({ user: this.user });

    if (!result) return createError("Error fetching data");
    else if (isError(result)) return result;

    return createSuccess<Return>(result);
  }
}

export function isError(value: any): value is ReturnType<typeof createError> {
  return "error" in value && "message" in value;
}

export function createError(message: string): { error: true; message: string } {
  return { error: true, message: message } as { error: true; message: string };
}

export function createSuccess<Data>(data: Data) {
  return { error: false, data } as {
    error: false;
    data: Data;
  };
}

function fetchOption<FetchReturn>(
  fetchReturn: FetchReturn | null,
  errorMessage: string
) {
  if (fetchReturn) return createSuccess(fetchReturn);
  return createError(errorMessage);
}
