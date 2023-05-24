import { User } from "@prisma/client";
import { getUser } from "../session/user";

export class PublicCall {
  private async privateRun() {}
  setExecution(execution: () => Promise<void>) {
    this.privateRun = execution;
    return this;
  }
  execute(execution: () => Promise<void>) {
    this.setExecution(execution);
    this.run();
    return this;
  }
  run() {
    this.privateRun();
    return this;
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
  setExecution(
    execution: ({
      user,
    }: {
      user: User;
    }) => Promise<void> | (() => Promise<void>)
  ) {
    this.privateRun = execution as typeof this.privateRun;
  }
  execute(
    execution: ({
      user,
    }: {
      user: User;
    }) => Promise<void> | (() => Promise<void>)
  ): void {
    this.setExecution(execution);
    this.run();
  }
  async run() {
    if (!this.user) await this.getUser();
    this.privateRun({ user: this.user });
  }
}
