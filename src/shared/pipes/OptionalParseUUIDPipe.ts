import {
  ArgumentMetadata,
  Injectable,
  ParseUUIDPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalParseUUIDPipe implements PipeTransform {
  private readonly uuidPipe = new ParseUUIDPipe();

  async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<string | undefined> {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return this.uuidPipe.transform(value, metadata);
  }
}
