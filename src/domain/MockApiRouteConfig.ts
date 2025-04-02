import { IsDefined, IsNumber, Matches, Max, Min } from 'class-validator';

import { HttpMethod } from './HttpMethod';

export class MockApiRouteConfig {
  @IsDefined()
  id: string;

  @IsDefined()
  @Matches(/(^GET$|^POST$|^PUT$|^DELETE$|^PATCH$|^OPTIONS$)/)
  method: HttpMethod;

  @IsDefined()
  path: string;

  @IsDefined()
  @IsNumber()
  @Min(200)
  @Max(599)
  statusCode: number;

  @IsDefined()
  responseHeaders: Map<string, string>;

  @IsDefined()
  @IsNumber()
  @Min(0)
  @Max(180_000)
  responseDelayMs: number;

  @IsDefined()
  responseBody: Map<string, string>;
}
