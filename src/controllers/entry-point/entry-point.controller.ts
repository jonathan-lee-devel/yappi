import { All, Controller, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { HttpMethod } from '../../domain/HttpMethod';
import { MockApiService } from '../../services/mock-api/mock-api.service';

@Controller('mock/api')
export class EntryPointController {
  constructor(private readonly mockApiService: MockApiService) {}

  @All('*')
  async handleAllRequests(@Req() req: Request, @Res() res: Response) {
    const { method, url, headers, query, body } = req;

    Logger.log(method, url, headers, query, body);

    const matchedRoute = this.mockApiService.findMatchingMockApiRoute(
      method as HttpMethod,
      url.substring('/mock/api'.length, url.length),
    );

    return matchedRoute
      ? res.status(200).json({ ...matchedRoute.responseBody })
      : res.status(404).json({
          message: 'Not Found',
        });
  }
}
