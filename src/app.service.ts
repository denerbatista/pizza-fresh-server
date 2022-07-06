import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is running! 🚀\n Please check https://pizza-fresh-server.up.railway.app/api for Swagger docs...';
  }
}
