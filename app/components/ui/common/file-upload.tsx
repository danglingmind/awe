type FileUploadProps = {
  name: string;
  label?: string;
};
export default function FileUpload({ name, label }: FileUploadProps) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="file"
        name={name}
        className="file-input file-input-bordered w-full max-w-xs"
      />
    </label>
  );
}
