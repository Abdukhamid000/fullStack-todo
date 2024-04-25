import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata) {
    return +value;
  }
}
