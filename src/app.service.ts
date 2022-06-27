import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is running! 🚀\n Please check https://pizza-fresh-server.onrender.com/api for Swagger docs...';
  }
}
