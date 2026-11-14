import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../../../lib/prisma";
import { deleteAlbum } from "../../../../actions/gallery";
import { DeleteButton } from "../../../../components/admin/DeleteButton";
import { GALLERY_CATEGORY_LABELS } from "../../../../lib/validation";

export default async function AdminGalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { photos: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-charcoal-900">Bộ sưu tập ảnh</h1>
        <Link
          href="/admin/gallery/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-gold-500"
        >
          + Thêm album mới
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold-100 bg-ivory-50 p-5"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                <Image src={album.coverImageUrl} alt={album.title} fill className="object-cover" />
              </div>
              <div>
                <p className="font-serif text-lg text-charcoal-900">{album.title}</p>
                <p className="text-sm text-charcoal-500">
                  {GALLERY_CATEGORY_LABELS[album.category] ?? album.category} ·{" "}
                  {album._count.photos} ảnh · {album.isPublished ? "Đang hiển thị" : "Đã ẩn"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/gallery/${album.id}`} className="text-sm text-gold-600 hover:underline">
                Quản lý
              </Link>
              <DeleteButton
                action={deleteAlbum.bind(null, album.id)}
                confirmText={`Xóa album "${album.title}" và toàn bộ ảnh trong đó?`}
              />
            </div>
          </div>
        ))}

        {albums.length === 0 && (
          <p className="rounded-xl border border-gold-100 bg-ivory-50 p-8 text-center text-charcoal-500">
            Chưa có album nào.
          </p>
        )}
      </div>
    </div>
  );
}
