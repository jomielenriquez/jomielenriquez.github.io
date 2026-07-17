/* Shared cover letter PDF generator (pdfMake). Consumes a cover-letter JSON
   object (applicant, date, recipient, salutation, paragraphs, closing,
   signatureName) and triggers a browser download. Used by /admin/resumes.html
   for tailored cover letters, mirroring js/resume-pdf.js. */
(function (window) {
  function buildDocDefinition(letter) {
    const applicant = letter.applicant || {};
    const SEP = { text: '  •  ', color: '#555555' };

    const emailLink     = applicant.email || '';
    const linkedInUrl   = applicant.linkedIn || '';
    const websiteUrl    = applicant.website || '';
    const linkedInShort = linkedInUrl.replace('https://www.', '').replace('https://', '');
    const websiteShort  = websiteUrl.replace('https://', '');

    const contactBits = [];
    if (emailLink) contactBits.push({ text: emailLink, link: `mailto:${emailLink}`, color: '#1155CC' });
    if (applicant.phone) contactBits.push({ text: applicant.phone, color: '#1155CC' });
    if (linkedInShort) contactBits.push({ text: linkedInShort, link: linkedInUrl, color: '#1155CC' });
    if (websiteShort) contactBits.push({ text: websiteShort, link: websiteUrl, color: '#1155CC' });

    const contactRow = [];
    contactBits.forEach((bit, i) => {
      if (i > 0) contactRow.push(SEP);
      contactRow.push(bit);
    });

    const recipient = letter.recipient || {};
    const recipientLines = [];
    if (recipient.name) recipientLines.push({ text: recipient.name, fontSize: 10 });
    if (recipient.company) recipientLines.push({ text: recipient.company, fontSize: 10 });
    if (recipient.roleTitle) recipientLines.push({ text: `Re: ${recipient.roleTitle}`, fontSize: 10, italics: true });

    const bodyContent = (letter.paragraphs || []).map(p => ({
      text: p,
      style: 'bodyText',
      margin: [0, 0, 0, 10]
    }));

    return {
      pageSize: 'A4',
      pageMargins: [56, 56, 56, 56],

      content: [
        { text: (applicant.name || '').toUpperCase(), style: 'name' },
        { text: contactRow, style: 'contactRow', alignment: 'center', margin: [0, 4, 0, 24] },

        ...(letter.date ? [{ text: letter.date, fontSize: 10, margin: [0, 0, 0, 16] }] : []),
        ...(recipientLines.length ? [{ stack: recipientLines, margin: [0, 0, 0, 16] }] : []),

        ...(letter.salutation ? [{ text: letter.salutation, fontSize: 10, margin: [0, 0, 0, 12] }] : []),

        ...bodyContent,

        ...(letter.closing ? [{ text: letter.closing, fontSize: 10, margin: [0, 12, 0, 30] }] : []),
        ...(letter.signatureName ? [{ text: letter.signatureName, fontSize: 10 }] : [])
      ],

      styles: {
        name:        { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 0] },
        contactRow:  { fontSize: 9,  color: '#333333' },
        bodyText:    { fontSize: 10.5, lineHeight: 1.35, alignment: 'justify' }
      },

      defaultStyle: { font: 'Roboto' }
    };
  }

  function generateCoverLetterPdf(letter, filename) {
    const dd = buildDocDefinition(letter);
    window.pdfMake.createPdf(dd).download(filename || 'CoverLetter.pdf');
  }

  window.generateCoverLetterPdf = generateCoverLetterPdf;
})(window);
