import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { type: "video"|"img", src, title }

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase xato:", error);
      } else {
        setBlogs(data);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  // ESC менен жабуу
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Modal ачык болсо scroll жабуу
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const catColor = {
    "Маркетинг":    { bg: "#fff3e0", color: "#e65100" },
    "Программалоо": { bg: "#e8f5e9", color: "#2e7d32" },
    "Жаңылыктар":   { bg: "#e3f2fd", color: "#1565c0" },
    "Дизайн":       { bg: "#f3e5f5", color: "#6a1b9a" },
    "IT":           { bg: "#e8eaf6", color: "#283593" },
  };

  return (
    <>
      <section className="blog-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Блог</h2>

          {loading ? (
            <div className="blog-loading">
              {[1, 2, 3].map((i) => (
                <div key={i} className="blog-skeleton">
                  <div className="skel-img" />
                  <div className="skel-body">
                    <div className="skel-line short" />
                    <div className="skel-line" />
                    <div className="skel-line medium" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="blog-empty">
              <span>📭</span>
              <p>Азырынча маалымат жок</p>
            </div>
          ) : (
            <div className="blog-grid">
              {blogs.map((b) => {
                const hasVideo = !!b.video_url;
                const cc = catColor[b.cat] || { bg: "#f5f5f5", color: "#555" };

                return (
                  <article
                    className="blog-card"
                    key={b.id}
                    onClick={() => {
                      if (hasVideo) {
                        setModal({ type: "video", src: b.video_url, title: b.title });
                      } else if (b.img) {
                        setModal({ type: "img", src: b.img, title: b.title });
                      }
                    }}
                    style={{ cursor: hasVideo || b.img ? "pointer" : "default" }}
                  >
                    {/* MEDIA */}
                    <div className="blog-img">
                      {b.img ? (
                        <img src={b.img} alt={b.title} />
                      ) : (
                        <span className="blog-emoji">{b.emoji || "📄"}</span>
                      )}

                      {/* Video badge */}
                      {hasVideo && (
                        <div className="blog-play-badge">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}

                      {/* Category badge */}
                      <div
                        className="blog-cat-badge"
                        style={{ background: cc.bg, color: cc.color }}
                      >
                        {b.cat}
                      </div>
                    </div>

                    {/* BODY */}
                    <div className="blog-body">
                      <div className="blog-meta-row">
                        <span className="blog-date">🗓 {b.date}</span>
                        <span className="blog-views">👁 {b.views ?? 0}</span>
                      </div>
                      <h3 className="blog-title">{b.title}</h3>
                      <p className="blog-desc">{b.desc}</p>

                      {(hasVideo || b.img) && (
                        <span className="blog-read-more">
                          {hasVideo ? "▶ Видео көрүү" : "Толугу менен →"}
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== MODAL ===== */}
      {modal && (
        <div className="blog-modal-overlay" onClick={() => setModal(null)}>
          <div
            className={`blog-modal-box ${modal.type === "video" ? "modal-video" : "modal-img"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>

            {modal.type === "video" ? (
              <video
                src={modal.src}
                controls
                autoPlay
                className="modal-video-player"
              />
            ) : (
              <img src={modal.src} alt={modal.title} className="modal-img-content" />
            )}

            {modal.title && (
              <div className="modal-caption">{modal.title}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}