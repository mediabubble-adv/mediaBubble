#!/bin/bash
# SEO-friendly rename of all assets
set -euo pipefail

cd "/Users/Dorgham/Documents/Work/Devleopment/mediiabubble Main/mediabubble-scrape/assets"

echo "=== CTA ==="
cd CTA
[[ -f "Book-a-Consultation.png" ]] && mv "Book-a-Consultation.png" "cta-book-consultation.png"
echo "  cta-book-consultation.png"
cd ..

echo "=== Icons ==="
cd Icons
[[ -f "flag.png" ]] && mv "flag.png" "icon-flag-egypt.png"
[[ -f "mediaBubble_Icon.svg" ]] && mv "mediaBubble_Icon.svg" "icon-media-bubble.svg"
[[ -f "Star-01.png" ]] && mv "Star-01.png" "icon-star-01.png"
[[ -f "Star-02.png" ]] && mv "Star-02.png" "icon-star-02.png"
[[ -f "united-arab-emirates.png" ]] && mv "united-arab-emirates.png" "icon-flag-uae.png"
echo "  icon-flag-egypt.png, icon-media-bubble.svg, icon-star-01.png, icon-star-02.png, icon-flag-uae.png"
cd ..

echo "=== Logos ==="
cd Logos
[[ -f "Aldau-logo.png" ]] && mv "Aldau-logo.png" "logo-aldau.png"
[[ -f "Asset-1x4sax.png" ]] && mv "Asset-1x4sax.png" "logo-asset.png"
[[ -f "ERC-Logo.png" ]] && mv "ERC-Logo.png" "logo-erc.png"
[[ -f "Favicon.png" ]] && mv "Favicon.png" "logo-favicon.png"
[[ -f "Favicon.svg" ]] && mv "Favicon.svg" "logo-favicon.svg"
[[ -f "GG-logo-Original.png" ]] && mv "GG-logo-Original.png" "logo-gg-original.png"
[[ -f "Logo-White.png" ]] && mv "Logo-White.png" "logo-media-bubble-white.png"
[[ -f "Selena-Logo-white.png" ]] && mv "Selena-Logo-white.png" "logo-selena-white.png"
[[ -f "Shal-Hasheesh-01-1.png" ]] && mv "Shal-Hasheesh-01-1.png" "logo-sahl-hasheesh.png"
echo "  All logos renamed with logo- prefix"
cd ..

echo "=== Mockups ==="
cd Mockups
[[ -f "09_Plastic-Card-Mockup.jpg" ]] && mv "09_Plastic-Card-Mockup.jpg" "mockup-plastic-card.jpg"
[[ -f "Bag-PSD-MockUp-2.jpg" ]] && mv "Bag-PSD-MockUp-2.jpg" "mockup-bag.jpg"
[[ -f "Baner_Frame_Stand_Mockup.jpg" ]] && mv "Baner_Frame_Stand_Mockup.jpg" "mockup-banner-stand.jpg"
[[ -f "Banner.jpg" ]] && mv "Banner.jpg" "mockup-banner.jpg"
[[ -f "Coaster-1.jpg" ]] && mv "Coaster-1.jpg" "mockup-coaster.jpg"
[[ -f "Envelope_Mockup_4.png" ]] && mv "Envelope_Mockup_4.png" "mockup-envelope-4.png"
[[ -f "Envelope-Mockup.jpg" ]] && mv "Envelope-Mockup.jpg" "mockup-envelope.jpg"
[[ -f "Flag_Mockup.jpg" ]] && mv "Flag_Mockup.jpg" "mockup-flag.jpg"
[[ -f "Hard-Hat.jpg" ]] && mv "Hard-Hat.jpg" "mockup-hard-hat.jpg"
[[ -f "Mockup-1-1.png" ]] && mv "Mockup-1-1.png" "mockup-01.png"
[[ -f "Mockup-2-1.png" ]] && mv "Mockup-2-1.png" "mockup-02.png"
[[ -f "Mockup-3.png" ]] && mv "Mockup-3.png" "mockup-03.png"
[[ -f "Mockup-4.png" ]] && mv "Mockup-4.png" "mockup-04.png"
[[ -f "Mockup.png" ]] && mv "Mockup.png" "mockup-05.png"
[[ -f "Mug-Mockup.jpg" ]] && mv "Mug-Mockup.jpg" "mockup-mug.jpg"
[[ -f "Mug-Mockup.png" ]] && mv "Mug-Mockup.png" "mockup-mug.png"
[[ -f "Mug.jpg" ]] && mv "Mug.jpg" "mockup-mug-photo.jpg"
[[ -f "name-tag.jpg" ]] && mv "name-tag.jpg" "mockup-name-tag.jpg"
[[ -f "Roll-Up.jpg" ]] && mv "Roll-Up.jpg" "mockup-roll-up.jpg"
[[ -f "Round_Coaster_Mockup_2.png" ]] && mv "Round_Coaster_Mockup_2.png" "mockup-coaster-round.png"
echo "  All mockups renamed with mockup- prefix"
cd ..

echo "=== Photos ==="
cd Photos
[[ -f "corporate-face-1.png" ]] && mv "corporate-face-1.png" "photo-team-1.png"
[[ -f "corporate-face-2.png" ]] && mv "corporate-face-2.png" "photo-team-2.png"
[[ -f "corporate-face-3.png" ]] && mv "corporate-face-3.png" "photo-team-3.png"
[[ -f "corporate-face-4.png" ]] && mv "corporate-face-4.png" "photo-team-4.png"
[[ -f "corporate-face-5.png" ]] && mv "corporate-face-5.png" "photo-team-5.png"
[[ -f "corporate-outcomes.png" ]] && mv "corporate-outcomes.png" "photo-corporate-outcomes.png"
[[ -f "corporate-timeline-1.png" ]] && mv "corporate-timeline-1.png" "photo-timeline-1.png"
[[ -f "corporate-timeline-2.png" ]] && mv "corporate-timeline-2.png" "photo-timeline-2.png"
[[ -f "corporate-timeline-3.png" ]] && mv "corporate-timeline-3.png" "photo-timeline-3.png"
[[ -f "corporate-timeline-4.png" ]] && mv "corporate-timeline-4.png" "photo-timeline-4.png"
[[ -f "corporate-timeline-5.png" ]] && mv "corporate-timeline-5.png" "photo-timeline-5.png"
[[ -f "Global-Reach-01.png" ]] && mv "Global-Reach-01.png" "photo-global-reach.png"
[[ -f "Graph-01.png" ]] && mv "Graph-01.png" "photo-growth-graph.png"
[[ -f "Our-3-Step-Approach.png" ]] && mv "Our-3-Step-Approach.png" "photo-3-step-approach.png"
[[ -f "Screenshot-2025-01-31-at-8.06.58%E2%80%AFPM.png" ]] && mv "Screenshot-2025-01-31-at-8.06.58%E2%80%AFPM.png" "photo-event-exhibition-1.png"
[[ -f "Screenshot-2025-01-31-at-8.09.02%E2%80%AFPM.png" ]] && mv "Screenshot-2025-01-31-at-8.09.02%E2%80%AFPM.png" "photo-event-exhibition-2.png"
echo "  All photos renamed with photo- prefix"
cd ..

echo "=== Real-Photos ==="
cd Real-Photos
[[ -f "1738757148256.jpeg" ]] && mv "1738757148256.jpeg" "real-printing-outdoor-01.jpeg"
[[ -f "IMG-20250327-WA0023.jpg" ]] && mv "IMG-20250327-WA0023.jpg" "real-printing-outdoor-02.jpg"
[[ -f "IMG-20250327-WA0026.jpg" ]] && mv "IMG-20250327-WA0026.jpg" "real-printing-outdoor-03.jpg"
[[ -f "IMG-20250706-WA0040.jpg" ]] && mv "IMG-20250706-WA0040.jpg" "real-printing-outdoor-04.jpg"
[[ -f "IMG-20250706-WA0042.jpg" ]] && mv "IMG-20250706-WA0042.jpg" "real-printing-outdoor-05.jpg"
[[ -f "IMG-20250706-WA0051.jpg" ]] && mv "IMG-20250706-WA0051.jpg" "real-printing-outdoor-06.jpg"
[[ -f "WhatsApp-Image-2025-03-27-at-00.25.42_867722c4.jpg" ]] && mv "WhatsApp-Image-2025-03-27-at-00.25.42_867722c4.jpg" "real-printing-outdoor-07.jpg"
echo "  All real-photos renamed with real- prefix"
cd ..

echo "=== Services ==="
cd Services
# Service illustrations
[[ -f "App-Store-Content-Optimization.png" ]] && mv "App-Store-Content-Optimization.png" "service-app-store-content-optimization.png"
[[ -f "Brand-Development.png" ]] && mv "Brand-Development.png" "service-brand-development.png"
[[ -f "Brand-Guidelines.png" ]] && mv "Brand-Guidelines.png" "service-brand-guidelines.png"
[[ -f "Brand-Messaging-Storytelling.png" ]] && mv "Brand-Messaging-Storytelling.png" "service-brand-messaging-storytelling.png"
[[ -f "Branding-Print-Solutions.png" ]] && mv "Branding-Print-Solutions.png" "service-branding-print-solutions.png"
[[ -f "Business-Analysis-Market-Research.png" ]] && mv "Business-Analysis-Market-Research.png" "service-business-analysis-research.png"
[[ -f "businesses-grow.png" ]] && mv "businesses-grow.png" "service-businesses-grow.png"
[[ -f "Campaign-Visuals.png" ]] && mv "Campaign-Visuals.png" "service-campaign-visuals.png"
[[ -f "CMS-Integration-Optimization.png" ]] && mv "CMS-Integration-Optimization.png" "service-cms-integration.png"
[[ -f "Content-Strategy.png" ]] && mv "Content-Strategy.png" "service-content-strategy.png"
[[ -f "Creative-Services.png" ]] && mv "Creative-Services.png" "service-creative-services.png"
[[ -f "CRM-Integration.png" ]] && mv "CRM-Integration.png" "service-crm-integration.png"
[[ -f "Digital-Presence-Optimization.png" ]] && mv "Digital-Presence-Optimization.png" "service-digital-presence-optimization.png"
[[ -f "Drive-More-Downloads-with-App-Store-Optimization.png" ]] && mv "Drive-More-Downloads-with-App-Store-Optimization.png" "service-aso-drive-downloads.png"
[[ -f "Email-Marketing.png" ]] && mv "Email-Marketing.png" "service-email-marketing.png"
[[ -f "Google-Ads-PPC-Display.png" ]] && mv "Google-Ads-PPC-Display.png" "service-google-ads-ppc.png"
[[ -f "Groth.png" ]] && mv "Groth.png" "service-growth.png"
[[ -f "Growth-Strategy-Development.png" ]] && mv "Growth-Strategy-Development.png" "service-growth-strategy-development.png"
[[ -f "Hosting-Domain-Management.png" ]] && mv "Hosting-Domain-Management.png" "service-hosting-domain-management.png"
[[ -f "Intuitive-UI-Design.png" ]] && mv "Intuitive-UI-Design.png" "service-intuitive-ui-design.png"
[[ -f "Keyword-Research-Optimization.png" ]] && mv "Keyword-Research-Optimization.png" "service-keyword-research.png"
[[ -f "Lead-Generation-Campaigns.png" ]] && mv "Lead-Generation-Campaigns.png" "service-lead-generation.png"
[[ -f "Local-SEO.png" ]] && mv "Local-SEO.png" "service-local-seo.png"
[[ -f "Logo-Design-Branding.png" ]] && mv "Logo-Design-Branding.png" "service-logo-design-branding.png"
[[ -f "Logo-Design-Visual-Identity.png" ]] && mv "Logo-Design-Visual-Identity.png" "service-logo-design-visual-identity.png"
[[ -f "Marketing-Digital-Growth.png" ]] && mv "Marketing-Digital-Growth.png" "service-marketing-digital-growth.png"
[[ -f "Media-Production.png" ]] && mv "Media-Production.png" "service-media-production.png"
[[ -f "Mobile-Responsiveness-1.png" ]] && mv "Mobile-Responsiveness-1.png" "service-mobile-responsiveness.png"
[[ -f "Motion-Graphics.png" ]] && mv "Motion-Graphics.png" "service-motion-graphics.png"
[[ -f "Off-Page-SEO.png" ]] && mv "Off-Page-SEO.png" "service-off-page-seo.png"
[[ -f "On-Page-Optimization.png" ]] && mv "On-Page-Optimization.png" "service-on-page-optimization.png"
[[ -f "Ongoing-Consultation-Performance-Tracking.png" ]] && mv "Ongoing-Consultation-Performance-Tracking.png" "service-consultation-performance-tracking.png"
[[ -f "Ongoing-Content-Updates-Management.png" ]] && mv "Ongoing-Content-Updates-Management.png" "service-content-updates-management.png"
[[ -f "Outdoor-Media-Buying.png" ]] && mv "Outdoor-Media-Buying.png" "service-outdoor-media-buying.png"
[[ -f "Performance-Optimization.png" ]] && mv "Performance-Optimization.png" "service-performance-optimization.png"
[[ -f "Photography.png" ]] && mv "Photography.png" "service-photography.png"
[[ -f "Plugin-Security-Updates.png" ]] && mv "Plugin-Security-Updates.png" "service-plugin-security-updates.png"
[[ -f "Print-Collateral.png" ]] && mv "Print-Collateral.png" "service-print-collateral.png"
[[ -f "Print-Design-Collateral.png" ]] && mv "Print-Design-Collateral.png" "service-print-design-collateral.png"
[[ -f "Printing-Outdoor.png" ]] && mv "Printing-Outdoor.png" "service-printing-outdoor.png"
[[ -f "Reels-Production.png" ]] && mv "Reels-Production.png" "service-reels-production.png"
[[ -f "Signage-Vinyl-Prints.png" ]] && mv "Signage-Vinyl-Prints.png" "service-signage-vinyl-prints.png"
[[ -f "Social-Media-Advertising.png" ]] && mv "Social-Media-Advertising.png" "service-social-media-advertising.png"
[[ -f "Social-Media-Management.png" ]] && mv "Social-Media-Management.png" "service-social-media-management.png"
[[ -f "Solutions.png" ]] && mv "Solutions.png" "service-solutions.png"
[[ -f "Speed-Optimization-1.png" ]] && mv "Speed-Optimization-1.png" "service-speed-optimization.png"
[[ -f "Start-Your-Digital.png" ]] && mv "Start-Your-Digital.png" "service-start-your-digital.png"
[[ -f "Strategic-Creative-Solutions-1.png" ]] && mv "Strategic-Creative-Solutions-1.png" "service-strategic-creative-solutions.png"
[[ -f "Strategy-Consulting.png" ]] && mv "Strategy-Consulting.png" "service-strategy-consulting.png"
[[ -f "Technical-Monitoring-Maintenance.png" ]] && mv "Technical-Monitoring-Maintenance.png" "service-technical-monitoring-maintenance.png"
[[ -f "Technical-SEO-Foundations.png" ]] && mv "Technical-SEO-Foundations.png" "service-technical-seo-foundations.png"
[[ -f "Technical-SEO.png" ]] && mv "Technical-SEO.png" "service-technical-seo.png"
[[ -f "User-Journey-Optimization-1.png" ]] && mv "User-Journey-Optimization-1.png" "service-user-journey-optimization.png"
[[ -f "User-Research-Journey-Mapping.png" ]] && mv "User-Research-Journey-Mapping.png" "service-user-research-journey-mapping.png"
[[ -f "UX-Optimization-for-Conversion.png" ]] && mv "UX-Optimization-for-Conversion.png" "service-ux-optimization-conversion.png"
[[ -f "UX-UI-Design.png" ]] && mv "UX-UI-Design.png" "service-ux-ui-design.png"
[[ -f "Video-Production.png" ]] && mv "Video-Production.png" "service-video-production.png"
[[ -f "Visual-Optimization.png" ]] && mv "Visual-Optimization.png" "service-visual-optimization.png"
[[ -f "Web-Development.png" ]] && mv "Web-Development.png" "service-web-development.png"
[[ -f "Web-Solutions.png" ]] && mv "Web-Solutions.png" "service-web-solutions.png"
[[ -f "Wireframing-Prototyping.png" ]] && mv "Wireframing-Prototyping.png" "service-wireframing-prototyping.png"
[[ -f "WordPress-Development.png" ]] && mv "WordPress-Development.png" "service-wordpress-development.png"

# Move website device mockups from Services to Mockups
for f in Free-Premium-Brand-3D-Device-Website-Mockup*.jpg; do
  [[ -f "$f" ]] || continue
  num=$(echo "$f" | grep -oE '[0-9]+' | tail -1)
  [[ -z "$num" ]] && num="1"
  mv "$f" "../Mockups/mockup-website-device-${num}.jpg"
done
echo "  All services renamed with service- prefix"
cd ..

echo "=== Social-Media ==="
cd Social-Media
[[ -f "Social-media-Layout-2024-10.png" ]] && mv "Social-media-Layout-2024-10.png" "social-layout-content-01.png"
[[ -f "Social-media-Layout-2024-11.png" ]] && mv "Social-media-Layout-2024-11.png" "social-layout-advertising-02.png"
[[ -f "Social-media-Layout-2024-12.png" ]] && mv "Social-media-Layout-2024-12.png" "social-layout-branding-03.png"
echo "  social-layout-content-01.png, social-layout-advertising-02.png, social-layout-branding-03.png"
cd ..

echo ""
echo "=== FINAL INVENTORY ==="
total=0
for d in */; do
  cnt=$(find "$d" -type f | wc -l | tr -d ' ')
  printf "  %-20s %d files\n" "$d" "$cnt"
  total=$((total+cnt))
done
echo "  TOTAL: $total files"
