import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const dbFilePath = path.join(process.cwd(), 'src/database/db.json');

async function readDB() {
  const data = await fs.readFile(dbFilePath, 'utf-8');
  return JSON.parse(data);
}

async function writeDB(data: any) {
  await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db);
}

export async function POST(req: NextRequest) {
  const { collection, item } = await req.json(); 
  // collection: "Products" | "users" | "Carousel" | "ProductSlider"
  const db = await readDB();

  if (!db[collection]) {
    return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
  }

  db[collection].push(item);
  await writeDB(db);
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest) {
  const { collection, id, updatedItem } = await req.json();
  const db = await readDB();

  if (!db[collection]) {
    return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
  }

  const index = db[collection].findIndex((el: any) => el.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  db[collection][index] = { ...db[collection][index], ...updatedItem };
  await writeDB(db);
  return NextResponse.json(db[collection][index]);
}

export async function DELETE(req: NextRequest) {
  const { collection, id } = await req.json();
  const db = await readDB();

  if (!db[collection]) {
    return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
  }

  db[collection] = db[collection].filter((el: any) => el.id !== id);
  await writeDB(db);
  return NextResponse.json({ success: true });
}
