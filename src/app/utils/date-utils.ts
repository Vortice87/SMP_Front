export class DateUtils {

  public static toStringDateBack(date: Date) {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
  }

  public static toStringDateFront(date: Date) {
    const mm = date.getMonth() + 1; // getMonth()  is zero-based
    const dd = date.getDate();
    return [(dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    date.getFullYear()
    ].join('/');
  }

  public static dateFormatterBack(date: String): String {
    const dateFormat = date.split('/');
    return dateFormat[2] + '-' + dateFormat[1] + '-' + dateFormat[0];
  }
}
