type TagType = {
  tagName: string;
};

export default function Tag({ tagName }: TagType) {
  return (
    <div className="text-xs rounded-full bg-primary text-accent px-2 py-1">{tagName}</div>
  );
}
