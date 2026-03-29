import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/CoursePage.css";

export default function CoursePage({ course }) {
  const accent = course.accentColor || "#22c55e";

  // Agar bir nechta location bo'lsa — tab
  const hasMultiLocation = course.packages && course.packages.length > 1;
  const [activeTab, setActiveTab] = useState(0);
  const activePkg = course.packages ? course.packages[activeTab] : null;

  return (
    <div className="cp-page">

      {/* ── BREADCRUMB ── */}
      <div className="cp-back-bar">
        <Link to="/" className="cp-back-link">← Башкы бет</Link>
        <span className="cp-sep">/</span>
        <Link to="/courses" className="cp-back-link">Курстар</Link>
        <span className="cp-sep">/</span>
        <span className="cp-current">{course.breadcrumb}</span>
      </div>

      {/* ── HERO ── */}
      <section className="cp-hero" style={{ "--accent": accent }}>
        <div className="cp-hero__bg" />
        <div className="cp-hero__grid" />
        <div className="cp-hero__glow"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}14 0%, transparent 70%)` }}
        />
        <div className="cp-hero__content">
          <div className="cp-hero__tag"
            style={{ background: `${accent}22`, border: `1px solid ${accent}66`, color: accent }}
          >
            {course.emoji} {course.tag}
          </div>
          <h1 className="cp-hero__title">
            {course.title.map((part, i) =>
              part.accent
                ? <span key={i} style={{ color: accent }}>{part.text}</span>
                : <span key={i}>{part.text}</span>
            )}
          </h1>
          <p className="cp-hero__sub">{course.subtitle}</p>
          <div className="cp-hero__btns">
            <a href="#pricing" className="cp-btn-primary" style={{ background: accent }}>Катталуу</a>
            <a href="#about" className="cp-btn-outline">Толугураак</a>
          </div>
        </div>
        <div className="cp-hero__chevron">⌄</div>
      </section>

      {/* ── STATS ── */}
      <div className="cp-stats">
        {course.stats.map((s, i) => (
          <div className="cp-stats__item" key={i}>
            <div className="cp-stats__num" style={{ color: accent }}>{s.num}</div>
            <div className="cp-stats__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="cp-section">
          <span className="cp-section__tag" style={{ background: `${accent}18`, color: accent }}>Курс жөнүндө</span>
          <h2 className="cp-section__title">{course.aboutTitle}</h2>
          <p className="cp-section__lead">{course.aboutLead}</p>
          <div className="cp-about-box">
            {course.aboutText.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
            {course.aboutList && (
              <ul>
                {course.aboutList.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <div className="cp-gray">
        <div className="cp-section">
          <span className="cp-section__tag" style={{ background: `${accent}18`, color: accent }}>Программа</span>
          <h2 className="cp-section__title">Курста эмнелерди үйрөнөсүң?</h2>
          <p className="cp-section__lead">{course.currLead}</p>
          <div className="cp-curr-grid">
            {course.curriculum.map((item, i) => (
              <div className="cp-curr-card" key={i}>
                <div className="cp-curr-card__num"
                  style={{ background: `${accent}22`, color: accent }}>{i + 1}</div>
                <div className="cp-curr-card__text">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <div id="pricing" className="cp-pricing">
        <div className="cp-pricing__inner">
          <span className="cp-section__tag" style={{ background: `${accent}18`, color: accent }}>Баалар</span>
          <h2 className="cp-section__title">Курстун баасы</h2>

          {/* Location tabs */}
          {hasMultiLocation && (
            <div className="cp-loc-tabs">
              {course.packages.map((pkg, i) => (
                <button
                  key={i}
                  className={`cp-loc-tab ${activeTab === i ? "cp-loc-tab--active" : ""}`}
                  style={activeTab === i ? { background: accent, borderColor: accent } : {}}
                  onClick={() => setActiveTab(i)}
                >
                   {pkg.location}
                </button>
              ))}
            </div>
          )}

          {/* Price cards */}
          {activePkg && (
            <div className="cp-pricing__grid">
              {activePkg.plans.map((plan, i) => (
                <div
                  key={i}
                  className={`cp-price-card ${plan.accent ? "cp-price-card--accent" : ""}`}
                  style={plan.accent ? { borderColor: accent } : {}}
                >
                  {plan.badge && (
                    <div className="cp-price-card__badge" style={{ background: accent }}>
                      {plan.badge}
                    </div>
                  )}

                  {/* Type */}
                  <div className="cp-price-card__type" style={{ color: accent }}>
                    {plan.type}
                  </div>

                  {/* Main price */}
                  <div className="cp-price-card__amount">{plan.amount}</div>

                  {/* Rows table */}
                  <div className="cp-price-rows">
                    {plan.rows.map((row, j) => (
                      <div key={j} className="cp-price-row">
                        <span className="cp-price-row__label">{row.label}</span>
                        <span className="cp-price-row__price" style={{ color: accent }}>
                          {row.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    className={plan.accent ? "cp-price-card__btn" : "cp-price-card__btn--outline"}
                    style={plan.accent
                      ? { background: accent }
                      : { color: accent, borderColor: accent }}
                  >
                    Катталуу
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="cp-footer-cta">
        <h2>{course.ctaTitle}</h2>
        <p>{course.ctaSub}</p>
        <a href="#pricing" className="cp-btn-primary" style={{ background: accent }}>
          Катталуу →
        </a>
      </div>

    </div>
  );
}