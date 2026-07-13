/* Shared resume PDF generator (pdfMake). Consumes an About.js-shaped data
   object and triggers a browser download. Used by the main site's
   "Download Resume" button and by /admin/resumes.html for tailored resumes,
   so both always produce the same layout from whatever data they pass in. */
(function (window) {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  function fmtDate(s) {
    if (!s) return "Present";
    const d = new Date(s);
    return MONTHS[d.getMonth()] + " " + d.getFullYear();
  }

  function stripHtml(s) {
    if (!s) return "";
    return s.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
  }

  function sectionHeader(title) {
    return [
      { text: title, style: 'sectionTitle' },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.8, lineColor: '#1155CC' }],
        margin: [0, 1, 0, 5]
      }
    ];
  }

  function buildDocDefinition(about) {
    const SEP = { text: '  •  ', color: '#555555' };

    const skillsContent = (about.skills || []).map((s, i) => ({
      columns: [
        { text: s.label + ':', bold: true, fontSize: 10, width: 80 },
        { text: s.items,                   fontSize: 10, width: '*' }
      ],
      margin: [0, 0, 0, i < about.skills.length - 1 ? 3 : 0]
    }));

    const expContent = [];
    Object.keys(about.timeline || {}).sort((a, b) => b - a).forEach(year => {
      const work = about.timeline[year].work || {};
      Object.keys(work).forEach(key => {
        const item = work[key];
        if (!item.title) return;
        const startDate = fmtDate(item.StartDate);
        const endDate   = item.EndDate ? fmtDate(item.EndDate) : "Present";

        expContent.push({
          stack: [
            {
              columns: [
                { text: item.title, bold: true, fontSize: 10, width: '*' },
                { text: `${startDate} to ${endDate}`, bold: true, fontSize: 10, width: 'auto', alignment: 'right' }
              ]
            },
            {
              text: [
                { text: item.companyname, bold: true },
                `  |  ${item.location}  |  ${item.RO}${item.status ? '  |  ' + item.status : ''}`
              ],
              fontSize: 10,
              margin: [0, 1, 0, 3]
            }
          ],
          margin: [0, 8, 0, 0]
        });

        if (item.Description) {
          const bullets = stripHtml(item.Description)
            .split("\n").map(l => l.trim()).filter(Boolean)
            .map(l => l.replace(/^[●\-\*]\s*/, ""));
          if (bullets.length) {
            expContent.push({ ul: bullets, style: 'bodyText', margin: [0, 0, 0, 4] });
          }
        }
      });
    });

    const eduContent = (about.education || []).map(e => ({
      stack: [
        {
          columns: [
            { text: e.degree, bold: true, fontSize: 10, width: '*' },
            { text: `${e.from} - ${e.to}`, bold: true, fontSize: 10, width: 'auto', alignment: 'right' }
          ]
        },
        { text: e.school, fontSize: 10, margin: [0, 1, 0, 0] }
      ],
      margin: [0, 0, 0, 6]
    }));

    const projContent = [];
    Object.keys(about.Projects || {}).forEach(key => {
      const p = about.Projects[key];
      const desc = stripHtml(p.Description).split("Major responsibilities:")[0].trim();
      projContent.push({
        stack: [
          {
            columns: [
              { text: p.Title, bold: true, fontSize: 10, width: '*' },
              { text: p.projectDate, fontSize: 10, width: 'auto', alignment: 'right' }
            ],
            margin: [0, 8, 0, 1]
          },
          { text: desc, style: 'bodyText', margin: [0, 0, 0, 2] },
          { text: 'Technologies: ' + p.Skills, fontSize: 10, italics: true }
        ]
      });
    });

    const emailLink     = about.email;
    const linkedInUrl   = about.linkedIn || '';
    const githubUrl     = about.gitHub   || '';
    const websiteUrl    = about.website  || '';
    const linkedInShort = linkedInUrl.replace('https://www.', '').replace('https://', '');
    const githubShort   = githubUrl.replace('https://', '');
    const websiteShort  = websiteUrl.replace('https://', '');

    return {
      pageSize: 'A4',
      pageMargins: [42, 42, 42, 42],

      content: [
        { text: about.name.toUpperCase(), style: 'name' },

        {
          text: [
            { text: emailLink,         link: `mailto:${emailLink}`, color: '#1155CC' },
            SEP,
            { text: about.phone || '', color: '#1155CC' },
            SEP,
            { text: linkedInShort,     link: linkedInUrl, color: '#1155CC' }
          ],
          style: 'contactRow',
          alignment: 'center',
          margin: [0, 4, 0, 1]
        },

        {
          text: [
            { text: websiteShort, link: websiteUrl, color: '#1155CC' },
            SEP,
            { text: githubShort,  link: githubUrl,  color: '#1155CC' }
          ],
          style: 'contactRow',
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },

        ...sectionHeader('Skills'),
        ...skillsContent,

        ...sectionHeader('Experience'),
        ...expContent,

        ...sectionHeader('Education'),
        ...eduContent,

        ...sectionHeader('Key Projects'),
        ...projContent
      ],

      styles: {
        name:        { fontSize: 20, bold: true, alignment: 'center', margin: [0, 0, 0, 0] },
        contactRow:  { fontSize: 9,  color: '#333333' },
        sectionTitle:{ fontSize: 11, bold: true, color: '#1155CC', margin: [0, 10, 0, 0] },
        bodyText:    { fontSize: 10, lineHeight: 1.3 }
      },

      defaultStyle: { font: 'Roboto' }
    };
  }

  function generateResumePdf(about, filename) {
    const dd = buildDocDefinition(about);
    window.pdfMake.createPdf(dd).download(filename || 'Resume.pdf');
  }

  window.generateResumePdf = generateResumePdf;
})(window);
