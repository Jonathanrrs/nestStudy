import {
  BadRequestException,
  Controller,
  Post,
  Get,
  UploadedFile,
  Param,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/product/:imageName')
  findProductImage(
    /*  esto rompe la funcionalidad de nest de la respuesta, para manualmente emitir mi respuesta, se saltan interceptores de nest, entre otras funcionalidades  */
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      // limits: {fileSize: 1000} /* para el size del file */
      storage: diskStorage({
        /* carpeta para almacenar en filesystem */
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    const secureUrl = `${file.filename}`;
    return { secureUrl };
  }
}
