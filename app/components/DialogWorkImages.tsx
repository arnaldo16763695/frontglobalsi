"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImagesGallery from "./ImagesGallery";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadButton } from "./uploads/Works/uploadImagesWork";
import { getAllImagesByWork } from "../lib/orders-data";
import { ImagesWorks } from "@/lib/types";
function DialogWorkImages({ idWork }: { idWork: string }) {
  const [images, setImages] = useState<ImagesWorks[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllImagesByWork(idWork);
      setImages(res);
    } catch (error) {
      console.error("Error cargando imágenes:", error);
    } finally {
      setLoading(false);
    }
  }, [idWork]);

  useEffect(() => {
    fetchImages();    
  }, [fetchImages]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2 text-xs md:text-sm">
          Imagen
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[100%] md:max-w-[90%] w-full max-h-[80vh]
    overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
        // Bloquear tecla Escape
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Imagenes de la orden de trabajo</DialogTitle>
          <DialogDescription></DialogDescription>
          <div>
            <UploadButton
              endpoint="imageWorkLoadder"
              className="ml-2 mt-4 ut-button:bg-slate-500 ut-button:ut-readying:bg-slate-500/50"
              onClientUploadComplete={async () => {
                // Cuando termine de subir, recargamos la lista de imágenes
                await fetchImages();
              }}
              onUploadProgress={() => {}}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
              input={{ idWork }}
            />
          </div>
        </DialogHeader>
         {/* Contenido de la galería */}
        {loading && <p className="mt-4 text-sm text-muted-foreground">Cargando imágenes…</p>}
         {!loading && images && images.length > 0 && (
          <div className="mt-4">
            <ImagesGallery images={images} fetchImages={fetchImages} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DialogWorkImages;
