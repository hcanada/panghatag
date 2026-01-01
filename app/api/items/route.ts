import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("items").select();
  console.log("test");
  if (error) return NextResponse.json({ message: "error" });
  return NextResponse.json(data);
}

// Handle POST request
export async function POST(req: Request) {
  const formData = await req.formData();
  const supabase = await createClient();

  //
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const city = formData.get("city") as string;
  const barangay = formData.get("barangay") as string;
  const files = formData.getAll("images") as File[];
  console.log(files, "files here");

  const imagePaths: string[] = [];

  for (const file of files) {
    const path = `${file.name}-${Date.now()}`;

    const { error } = await supabase.storage.from("items").upload(path, file);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = await supabase.storage.from("items").getPublicUrl(path);
    imagePaths.push(data.publicUrl);
  }

  const { error } = await supabase.from("items").insert({
    user_id: user.id,
    title,
    description,
    category,
    city,
    barangay,
    images: imagePaths,
  });

  if (error) {
    console.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "POST request received" },
    { status: 200 }
  );
}

// export async function PUT(req: Request) {
//   // Handle PUT request
//   return NextResponse.json({ message: "PUT request received" });
// }

// export async function DELETE(req: Request) {
//   // Handle DELETE request
//   return NextResponse.json({ message: "DELETE request received" });
// }
