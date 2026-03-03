import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../css/videoReviews.css";

export default function VideoReviews() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("id, title, video_url")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Supabase error:", error);
    } else {
      setVideos(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <section className="vidrev-sec">
        <div className="wrap">
          <h2 className="sec-title">VIDEO REVIEWS</h2>
          <p>Loading videos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="vidrev-sec reveal">
      <div className="wrap">
        <h2 className="sec-title">VIDEO REVIEWS</h2>

        <div className="vidrev-grid">
          {videos.map((video) => (
            <div className="vidrev-card" key={video.id}>
              <video
                src={video.video_url}
                controls
                preload="metadata"
              />
              <div className="vidrev-overlay">
                <span>{video.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}