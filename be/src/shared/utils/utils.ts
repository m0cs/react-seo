export class Utils {
  constructor() {}

  public static findHighestValue(list: any[], key: string) {
    let result: any = undefined;
    list.forEach((element) => {
      if (!result) {
        result = element;
      } else if (result[key] < element[key]) {
        result = element;
      }
    });
    return result;
  }
}
