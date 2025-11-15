import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// مسیر فایل JSON
const dbFilePath = path.join(process.cwd(), 'src/database/db.json');

// خواندن فایل JSON
async function readDB() {
  const data = await fs.readFile(dbFilePath, 'utf-8');
  return JSON.parse(data);
}

// نوشتن فایل JSON
async function writeDB(data: any) {
  await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
}

// GET: بازگرداندن کل داده‌ها
export async function GET() {
  const db = await readDB();
  return NextResponse.json(db);
}

// POST: اضافه کردن به یک آرایه مشخص
export async function POST(req: NextRequest) {
  const { collection, item } = await req.json(); 
  // collection: "Products" | "users" | "Carousel" | "ProductSlider"
  const db = await readDB();

  if (!db[collection]) {
    return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
  }

  db[collection].push(item);  // اضافه کردن آیتم
  await writeDB(db);
  return NextResponse.json(item);
}
