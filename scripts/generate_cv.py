"""Create the downloadable CV from the same reviewed content snapshot as the site."""
from pathlib import Path
import html
import json

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'packages/content/portfolio.json').read_text(encoding='utf-8'))
target = ROOT / 'frontend/public/Saman-Azizi-Siyan-CV.pdf'
W, H = A4
INK = colors.HexColor('#152722')
MUTED = colors.HexColor('#53655b')
ACCENT = colors.HexColor('#ca593e')
LINE = colors.HexColor('#d3dcd0')
LEFT = 48
RIGHT = 48
WIDTH = W - LEFT - RIGHT

def clean(value: str) -> str:
    return html.escape(value.replace('—', ' - ').replace('–', '-').replace('·', '/').replace('’', "'"))

body_style = ParagraphStyle('body', fontName='Helvetica', fontSize=9.4, leading=14.5, textColor=MUTED, alignment=TA_LEFT)
small_style = ParagraphStyle('small', parent=body_style, fontSize=8.7, leading=12.6)

pdf = canvas.Canvas(str(target), pagesize=A4, pageCompression=1)
pdf.setTitle('Saman Azizi Siyan - Full Stack Engineer CV')
pdf.setAuthor('Saman Azizi Siyan')
pdf.setSubject('Professional experience and selected engineering source')

def paragraph(value: str, y: float, style=body_style, width=WIDTH) -> float:
    item = Paragraph(clean(value), style)
    _, height = item.wrap(width, H)
    item.drawOn(pdf, LEFT, y - height)
    return y - height

def footer(page: int) -> None:
    pdf.setStrokeColor(LINE)
    pdf.line(LEFT, 40, W - RIGHT, 40)
    pdf.setFont('Helvetica', 8)
    pdf.setFillColor(MUTED)
    pdf.drawString(LEFT, 27, 'SAMAN AZIZI SIYAN / ENGINEERING RECORD')
    pdf.drawRightString(W - RIGHT, 27, f'{page} / 2')

def section(label: str, y: float) -> float:
    pdf.setFillColor(ACCENT)
    pdf.setFont('Helvetica-Bold', 9)
    pdf.drawString(LEFT, y, label.upper())
    pdf.setStrokeColor(LINE)
    pdf.line(LEFT, y - 9, W - RIGHT, y - 9)
    return y - 27

def role(row: dict, y: float, include_highlights=True) -> float:
    pdf.setFillColor(INK)
    pdf.setFont('Times-Bold', 15)
    pdf.drawString(LEFT, y, row['company'])
    pdf.setFont('Helvetica', 8.5)
    pdf.setFillColor(ACCENT)
    pdf.drawRightString(W - RIGHT, y + 2, clean(row['period']))
    y -= 16
    pdf.setFont('Helvetica-Bold', 9)
    pdf.setFillColor(MUTED)
    pdf.drawString(LEFT, y, clean(row['role']))
    y -= 10
    y = paragraph(row['summary'], y - 3, small_style)
    if include_highlights:
        for highlight in row['highlights'][:2]:
            y = paragraph('- ' + highlight, y - 3, small_style)
    y -= 28
    if y < 60:
        raise RuntimeError(f'CV content overflows page after {row["company"]}')
    return y

# Page 1: positioning and most recent work.
pdf.setFillColor(INK)
pdf.rect(0, H - 16, W, 16, fill=1, stroke=0)
pdf.setFillColor(ACCENT)
pdf.rect(LEFT, H - 73, 25, 3, fill=1, stroke=0)
pdf.setFont('Helvetica-Bold', 9)
pdf.drawString(LEFT, H - 93, 'FULL STACK ENGINEER')
pdf.setFillColor(INK)
pdf.setFont('Times-Roman', 34)
pdf.drawString(LEFT, H - 136, 'Saman Azizi Siyan')
pdf.setFont('Helvetica', 9)
pdf.setFillColor(MUTED)
pdf.drawString(LEFT, H - 157, 'PHP / WordPress / Laravel / JavaScript / TypeScript / React / Next.js')
pdf.setFont('Helvetica', 8.5)
pdf.setFillColor(INK)
pdf.drawString(LEFT, H - 181, 'github.com/SamanAziziSiyan')
pdf.linkURL('https://github.com/SamanAziziSiyan', (LEFT, H - 184, LEFT + 175, H - 173), relative=0)
pdf.drawRightString(W - RIGHT, H - 181, 'linkedin.com/in/saman-azizi-siyan')
pdf.linkURL('https://www.linkedin.com/in/saman-azizi-siyan/', (W - RIGHT - 190, H - 184, W - RIGHT, H - 173), relative=0)
y = section('Profile', H - 210)
y = paragraph('Full stack engineer working across commercial WordPress products, Laravel services, frontend applications, integrations, and developer tooling. Experience includes company, contract, and overlapping independent work since 2016.', y)
y = section('Recent professional work', y - 27)
for row in data['experiences'][:4]:
    y = role(row, y)
footer(1)
pdf.showPage()

# Page 2: earlier work, public evidence, and scope statement.
pdf.setFillColor(INK)
pdf.rect(0, H - 16, W, 16, fill=1, stroke=0)
pdf.setFont('Times-Roman', 26)
pdf.setFillColor(INK)
pdf.drawString(LEFT, H - 73, 'Earlier work & public evidence')
y = section('Earlier experience', H - 105)
for row in data['experiences'][4:]:
    y = role(row, y, include_highlights=False)
y = section('Selected output and source', y - 12)
selected = [
    ('Listdom', 'Live product', 'https://listdom.net'),
    ('Blogina', 'Commercial theme', 'https://www.rtl-theme.com/blogina-wordpress-theme/'),
    ('Serione', 'Commercial theme', 'https://www.rtl-theme.com/serione-wordpress-theme/'),
    ('ClickChin / component builder', 'Public source', 'https://github.com/SamanAziziSiyan/clickchin-landing-backend'),
    ('AMIRAMIR Jewelry', 'Public source', 'https://github.com/SamanAziziSiyan/amiramir-jewelry-theme'),
]
for name, kind, url in selected:
    pdf.setFillColor(INK)
    pdf.setFont('Helvetica-Bold', 9.3)
    pdf.drawString(LEFT, y, clean(name))
    pdf.linkURL(url, (LEFT, y - 3, W - RIGHT, y + 11), relative=0)
    pdf.setFillColor(MUTED)
    pdf.setFont('Helvetica', 8.3)
    pdf.drawRightString(W - RIGHT, y, clean(kind))
    y -= 17
    if y < 92:
        raise RuntimeError('CV project list overflows page')
y -= 8
y = section('Evidence and scope', y)
y = paragraph('Public repositories are independently scoped source exports. Webilia/Listdom and other commercial work are professional contributions; their proprietary source is not included. Historical repositories and unresolved claims are qualified on the portfolio website.', y, small_style)
footer(2)
pdf.save()
print(f'Created {target} ({target.stat().st_size} bytes)')
