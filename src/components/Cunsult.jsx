import { useState } from "react";
import center from "../images/centr.jpg";

const BOT_TOKEN = "8304491289:AAEhClRt_023T0uBxro_ni2vOMDx7lHkT6A";
const CHAT_ID   = "6518481355";

async function sendToTelegram(name, phone, source = "") {
  const message = `
🟢 ЖАҢЫ КОНСУЛЬТАЦИЯ${source ? ` (${source})` : ""}

👤 Ат: ${name || "Жазылган жок"}
📞 Телефон: +996${phone}
  `.trim();

  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    }
  );
  if (!res.ok) throw new Error("Telegram xato");
}

// ─────────────────────────────────────────────
// REUSABLE FORM (light / dark / photo variant)
// ─────────────────────────────────────────────
function ConsultForm({ variant = "light", source = "" }) {
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!phone.trim()) return alert("Телефон номерди жазыңыз!");
    if (!agree)        return alert("Макулдукту белгилеңиз!");

    setLoading(true);
    try {
      await sendToTelegram(name, phone, source);
      alert(`Рахмат${name ? ", " + name : ""}! Жакында чалабыз. ✅`);
      setName(""); setPhone(""); setAgree(false);
    } catch {
      alert("Ката болду. Кайра аракет кылыңыз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="c-form" onSubmit={handleSubmit}>
      <input
        className="c-form-name"
        type="text"
        placeholder="Атыңыз"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="c-phone-row">
        <span className="c-phone-prefix">+996</span>
        <input
          className="c-phone-input"
          type="tel"
          placeholder="700 000 000"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          maxLength={9}
        />
      </div>
      <label className="c-agree">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        Жеке маалыматтарды <a href="#oferta">иштетүүгө</a> макулмун
      </label>
      <button type="submit" className="btn-green" disabled={loading}>
        {loading ? "Жөнөтүлүүдө..." : "Суроо жөнөтүү"}
      </button>
    </form>
  );
}

// ─────────────────────────────────────────────
// 1. CONSULT #1 — жашыл фон (hero астында)
// ─────────────────────────────────────────────
export default function Cunsult() {
  return (
    <section className="consult-sec light" id="consult1">
      <div className="wrap">
        <div className="consult-box">
          <h2>Консультация</h2>
          <p>
            Телефон номериңизди жазып калтырыңыз, биз сизге чалабыз жана бир да
            сурооңуз жооп алынбай калбасына аракет кылабыз
          </p>
          <ConsultForm variant="light" source="Форма 1" />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 2. CONSULT #2 — сүрөт менен (bonus астында)
// ─────────────────────────────────────────────
export function ConsultWithPhoto() {
  return (
    <section className="consult-photo-sec reveal">
      <div className="wrap">
        <div className="consult-photo-inner">
          <div className="consult-photo-img">
            <div className="img-ph"><img src={center} alt="" /></div>
          </div>
          <div className="consult-box">
            <h2>Консультация</h2>
            <p>
              Телефон номериңизди жазып калтырыңыз, биз сизге чалабыз жана бир да
              сурооңуз жооп алынбай калбасына аракет кылабыз
            </p>
            <ConsultForm variant="light" source="Форма 2 (Сүрөт)" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 3. CONSULT #3 — кара фон (directions астында)
// ─────────────────────────────────────────────
export function ConsultDark() {
  return (
    <section className="consult-sec dark reveal" id="consult2">
      <div className="wrap">
        <div className="consult-box">
          <h2>Консультация</h2>
          <p>
            Телефон номериңизди жазып калтырыңыз, биз сизге чалабыз жана бир да
            сурооңуз жооп алынбай калбасына аракет кылабыз
          </p>
          <ConsultForm variant="dark" source="Форма 3 (Кара)" />
        </div>
      </div>
    </section>
  );
}