import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { updateAlbum, addPhoto, deletePhoto } from "@/actions/gallery";
import { AlbumForm } from "@/components/admin/AlbumForm";
import { AddPhotoForm } from "@/components/admin/AddPhotoForm";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function EditAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = await prisma.galleryAlbum.findUnique({
    where: { id },
    include: { photos: { orderBy: { sortOrder: "asc" } } },
  });
  if (!album) notFound();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif text-2xl text-charcoal-900">Sửa album: {album.title}</h1>
        <div className="mt-8">
          <AlbumForm
            action={updateAlbum.bind(null, album.id)}
            submitLabel="Lưu thay đổi"
            initialValues={{
              title: album.title,
              slug: album.slug,
              category: album.category,
              coverImageUrl: album.coverImageUrl,
              description: album.description ?? "",
              isPublished: album.isPublished,
              sortOrder: album.sortOrder,
            }}
          />
        </div>
      </div>

      <div>
        <h2 className="font-serif text-xl text-charcoal-900">Ảnh trong album ({album.photos.length})</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {album.photos.map((photo) => (
            <div key={photo.id} className="rounded-lg border border-gold-100 bg-ivory-50 p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded">
                <Image src={photo.imageUrl} alt={photo.altText} fill className="object-cover" />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="truncate text-xs text-charcoal-500">{photo.altText}</span>
                <DeleteButton
                  action={deletePhoto.bind(null, photo.id, album.id)}
                  confirmText="Xóa ảnh này khỏi album?"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 max-w-md">
          <AddPhotoForm action={addPhoto.bind(null, album.id)} />
        </div>
      </div>
    </div>
  );
}
