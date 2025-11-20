import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
import { profileEditAvatar } from "@/app/lib/users-actions";
import { fetchUserProfile } from "@/app/lib/user-data";
import { UTApi } from "uploadthing/server";
import { addImageToWork } from "@/app/lib/orders-actions";
import z from "zod";


const f = createUploadthing();
const utapi = new UTApi();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      // Aquí sí se puede leer sesión
      const session = await auth();
      const userId = session?.user?.id;
      const accessToken = session?.user?.accessToken; // we needed it to the api

      if (!userId) throw new UploadThingError("Unauthorized");

      // Pasa lo que necesitas hacia onUploadComplete
      return { userId, accessToken, req };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const avatar = file.ufsUrl;
      const avatarKey = file.key;

      //read my before avatarKey fro my db
      const user = await fetchUserProfile(metadata.userId, metadata.accessToken);
      const oldAvatarKey = user.avatarKey;

      // update my API with the new url
      await profileEditAvatar(
        metadata.userId,
        avatar,
        avatarKey,
        metadata.accessToken
      );

      if (oldAvatarKey && oldAvatarKey !== avatarKey) {
        await utapi.deleteFiles(oldAvatarKey);
      }

      return { uploadedBy: metadata.userId };
    }),

      imageWorkLoadder: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
  }) .input(
      z.object({
        idWork: z.string(),
      })
    )
    .middleware(async ({ req, input  }) => {
      // Aquí sí se puede leer sesión
      const session = await auth();
      const userId = session?.user?.id;
      const accessToken = session?.user?.accessToken; // we needed it to the api

      if (!userId) throw new UploadThingError("Unauthorized");

      // Pasa lo que necesitas hacia onUploadComplete
      return { userId, accessToken, req, idWork: input.idWork };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const imageUrl = file.ufsUrl;
      const imageKey = file.key;   

      await addImageToWork(metadata.idWork, imageUrl, imageKey, metadata.userId , metadata.accessToken)

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
