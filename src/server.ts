import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

// ----------------------
// تایپ‌ها
// ----------------------
type ProductSliderItem = {
  id: string;
  image: string;
  alt: string;
};

type CarouselItem = {
  id: string;
  image: string;
  description: string;
  Price: number;
  DiscountedPrice: number;
  Discountpercentage: number;
};

type ProductItem = {
  id: string;
  title: string;
  image: string;
  description: string;
  Price: number;
  Score: number;
};

type User = {
  id: string;
  namefamily: string;
  email: string;
  password: string;
  confrimPassword: string;
};

type DB = {
  ProductSlider: ProductSliderItem[];
  Carousel: CarouselItem[];
  Products: ProductItem[];
  users: User[];
};

// ----------------------
// مسیر فایل JSON
// ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "database", "db.json");

// ----------------------
// سرور Express
// ----------------------
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ----------------------
// توابع کمکی
// ----------------------
const readDB = (): DB => {
  const file = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(file) as DB;
};

const writeDB = (data: DB): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// ----------------------
// مسیرها
// ----------------------
app.get("/ProductSlider", (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.ProductSlider);
});

app.get("/Carousel", (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.Carousel);
});

app.get("/Products", (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.Products);
});

app.get("/users", (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.users);
});

app.post("/users", (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const db = readDB();
  const newUser: User = {
    id: nanoid(),
    ...req.body,
  };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

// ----------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
