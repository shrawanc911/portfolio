from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT_PATH = Path(__file__).resolve().parents[1] / 'public' / 'Shrawan_Kumar_Resume_2026.pdf'

ACCENT = colors.HexColor('#EB5E28')
TEXT = colors.HexColor('#171412')
MUTED = colors.HexColor('#5F554B')
LINE = colors.HexColor('#D8CCBD')

PROFILE = {
    'name': 'SHRAWAN KUMAR',
    'role': 'Backend-first Full-Stack Developer',
    'location': 'Vadodara, Gujarat',
    'email': 'shravanc911@gmail.com',
    'phone': '+91 8290114706',
    'linkedin': 'linkedin.com/in/shrawankumar911',
    'github': 'github.com/shrawanc911',
    'portfolio': 'shrawankumar.in',
}

SUMMARY = (
    'Backend-first full-stack developer and final-year B.Tech student building '
    'responsive product experiences, scalable APIs, and real-time fintech workflows. '
    'Hands-on with Node.js, Express.js, React, Redis, MongoDB, BullMQ, and WebSockets, '
    'with a strong bias for clean architecture and practical product delivery.'
)

EXPERIENCE = [
    {
        'title': 'Full-Stack Developer',
        'company': 'Aarthik.ai',
        'period': 'Current product focus',
        'details': [
            'Architecting backend-heavy product workflows for live market data, portfolio analytics, and AI-assisted user experiences.',
            'Built worker and cron pipelines, Redis-backed caching, WebSocket delivery, and queue-driven flows for performance-sensitive features.',
            'Contributed responsive React interfaces when frontend polish needed to match backend reliability and speed.',
        ],
    },
    {
        'title': 'MERN Stack Intern',
        'company': 'PocketWise Technologies',
        'period': 'February 2025',
        'details': [
            'Worked across frontend and backend using SQL, Express, React, and Node.js in a 5-person team.',
            'Built APIs, supported database workflows, and helped maintain a smooth user experience across the product.',
            'Contributed to deployment and hosting tasks while keeping features production-ready.',
        ],
    },
]

PROJECTS = [
    {
        'title': 'Portfolio Computing Engine',
        'stack': 'Node.js, BullMQ, Redis, MongoDB',
        'details': [
            'Built a worker-based pipeline that batches LTP fetches for 5,654+ stocks, computes portfolio metrics, and keeps Redis and MongoDB synchronized with transactional consistency.',
            'Turned a heavy recurring workflow into a predictable service that supports near-real-time portfolio views.',
        ],
    },
    {
        'title': 'AI Chatbot with Streaming Responses',
        'stack': 'WebSockets, BullMQ, Redis Pub/Sub, OpenAI',
        'details': [
            'Queued LLM work in the background and streamed token updates over WebSockets for a more responsive chat experience.',
            'Used Redis pub/sub for cross-service coordination and post-generation metadata updates.',
        ],
    },
    {
        'title': 'Univibe',
        'stack': 'MongoDB, Express.js, Node.js, React.js',
        'details': [
            'Built a university community portal with events, posting, authentication, role-based access control, and collaboration-oriented flows.',
            'Focused on responsive UX and full-stack delivery across both data and interface layers.',
        ],
    },
    {
        'title': 'Six Digits',
        'stack': 'SQL, Express.js, Node.js, React.js',
        'details': [
            'Created a MERN trading platform with a responsive landing page, blog module, and finance-focused content areas.',
            'Delivered a cleaner cross-device experience while strengthening end-to-end product execution skills.',
        ],
    },
]

SKILLS = [
    ('Languages', 'C/C++, Python, JavaScript, HTML/CSS'),
    ('Backend', 'Node.js, Express.js, REST APIs, JWT, BullMQ, worker pipelines'),
    ('Frontend', 'React, Tailwind CSS, Context API, responsive UI'),
    ('Data', 'MongoDB, MySQL, Redis, caching, aggregation, vector search'),
    ('Tools', 'Git, GitHub, Docker, VS Code, debugging, deployment workflows'),
]

EDUCATION = [
    {
        'title': 'Parul University',
        'meta': 'Bachelor of Technology | Current CGPA: 8.61',
        'period': 'September 2022 - May 2026',
    },
    {
        'title': 'SPN Government Senior Secondary School',
        'meta': 'PCM (RBSE) | 81%',
        'period': 'June 2021 - April 2022',
    },
    {
        'title': 'SPN Government Senior Secondary School',
        'meta': 'Secondary (RBSE) | 74.17%',
        'period': 'June 2019 - April 2020',
    },
]

CERTIFICATIONS = [
    'Coursera: Introduction to Software, Programming and Database',
    'IBM: Git and GitHub Basics',
    'Coding Club member and NCC participant',
]


def build_styles():
    styles = getSampleStyleSheet()

    styles.add(
        ParagraphStyle(
            name='Name',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=22,
            leading=26,
            textColor=TEXT,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name='Role',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=10.5,
            leading=14,
            textColor=ACCENT,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name='Body',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.6,
            leading=14,
            textColor=TEXT,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name='BodyMuted',
            parent=styles['Body'],
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name='Section',
            parent=styles['Body'],
            fontName='Helvetica-Bold',
            fontSize=10,
            leading=12,
            textColor=ACCENT,
            spaceAfter=6,
            spaceBefore=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name='ItemTitle',
            parent=styles['Body'],
            fontName='Helvetica-Bold',
            fontSize=10.2,
            leading=13,
            textColor=TEXT,
        )
    )
    styles.add(
        ParagraphStyle(
            name='RightMeta',
            parent=styles['BodyMuted'],
            alignment=TA_RIGHT,
        )
    )
    return styles


def two_col_line(left: Paragraph, right: Paragraph):
    table = Table([[left, right]], colWidths=[126 * mm, 50 * mm], hAlign='LEFT')
    table.setStyle(
        TableStyle(
            [
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 0),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
            ]
        )
    )
    return table


def bullet_list(items, style):
    return ListFlowable(
        [
            ListItem(Paragraph(item, style), leftIndent=0)
            for item in items
        ],
        bulletType='bullet',
        start='circle',
        bulletFontName='Helvetica',
        bulletFontSize=6,
        bulletOffsetY=3,
        leftIndent=12,
    )


def build_resume():
    styles = build_styles()
    story = []

    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=A4,
        leftMargin=15 * mm,
        rightMargin=15 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title='Shrawan Kumar Resume',
        author='Shrawan Kumar',
    )

    contact_line = (
        f"{PROFILE['phone']} | {PROFILE['email']} | {PROFILE['location']} | "
        f"{PROFILE['linkedin']} | {PROFILE['github']} | {PROFILE['portfolio']}"
    )

    story.append(Paragraph(PROFILE['name'], styles['Name']))
    story.append(Paragraph(PROFILE['role'], styles['Role']))
    story.append(Spacer(1, 4))
    story.append(Paragraph(contact_line, styles['BodyMuted']))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width='100%', thickness=0.8, color=LINE))
    story.append(Spacer(1, 8))

    story.append(Paragraph('SUMMARY', styles['Section']))
    story.append(Paragraph(SUMMARY, styles['Body']))
    story.append(Spacer(1, 8))

    story.append(Paragraph('EXPERIENCE', styles['Section']))
    for entry in EXPERIENCE:
        story.append(
            two_col_line(
                Paragraph(f"{entry['title']} | {entry['company']}", styles['ItemTitle']),
                Paragraph(entry['period'], styles['RightMeta']),
            )
        )
        story.append(Spacer(1, 2))
        story.append(bullet_list(entry['details'], styles['BodyMuted']))
        story.append(Spacer(1, 6))

    story.append(Paragraph('SELECTED PROJECTS', styles['Section']))
    for project in PROJECTS:
        story.append(
            two_col_line(
                Paragraph(f"{project['title']} | {project['stack']}", styles['ItemTitle']),
                Paragraph('Project', styles['RightMeta']),
            )
        )
        story.append(Spacer(1, 2))
        story.append(bullet_list(project['details'], styles['BodyMuted']))
        story.append(Spacer(1, 6))

    story.append(Paragraph('SKILLS', styles['Section']))
    for label, values in SKILLS:
        story.append(Paragraph(f"<b>{label}:</b> {values}", styles['BodyMuted']))
        story.append(Spacer(1, 2))
    story.append(Spacer(1, 6))

    story.append(Paragraph('EDUCATION', styles['Section']))
    for item in EDUCATION:
        story.append(
            two_col_line(
                Paragraph(f"{item['title']} | {item['meta']}", styles['ItemTitle']),
                Paragraph(item['period'], styles['RightMeta']),
            )
        )
        story.append(Spacer(1, 4))
    story.append(Spacer(1, 4))

    story.append(Paragraph('CERTIFICATIONS & ACTIVITIES', styles['Section']))
    story.append(bullet_list(CERTIFICATIONS, styles['BodyMuted']))

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    doc.build(story)


if __name__ == '__main__':
    build_resume()
