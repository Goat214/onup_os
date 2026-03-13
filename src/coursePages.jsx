// ═══════════════════════════════════════════════════════
//  Бардык 6 курстун жеке бет компоненттери
//  Бул файлды ар бир компонентке бөлүп алсаңыз болот
// ═══════════════════════════════════════════════════════

import CoursePage from "./pages/CoursePage";
import {
  liderData,
  tezOkuuData,
  jetiTepkichData,
  englishData,
  russianData,
  itData,
} from "./app/coursesData";

// ── 1. Лидерлик ──────────────────────────────────────
export function LiderPage() {
  return <CoursePage course={liderData} />;
}

// ── 2. Тез окуу ──────────────────────────────────────
export function TezOkuuPage() {
  return <CoursePage course={tezOkuuData} />;
}

// ── 3. Жети тепкич ───────────────────────────────────
export function JetiTepkichPage() {
  return <CoursePage course={jetiTepkichData} />;
}

// ── 4. Англис тили ───────────────────────────────────
export function EnglishPage() {
  return <CoursePage course={englishData} />;
}

// ── 5. Орус тили ─────────────────────────────────────
export function RussianPage() {
  return <CoursePage course={russianData} />;
}

// ── 6. IT көндүмдөрү ─────────────────────────────────
export function ITPage() {
  return <CoursePage course={itData} />;
}