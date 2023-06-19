import chalk from "chalk";
import { string } from "joi";

export default class Logging {
  public static log = (args: any) => this.info(args);

  public static info = (args: any) =>
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === "string" ? chalk.blueBright(args) : args
    );
  public static warn = (args: any) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === "string" ? chalk.yellowBright(args) : args
    );
  public static err = (args: any) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === "string" ? chalk.redBright(args) : args
    );
}
