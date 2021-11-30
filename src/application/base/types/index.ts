import { keys } from 'ts-transformer-keys';
export * from './connection';
export * from './server-status';
export * from './mySQL2';


export const setfilterParams = (data: any, filtertype: any): any => {
  const filtered: typeof filtertype = {};
  let count = 0;
  const filter = (filtered: any, key: string, value: any, count: number) => {
    filtered[key] = value;
    count = count + 1;
    return count;
  };
  var requiredkeys = keys<typeof filtertype>().map((k) => k.toString());
  Object.entries(data).forEach(([key, value]) =>
    value == null || value == undefined || !requiredkeys.includes(key)
      ? count
      : (count = filter(filtered, key, value, count))
  );
  return filtered == {} ||
    filtered == undefined ||
    filtered == null ||
    count == 0
    ? null
    : filtered;
};
