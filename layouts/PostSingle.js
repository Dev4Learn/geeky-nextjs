import Base from "@layouts/Baseof";
import dateFormat from "@lib/utils/dateFormat";
import { markdownify } from "@lib/utils/textConverter";
import { DiscussionEmbed } from "disqus-react";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import Post from "./partials/Post";
import Sidebar from "./partials/Sidebar";
import shortcodes from "./shortcodes/all";
import config from "@config/config.json";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";
const { disqus } = config;
const { author_name } = config.settings;

const PostSingle = ({
  frontmatter,
  content,
  mdxContent,
  slug,
  posts,
  allCategories,
  relatedPosts,
}) => {
  let { description, title, date, image, categories } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <Base title={title} description={description}>
      <section className="section single-blog mt-6">
        <div className="container">
          <div className="row">
            <div className="lg:col-8">
              <article>
                <div className="relative">
                  {image && (
                    <Image
                      src={image}
                      height="500"
                      width="1000"
                      alt={title}
                      className="rounded-lg"
                    />
                  )}
                  <ul className="absolute top-3 left-2 flex flex-wrap items-center">
                    {categories.map((tag, index) => (
                      <li
                        className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
                        key={"tag-" + index}
                      >
                        <Link
                          className="capitalize"
                          href={`/categories/${tag.replace(" ", "-")}`}
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {markdownify(title, "h1", "lg:text-[42px] mt-16")}
                <ul className="flex items-center space-x-4">
                  <li>
                    <Link
                      className="inline-flex items-center font-secondary text-xs leading-3"
                      href="/about"
                    >
                      <FaUserAlt className="mr-1.5" />
                      {author_name}
                    </Link>
                  </li>
                  <li className="inline-flex items-center font-secondary text-xs leading-3">
                    <FaRegCalendar className="mr-1.5" />
                    {dateFormat(date)}
                  </li>
                </ul>
                <div className="content mb-16">
                  <MDXRemote {...mdxContent} components={shortcodes} />
                </div>
              </article>
            </div>
            <Sidebar posts={posts} categories={allCategories} />
          </div>

          {disqus.enable && (
            <div className="row">
              <DiscussionEmbed shortname={disqus.shortname} />
            </div>
          )}
        </div>

        {/* Related posts */}
        <div className="container mt-20">
          <h2 className="h2 section-title">Related Posts</h2>
          <div className="row mt-16 justify-center">
            {relatedPosts.map((post) => (
              <div key={post.frontmatter.slug} className="mb-12 lg:col-4">
                <Post post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;