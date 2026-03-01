import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import logo from "../images/logo_O.jpg";
import {
  FaCrown,
  FaBookOpen,
  FaLayerGroup,
  FaLanguage,
  FaLaptopCode,
} from "react-icons/fa";
import capImg from "../images/student-cap.webp";
import briefcaseImg from "../images/student-briefcase.webp";
import lider from "../images/lider.png";
import tezOkuu from "../images/tez_okuu.png";
import jetiTepkich from "../images/jeti_tepkich.png";
import language from "../images/language.png";
// ============================================================
// IMAGES — siz öz fayldarıñızdı import kılıñız, mısalı:
// import prog from "../images/courses/programming.png";
// import design from "../images/courses/design.png";
// ...hers courses, blog, bonuses, directions, brands, awards, location
// ============================================================

// ========== SLIDER DATA ==========
const slides = [
  {
    title: "ӨНҮП ӨС – мастер-класстар жана сынактар!",
    desc: "«ӨНҮП ӨС» окуу борборунда ай сайын өтүүчү мастер-класстарга жана сынактарга катышуу менен практикалык жана маанилүү көндүмдөргө ээ болуп өнүп өсүңүз!",
  },
  {
    title: "40 күндө өнүгүү мүмкүнчүлүгү!",
    desc: "40 күндүн ичинде таалим-тарбия, тартип, илим алуу жана аны билимге айландыруу жөндөмдөрүн калыптандырыңыз.",
  },
  {
    title: "10 000+ бүтүрүүчүлөрдүн катарына кошулуңуз!",
    desc: "Бүгүнкү күнгө чейин 5 жыл аралыгында «ӨНҮП ӨС» окуу борборунан 10 000ден ашык ийгиликтүү бүтүрүүчүлөр окутулду. Алардын 70–80 пайызы өлкөбүздөгү алдыңкы ЖОЖдорго бюджетке жана чет мамлекеттерде окуп жатышат.",
  },
  {
    title: "Келечектеги кесибиңиздин мыкты ээси болуңуз!",
    desc: "Мыкты адис болуу үчүн төмөнкү көндүмдөрдү калыптандырыңыз: 1) Миссия 2) Максат 3) Эрк 4) Тартип 5) Мамиле.",
  },
];

// ========== COURSES DATA ==========
// thumb: курс сүрөтүнүн жолу, мисалы: "/images/courses/frontend.jpg"
// Азырынча null — placeholder эмодзи көрсөтөт
const allCourses = [
  {
    icon: <FaCrown />,
    name: "Лидерлик (Оффлайн)",
    duration: "40 күн • 1.5 саат",
    category: "Өнүгүү",
    type: "Оффлайн",
  },
  {
    icon: <FaCrown />,
    name: "Лидерлик (Онлайн)",
    duration: "40 күн • 1.5 саат",
    category: "Өнүгүү",
    type: "Онлайн",
  },

  {
    icon: <FaBookOpen />,
    name: "Тез окуу (Оффлайн)",
    duration: "1 ай • 12 күн • 1.5 саат",
    category: "Өнүгүү",
    type: "Оффлайн",
  },
  {
    icon: <FaBookOpen />,
    name: "Тез окуу (Онлайн)",
    duration: "1 ай • 12 күн • 1.5 саат",
    category: "Өнүгүү",
    type: "Онлайн",
  },

  {
    icon: <FaLayerGroup />,
    name: "Жети тепкич (Оффлайн)",
    duration: "1 ай • 6 күн • 2 саат",
    category: "Өнүгүү",
    type: "Оффлайн",
  },
  {
    icon: <FaLayerGroup />,
    name: "Жети тепкич (Онлайн)",
    duration: "1 ай • 6 күн • 2 саат",
    category: "Өнүгүү",
    type: "Онлайн",
  },

  {
    icon: <FaLanguage />,
    name: "Англис тили",
    duration: "1 ай • 6 күн • 2 саат",
    category: "Тилдер",
    type: "Стандарт",
  },
  {
    icon: <FaLanguage />,
    name: "Орус тили",
    duration: "1 ай • 6 күн • 2 саат",
    category: "Тилдер",
    type: "Стандарт",
  },

  {
    icon: <FaLaptopCode />,
    name: "IT көндүмдөрү (Оффлайн)",
    duration: "1 ай • 12 күн • 2 саат",
    category: "IT",
    type: "Оффлайн",
  },
];

const tagMap = {
  Өнүгүү: "tag-dev",
  Тилдер: "tag-lang",
  IT: "tag-it",
  Оффлайн: "tag-offline",
  Онлайн: "tag-online",
  Стандарт: "tag-std",
};

// ========== BLOG DATA ==========
// img: null болсо placeholder
const blogs = [
  {
    img: null,
    emoji: "🎬",
    cat: "Маркетинг",
    views: 49,
    date: "22-февраль, 2026",
    title:
      "Медиа тармагында карьера: Видеография менен кинематографиянын айырмасы эмне?",
    desc: "Видеография жана кинематография эмне? Алардын айырмасы, милдеттери жана медиа дүйнөсүндө профессионал болуу жолу жөнүндө кеңири маалымат.",
  },
  {
    img: null,
    emoji: "💻",
    cat: "Программалоо",
    views: 116,
    date: "21-февраль, 2026",
    title: "Pass-the-Hash чабуулу эмне? Windows тармактарын коргоо колдонмосу",
    desc: "Бул макалада Pass-the-Hash чабуулу эмне экендиги, ал кантип иштеши жана андан кантип коргонуу мүмкүн экендиги жөнүндө толук маалымат берилет.",
  },
  {
    img: null,
    emoji: "🚀",
    cat: "Жаңылыктар",
    views: 68,
    date: "16-февраль, 2026",
    title: "Start-up Garage негиздөөчүсү менен атайын мастер-класс",
    desc: "Бул постто иш-чарадан үзүндүлөрдү көрө аласыз.",
  },
];

// ========== ABOUT — avatar photos ==========
// Реалдуу сүрөттөрдү import кылыңыз:
// import av1 from "../images/avatars/01.jpg"; ...
// Азырынча null — initials
const avatarData = [
  { img: null, name: "А" },
  { img: null, name: "Б" },
  { img: null, name: "Г" },
  { img: null, name: "Д" },
  { img: null, name: "Е" },
  { img: null, name: "Ж" },
  { img: null, name: "З" },
  { img: null, name: "И" },
  { img: null, name: "К" },
  { img: null, name: "Л" },
  { img: null, name: "М" },
  { img: null, name: "Н" },
];

// ========== VIDEO REVIEWS ==========
// src: видео файлынын жолу, мисалы: "/videos/muhammadi.mp4"
// poster: превью сүрөт
const videoReviews = [
  { src: null, poster: null, name: "Мухаммади" },
  { src: null, poster: null, name: "Бехзод" },
  { src: null, poster: null, name: "Нуриддин" },
  { src: null, poster: null, name: "Жамшид" },
  { src: null, poster: null, name: "Абдулазиз" },
];

// ========== TEXT REVIEWS ==========
// photo: null болсо инициал
const initReviews = [
  {
    photo: null,
    name: "Бекзод Насриддинов",
    role: "SMM адис",
    text: "Onup OS бүтүрүүчүлөрү ар тараптуу билимге ээ. Берилген тапшырмаларды аракет менен аткарышат. Айрыкча копирайтинг боюнча билим жана көндүм берилиши мыкты. Жеке блог жүргүзүүгө мажбурлашкандары жакшы — ушундан улам иштеме дагы эле пайдасын тийгизип жатат. Бүтүргөнүмдөн бери 1 жылдан ашты.",
  },
  {
    photo: null,
    name: "Улукбек Рахманов",
    role: "График дизайнер",
    text: "Ассалому алейкум, Onup OS жамаасына, устаттарына жана жетекчилигине чоң рахмат. Onup OS ту тандаганыма өкүнбөймүн — бул жерге тажрыйбалуу адистер чогулган. Fullstack курсунда бардык керектүү билимдерди алдым жана учурда Корея компаниясында иштеп жатам. Курсту баарына сунуштайм.",
  },
  {
    photo: null,
    name: "Акбар Ахмаджанов",
    role: "Fullstack программист",
    text: "Ассалому алейкум. «Onup OS» борборунда Front-End курсун бүтүрдүм. Учурда Back-End курсунда окуп жатам. Курстар абдан жакшы уюштурулган. Устаттар тажрыйбалуу жана жамаат ынак.",
  },
  {
    photo: null,
    name: "Хумоюн Мирзо",
    role: "Frontend программист",
    text: "Мен dotNET курсунда окуйм. «Onup OS» окутуу системасы жана мугалимдердин билими жөнүндө пикирим оң. «Onup OS» да окугусу келгендерге ийкемдиксиз келип окушун сунуштайм.",
  },
  {
    photo: null,
    name: "Рустамкулов Мухаммадали",
    role: "Программист",
    text: "SMM Pro курсунда окуйм. Курс жөнүндө пикирим чынчыл. Бул курс маркетингге керектүү бардык билимдер кубаттуу адистер тарабынан түзүлгөн. «Onup OS» да та'лимдин сапаты менен атайын алектенүүчү 20 дан ашык профессионал жыйналган «Окуу бөлүмү» бар экендиги менин алып жаткан сабактарым эскирбей жатканына ишенимди арттырат.",
  },
  {
    photo: null,
    name: "Жонибек Саломатов",
    role: "SMM адис",
    text: "Köp kuzatganman: «Onup OS» бүтүрүүчүлөрүнүн ар тараптуу билими бар. Берилген тапшырмаларды аракет менен аткарышат. Жеке блог жүргүзүүгө мажбурлашкандары жакшы. Бүтүргөнүмдөн бери 1 жылдан ашты.",
  },
];

// ========== BONUSES ==========
// img: null болсо эмодзи
const bonuses = [
  {
    img: null,
    emoji: "💰",
    title: "100 000 сомго чейинки акчалай сыйлык",
    desc: "Англис тили курсу IELTS үчүн 10 000 сомго чейин  каржыло",
  },
  {
    img: null,
    emoji: "📚",
    title: "Онлайн курсту бекер алыңыз",
    desc: "Окуу борбордо билим алууну көздөгөн жана курс үчүн алдын ала толук төлөм төлөгөндөр үчүн  ӨНҮП ӨС онлайн платформасынан 10 000 сомго чейинки “Жети тепкич” жана Тез окуу курстары бекер берилет.",
  },
  {
    img: null,
    emoji: "🎓",
    title: "Чет өлкөгө саякаттоого мүмкүнчүлүк",
    desc: "Мелдештер учурунда жылына жок дегенде бир жолу чет өлкөгө акысыз саякаттоо мүмкүнчүлүгүн беребиз.",
  },
  {
    img: null,
    emoji: "✈️",
    title:
      "Лидер VIP групаны ийгиликтүү бүтүргөндөргө Саудияга умрага сертификат.",
  },
  {
    img: null,
    emoji: "✈️",
    title: "Лидер групасын ийгиликтүү  бүтүргөндөргө Ысык-Көлгө путёвка",
  },
];

// ========== CONSULT PHOTO ==========
// Ro'yxatga olish bo'limi rasmi
// import regPhoto from "../images/registration.jpg";
const regPhoto = null; // → siz almashtirasız

// ========== DIRECTIONS ==========
// img: null болсо эмодзи
const directions = [
  { img: lider, emoji: lider, title: "ЛИДЕР", path: "/courses" },
  { img: tezOkuu, emoji: "🎨", title: "ТЕЗ ОКУУ", path: "/courses" },
  { img: jetiTepkich, emoji: "📣", title: "ЖЕТИ ТЕПКИЧ", path: "/courses" },
  { img: language, emoji: "📣", title: "АНГЛИС ТИЛИ Ж.Б ", path: "/courses" },
];
const eduTypes = [
  { img: null, emoji: "🎒", title: "ЖЕКЕЧЕ", path: "/courses" },
  { img: null, emoji: "📖", title: "ЖАЛПЫ", path: "/courses" },
  { img: null, emoji: "📖", title: "АРАЛЫКТАН", path: "/courses" },
];

// ========== BRANDS ==========
// Siz o'z kompaniyalaringizni qo'yasiz:
// import brand1 from "../images/brands/company1.png";
// Azırıncha matn ko'rinishida
const brandRows = [
  [
    "Компания 1",
    "Компания 2",
    "Компания 3",
    "Компания 4",
    "Компания 5",
    "Компания 6",
    "Компания 7",
    "Компания 8",
    "Компания 9",
    "Компания 10",
    "Компания 11",
    "Компания 12",
  ],
  [
    "Компания 13",
    "Компания 14",
    "Компания 15",
    "Компания 16",
    "Компания 17",
    "Компания 18",
    "Компания 19",
    "Компания 20",
    "Компания 21",
    "Компания 22",
    "Компания 23",
    "Компания 24",
  ],
  [
    "Компания 25",
    "Компания 26",
    "Компания 27",
    "Компания 28",
    "Компания 29",
    "Компания 30",
    "Компания 31",
    "Компания 32",
    "Компания 33",
    "Компания 34",
    "Компания 35",
    "Компания 36",
  ],
];

// ========== AWARDS ==========
// img: null болсо эмодзи
const awards = [
  {
    img: null,
    emoji: "🏆",
    year: "2024-жыл",
    title: "«Жылдын мыкты IT мектеби» номинациясынын жеңүүчүсү",
  },
  {
    img: null,
    emoji: "🥇",
    year: "2024-жыл",
    title: "«Жылдын бренди» номинациясы",
  },
  {
    img: null,
    emoji: "🎖️",
    year: "2023-жыл",
    title: "«Тахсин» сыйлыгынын лауреаты",
  },
  { img: null, emoji: "📺", year: "2023-жыл", title: "YouTube күмүш баскычы" },
  { img: null, emoji: "🏅", year: "2022-жыл", title: "«Жылдын каналы» урматы" },
];

// ========== ENROLL — course options ==========
const courseOptions = [
  "Программалоо негиздери",
  "React.JS",
  "График дизайн",
  "Python",
  "QA (Quality Assurance)",
  "SMM",
  "Дата аналитика",
  "No Code",
  "Мобилография",
  "Киберкоопсуздук",
  "Видеография",
];

// ============================================================
export default function Home() {
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState("Баары");
  const [phone1, setPhone1] = useState("");
  const [name1, setName1] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [phone2, setPhone2] = useState("");
  const [name2, setName2] = useState("");
  const [agree2, setAgree2] = useState(false);
  const [phone3, setPhone3] = useState("");
  const [name3, setName3] = useState("");
  const [agree3, setAgree3] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [locTab, setLocTab] = useState(0);
  const [enroll, setEnroll] = useState({
    course: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    agree: false,
  });
  const intervalRef = useRef(null);

  const filters = ["Баары", "Программалоо", "Дизайн", "Маркетинг"];
  const filteredCourses =
    filter === "Баары"
      ? allCourses
      : allCourses.filter((c) => c.category === filter);
  const visibleReviews = showAll ? initReviews : initReviews.slice(0, 3);
  const doubleAvatars = [...avatarData, ...avatarData, ...avatarData];
  const doubleAwards = [...awards, ...awards];

  // Slider auto
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

  // Reveal
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

  const submitConsult = (name, phone, agree, reset) => (e) => {
    e.preventDefault();
    if (!phone.trim()) return alert("Телефон номерди жазыңыз!");
    if (!agree) return alert("Макулдукту белгилеңиз!");
    alert(`Рахмат${name ? ", " + name : ""}! ${phone} номерине чалабыз.`);
    reset();
  };

  const submitEnroll = (e) => {
    e.preventDefault();
    if (!enroll.course || !enroll.phone)
      return alert("Зарыл талааларды толтуруңуз!");
    if (!enroll.agree) return alert("Макулдукту белгилеңиз!");
    alert(`Катталдыңыз! ${enroll.phone} номерине чалабыз.`);
    setEnroll({
      course: "",
      date: "",
      time: "",
      name: "",
      phone: "",
      agree: false,
    });
  };

  const toggleExpand = (i) =>
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="wrap">
          <Link to="/" className="nb-logo">
            <img src={logo} alt="Onup OS" />
            <span className="nb-logo-text">Onup OS</span>
          </Link>
          <ul className="nb-links">
            <li>
              <Link to="/courses">Курстар</Link>
            </li>
            <li>
              <a href="#about">Биз жөнүндө</a>
            </li>
            <li>
              <a href="#directions">Багыттар</a>
            </li>
            <li>
              <a href="#location">Дарек</a>
            </li>
          </ul>
          <div className="nb-right">
            <a
              href="https://t.me/onupos"
              className="nb-team"
              target="_blank"
              rel="noreferrer"
            >
              Биздин команда
            </a>
            <a href="#consult1" className="nb-cta">
              Бекер консультация
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO SLIDER ===== */}
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
                Бекер консультация алуу →
              </a>
            </div>
          ))}
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === slide ? "active" : ""}`}
                onClick={() => goSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONSULT 1 ===== */}
      <section className="consult-sec light" id="consult1">
        <div className="wrap">
          <div className="consult-box">
            <h2>Бекер консультация</h2>
            <p>
              Телефон номериңизди жазып калтырыңыз, биз сизге чалабыз жана бир
              да сурооңуз жооп алынбай калбасына аракет кылабыз
            </p>
            <form
              className="c-form"
              onSubmit={submitConsult(name1, phone1, agree1, () => {
                setName1("");
                setPhone1("");
                setAgree1(false);
              })}
            >
              <input
                className="c-form-name"
                type="text"
                placeholder="Атыңыз"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
              <div className="c-phone-row">
                <span className="c-phone-prefix">+996</span>
                <input
                  className="c-phone-input"
                  type="tel"
                  placeholder="700 000 000"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                />
              </div>
              <label className="c-agree">
                <input
                  type="checkbox"
                  checked={agree1}
                  onChange={(e) => setAgree1(e.target.checked)}
                />
                Жеке маалыматтарды <a href="#oferta">иштетүүгө</a> макулмун
              </label>
              <button type="submit" className="btn-green">
                Суроо жөнөтүү
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== COURSES ===== */}
      <section className="courses-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Курстар</h2>
          <div className="courses-filter">
            {filters.map((f) => (
              <button
                key={f}
                className={`cf-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="courses-grid">
            {filteredCourses.map((c, i) => (
              <Link to="/courses" className="course-card" key={i}>
                <div className="course-thumb">
                  <div className="course-icon">{c.icon}</div>

                  <div className="course-tags">
                    <span className={`tag ${tagMap[c.category]}`}>
                      {c.category}
                    </span>
                    <span className={`tag ${tagMap[c.type]}`}>{c.type}</span>
                  </div>
                </div>
                <div className="course-body">
                  <div className="course-name">{c.name}</div>
                  <div className="course-dur">{c.duration}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="blog-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Блог</h2>
          <div className="blog-grid">
            {blogs.map((b, i) => (
              <a href="#" className="blog-card" key={i}>
                <div className="blog-img">
                  {b.img ? (
                    <img src={b.img} alt={b.title} />
                  ) : (
                    <span>{b.emoji}</span>
                  )}
                </div>
                <div className="blog-body">
                  <div className="blog-cat-row">
                    <span className="blog-cat">{b.cat}</span>
                    <span className="blog-views">👁 {b.views}</span>
                  </div>
                  <div className="blog-title">{b.title}</div>
                  <p className="blog-desc">{b.desc}</p>
                  <div className="blog-date">{b.date}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about-sec reveal" id="about">
        <div className="wrap">
          <h2 className="about-title">«Onup OS» — бул</h2>

          <div className="about-cards">
            <div className="about-card">
              <div className="about-icon">
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
              </div>
              <p>
                Мээни программалоо жана дисциплина аркылуу адамды жаңы деңгээлге
                чыгарган борбор.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">
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
              </div>
              <p>
                Лидерлик сапаттарды өнүктүрүү менен коомдо өз ордун табууга жол
                көрсөтөт.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
                  <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.93 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <p>
                2500дөн ашык студентти жана 100дөн ашык команданы бириктирген
                инновация борбору.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
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
              <div className="stat-num">80% - 85%</div>
              <div className="stat-lbl">ЖОЖдорго кабыл алынган</div>
              <div className="stat-img-wrap">
                <img src={briefcaseImg} alt="briefcase" className="stat-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY ===== */}
      <section className="why-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Эмне үчүн «Onup OS» да окуу керек?</h2>
          <div className="why-grid">
            {[
              {
                icon: "🖥️",
                title: "Бекер коворкинг",
                desc: "24/7 форматында иштеген бекер коворкинг жана wifi.",
              },
              {
                icon: "🎓",
                title: "Сапаттуу билим",
                desc: "Дайыма жаңыланып турган курстар жана чоң тажрыйбага ээ устаттар.",
              },
              {
                icon: "🏆",
                title: "Үзгүлтүксүз мелдештер",
                desc: "Китеп сынактар, мелдештер.",
              },
              {
                icon: "🎙️",
                title: "Бекер мастер-класстар",
                desc: "Тармак адистери менен дайыма өткөрүлүүчү бекер мастер-класстар.",
              },
              {
                icon: "💼",
                title: "Жумуш сунуштоо кепилдиги *",
                desc: "«Onup OS» интенсив курстарды ийгиликтүү бүтүргөн окуучуларга жумуш сунуштоо кепилдигин берет. *",
              },
              {
                icon: "📜",
                title: "Сертификат",
                desc: "Курсту ийгиликтүү аяктаган окуучулар «Onup OS» дипломун жана сертификатын алат.",
              },
            ].map((r, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">{r.icon}</div>
                <div className="why-title">{r.title}</div>
                <p className="why-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEO REVIEWS ===== */}
      <section className="vidrev-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Окуучулардын пикирлери</h2>
          <div className="vidrev-grid">
            {videoReviews.map((v, i) => (
              <div className="vidrev-card" key={i}>
                {v.src ? (
                  <>
                    <video
                      src={v.src}
                      poster={v.poster || undefined}
                      controls
                      preload="none"
                    />
                    <div className="vidrev-overlay">
                      <span>{v.name}</span>
                    </div>
                  </>
                ) : (
                  <div className="vidrev-placeholder">
                    <div className="vidrev-play">▶</div>
                    <span className="vidrev-name">{v.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEXT REVIEWS ===== */}
      <section className="txtrev-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Окуучулардын пикирлери</h2>
          <div className="txtrev-list">
            {visibleReviews.map((r, i) => (
              <div className="txtrev-item" key={i}>
                <div className="tr-avatar">
                  {r.photo ? <img src={r.photo} alt={r.name} /> : r.name[0]}
                </div>
                <div className="tr-body">
                  <p className={`tr-text ${expanded[i] ? "" : "collapsed"}`}>
                    {r.text}
                  </p>
                  <button className="tr-more" onClick={() => toggleExpand(i)}>
                    {expanded[i] ? "Жабуу ▲" : "Дагы ▼"}
                  </button>
                  <div className="tr-footer">
                    <div className="tr-pic-fallback">{r.name[0]}</div>
                    <div>
                      <div className="tr-info-name">{r.name}</div>
                      <div className="tr-info-role">{r.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {initReviews.length > 3 && (
            <div className="toggle-wrap">
              <button
                className="btn-outline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll
                  ? "Жабуу ▲"
                  : `Дагы көрүү (${initReviews.length - 3}) ▼`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== BONUSES ===== */}
      <section className="bonus-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Студенттер үчүн бонустар жана сыйлыктар</h2>
          <div className="bonus-grid">
            {bonuses.map((b, i) => (
              <div className="bonus-card" key={i}>
                <div className="bonus-img">
                  {b.img ? (
                    <img src={b.img} alt={b.title} />
                  ) : (
                    <span>{b.emoji}</span>
                  )}
                </div>
                <div className="bonus-title">{b.title}</div>
                <p className="bonus-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONSULT with PHOTO ===== */}
      <section className="consult-photo-sec reveal">
        <div className="wrap">
          <div className="consult-photo-inner">
            <div className="consult-photo-img">
              {regPhoto ? (
                <img src={regPhoto} alt="Каттоо бөлүмү" />
              ) : (
                <div className="img-ph">🏫</div>
              )}
            </div>
            <div className="consult-box">
              <h2>Бекер консультация</h2>
              <p>
                Телефон номериңизди жазып калтырыңыз, биз сизге чалабыз жана бир
                да сурооңуз жооп алынбай калбасына аракет кылабыз
              </p>
              <form
                className="c-form"
                onSubmit={submitConsult(name2, phone2, agree2, () => {
                  setName2("");
                  setPhone2("");
                  setAgree2(false);
                })}
              >
                <input
                  className="c-form-name"
                  type="text"
                  placeholder="Атыңыз"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                />
                <div className="c-phone-row">
                  <span className="c-phone-prefix">+996</span>
                  <input
                    className="c-phone-input"
                    type="tel"
                    placeholder="700 000 000"
                    value={phone2}
                    onChange={(e) => setPhone2(e.target.value)}
                  />
                </div>
                <label className="c-agree">
                  <input
                    type="checkbox"
                    checked={agree2}
                    onChange={(e) => setAgree2(e.target.checked)}
                  />
                  Жеке маалыматтарды <a href="#oferta">иштетүүгө</a> макулмун
                </label>
                <button type="submit" className="btn-green">
                  Суроо жөнөтүү
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIRECTIONS ===== */}
      <section className="dir-sec reveal" id="directions">
        <div className="wrap">
          <h2>Биздин багыттар</h2>
          <div className="dir-grid">
            {directions.map((d, i) => (
              <Link to={d.path} className="dir-card" key={i}>
                <div className="dir-img">
                  {d.img ? (
                    <img src={d.img} alt={d.title} />
                  ) : (
                    <span>{d.emoji}</span>
                  )}
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
                  {e.img ? (
                    <img src={e.img} alt={e.title} />
                  ) : (
                    <span>{e.emoji}</span>
                  )}
                </div>
                <h3>{e.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRANDS ===== */}
      <section className="brands-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Бүтүрүүчүлөрүбүздүн иш орундары</h2>
        </div>
        {brandRows.map((row, ri) => (
          <div className="brands-row" key={ri}>
            <div className={`brands-track ${ri % 2 === 1 ? "rev" : ""}`}>
              {[...row, ...row].map((b, bi) => (
                <div className="brand-item" key={bi}>
                  {/* b.img bolso: <img src={b.img} alt={b.name} /> */}
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ===== CONSULT 2 (dark) ===== */}
      <section className="consult-sec dark reveal" id="consult2">
        <div className="wrap">
          <div className="consult-box">
            <h2>Бекер консультация</h2>
            <p>
              Телефон номериңизди жазып калтырыңыз, биз сизге чалабыз жана бир
              да сурооңуз жооп алынбай калбасына аракет кылабыз
            </p>
            <form
              className="c-form"
              onSubmit={submitConsult(name3, phone3, agree3, () => {
                setName3("");
                setPhone3("");
                setAgree3(false);
              })}
            >
              <input
                className="c-form-name"
                type="text"
                placeholder="Атыңыз"
                value={name3}
                onChange={(e) => setName3(e.target.value)}
              />
              <div className="c-phone-row">
                <span className="c-phone-prefix">+996</span>
                <input
                  className="c-phone-input"
                  type="tel"
                  placeholder="700 000 000"
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                />
              </div>
              <label className="c-agree">
                <input
                  type="checkbox"
                  checked={agree3}
                  onChange={(e) => setAgree3(e.target.checked)}
                />
                Жеке маалыматтарды <a href="#oferta">иштетүүгө</a> макулмун
              </label>
              <button type="submit" className="btn-green">
                Суроо жөнөтүү
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== AWARDS ===== */}
      <section className="awards-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Брендтин жетишкендиктери</h2>
        </div>
        <div className="awards-track-wrap">
          <div className="awards-track">
            {doubleAwards.map((a, i) => (
              <div className="award-card" key={i}>
                <div className="award-img">
                  {a.img ? (
                    <img src={a.img} alt={a.title} />
                  ) : (
                    <span>{a.emoji}</span>
                  )}
                </div>
                <div className="award-body">
                  <div className="award-year">{a.year}</div>
                  <div className="award-title">{a.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENROLL FORM ===== */}
      <section className="enroll-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Жакынкы ачылуучу топторго жазылыңыз</h2>
          <div className="enroll-inner">
            <p>
              Ар бир курс башталаардан мурун тааныштыруу сабак өткөрүлөт. Анда
              сиз курс боюнча бардык маалыматка ээ болосуз, устат менен
              таанышасыз жана курска жазыла аласыз.
            </p>
            <form className="enroll-form" onSubmit={submitEnroll}>
              <select
                value={enroll.course}
                onChange={(e) =>
                  setEnroll({ ...enroll, course: e.target.value })
                }
              >
                <option value="">Курс тандаңыз</option>
                {courseOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select value="" readOnly>
                <option value="">Филиалды тандаңыз</option>
                <option value="bishkek">Бишкек</option>
              </select>
              <div className="ef-row">
                <input
                  type="date"
                  value={enroll.date}
                  onChange={(e) =>
                    setEnroll({ ...enroll, date: e.target.value })
                  }
                  placeholder="Топ башталуучу күн"
                />
                <input
                  type="time"
                  value={enroll.time}
                  onChange={(e) =>
                    setEnroll({ ...enroll, time: e.target.value })
                  }
                  placeholder="Топ башталуучу убакыт"
                />
              </div>
              <h4>Катталуу үчүн форманы толтуруңуз</h4>
              <input
                className="c-form-name"
                type="text"
                placeholder="Атыңыз"
                value={enroll.name}
                onChange={(e) => setEnroll({ ...enroll, name: e.target.value })}
                style={{
                  border: "1.5px solid var(--border)",
                  borderRadius: 8,
                  padding: "11px 14px",
                  fontSize: ".92rem",
                  fontFamily: "Inter,sans-serif",
                  outline: "none",
                }}
              />
              <div className="c-phone-row">
                <span className="c-phone-prefix">+996</span>
                <input
                  className="c-phone-input"
                  type="tel"
                  placeholder="700 000 000"
                  value={enroll.phone}
                  onChange={(e) =>
                    setEnroll({ ...enroll, phone: e.target.value })
                  }
                />
              </div>
              <label
                className="c-agree"
                style={{ fontSize: ".8rem", color: "var(--muted)" }}
              >
                <input
                  type="checkbox"
                  checked={enroll.agree}
                  onChange={(e) =>
                    setEnroll({ ...enroll, agree: e.target.checked })
                  }
                  style={{ width: 14, height: 14 }}
                />
                Жеке маалыматтарды{" "}
                <a href="#oferta" style={{ color: "var(--green)" }}>
                  иштетүүгө
                </a>{" "}
                макулмун
              </label>
              <button type="submit" className="btn-green">
                Топко жазылуу
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section className="loc-sec reveal" id="location">
        <div className="wrap">
          <div className="loc-top">
            <h2>Биздин даректер</h2>
            <div className="loc-tab-wrap">
              <button
                className={`loc-tab ${locTab === 0 ? "active" : ""}`}
                onClick={() => setLocTab(0)}
              >
                Кадамжай
              </button>
            </div>
          </div>
          <div className="loc-grid">
            <div className="loc-left">
              {/* loc-photo: сиз өз сүрөтүңүздү кошосуз */}
              {/* <div className="loc-photo"><img src={locPhoto} alt="Борбор" /></div> */}
              <div className="loc-photo">🏢</div>
              <div className="loc-rows">
                <div className="loc-row">
                  <span className="loc-row-icon">📍</span>
                  <div>
                    <strong>Дарек</strong>
                    <p>Кадамжай району Халмион айылы</p>
                    <p className="loc-hint">Чайхана ИНЖИР дун жанында</p>
                  </div>
                </div>
                <div className="loc-row">
                  <span className="loc-row-icon">🕐</span>
                  <div>
                    <strong>Иш убактысы</strong>
                    <p>09:00 – 16:00</p>
                  </div>
                </div>
                <div className="loc-row">
                  <span className="loc-row-icon">📞</span>
                  <div>
                    <strong>Телефон</strong>
                    <a href="tel:+996700000000">+996 773 101 069</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-box">
              <iframe
                title="Onup OS (Өнүп өс)"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d191.132!2d71.632478!3d40.192080!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb950012257a25%3A0x90b8aa1e8227dddb!2z0qvQvdKv0L8g06nRgdGC!5e0!3m2!1suz!2s!4v1710000000000!5m2!1suz!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              <div className="footer-logo-row">
                <img src={logo} alt="Onup OS" />
                <span>Onup OS</span>
              </div>
              <a href="tel:+996700000000" className="footer-phone-link">
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
              © «Onup OS», 2025 — Бардык укуктар корголгон.
            </span>
            <div className="footer-docs">
              {/* <a href="#"><img src={confirmImg} alt="Тастыктама" /> Тастыктама</a> */}
              <a href="#">📄 Тастыктама</a>
              <a href="#">🏛 IT Park резиденти</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
