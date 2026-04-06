import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import type { Response } from 'express';
import * as multer from 'multer';
import { parse } from 'csv-parse/sync';

type Mode = 'append' | 'replace';

type CsvRow = Record<string, string>;

type ParsedMenuItem = {
  name: string;
  category: string;
  description?: string;
  price: number;
  imagePreview: string | null; // 프론트에서 preview로 쓰는 필드명에 맞춤
  vegetarian?: boolean;
  spicy?: boolean;
  containsNuts?: boolean;
};

@ApiSecurity('jwt-token')
@Controller('owner/drafts')
export class OwnerDraftsController {
  @ApiOperation({ summary: 'Download CSV Template' })
  @Get('/menu/template.csv')
  template(@Res() res: Response) {
    const csv =
      [
        'category,item_name,description,price',
        'Mains,Kung Pao Chicken,Spicy stir-fry with peanuts,12.50',
        'Desserts,Mango Pudding,Silky mango custard,6.00',
      ].join('\n') + '\n';

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="menu-template.csv"',
    );
    res.send(csv);
  }

  @ApiOperation({ summary: 'Import menu CSV into draft' })
  @ApiConsumes('multipart/form-data')
  @Post('/menu/import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  importCsv(
    @UploadedFile() file?: Express.Multer.File,
    @Body('mode') mode?: Mode, // ✅ FormData append("mode", mode)로 넘어옴
  ): {
    mode: Mode;
    items: ParsedMenuItem[];
    errors: Array<{ row: number; reason: string }>;
  } {
    const effectiveMode: Mode = mode === 'replace' ? 'replace' : 'append';

    if (!file?.buffer || file.buffer.length === 0) {
      throw new BadRequestException('file is required');
    }

    const text = file.buffer.toString('utf-8').replace(/^\uFEFF/, ''); // BOM 제거

    const parsed: unknown = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!Array.isArray(parsed)) {
      throw new BadRequestException('Invalid CSV format');
    }

    const rows = parsed as CsvRow[];

    const items: ParsedMenuItem[] = [];
    const errors: Array<{ row: number; reason: string }> = [];

    const toBool = (v: unknown): boolean | undefined => {
      if (typeof v === 'boolean') return v;
      if (typeof v === 'number')
        return v === 1 ? true : v === 0 ? false : undefined;
      if (typeof v !== 'string') return undefined;

      const s = v.trim().toLowerCase();
      if (!s) return undefined;
      if (['1', 'true', 'yes', 'y'].includes(s)) return true;
      if (['0', 'false', 'no', 'n'].includes(s)) return false;
      return undefined;
    };

    const toPrice = (v: unknown): number => {
      let raw = '';

      if (typeof v === 'number') raw = String(v);
      else if (typeof v === 'string') raw = v;
      else raw = ''; // 객체/배열/기타는 빈값 처리

      raw = raw.trim();

      const normalized = raw.replace(/[₩$,\s]/g, '');
      return Number(normalized);
    };

    rows.forEach((r, i) => {
      const rowNo = i + 2; // header = row 1

      const category = (r.category ?? '').trim();
      const name = (r.item_name ?? '').trim();
      const description = (r.description ?? '').trim() || undefined;

      const price = toPrice(r.price);
      const imageUrl = (r.image_url ?? '').trim() || null;

      if (!category || !name) {
        errors.push({
          row: rowNo,
          reason: 'category and item_name are required',
        });
        return;
      }
      if (!Number.isFinite(price)) {
        errors.push({ row: rowNo, reason: 'price must be a number' });
        return;
      }

      items.push({
        category,
        name,
        description,
        price,
        imagePreview: imageUrl, // ✅ 프론트에서 바로 쓰기 쉽게
        vegetarian: toBool(r.vegetarian),
        spicy: toBool(r.spicy),
        containsNuts: toBool(r.contains_nuts),
      });
    });

    return { mode: effectiveMode, items, errors };
  }
}
