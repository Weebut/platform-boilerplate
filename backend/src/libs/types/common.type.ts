// Copied from typeorm

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type ValueOfUnion<T extends Record<string, unknown>> = T[keyof T];
