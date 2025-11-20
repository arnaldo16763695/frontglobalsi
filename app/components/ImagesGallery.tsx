"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { ImagesWorks } from "@/lib/types";
import { Trash } from "lucide-react";
function ImagesGallery({
  images,
  fetchImages,
}: {
  images: ImagesWorks[];
  fetchImages: () => void;
}) {
  async function handleDelete(imageKey: string, idImage: string) {
    if (!confirm("Seguro")) return;
    const res = await fetch("/api/uploadthing/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageKey, idImage }),
    });
    const data = await res.json();
    if (data.success) {
      await fetchImages();
    } else {
      alert("Error al eliminar");
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {images.map((image) => (
        <Card
          key={image.id}
          className="max-h-56   flex flex-col justify-center items-center"
        >
          <CardHeader>
            <Trash
              size={15}
              className="cursor-pointer"
              onClick={() => handleDelete(image.imageKey, image.id)}
            />
          </CardHeader>
          <CardContent className="overflow-hidden h-full p-4">
            <Image
              className=""
              src={`${image.url}`}
              alt={image.imageKey}
              width={100}
              height={100}
            />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ImagesGallery;
