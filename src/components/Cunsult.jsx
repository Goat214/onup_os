import { useState } from "react";

export default function ConsultForm() {
  const [name1, setName1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [agree1, setAgree1] = useState(false);

  async function submitConsult(e) {
    e.preventDefault();

    if (!name1 || !phone1 || !agree1) {
      alert("Iltimos barcha maydonlarni to‘ldiring");
      return;
    }

    try {
      const message = `
🟢 YANGI KONSULTATSIYA

👤 Ism: ${name1}
📞 Telefon: +996${phone1}
      `;

      await fetch("https://api.telegram.org/bot8304491289:AAEhClRt_023T0uBxro_ni2vOMDx7lHkT6A/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "6518481355",
          text: message,
        }),
      });

      alert("So‘rovingiz yuborildi!");

      setName1("");
      setPhone1("");
      setAgree1(false);

    } catch (error) {
      alert("Xatolik yuz berdi");
    }
  }

  return (
    <section className="consult-sec light" id="consult1">
      <div className="wrap">
        <div className="consult-box">
          <h2>Бекер консультация</h2>
          <p>
            Телефон номериңизди жазып калтырыңыз, биз сизге чалабыз жана бир да сурооңуз жооп алынбай калбасына аракет кылабыз
          </p>

          <form className="c-form" onSubmit={submitConsult}>
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
                placeholder="700000000"
                value={phone1}
                onChange={(e) =>
                  setPhone1(e.target.value.replace(/\D/g, ""))
                }
                maxLength={9}
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
  );
}