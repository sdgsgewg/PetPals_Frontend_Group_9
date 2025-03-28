import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { promisify } from "util";
import os from "os";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Harus false agar bisa pakai stream
  },
};

function bufferToStream(buffer: Buffer) {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
}

export async function POST(req: Request) {
  try {
    // Konversi `req.body` ke Buffer
    const reqBuffer = await req.arrayBuffer();
    const reqStream = bufferToStream(Buffer.from(reqBuffer));

    const form = new IncomingForm({
      uploadDir: os.tmpdir(),
      keepExtensions: true,
      multiples: false,
    });

    const parseForm = promisify(form.parse.bind(form));

    // Parsing form dari stream, bukan `req` langsung
    const [fields, files] = await parseForm(reqStream);

    const file = files.file?.[0];
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload ke Cloudinary
    const response = await cloudinary.uploader.upload(file.filepath, {
      folder: "pets",
      use_filename: true,
      unique_filename: true,
    });

    return NextResponse.json({ url: response.secure_url });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
