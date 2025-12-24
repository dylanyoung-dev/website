import { FiChevronRight } from "react-icons/fi";
import { Layout } from "@/components/ui/Layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { YouTubePlayer } from "@/components/blogs";
import { IVideoPost } from "@/interfaces";
import { getVideoPosts } from "@/services/videoPost.service";

export const metadata = {
  title: "Dylan Young: The journey of Sitecore Master",
  description: "",
};

export default async function VideoPage() {
  const videoPosts = await getVideoPosts(12);

  return (
    <Layout metaTitle="Dylan Young: The journey of Sitecore Master" metaDescription="">
      <section className="bg-background relative">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <FiChevronRight className="text-gray-500" />
            <span>My Videos</span>
          </nav>
        </div>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="space-y-8">
            <div className="flex justify-between">
              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-semibold">My Videos</h1>
                </div>
                <p className="text-muted-foreground text-lg md:text-xl">
                  A curated list of all of my video content available across multiple YouTube/Twitch/Vimeo etc. channels.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12">
              {videoPosts.map((video: IVideoPost) => (
                <Card key={video._id}>
                  <CardHeader>{video.title}</CardHeader>
                  <CardContent>
                    <YouTubePlayer videoId={video.youtubeId} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


