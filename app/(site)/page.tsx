import HomeClient from "@/components/home/HomeClient";
import { getSite, getVideos } from "@/lib/content";

export default async function Home() {
  const [videos, site] = await Promise.all([getVideos(), getSite()]);
  return <HomeClient videos={videos} site={site} />;
}
