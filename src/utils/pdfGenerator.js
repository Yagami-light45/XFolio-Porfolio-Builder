import { jsPDF } from 'jspdf';

export const generateResumePDF = (data) => {
    const doc = new jsPDF({ unit: 'pt' });
    const pageWidth = 595;
    const pageHeight = 842;
    const leftMargin = 72;
    const rightMargin = 72;
    const topMargin = 72;
    const bottomMargin = 72;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    let y = topMargin;

    const fontSizeHeading = 15;
    const fontSizeBody = 12;
    const lineHeight = 18;
    const smallSpace = 10;
    const headingSpaceAfter = 20;

    const checkPageOverflow = (doc, y) => {
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        return topMargin;
      }
      return y;
    };

    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(data.name || 'Your Name', pageWidth / 2, y, { align: 'center' });
    y += 30;

    // Profession
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text(data.profession || 'Your Profession', pageWidth / 2, y, { align: 'center' });
    y += 30;

    // Contact Information
    doc.setFontSize(fontSizeBody);
    const contacts = [
      { label: 'Email:', field: 'email' },
      { label: 'LinkedIn:', field: 'linkedin' },
      { label: 'GitHub:', field: 'github' },
    ];
    const existingContacts = contacts.filter((contact) => data[contact.field]);
    doc.setFont('helvetica', 'bold');
    let maxLabelWidth = 0;
    existingContacts.forEach((contact) => {
      const width = doc.getTextWidth(contact.label);
      if (width > maxLabelWidth) maxLabelWidth = width;
    });
    existingContacts.forEach((contact) => {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.text(contact.label, leftMargin, y);
      const valueX = leftMargin + maxLabelWidth + 5;
      doc.setFont('helvetica', 'normal');
      doc.text(data[contact.field], valueX, y);
      y += lineHeight;
    });
    y += smallSpace;
    y += 15;

    // About Me
    if (data.bio) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('ABOUT ME', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      const bioLines = doc.splitTextToSize(data.bio, contentWidth);
      bioLines.forEach((line) => {
        y = checkPageOverflow(doc, y);
        doc.text(line, leftMargin, y);
        y += lineHeight;
      });
      y += smallSpace;
    }

    // Skills
    if (data.skills?.length) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('SKILLS', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      data.skills.forEach((skill) => {
        y = checkPageOverflow(doc, y);
        doc.text('• ' + skill, leftMargin, y);
        y += lineHeight;
      });
      y += smallSpace;
    }

    // Experience
    if (data.experience?.length) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('EXPERIENCE', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      data.experience.forEach((exp) => {
        y = checkPageOverflow(doc, y);
        const titleText = `${exp.title || ''} at ${exp.company || ''}`;
        doc.text('• ' + titleText, leftMargin, y);
        if (exp.duration) {
          const durationWidth = doc.getTextWidth(exp.duration);
          doc.text(exp.duration, pageWidth - rightMargin - durationWidth, y);
        }
        y += lineHeight;
        if (exp.description) {
          const descLines = doc.splitTextToSize(exp.description, contentWidth - 10);
          descLines.forEach((line) => {
            y = checkPageOverflow(doc, y);
            doc.text(line, leftMargin + 10, y);
            y += lineHeight;
          });
        }
        y += smallSpace;
      });
    }

    // Education
    if (data.education?.length) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('EDUCATION', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      data.education.forEach((ed) => {
        y = checkPageOverflow(doc, y);
        const eduText = `${ed.degree || ''} at ${ed.institution || ''}`;
        doc.text('• ' + eduText, leftMargin, y);
        if (ed.duration) {
          const durationWidth = doc.getTextWidth(ed.duration);
          doc.text(ed.duration, pageWidth - rightMargin - durationWidth, y);
        }
        y += lineHeight;
        if (ed.description) {
          const descLines = doc.splitTextToSize(ed.description, contentWidth - 10);
          descLines.forEach((line) => {
            y = checkPageOverflow(doc, y);
            doc.text(line, leftMargin + 10, y);
            y += lineHeight;
          });
        }
        y += smallSpace;
      });
    }

    // Projects
    if (data.projects?.length) {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontSizeHeading);
      doc.text('PROJECTS', leftMargin, y);
      y += 5;
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
      y += headingSpaceAfter;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSizeBody);
      data.projects.forEach((project) => {
        y = checkPageOverflow(doc, y);
        doc.text('• ' + (project.title || ''), leftMargin, y);
        y += lineHeight;
        if (project.link) {
          y = checkPageOverflow(doc, y);
          doc.text(`Link: ${project.link}`, leftMargin + 10, y);
          y += lineHeight;
        }
        if (project.techStack) {
          y = checkPageOverflow(doc, y);
          doc.text(`Tech Stack: ${project.techStack}`, leftMargin + 10, y);
          y += lineHeight;
        }
        if (project.description) {
          const descLines = doc.splitTextToSize(project.description, contentWidth - 10);
          descLines.forEach((line) => {
            y = checkPageOverflow(doc, y);
            doc.text(line, leftMargin + 10, y);
            y += lineHeight;
          });
        }
        y += smallSpace;
      });
    }

    doc.save('resume.pdf');
  };