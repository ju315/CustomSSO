import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller('view')
export class ViewController {
  constructor() {
    //
  }

  @Get('check')
  @Render('check')
  viewCheckCookie(@Query('returnUrl') returnUrl: string) {
    console.log(returnUrl);

    return { returnUrl };
  }

  @Get('sign-in')
  @Render('login')
  viewSignIn(@Query() queryData: any) {
    console.log(queryData);
    return { returnUrl: queryData.returnUrl };
  }
}
