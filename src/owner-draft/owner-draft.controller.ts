// owner-drafts.controller.ts
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { parse } from 'csv-parse/sync';
import type { Response } from 'express';

type ImportedItem = {
  category: string;
  item_name: string;
  description?: string;
  price: number;
  vegetarian?: boolean;
  spicy?: boolean;
  contains_nuts?: boolean;
  image_url?: string | null;
};

function toBool(v: any): boolean | undefined {
  if (v === undefined || v === null || v === '') return undefined;
  const s = String(v).trim().toLowerCase();
  return ['1', 'true', 'yes', 'y'].includes(s)
    ? true
    : ['0', 'false', 'no', 'n'].includes(s)
      ? false
      : undefined;
}

// ...
@ApiSecurity('jwt-token')
@Controller('owner/drafts')
export class OwnerDraftsController {
  @ApiOperation({ summary: 'Import menu CSV into draft' })
  @ApiConsumes('multipart/form-data')
  @Post('/menu/import')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
      // fileFilter: (req, file, cb) => {
      //   if (!/csv|plain/.test(file.mimetype)) return cb(new BadRequestException('Invalid file type'), false);
      //   cb(null, true);
      // },
    }),
  )
  importCsv(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file?.buffer) {
      throw new BadRequestException('file is required');
    }

    const text = file.buffer.toString('utf-8');

    // Parse CSV (expects header row)
    const rows = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as Record<string, string>[];

    const items: Array<{
      name: string;
      category: string;
      description?: string;
      price: number;
      vegetarian?: boolean;
      spicy?: boolean;
      containsNuts?: boolean;
      imageUrl?: string | null;
    }> = [];
    const errors: Array<{ row: number; reason: string }> = [];

    rows.forEach((r, i) => {
      const rowNo = i + 2; // header is row 1
      const cat = r.category?.trim();
      const name = r.item_name?.trim();
      const priceNum = Number(r.price);

      if (!cat || !name) {
        errors.push({
          row: rowNo,
          reason: 'category and item_name are required',
        });
        return;
      }
      if (!Number.isFinite(priceNum)) {
        errors.push({ row: rowNo, reason: 'price must be a number' });
        return;
      }

      items.push({
        category: cat,
        name,
        description: r.description?.trim() || undefined,
        price: priceNum,
        vegetarian: toBool(r.vegetarian),
        spicy: toBool(r.spicy),
        containsNuts: toBool(r.contains_nuts),
        imageUrl: r.image_url?.trim() || null,
      });
    });

    // TODO: persist to your draft (append) via a service, e.g.:
    // await this.draftsService.appendMenuItems(id, items);

    return { items, errors };
  }
  // ...other endpoints

  @ApiOperation({ summary: 'Download CSV Template' })
  @Get('/menu/template.csv')
  template(@Res() res: Response) {
    const csv =
      [
        'category,item_name,description,price,vegetarian,spicy,contains_nuts,image_url',
        'Mains,Kung Pao Chicken,Spicy stir-fry with peanuts,12.50,false,true,true,',
        'Desserts,Mango Pudding,Silky mango custard,6.00,true,false,false,',
      ].join('\n') + '\n';

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="menu-template.csv"',
    );
    res.send(csv);
  }
}
