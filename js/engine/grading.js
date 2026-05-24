/* ═══════════════════════════════════════════════
   TürkçeYol — grading.js
   Normalisation + Levenshtein + isCorrect
   ═══════════════════════════════════════════════ */

window.Grading = {
  normalize(str) {
    if (!str) return '';
    return str
      .trim()
      .toLowerCase()
      .replace(/[.,!?;:'"«»()\-]/g, '')
      .replace(/\s+/g, ' ')
      .normalize('NFC');
  },

  levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) =>
      Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i-1] === b[j-1]
          ? dp[i-1][j-1]
          : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      }
    }
    return dp[m][n];
  },

  isCorrect(input, expected, options = {}) {
    const normInput    = this.normalize(input);
    const normExpected = this.normalize(expected);
    const distance     = this.levenshtein(normInput, normExpected);

    if (normInput === normExpected) {
      return { correct: true, distance: 0, normalized: { input: normInput, expected: normExpected } };
    }
    if (options.strict) {
      return { correct: false, distance, normalized: { input: normInput, expected: normExpected } };
    }

    const tolerance = normExpected.length <= 3 ? 0 : Math.floor(normExpected.length / 5);
    return {
      correct: distance <= tolerance,
      distance,
      normalized: { input: normInput, expected: normExpected }
    };
  }
};
