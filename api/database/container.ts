export interface IDatabaseContainer {
  resolve<T>(dependency: new (...args: any[]) => T): T;
}

export class DatabaseContainer implements IDatabaseContainer {
  private dependencies: Map<new (...args: any[]) => any, any> = new Map();

  resolve<T>(dependency: new (...args: any[]) => T): T {
    if (!this.dependencies.has(dependency)) {
      const instance = new dependency();
      this.dependencies.set(dependency, instance);
    }

    return this.dependencies.get(dependency);
  }
}
