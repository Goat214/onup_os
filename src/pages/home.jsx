import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import Navbar from "../components/navbar";
import CoursesSection from "../components/CoursesSection";
import BlogSection from "../components/BlogSection";
import Cunsult, { ConsultWithPhoto, ConsultDark } from "../components/Cunsult";
import "../css/navbar.css";
import "../css/courses.css";
import "../css/blogSection.css";
import Location from "../components/Location";
import lider2 from "../images/lider1.webp";
// ── Rasm importlari ──────────────────────────────────────────
import one from "../images/nafisa3.jpg";
import two from "../images/nafisa.jpg";
import four from "../images/3.jpg";
import five from "../images/erkaym.jpg";
import six from "../images/erkaym2.jpg";
import seven from "../images/jasmina.jpg";
import eight from "../images/12.jpg";
import nine from "../images/13.jpg";
import ten from "../images/14.jpg";
import eleven from "../images/15.jpg";
import twelve from "../images/16.jpg";
import capImg from "../images/student-cap.webp";
import briefcaseImg from "../images/student-briefcase.webp";
import lider from "../images/lider.png";
import tezOkuu from "../images/tez_okuu.png";
import jetiTepkich from "../images/jeti_tepkich.png";
import language from "../images/language.png";
import book from "../images/book.png";
import masterklass from "../images/masterkalss.jpg";
import trophy from "../images/trophy.jpg";
import oip from "../images/OIP.webp";
import sayaqat from "../images/sayaqat.jpg";
import sertifikat from "../images/serti.jpeg";
import center from "../images/centr.jpg";
import ataene from "../images/ata_ene.jpeg";

// ── Telegram config ──────────────────────────────────────────
const BOT_TOKEN = "8304491289:AAEhClRt_023T0uBxro_ni2vOMDx7lHkT6A";
const CHAT_ID = "6518481355";

async function sendToTelegram(fields) {
  const text = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  });
}

// ── Ma'lumotlar ──────────────────────────────────────────────
const slides = [
  {
    title: "40 күндө өнүгүү мүмкүнчүлүгү!",
    desc: "40 күндүн ичинде таалим-тарбия, тартип, илим алуу жана аны билимге айландыруу жөндөмдөрүн калыптандырыңыз.",
  },
  {
    title: "10 000+ бүтүрүүчүлөрдүн катарына кошулуңуз!",
    desc: "Бүгүнкү күнгө чейин 5 жыл аралыгында «ӨНҮП ӨС» окуу борборунан 10 000ден ашык ийгиликтүү бүтүрүүчүлөр окутулду. Алардын 70–80 пайызы өлкөбүздөгү алдыңкы ЖОЖдорго бюджетке жана чет мамлекеттерде окуп жатышат.",
  },

  {
    title: "ӨНҮП ӨС – мастер-класстар жана сынактар!",
    desc: "«ӨНҮП ӨС» окуу борборунда ай сайын өтүүчү мастер-класстарга жана сынактарга катышуу менен практикалык жана маанилүү көндүмдөргө ээ болуп өнүп өсүңүз!",
  },
  {
    title: "Келечектеги кесибиңиздин мыкты ээси болуңуз!",
    desc: "Мыкты адис болуу үчүн төмөнкү көндүмдөрдү калыптандырыңыз: 1) Миссия 2) Максат 3) Эрк 4) Тартип 5) Мамиле.",
  },
];

const photos = [
  { src: one, name: "" },
  { src: two, name: "" },
  { src: four, name: "" },
  { src: five, name: "" },
  { src: six, name: "" },
  { src: seven, name: "" },
  { src: eight, name: "" },
  { src: nine, name: "" },
  { src: ten, name: "" },
  { src: eleven, name: "" },
  { src: twelve, name: "" },
  { src: ataene, name: "" },
];

const bonuses = [
  {
    emoji: "💰",
    title: "10 000 сомго чейинки акчалай сыйлык",
    desc: "Англис тили курсу IELTS үчүн 10 000 сомго чейин каржылоо.",
  },
  {
    emoji: "📚",
    title: "Онлайн курсту бекер алыңыз",
    desc: "Алдын ала толук төлөм төлөгөндөр үчүн ӨНҮП ӨС платформасынан 10 000 сомго чейинки курстар бекер берилет.",
  },
  {
    emoji: "🎓",
    title: "Чет өлкөгө саякаттоого мүмкүнчүлүк",
    desc: "Мелдештер учурунда жылына жок дегенде бир жолу чет өлкөгө акысыз саякаттоо мүмкүнчүлүгүн беребиз.",
  },
  {
    emoji: "✈️",
    title: "Лидер VIP групасын бүтүргөндөргө Умра",
    desc: "Лидер VIP групаны ийгиликтүү бүтүргөндөргө Саудияга умрага сертификат.",
  },
  {
    emoji: "🏖️",
    title: "Ысык-Көлгө путёвка",
    desc: "Лидер групасын ийгиликтүү бүтүргөндөргө Ысык-Көлгө путёвка.",
  },
];

const directions = [
  { img: lider, title: "ЛИДЕР", path: "/courses" },
  { img: tezOkuu, title: "ТЕЗ ОКУУ", path: "/courses" },
  { img: jetiTepkich, title: "ЖЕТИ ТЕПКИЧ", path: "/courses" },
  { img: language, title: "ТИЛДЕР", path: "/courses" },
];

const eduTypes = [
  { emoji: "🎒", title: "ЖЕКЕЧЕ", path: "/courses" },
  { emoji: "👥", title: "ЖАЛПЫ", path: "/courses" },
  { emoji: "💻", title: "АРАЛЫКТАН", path: "/courses" },
];

const courseOptions = [
  "Лидерлик (Оффлайн)",
  "Лидерлик (Онлайн)",
  "Тез окуу (Оффлайн)",
  "Тез окуу (Онлайн)",
  "Жети тепкич (Оффлайн)",
  "Жети тепкич (Онлайн)",
  "Англис тили",
  "Орус тили",
  "IT көндүмдөрү (Оффлайн)",
];

const whyCards = [
  {
    icon: book,
    title: "Бекер коворкинг",
    desc: "24/7 форматында иштеген бекер коворкинг жана wifi.",
  },
  {
    icon: oip,
    title: "Сапаттуу билим",
    desc: "Дайыма жаңыланып турган курстар жана чоң тажрыйбага ээ устаттар.",
  },
  {
    icon: trophy,
    title: "Үзгүлтүксүз мелдештер",
    desc: "Китеп сынактар, мелдештер.",
  },
  {
    icon: masterklass,
    title: "Бекер мастер-класстар",
    desc: "Тармак адистери менен дайыма өткөрүлүүчү бекер мастер-класстар.",
  },
  {
    icon: sertifikat,
    title: "Сертификат",
    desc: "Курсту ийгиликтүү аяктаган окуучулар «ӨНҮП ӨС» дипломун жана сертификатын алат.",
  },
  {
    icon: sayaqat,
    title: "Саякат",
    desc: "Ийгиликтүү бүтүрүүчүлөр музейлерге, библиотекаларга жана эс алуу жайларына саякат жасоо мүмкүнчүлүгүнө ээ болушат.",
  },
];

const ENROLL_INIT = {
  course: "",
  branch: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  agree: false,
};

// ── Component ────────────────────────────────────────────────
export default function Home() {
  const [slide, setSlide] = useState(0);
  const [locTab, setLocTab] = useState(0);
  const [enroll, setEnroll] = useState(ENROLL_INIT);
  const [enrolling, setEnrolling] = useState(false);
  const intervalRef = useRef(null);

  // Slider
  useEffect(() => {
    intervalRef.current = setInterval(
      () => setSlide((s) => (s + 1) % slides.length),
      4500
    );
    return () => clearInterval(intervalRef.current);
  }, []);

  const goSlide = (i) => {
    clearInterval(intervalRef.current);
    setSlide(i);
    intervalRef.current = setInterval(
      () => setSlide((s) => (s + 1) % slides.length),
      4500
    );
  };

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Enroll submit → Telegram
  const submitEnroll = async (e) => {
    e.preventDefault();
    if (!enroll.course || !enroll.phone)
      return alert("Зарыл талааларды толтуруңуз!");
    if (!enroll.agree) return alert("Макулдукту белгилеңиз!");

    setEnrolling(true);
    try {
      await sendToTelegram({
        "📋 Форма": "Топко жазылуу",
        "📚 Курс": enroll.course,
        "🏢 Филиал": enroll.branch || "—",
        "📅 Күн": enroll.date || "—",
        "🕐 Убакыт": enroll.time || "—",
        "👤 Ат": enroll.name || "—",
        "📞 Телефон": `+996${enroll.phone}`,
      });
      alert("Катталдыңыз! Жакында чалабыз. ✅");
      setEnroll(ENROLL_INIT);
    } catch {
      alert("Ката болду. Кайра аракет кылыңыз.");
    } finally {
      setEnrolling(false);
    }
  };

  // Enroll field helper
  const setE = (field) => (e) =>
    setEnroll((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div>
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="wrap">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`hero-slide ${i === slide ? "active" : ""}`}
            >
              <h1>{s.title}</h1>
              <p>{s.desc}</p>
              <a href="#consult1" className="btn-hero">
                консультация алуу →
              </a>
            </div>
          ))}
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === slide ? "active" : ""}`}
                onClick={() => goSlide(i)}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULT 1 ── */}
      <Cunsult />

      {/* ── COURSES ── */}
      <CoursesSection />

      {/* ── BLOG ── */}
      <BlogSection />

      {/* ── ABOUT ── */}
      <section className="about-sec reveal" id="about">
        <div className="wrap">
          <h2 className="about-title">«Onup OS» — бул</h2>
          <div className="about-cards">
            {[
              {
                desc: "Мээни программалоо жана дисциплина аркылуу адамды жаңы деңгээлге чыгарган борбор.",
                svg: (
                  <svg
                    viewBox="0 0 24 24"
                    width="26"
                    height="26"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 3a3 3 0 0 0-3 3v1a2 2 0 0 0-2 2 2 2 0 0 0 2 2v1a3 3 0 0 0 3 3" />
                    <path d="M15 3a3 3 0 0 1 3 3v1a2 2 0 0 1 2 2 2 2 0 0 1-2 2v1a3 3 0 0 1-3 3" />
                    <path d="M9 15a3 3 0 0 0 6 0" />
                  </svg>
                ),
              },
              {
                desc: "Лидерлик сапаттарды өнүктүрүү менен коомдо өз ордун табууга жол көрсөтөт.",
                svg: (
                  <svg
                    viewBox="0 0 24 24"
                    width="26"
                    height="26"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-4 4-8 4-8z" />
                    <path d="M12 14a2 2 0 0 0 2-2" />
                  </svg>
                ),
              },
              {
                desc: "10 000дөн ашык студентти жана 100дөн ашык команданы бириктирген инновация борбору.",
                svg: (
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
                    <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.93 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                ),
              },
            ].map((card, i) => (
              <div className="about-card" key={i}>
                <div className="about-icon">{card.svg}</div>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-sec reveal">
        <div className="wrap">
          <h2 className="stats-title">«Onup OS» натыйжасы сандарда</h2>
          <p className="stats-sub">
            2021-жылдын 10-июнь айынан 2026-жылдын февраль айына чейинки
            статистика
          </p>
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-num">10,000+</div>
              <div className="stat-lbl">
                Ушул убакка чейин бүтүргөн студенттер
              </div>
              <div className="stat-img-wrap">
                <img src={capImg} alt="graduation cap" className="stat-img" />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-num">80% – 85%</div>
              <div className="stat-lbl">ЖОЖдорго кабыл алынган</div>
              <div className="stat-img-wrap">
                <img src={briefcaseImg} alt="briefcase" className="stat-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="why-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Эмне үчүн «Onup OS» да окуу керек?</h2>
          <div className="why-grid">
            {whyCards.map((r, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">
                  <img src={r.icon} alt={r.title} />
                </div>
                <div className="why-title">{r.title}</div>
                <p className="why-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY (full-width marquee) ── */}
      <section className="gallery-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Ата-энелер жана окуучулардын пикирлери</h2>
        </div>
        <div className="gallery-track-wrapper">
          <div className="gallery-track">
            {[...photos, ...photos].map((photo, i) => (
              <div className="gallery-card" key={i}>
                <img
                  src={photo.src}
                  alt={photo.name || "Сүрөт"}
                  loading="lazy"
                />
                {photo.name && (
                  <div className="gallery-overlay">
                    <span>{photo.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BONUSES ── */}
      <section className="bonus-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">
            Бүтүрүүчүлөр үчүн бонустар жана сыйлыктар
          </h2>
          <div className="bonus-grid">
            {bonuses.map((b, i) => (
              <div className="bonus-card" key={i}>
                <div className="bonus-img">
                  <span>{b.emoji}</span>
                </div>
                <div className="bonus-title">{b.title}</div>
                <p className="bonus-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULT 2 (сүрөт менен) ── */}
      <ConsultWithPhoto />

      {/* ── DIRECTIONS ── */}
      <section className="dir-sec reveal" id="directions">
        <div className="wrap">
          <h2>Биздин багыттар</h2>
          <div className="dir-grid">
            {directions.map((d, i) => (
              <Link to={d.path} className="dir-card" key={i}>
                <div className="dir-img">
                  <img src={d.img} alt={d.title} />
                </div>
                <h3>{d.title}</h3>
              </Link>
            ))}
          </div>

          <p className="edu-title">Окутуу түрлөрү</p>
          <div className="edu-grid">
            {eduTypes.map((e, i) => (
              <Link to={e.path} className="edu-card" key={i}>
                <div className="edu-img">
                  <span>{e.emoji}</span>
                </div>
                <h3>{e.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULT 3 (кара фон) ── */}
      <ConsultDark />

      {/* ── LOCATION ── */}
      <Location />

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              <div className="footer-logo-row">
                <span>Onup OS</span>
              </div>
              <a href="tel:+996773101069" className="footer-phone-link">
                +996 773 101 069
              </a>
              <p className="footer-addr">Кадамжай району Халмион айылы</p>
            </div>
            <div className="footer-links-col">
              <Link to="/courses">Курстар</Link>
              <a href="#directions">Багыттар</a>
              <a href="#" target="_blank" rel="noreferrer">
                Онлайн платформа
              </a>
              <a href="#oferta">Жалпы оферта</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">
              © «Onup OS», 2026 — Бардык укуктар корголгон.
            </span>
            <div className="footer-docs">
              <a href="#">📄 Тастыктама</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
