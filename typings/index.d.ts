import 'egg';

declare module 'egg' {
  // extend app
  interface Application {
    model: IModel;
  }

  // extend context
  interface Context {
    model: IModel;
  }
}
