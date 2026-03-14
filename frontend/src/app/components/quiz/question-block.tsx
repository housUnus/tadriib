import { QuestionBlock } from "@/lib/data/quiz-data";

export function QuestionBlocks({ blocks, fontSize }: { blocks?: QuestionBlock[]; fontSize: number }) {
  return (
    <div className="space-y-4">
      {blocks?.map((block) => (
        <div key={block.id}>
          {block.type === "text" && (
            <p style={{ fontSize: `${fontSize}px` }} className="whitespace-pre-line">
              {block.text}
            </p>
          )}

          {block.type === "image" && block.image && (
            <img src={block.image} className="rounded-lg max-h-80" />
          )}

          {block.type === "file" && block.file && (
            <a href={block.file} target="_blank" className="text-primary underline">
              Download attachment
            </a>
          )}
        </div>
      ))}
    </div>
  )
}