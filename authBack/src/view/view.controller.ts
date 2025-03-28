import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller('view')
export class ViewController {
  constructor() {
    //
  }

  @Get('sign-in')
  @Render('login')
  viewSignIn(@Query() queryData: any) {
    console.log(queryData);
    return { returnUrl: queryData.returnUrl };
  }
}
