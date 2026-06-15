#!/usr/bin/env python3
"""Download all content from mediabubble.co"""

import os
import re
import time
import ssl
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.request import urlopen, Request

# Disable SSL verification for this site
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

BASE = "https://mediabubble.co"
OUT = Path("/Users/Dorgham/Documents/Work/Devleopment/mediiabubble Main/mediabubble-scrape")

PAGES = [
    "/", "/about/", "/contact/", "/news/", "/privacy-policy/",
    "/marketing-solutions/",
    "/marketing-solutions/creative-strategic-marketing/",
    "/marketing-solutions/creative-strategic-marketing/business-strategy-consulting/",
    "/marketing-solutions/creative-strategic-marketing/creative-services/",
    "/marketing-solutions/creative-strategic-marketing/media-production/",
    "/marketing-solutions/marketing-digital-growth/",
    "/marketing-solutions/marketing-digital-growth/digital-marketing/",
    "/marketing-solutions/marketing-digital-growth/search-engine-optimization/",
    "/marketing-solutions/marketing-digital-growth/app-store-optimization/",
    "/marketing-solutions/branding-print-solutions/",
    "/marketing-solutions/branding-print-solutions/brand-development/",
    "/marketing-solutions/branding-print-solutions/printing-outdoor/",
    "/marketing-solutions/branding-print-solutions/corporate-events-exhibitions/",
    "/marketing-solutions/web-solutions/",
    "/marketing-solutions/web-solutions/web-development/",
    "/marketing-solutions/web-solutions/ui-ux-design/",
    "/marketing-solutions/web-solutions/performance-optimization/",
    "/all-portfolio/", "/careers/", "/do-not-track/", "/terms-of-service/",
    "/coming-soon/",
    "/how-to-choose-the-right-marketing-agency/",
    "/top-5-digital-marketing/",
    "/why-your-business-needs-a-social-media-marketing-strategy-in-2025/",
    "/the-ultimate-guide-to-seo-for-small-businesses-in-2025/",
]

FAVICONS = [
    "https://mediabubble.co/wp-content/uploads/2024/12/mediaBubble_Icon.svg",
    "https://mediabubble.co/wp-content/uploads/2024/12/mediaBubble_Icon.png",
]

LOGO = "https://mediabubble.co/wp-content/uploads/2024/12/mediaBubble_Logo_WhiteText@3x.png"

IMAGES = [
    # Home page images
    "https://mediabubble.co/wp-content/uploads/elementor/thumbs/Star-02-r0rs8d0fo30i7tx8vwyn0sbefpp96h6sdoj7aoylcm.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/mediaBubble_Icon.svg",
    "https://mediabubble.co/wp-content/uploads/2025/01/Asset-1@4sax.png",
    "https://mediabubble.co/wp-content/uploads/2025/01/Aldau-logo.png",
    "https://mediabubble.co/wp-content/uploads/2025/01/Shal-Hasheesh-01-1.png",
    "https://mediabubble.co/wp-content/uploads/2025/01/ERC-Logo.png",
    "https://mediabubble.co/wp-content/uploads/2025/01/Selena-Logo-white.png",
    "https://mediabubble.co/wp-content/uploads/2025/01/GG-logo-Original.png",
    "https://mediabubble.co/wp-content/uploads/2025/01/Our-3-Step-Approach.webp",
    # Solutions page
    "https://mediabubble.co/wp-content/uploads/2025/01/Groth.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/businesses-grow.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Solutions.webp",
    # Social media layouts
    "https://mediabubble.co/wp-content/uploads/2024/12/Social-media-Layout-2024-10.png",
    "https://mediabubble.co/wp-content/uploads/2024/12/Social-media-Layout-2024-11.png",
    "https://mediabubble.co/wp-content/uploads/2024/12/Social-media-Layout-2024-12.png",
    # About page
    "https://mediabubble.co/wp-content/uploads/elementor/thumbs/Star-01-r0rs8ingi4j48znmd96lwq6kqovjsq08xiatn03xb0.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Graph-01.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-face-1.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-face-2.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-face-3.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-face-4.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-face-5.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-timeline-1.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-timeline-2.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-timeline-3.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-timeline-4.webp",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-timeline-5.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Global-Reach-01.webp",
    # Strategic & Creative section
    "https://mediabubble.co/wp-content/uploads/2025/01/Strategic-Creative-Solutions-1.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Strategy-Consulting.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Creative-Services.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Media-Production.webp",
    # Business Strategy Consulting
    "https://mediabubble.co/wp-content/uploads/2025/01/Business-Analysis-Market-Research.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Growth-Strategy-Development.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Digital-Presence-Optimization.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Ongoing-Consultation-Performance-Tracking.webp",
    # Creative Services
    "https://mediabubble.co/wp-content/uploads/2025/01/Logo-Design-Branding.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Print-Design-Collateral.webp",
    "https://mediabubble.co/wp-content/uploads/2025/01/Campaign-Visuals.webp",
    # Media Production
    "https://mediabubble.co/wp-content/uploads/2025/02/Photography.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Video-Production.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Reels-Production.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Motion-Graphics.webp",
    # Marketing & Digital Growth
    "https://mediabubble.co/wp-content/uploads/2025/02/Marketing-Digital-Growth.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Start-Your-Digital.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Technical-SEO.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Drive-More-Downloads-with-App-Store-Optimization.webp",
    # Digital Marketing
    "https://mediabubble.co/wp-content/uploads/2025/02/Social-Media-Management.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Social-Media-Advertising.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Google-Ads-PPC-Display.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Email-Marketing.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Lead-Generation-Campaigns.webp",
    # SEO
    "https://mediabubble.co/wp-content/uploads/2025/02/On-Page-Optimization.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Content-Strategy.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Off-Page-SEO.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Local-SEO.webp",
    # ASO
    "https://mediabubble.co/wp-content/uploads/2025/02/Keyword-Research-Optimization.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Visual-Optimization.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/App-Store-Content-Optimization.webp",
    # Branding & Print
    "https://mediabubble.co/wp-content/uploads/2025/02/Branding-Print-Solutions.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Brand-Development.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Printing-Outdoor.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Print-Collateral.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Signage-Vinyl-Prints.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Outdoor-Media-Buying.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Logo-Design-Visual-Identity.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Brand-Messaging-Storytelling.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Brand-Guidelines.webp",
    # Web Solutions
    "https://mediabubble.co/wp-content/uploads/2025/02/Web-Solutions.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/UX-UI-Design.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Web-Development.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Performance-Optimization.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/WordPress-Development.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/CMS-Integration-Optimization.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/CRM-Integration.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Technical-SEO-Foundations.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Hosting-Domain-Management.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Plugin-Security-Updates.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Ongoing-Content-Updates-Management.webp",
    # Performance Optimization
    "https://mediabubble.co/wp-content/uploads/2025/02/Speed-Optimization-1.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Mobile-Responsiveness-1.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/User-Journey-Optimization-1.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Technical-Monitoring-Maintenance.webp",
    # UI/UX Design
    "https://mediabubble.co/wp-content/uploads/2025/02/Mockup-4.png",
    "https://mediabubble.co/wp-content/uploads/2025/02/Mockup-3.png",
    "https://mediabubble.co/wp-content/uploads/2025/02/Mockup-1-1.png",
    "https://mediabubble.co/wp-content/uploads/2025/02/Mockup-2-1.png",
    "https://mediabubble.co/wp-content/uploads/2025/02/User-Research-Journey-Mapping.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Wireframing-Prototyping.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/Intuitive-UI-Design.webp",
    "https://mediabubble.co/wp-content/uploads/2025/02/UX-Optimization-for-Conversion.webp",
    # Brand Development mockups
    "https://mediabubble.co/wp-content/uploads/2025/07/Envelope_Mockup_4-copy.png",
    "https://mediabubble.co/wp-content/uploads/2025/07/Round_Coaster_Mockup_2-copy.png",
    "https://mediabubble.co/wp-content/uploads/2025/07/Mug-Mockup.png",
    "https://mediabubble.co/wp-content/uploads/2025/07/Mockup-copy.png",
    "https://mediabubble.co/wp-content/uploads/2025/07/Envelope-Mockup.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Baner_Frame_Stand_Mockup.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Flag_Mockup.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Mug-Mockup.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/09_Plastic-Card-Mockup-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Bag-PSD-MockUp-2-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/name-tag-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Coaster-1-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Hard-Hat.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Mug.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Roll-Up.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Banner.jpg",
    # Printing outdoor
    "https://mediabubble.co/wp-content/uploads/2025/07/IMG-20250706-WA0040-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/IMG-20250706-WA0042-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/03/1738757148256.jpeg",
    "https://mediabubble.co/wp-content/uploads/2025/03/IMG-20250327-WA0023.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/03/IMG-20250327-WA0026.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-27-at-00.25.42_867722c4.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/IMG-20250706-WA0051.jpg",
    # Corporate events
    "https://mediabubble.co/wp-content/uploads/2025/01/Screenshot-2025-01-31-at-8.06.58%E2%80%AFPM.png",
    "https://mediabubble.co/wp-content/uploads/2025/01/Screenshot-2025-01-31-at-8.09.02%E2%80%AFPM.png",
    "https://mediabubble.co/wp-content/uploads/2024/12/corporate-transformatives-outcomes.webp",
    # Web Development mockups
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup8-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup7-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup6-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup5-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup4-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup3-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup2-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup10-scaled.jpg",
    "https://mediabubble.co/wp-content/uploads/2025/07/Free-Premium-Brand-3D-Device-Website-Mockup9-scaled.jpg",
    # Footer assets
    "https://mediabubble.co/wp-content/uploads/2025/07/flag.png",
    "https://mediabubble.co/wp-content/uploads/2025/07/united-arab-emirates.png",
    # Book a Consultation (CTA asset)
    "https://mediabubble.co/wp-content/uploads/2025/01/Book-a-Consultation.webp",
    # Blog images
    "https://mediabubble.co/wp-content/uploads/elementor/thumbs/Star-02-r0x8ypii43ikvgdnckjynk79ktnrplt9b3i5wv9vmk.webp",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; MediaBubble-Archiver/1.0)"
}


def slugify(path):
    s = path.strip("/").replace("/", "-")
    return s if s else "index"


def download_file(url, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return "skipped"
    try:
        req = Request(url, headers=HEADERS)
        data = urlopen(req, timeout=30, context=ssl_ctx).read()
        dest.write_bytes(data)
        return "ok"
    except Exception as e:
        return f"error: {e}"


def main():
    html_dir = OUT / "pages"
    images_dir = OUT / "images"
    favicon_dir = OUT / "favicon"

    os.makedirs(html_dir, exist_ok=True)
    os.makedirs(images_dir, exist_ok=True)
    os.makedirs(favicon_dir, exist_ok=True)

    results = {"pages": [], "images": [], "favicons": [], "logo": []}

    # Download all pages
    print(f"Downloading {len(PAGES)} pages...")
    with ThreadPoolExecutor(max_workers=5) as ex:
        futures = {}
        for path in PAGES:
            url = BASE + path
            dest = html_dir / f"{slugify(path)}.html"
            futures[ex.submit(download_file, url, dest)] = (url, dest, "pages")
        for f in as_completed(futures):
            url, dest, kind = futures[f]
            result = f.result()
            results[kind].append((url, result))
            icon = "✓" if result == "ok" else ("→" if result == "skipped" else "✗")
            print(f"  {icon} {url} -> {dest.name} [{result}]")

    # Download all images
    print(f"\nDownloading {len(IMAGES)} images...")
    with ThreadPoolExecutor(max_workers=10) as ex:
        futures = {}
        for url in IMAGES:
            parsed = urllib.parse.urlparse(url)
            path_parts = parsed.path.strip("/").split("/")
            filename = os.path.basename(parsed.path)
            if not filename:
                filename = "unnamed"
            subdir = path_parts[-2] if len(path_parts) > 1 else "root"
            dest = images_dir / subdir / filename
            futures[ex.submit(download_file, url, dest)] = (url, dest, "images")
        for f in as_completed(futures):
            url, dest, kind = futures[f]
            result = f.result()
            results[kind].append((url, result))
            icon = "✓" if result == "ok" else ("→" if result == "skipped" else "✗")
            print(f"  {icon} {url} -> {dest.name} [{result}]")

    # Download favicons
    print("\nDownloading favicons...")
    for url in FAVICONS:
        fname = os.path.basename(urllib.parse.urlparse(url).path)
        dest = favicon_dir / fname
        r = download_file(url, dest)
        results["favicons"].append((url, r))
        print(f"  {'✓' if r == 'ok' else '→' if r == 'skipped' else '✗'} {url}")

    # Download logo
    print("\nDownloading logo...")
    dest = OUT / "logo.png"
    r = download_file(LOGO, dest)
    results["logo"].append((LOGO, r))
    print(f"  {'✓' if r == 'ok' else '→' if r == 'skipped' else '✗'} {LOGO}")

    # Summary
    ok_p = sum(1 for _, r in results["pages"] if r == "ok")
    ok_i = sum(1 for _, r in results["images"] if r == "ok")
    ok_f = sum(1 for _, r in results["favicons"] if r == "ok")
    ok_l = sum(1 for _, r in results["logo"] if r == "ok")
    sk_p = sum(1 for _, r in results["pages"] if r == "skipped")
    sk_i = sum(1 for _, r in results["images"] if r == "skipped")

    print(f"\n{'='*50}")
    print(f"DOWNLOAD COMPLETE")
    print(f"{'='*50}")
    print(f"Pages:      {ok_p} downloaded, {sk_p} skipped ({len(PAGES)} total)")
    print(f"Images:     {ok_i} downloaded, {sk_i} skipped ({len(IMAGES)} total)")
    print(f"Favicons:   {ok_f} downloaded")
    print(f"Logo:       {ok_l} downloaded")
    print(f"{'='*50}")
    print(f"Output:     {OUT}")
    print(f"{'='*50}")


if __name__ == "__main__":
    t0 = time.time()
    main()
    print(f"\nTime: {time.time() - t0:.1f}s")
