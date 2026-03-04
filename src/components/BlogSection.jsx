import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function BlogSection() {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("date", { ascending: false });
      if (error) console.error("Supabase xato:", error);
      else setBlogs(data);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
                // thumbnail: Supabase da "thumbnail" field (yo'q bo'lsa "img")
                const thumbSrc = b.thumbnail || b.img || null;
                const cc = catColor[b.cat] || { bg: "#f5f5f5", color: "#555" };
                const clickable = hasVideo || !!b.img;

                return (
                  <article
                    className={`blog-card ${clickable ? "blog-card--clickable" : ""}`}
                    key={b.id}
                    onClick={() => {
                      if (hasVideo) setModal({ type: "video", src: b.video_url, title: b.title, thumb: thumbSrc });
                      else if (b.img) setModal({ type: "img", src: b.img, title: b.title });
                    }}
                  >
                    {/* ── THUMBNAIL (abloshka) ── */}
                    <div className="blog-img">

                      {/* Rasm — to'liq qoplash */}
                      {thumbSrc ? (
                        <img src={thumbSrc} alt={b.title} className="blog-thumb-img" />
                      ) : (
                        /* Rasm yo'q → gradient + emoji */
                        <div className="blog-thumb-gradient">
                          <span className="blog-emoji">{b.emoji || "🎬"}</span>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="blog-thumb-overlay" />

                      {/* ▶ Play ring — video bo'lsa */}
                      {hasVideo && (
                        <div className="blog-play-badge">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}

                      {/* Category badge — yuqori chap */}
                      <div
                        className="blog-cat-badge"
                        style={{ background: cc.bg, color: cc.color }}
                      >
                        {b.cat}
                      </div>

                      {/* Views — pastki o'ng */}
                      <div className="blog-views-badge">👁 {b.views ?? 0}</div>
                    </div>

                    {/* ── BODY ── */}
                    <div className="blog-body">
                      <div className="blog-meta-row">
                        <span className="blog-date">🗓 {b.date}</span>
                      </div>
                      <h3 className="blog-title">{b.title}</h3>
                      <p className="blog-desc">{b.desc}</p>
                      {clickable && (
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

      {/* ── MODAL ── */}
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
                poster={modal.thumb || undefined}
                controls autoPlay playsInline
                className="modal-video-player"
              />
            ) : (
              <img src={modal.src} alt={modal.title} className="modal-img-content" />
            )}
            {modal.title && <div className="modal-caption">{modal.title}</div>}
          </div>
        </div>
      )}
    </>
  );
}