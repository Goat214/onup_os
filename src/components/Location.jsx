import { useState } from "react";
import "../css/location.css";

const branches = [
  {
    id: 0,
    name: "Кадамжай",
    city: "Кадамжай",
    photo: "../src/images/centr.jpg",
    address: "Кадамжай району Халмион айылы",
    hint: "Чайхана ИНЖИР дун жанында",
    hours: "09:00 – 16:00",
    phone: "+996 773 101 069",
    phoneRaw: "+996773101069",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d191.132!2d71.632478!3d40.192080!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb950012257a25%3A0x90b8aa1e8227dddb!2z0qvQvdKv0L8g06nRgdGC!5e0!3m2!1suz!2s!4v1710000000000!5m2!1suz!2s",
  },
];

export default function LocationSection() {
  const [selected, setSelected] = useState(0);
  const branch = branches[selected];

  return (
    <section className="loc-sec reveal" id="contact">
      <div className="loc-wrap">

        {/* Header */}
        <div className="loc-top">
          <h2>Биздин даректер</h2>
          <div className="loc-dropdown-wrap">
            <span className="loc-dropdown-label">Филиалды тандаңыз</span>
            <select
              className="loc-dropdown"
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
            >
              {branches.map((b, i) => (
                <option key={i} value={i}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="loc-grid">

          {/* Left info card */}
          <div className="loc-card">
            <div className="loc-card-city">
              <h3>{branch.city}</h3>
            </div>

            {branch.photo ? (
              <img
                className="loc-photo"
                src={branch.photo}
                alt={branch.city}
              />
            ) : (
              <div className="loc-photo-placeholder">🏫</div>
            )}

            <div className="loc-info">
              <div className="loc-info-row">
                <span className="loc-info-label">Дарек</span>
                <span className="loc-info-value">{branch.address}</span>
                {branch.hint && (
                  <span className="loc-info-hint">{branch.hint}</span>
                )}
              </div>

              <div className="loc-divider" />

              <div className="loc-info-row">
                <span className="loc-info-label">Mo'ljal</span>
                <span className="loc-info-value">{branch.hint}</span>
              </div>

              <div className="loc-divider" />

              <div className="loc-info-row">
                <span className="loc-info-label">Иш убактысы</span>
                <span className="loc-info-value">{branch.hours}</span>
              </div>

              <div className="loc-divider" />

              <div className="loc-info-row">
                <span className="loc-info-label">Телефон</span>
                <a className="loc-info-link" href={`tel:${branch.phoneRaw}`}>
                  {branch.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="loc-map">
            <iframe
              title={`Onup OS — ${branch.name}`}
              src={branch.mapSrc}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}