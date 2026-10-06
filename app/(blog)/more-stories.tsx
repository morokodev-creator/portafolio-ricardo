import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";

export default function MoreStories({ posts, skip }: any) {
  return (
    <div className="mb-32">
      <div className="grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts?.map((post: any, index: number) => (
          <article key={post._id || index}>
            <div className="mb-5">
              {post.coverImage && (
                <CoverImage title={post.title || ""} slug={post.slug?.current || ""} image={post.coverImage} priority={false} />
              )}
            </div>
            <h3 className="mb-3 text-3xl leading-snug">
              <Link href={`/posts/${post.slug?.current || ""}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <div className="mb-4 text-lg">
              {post.date && <DateComponent dateString={post.date} />}
            </div>
            {post.excerpt && <p className="text-pretty mb-4 text-lg leading-relaxed">{post.excerpt}</p>}
            {post.author && <Avatar name={post.author.name} picture={post.author.picture} />}
          </article>
        ))}
      </div>
    </div>
  );
}