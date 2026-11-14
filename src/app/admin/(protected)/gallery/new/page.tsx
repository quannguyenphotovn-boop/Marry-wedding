import { createAlbum } from "../../../../../actions/gallery";
import { AlbumForm } from "../../../../../components/admin/AlbumForm";

export default function NewAlbumPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal-900">Thêm album mới</h1>
      <p className="mt-2 text-sm text-charcoal-500">
        Sau khi tạo album, bạn sẽ có thể thêm nhiều ảnh vào album ở bước tiếp theo.
      </p>
      <div className="mt-8">
        <AlbumForm action={createAlbum} submitLabel="Tạo album & thêm ảnh" />
      </div>
    </div>
  );
}
