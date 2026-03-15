import html2canvas from 'html2canvas';

export async function generateShareImage(scoreCardRef) {
  const canvas = await html2canvas(scoreCardRef.current, {
    backgroundColor: '#0A0A0A',
    scale: 2,
    logging: false,
    useCORS: true,
  });
  return canvas.toDataURL('image/png');
}

export function getTwitterShareText(score, grade, country, shareUrl) {
  return encodeURIComponent(
    `I just got my Japa Score: ${score}/100 — "${grade}" 🇳🇬\n\nBest country match: ${country}\n\nFind out yours 👇\n${shareUrl}`
  );
}

export function getWhatsAppShareText(score, grade, country, shareUrl) {
  return encodeURIComponent(
    `I just checked my Japa readiness score and got ${score}/100 — "${grade}"! 🇳🇬\n\nMy best country match is ${country}.\n\nCheck yours free: ${shareUrl}`
  );
}

export async function copyImageToClipboard(scoreCardRef) {
  const canvas = await html2canvas(scoreCardRef.current, {
    backgroundColor: '#0A0A0A',
    scale: 2,
    logging: false,
    useCORS: true,
  });

  canvas.toBlob(async (blob) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
    } catch {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'japa-score.png';
      link.href = url;
      link.click();
    }
  });
}
