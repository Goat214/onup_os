import { useState } from "react";
import { Link } from "react-router-dom";
import lider from "../images/lider1.webp";
import tezOkuu from "../images/tezokuu.webp";
import jetiTepkich from "../images/jetitepkich.jpg";
import language from "../images/eanglish.jpg";
import rus from "../images/rus.jpg";
import programer from "../images/programer.png";

const allCourses = [
  {
    icon: lider,
    name: "Лидерлик Оффлайн, Онлайн",
    duration: "40 күн • 1.5 саат",
    category: "Лидердик",
    type: "Оффлайн",
    path: "/courses/lider", // ✅ Har bir kursga o'z yo'li
  },
  {
    icon: tezOkuu,
    name: "Тез окуу Оффлайн, Онлайн",
    duration: "1 ай • 12 күн • 1.5 саат",
    category: "Тез окуу",
    type: "Оффлайн",
    path: "/courses/tez-okuu",
  },
  {
    icon: jetiTepkich,
    name: "Жети тепкич Оффлайн, Онлайн",
    duration: "1 ай • 6 күн • 2 саат",
    category: "Өнүгүү",
    type: "Оффлайн",
    path: "/courses/jeti-tepkich",
  },
  {
    icon: language,
    name: "Англис тили",
    duration: "1 ай • 8 күн • 2 саат",
    category: "Тилдер",
    type: "Стандарт",
    path: "/courses/english",
  },
  {
    icon: rus,
    name: "Орус тили",
    duration: "1 ай • 8 күн • 2 саат",
    category: "Тилдер",
    type: "Стандарт",
    path: "/courses/russian",
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

const filters = ["Баары", "Лидер", "Тез окуу", "Тилдер", "IT"];

export default function CoursesSection() {
  const [filter, setFilter] = useState("Баары");

  const filteredCourses =
    filter === "Баары"
      ? allCourses
      : allCourses.filter((c) => c.category === filter);

  return (
    <section id="courses" className="courses-sec reveal">
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
            <Link
              to={c.path} // ✅ Endi har bir kurs o'z sahifasiga o'tadi
              className="course-card"
              key={i}
            >
              <div className="course-thumb">
                <div className="course-icon">
                  <img
                    src={c.icon}
                    alt={c.name}
                    className={c.name === "Орус тили" ? "rus-img" : ""}
                  />
                </div>
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
  );
}