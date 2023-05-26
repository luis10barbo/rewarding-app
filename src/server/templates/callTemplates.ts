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
    if (!user) {
      throw new Error("User is not logged in.");
    }

    this.user = user;
  }
  private async privateRun({ user }: { user: User }) {}
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
  ): Promise<Return> {
    this.setExecution(execution);
    return (await this.run()) as Return;
  }
  async run() {
    if (!this.user) await this.getUser();
    return await this.privateRun({ user: this.user });
  }
}
