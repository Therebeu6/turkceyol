/* ═══════════════════════════════════════════════
   TürkçeYol — grammar.js
   Astuces et règles de grammaire simplifiées
   ═══════════════════════════════════════════════ */

window.AppGrammar = [
  {
    id: 'g_harmonie_majeure',
    title: 'Harmonie vocalique (Majeure)',
    rule: 'En turc, les voyelles s\'accordent. Si la dernière voyelle du mot est A, I, O, U, on utilise le suffixe en A ou I sans point (ı). Si c\'est E, İ, Ö, Ü, on utilise E ou İ.',
    example: 'Araba -> Arabalar (Voitures) | Ev -> Evler (Maisons)'
  },
  {
    id: 'g_ordre_mots',
    title: 'L\'ordre des mots (SOV)',
    rule: 'La structure de base est Sujet + Objet + Verbe. Le verbe est toujours à la fin de la phrase.',
    example: 'Ben (Sujet) elma (Objet) yiyorum (Verbe). -> Je mange une pomme.'
  },
  {
    id: 'g_present_iyor',
    title: 'Le présent progressif (-iyor)',
    rule: 'Pour dire "je suis en train de faire", on ajoute -iyor au radical du verbe, puis la terminaison personnelle (ex: -um pour "Je").',
    example: 'Yapmak (Faire) -> Yap + ı + yor + um = Yapıyorum.'
  }
];
