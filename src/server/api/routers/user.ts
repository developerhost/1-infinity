import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createCloudImage, deleteCloudImage } from "@/actions/cloudImage";
import { extractPublicId } from "cloudinary-build-url";
import { getUserById } from "./user/getUserById";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(getUserById),

  getUserList: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
      take: 100,
    });
    return users;
  }),

  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        introduction: z.string().max(200).optional(),
        base64Image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { name, introduction, base64Image } = input;
        const userId = ctx.session.user.id;

        let image_url;

        if (base64Image) {
          const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: {
              image: true,
            },
          });

          if (!user) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "ユーザーが見つかりません",
            });
          }

          // 古い画像の削除
          if (user.image) {
            const publicId = extractPublicId(user.image);
            await deleteCloudImage(publicId);
          }

          // 画像のアップロード
          image_url = await createCloudImage(base64Image);
        }

        // ユーザー情報の更新
        await ctx.db.user.update({
          where: { id: userId },
          data: {
            name,
            introduction,
            ...(image_url && { image: image_url }),
          },
        });
      } catch (error) {
        console.error(error);

        if (error instanceof TRPCError && error.code === "BAD_REQUEST") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "ユーザー情報の更新に失敗しました",
          });
        }
      }
    }),
});
