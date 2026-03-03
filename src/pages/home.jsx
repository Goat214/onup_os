import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import Navbar from "../components/navbar";
import CoursesSection from "../components/CoursesSection";
import BlogSection from "../components/BlogSection";
import Cunsult from "../components/Cunsult";
import "../css/navbar.css";
import "../css/courses.css";
import "../css/blogSection.css";
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
import book from "../images/book.png";
import { FaCrown, FaBookOpen, FaLayerGroup, FaLanguage, FaLaptopCode } from "react-icons/fa";
import capImg from "../images/student-cap.webp";
import briefcaseImg from "../images/student-briefcase.webp";
import lider from "../images/lider.png";
import tezOkuu from "../images/tez_okuu.png";
import jetiTepkich from "../images/jeti_tepkich.png";
import language from "../images/language.png";

const slides = [
  { title: "ӨНҮП ӨС – мастер-класстар жана сынактар!", desc: "«ӨНҮП ӨС» окуу борборунда ай сайын өтүүчү мастер-класстарга жана сынактарга катышуу менен практикалык жана маанилүү көндүмдөргө ээ болуп өнүп өсүңүз!" },
  { title: "40 күндө өнүгүү мүмкүнчүлүгү!", desc: "40 күндүн ичинде таалим-тарбия, тартип, илим алуу жана аны билимге айландыруу жөндөмдөрүн калыптандырыңыз." },
  { title: "10 000+ бүтүрүүчүлөрдүн катарына кошулуңуз!", desc: "Бүгүнкү күнгө чейин 5 жыл аралыгында «ӨНҮП ӨС» окуу борборунан 10 000ден ашык ийгиликтүү бүтүрүүчүлөр окутулду. Алардын 70–80 пайызы өлкөбүздөгү алдыңкы ЖОЖдорго бюджетке жана чет мамлекеттерде окуп жатышат." },
  { title: "Келечектеги кесибиңиздин мыкты ээси болуңуз!", desc: "Мыкты адис болуу үчүн төмөнкү көндүмдөрдү калыптандырыңыз: 1) Миссия 2) Максат 3) Эрк 4) Тартип 5) Мамиле." },
];

const photos = [
  { src: one, name: "Айбек Усупов" }, { src: two, name: "Гүлнара Асанова" },
  { src: four, name: "Мирлан Беков" }, { src: five, name: "Зарина Токтосунова" },
  { src: six, name: "Нурбек Жолдошев" }, { src: seven, name: "Аида Маматова" },
  { src: eight, name: "" }, { src: nine, name: "" }, { src: ten, name: "" },
  { src: eleven, name: "" }, { src: twelve, name: "" },
];

const bonuses = [
  { emoji: "💰", title: "100 000 сомго чейинки акчалай сыйлык", desc: "Англис тили курсу IELTS үчүн 10 000 сомго чейин каржылоо" },
  { emoji: "📚", title: "Онлайн курсту бекер алыңыз", desc: "Окуу борбордо билим алууну көздөгөн жана курс үчүн алдын ала толук төлөм төлөгөндөр үчүн ӨНҮП ӨС онлайн платформасынан 10 000 сомго чейинки курстар бекер берилет." },
  { emoji: "🎓", title: "Чет өлкөгө саякаттоого мүмкүнчүлүк", desc: "Мелдештер учурунда жылына жок дегенде бир жолу чет өлкөгө акысыз саякаттоо мүмкүнчүлүгүн беребиз." },
  { emoji: "✈️", title: "Лидер VIP групасын бүтүргөндөргө Умра сертификаты", desc: "Лидер VIP групаны ийгиликтүү бүтүргөндөргө Саудияга умрага сертификат." },
  { emoji: "🏖️", title: "Ысык-Көлгө путёвка", desc: "Лидер групасын ийгиликтүү бүтүргөндөргө Ысык-Көлгө путёвка." },
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
  "Лидерлик (Оффлайн)", "Лидерлик (Онлайн)", "Тез окуу (Оффлайн)",
  "Тез окуу (Онлайн)", "Жети тепкич (Оффлайн)", "Жети тепкич (Онлайн)",
  "Англис тили", "Орус тили", "IT көндүмдөрү (Оффлайн)",
];

const whyCards = [
  { icon: book, isImg: true, title: "Бекер коворкинг", desc: "24/7 форматында иштеген бекер коворкинг жана wifi." },
  { icon: "🎓", isImg: false, title: "Сапаттуу билим", desc: "Дайыма жаңыланып турган курстар жана чоң тажрыйбага ээ устаттар." },
  { icon: "🏆", isImg: false, title: "Үзгүлтүксүз мелдештер", desc: "Китеп сынактар, мелдештер." },
  { icon: "🎙️", isImg: false, title: "Бекер мастер-класстар", desc: "Тармак адистери менен дайыма өткөрүлүүчү бекер мастер-класстар." },
  { icon: "💼", isImg: false, title: "Жумуш сунуштоо кепилдиги *", desc: "«Onup OS» интенсив курстарды ийгиликтүү бүтүргөн окуучуларга жумуш сунуштоо кепилдигин берет. *" },
  { icon: "📜", isImg: false, title: "Сертификат", desc: "Курсту ийгиликтүү аяктаган окуучулар «ӨНҮП ӨС» дипломун жана сертификатын алат." },
  { icon: "🗺️", isImg: false, title: "Саякатто", desc: "Курсту ийгиликтүү аяктаган окуучулар музейлерге, библотекаларга тарыхый жана эс алуу жайларына 'ӨНҮП ӨС' окуу борборунун генеральдык директорун буйругу менен саякаттоо мүмкүнчүлүгүнө ээ болушат." },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [locTab, setLocTab] = useState(0);
  const [name2, setName2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [agree2, setAgree2] = useState(false);
  const [name3, setName3] = useState("");
  const [phone3, setPhone3] = useState("");
  const [agree3, setAgree3] = useState(false);
  const [enroll, setEnroll] = useState({ course: "", branch: "", date: "", time: "", name: "", phone: "", agree: false });
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goSlide = (i) => {
    clearInterval(intervalRef.current);
    setSlide(i);
    intervalRef.current = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4500);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ✅ FIX: submitConsult — event birinchi parametr sifatida keladi
  const submitConsult = (e, name, phone, agree, reset) => {
    e.preventDefault();
    if (!phone.trim()) return alert("Телефон номерди жазыңыз!");
    if (!agree) return alert("Макулдукту белгилеңиз!");
    alert(`Рахмат${name ? ", " + name : ""}! ${phone} номерине чалабыз.`);
    reset();
  };

  const submitEnroll = (e) => {
    e.preventDefault();
    if (!enroll.course || !enroll.phone) return alert("Зарыл талааларды толтуруңуз!");
    if (!enroll.agree) return alert("Макулдукту белгилеңиз!");
    alert(`Катталдыңыз! ${enroll.phone} номерине чалабыз.`);
    setEnroll({ course: "", branch: "", date: "", time: "", name: "", phone: "", agree: false });
  };

  return (
    <div>
      <Navbar />

      <section className="hero">
        <div className="wrap">
          {slides.map((s, i) => (
            <div key={i} className={`hero-slide ${i === slide ? "active" : ""}`}>
              <h1>{s.title}</h1>
              <p>{s.desc}</p>
              <a href="#consult1" className="btn-hero">консультация алуу →</a>
            </div>
          ))}
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button key={i} className={`hero-dot ${i === slide ? "active" : ""}`} onClick={() => goSlide(i)} />
            ))}
          </div>
        </div>
      </section>

      <Cunsult />
      <CoursesSection />
      <BlogSection />

      <section className="about-sec reveal" id="about">
        <div className="wrap">
          <h2 className="about-title">«Onup OS» — бул</h2>
          <div className="about-cards">
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3a3 3 0 0 0-3 3v1a2 2 0 0 0-2 2 2 2 0 0 0 2 2v1a3 3 0 0 0 3 3" />
                  <path d="M15 3a3 3 0 0 1 3 3v1a2 2 0 0 1 2 2 2 2 0 0 1-2 2v1a3 3 0 0 1-3 3" />
                  <path d="M9 15a3 3 0 0 0 6 0" />
                </svg>
              </div>
              <p>Мээни программалоо жана дисциплина аркылуу адамды жаңы деңгээлге чыгарган борбор.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-4 4-8 4-8z" />
                  <path d="M12 14a2 2 0 0 0 2-2" />
                </svg>
              </div>
              <p>Лидерлик сапаттарды өнүктүрүү менен коомдо өз ордун табууга жол көрсөтөт.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
                  <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.93 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <p>10 000дөн ашык студентти жана 100дөн ашык команданы бириктирген инновация борбору.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-sec reveal">
        <div className="wrap">
          <h2 className="stats-title">«Onup OS» натыйжасы сандарда</h2>
          <p className="stats-sub">2021-жылдын 10-июнь айынан 2026-жылдын февраль айына чейинки статистика</p>
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-num">10,000+</div>
              <div className="stat-lbl">Ушул убакка чейин бүтүргөн студенттер</div>
              <div className="stat-img-wrap"><img src={capImg} alt="graduation cap" className="stat-img" /></div>
            </div>
            <div className="stat-card">
              <div className="stat-num">80% - 85%</div>
              <div className="stat-lbl two">ЖОЖдорго кабыл алынган</div>
              <div className="stat-img-wrap"><img src={briefcaseImg} alt="briefcase" className="stat-img" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Эмне үчүн «Onup OS» да окуу керек?</h2>
          <div className="why-grid">
            {whyCards.map((r, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">
                  {r.isImg
                    ? <img src={r.icon} alt={r.title} style={{ width: "400px", height: "100px", objectFit: "cover" }} />
                    : <span>{r.icon}</span>
                  }
                </div>
                <div className="why-title">{r.title}</div>
                <p className="why-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Ата-энелер жана окуучулардын пикирлери</h2>
          <div className="gallery-track-wrapper">
            <div className="gallery-track">
              {[...photos, ...photos].map((photo, i) => (
                <div className="gallery-card" key={i}>
                  <img src={photo.src} alt={photo.name || ""} loading="lazy" />
                  {photo.name && <div className="gallery-overlay"><span>{photo.name}</span></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bonus-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Бүтүрүүчүлөр үчүн бонустар жана сыйлыктар</h2>
          <div className="bonus-grid">
            {bonuses.map((b, i) => (
              <div className="bonus-card" key={i}>
                <div className="bonus-img"><span>{b.emoji}</span></div>
                <div className="bonus-title">{b.title}</div>
                <p className="bonus-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ FIX: onSubmit — arrow function менен event берилет */}
      <section className="consult-photo-sec reveal">
        <div className="wrap">
          <div className="consult-photo-inner">
            <div className="consult-photo-img"><div className="img-ph">🏫</div></div>
            <div className="consult-box">
              <h2>Бекер консультация</h2>
              <p>Телефон номериңизди жазып калтырыңыз, биз сизге чалабыз жана бир да сурооңуз жооп алынбай калбасына аракет кылабыз</p>
              <form className="c-form" onSubmit={(e) => submitConsult(e, name2, phone2, agree2, () => { setName2(""); setPhone2(""); setAgree2(false); })}>
                <input className="c-form-name" type="text" placeholder="Атыңыз" value={name2} onChange={(e) => setName2(e.target.value)} />
                <div className="c-phone-row">
                  <span className="c-phone-prefix">+996</span>
                  <input className="c-phone-input" type="tel" placeholder="700 000 000" value={phone2} onChange={(e) => setPhone2(e.target.value)} />
                </div>
                <label className="c-agree">
                  <input type="checkbox" checked={agree2} onChange={(e) => setAgree2(e.target.checked)} />
                  Жеке маалыматтарды <a href="#oferta">иштетүүгө</a> макулмун
                </label>
                <button type="submit" className="btn-green">Суроо жөнөтүү</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="dir-sec reveal" id="directions">
        <div className="wrap">
          <h2>Биздин багыттар</h2>
          <div className="dir-grid">
            {directions.map((d, i) => (
              <Link to={d.path} className="dir-card" key={i}>
                <div className="dir-img"><img src={d.img} alt={d.title} /></div>
                <h3>{d.title}</h3>
              </Link>
            ))}
          </div>
          <p className="edu-title">Окутуу түрлөрү</p>
          <div className="edu-grid">
            {eduTypes.map((e, i) => (
              <Link to={e.path} className="edu-card" key={i}>
                <div className="edu-img"><span>{e.emoji}</span></div>
                <h3>{e.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ FIX: onSubmit — arrow function менен event берилет */}
      <section className="consult-sec dark reveal" id="consult2">
        <div className="wrap">
          <div className="consult-box">
            <h2>Бекер консультация</h2>
            <p>Телефон номериңизди жазып калтырыңыз, биз сизге чалабыз жана бир да сурооңуз жооп алынбай калбасына аракет кылабыз</p>
            <form className="c-form" onSubmit={(e) => submitConsult(e, name3, phone3, agree3, () => { setName3(""); setPhone3(""); setAgree3(false); })}>
              <input className="c-form-name" type="text" placeholder="Атыңыз" value={name3} onChange={(e) => setName3(e.target.value)} />
              <div className="c-phone-row">
                <span className="c-phone-prefix">+996</span>
                <input className="c-phone-input" type="tel" placeholder="700 000 000" value={phone3} onChange={(e) => setPhone3(e.target.value)} />
              </div>
              <label className="c-agree">
                <input type="checkbox" checked={agree3} onChange={(e) => setAgree3(e.target.checked)} />
                Жеке маалыматтарды <a href="#oferta">иштетүүгө</a> макулмун
              </label>
              <button type="submit" className="btn-green">Суроо жөнөтүү</button>
            </form>
          </div>
        </div>
      </section>

      <section className="enroll-sec reveal">
        <div className="wrap">
          <h2 className="sec-title">Жакынкы ачылуучу топторго жазылыңыз</h2>
          <div className="enroll-inner">
            <p>Ар бир курс башталаардан мурун тааныштыруу сабак өткөрүлөт. Анда сиз курс боюнча бардык маалыматка ээ болосуз, устат менен таанышасыз жана курска жазыла аласыз.</p>
            <form className="enroll-form" onSubmit={submitEnroll}>
              {/* ✅ FIX: controlled select */}
              <select value={enroll.course} onChange={(e) => setEnroll({ ...enroll, course: e.target.value })}>
                <option value="">Курс тандаңыз</option>
                {courseOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {/* ✅ FIX: controlled select */}
              <select value={enroll.branch} onChange={(e) => setEnroll({ ...enroll, branch: e.target.value })}>
                <option value="">Филиалды тандаңыз</option>
                <option value="kadamjai">Кадамжай</option>
              </select>
              <div className="ef-row">
                <input type="date" value={enroll.date} onChange={(e) => setEnroll({ ...enroll, date: e.target.value })} />
                <input type="time" value={enroll.time} onChange={(e) => setEnroll({ ...enroll, time: e.target.value })} />
              </div>
              <h4>Катталуу үчүн форманы толтуруңуз</h4>
              <input type="text" placeholder="Атыңыз" value={enroll.name} onChange={(e) => setEnroll({ ...enroll, name: e.target.value })}
                style={{ border: "1.5px solid var(--border)", borderRadius: 8, padding: "11px 14px", fontSize: ".92rem", fontFamily: "Inter,sans-serif", outline: "none" }} />
              <div className="c-phone-row">
                <span className="c-phone-prefix">+996</span>
                <input className="c-phone-input" type="tel" placeholder="700 000 000" value={enroll.phone} onChange={(e) => setEnroll({ ...enroll, phone: e.target.value })} />
              </div>
              <label className="c-agree" style={{ fontSize: ".8rem", color: "var(--muted)" }}>
                <input type="checkbox" checked={enroll.agree} onChange={(e) => setEnroll({ ...enroll, agree: e.target.checked })} style={{ width: 14, height: 14 }} />
                Жеке маалыматтарды <a href="#oferta" style={{ color: "var(--green)" }}>иштетүүгө</a> макулмун
              </label>
              <button type="submit" className="btn-green">Топко жазылуу</button>
            </form>
          </div>
        </div>
      </section>

      <section className="loc-sec reveal" id="location">
        <div className="wrap">
          <div className="loc-top">
            <h2>Биздин даректер</h2>
            <div className="loc-tab-wrap">
              <button className={`loc-tab ${locTab === 0 ? "active" : ""}`} onClick={() => setLocTab(0)}>Кадамжай</button>
            </div>
          </div>
          <div className="loc-grid">
            <div className="loc-left">
              <div className="loc-photo" />
              <div className="loc-rows">
                <div className="loc-row">
                  <span className="loc-row-icon">📍</span>
                  <div><strong>Дарек</strong><p>Кадамжай району Халмион айылы</p><p className="loc-hint">Чайхана ИНЖИР дун жанында</p></div>
                </div>
                <div className="loc-row">
                  <span className="loc-row-icon">🕐</span>
                  <div><strong>Иш убактысы</strong><p>09:00 – 16:00</p></div>
                </div>
                <div className="loc-row">
                  <span className="loc-row-icon">📞</span>
                  <div><strong>Телефон</strong><a href="tel:+996773101069">+996 773 101 069</a></div>
                </div>
              </div>
            </div>
            <div className="map-box">
              <iframe title="Onup OS (Өнүп өс)"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d191.132!2d71.632478!3d40.192080!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb950012257a25%3A0x90b8aa1e8227dddb!2z0qvQvdKv0L8g06nRgdGC!5e0!3m2!1suz!2s!4v1710000000000!5m2!1suz!2s"
                width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              <div className="footer-logo-row"><span>Onup OS</span></div>
              <a href="tel:+996773101069" className="footer-phone-link">+996 773 101 069</a>
              <p className="footer-addr">Кадамжай району Халмион айылы</p>
            </div>
            <div className="footer-links-col">
              <Link to="/courses">Курстар</Link>
              <a href="#directions">Багыттар</a>
              <a href="#" target="_blank" rel="noreferrer">Онлайн платформа</a>
              <a href="#oferta">Жалпы оферта</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© «Onup OS», 2026 — Бардык укуктар корголгон.</span>
            <div className="footer-docs"><a href="#">📄 Тастыктама</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}