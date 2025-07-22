import {
  ArgumentMetadata,
  Injectable,
  ParseEnumPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalParseEnumPipe<T = any> implements PipeTransform {
  private readonly enumPipe: ParseEnumPipe;

  constructor(enumType: T) {
    this.enumPipe = new ParseEnumPipe(enumType);
  }

  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): T[keyof T] | undefined {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return this.enumPipe.transform(value, metadata) as T[keyof T];
  }
}
