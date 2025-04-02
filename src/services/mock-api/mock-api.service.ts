import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as yaml from 'js-yaml';
import { pathToRegexp } from 'path-to-regexp';

import { HttpMethod } from '../../domain/HttpMethod';
import { MockApiCollectionConfig } from '../../domain/MockApiCollectionConfig';
import { MockApiRouteConfig } from '../../domain/MockApiRouteConfig';

@Injectable()
export class MockApiService implements OnModuleInit {
  private mockRoutes: MockApiRouteConfig[] = [];

  onModuleInit() {
    const yamlFile = fs.readFileSync(path.resolve('config.yaml'), 'utf8');
    const config = yaml.load(yamlFile) as MockApiCollectionConfig;
    this.initializeMockRoutes(config);
    Logger.log(config);
  }

  findMatchingMockApiRoute(
    method: HttpMethod,
    strippedUrlPath: string,
  ): MockApiRouteConfig | undefined {
    return this.mockRoutes.find((route) => {
      const regex = pathToRegexp(route.path, { sensitive: false });
      const methodMatches = route.method.toUpperCase() === method.toUpperCase();
      return methodMatches && regex.regexp.test(strippedUrlPath);
    });
  }

  private initializeMockRoutes(config: MockApiCollectionConfig) {
    this.mockRoutes = config.apiRoutes;
  }
}
