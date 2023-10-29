export type LookupFilterType<T> = {
  exact?: T;
  gte?: T;
  lte?: T;
  range?: T;
  in?: T[];
  icontains?: string;
}
