import { User } from "@prisma/client";
import { getUser } from "../session/user";

export class PublicCall {
  constructor() {
    this.initialize();
  }
  private async initialize() {
    this.run();
  }
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
    this.initialize();
  }
  private async initialize() {
    const user = await getUser();
    if (!user) throw new Error("User is not logged in.");

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
  run() {
    this.privateRun({ user: this.user });
  }
}
