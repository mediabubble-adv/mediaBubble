#!/usr/bin/env node
/**
 * Targeted EG → UAE copy purge for apps/web-ae data files only.
 * Does NOT touch AE AR locales (use apply-khaliji-ae-ar.mjs for dialect).
 */
import fs from 'fs'
import path from 'path'

const root = path.resolve(import.meta.dirname, '..')
const aeRoot = path.join(root, 'apps/web-ae')

const TARGETS = [
  'lib/services-data.ts',
  'lib/data/case-studies.ts',
  'lib/data/blog-posts.ts',
  'lib/data/blog-authors.ts',
].map((p) => path.join(aeRoot, p))

function purgeAeCopy(text) {
  if (typeof text !== 'string') return text

  let out = text

  // Brand / client names (before generic geography swaps)
  out = out.replace(/Red Sea Divers/g, 'Gulf Divers Dubai')
  out = out.replace(/Aqua Sports Egypt/g, 'Aqua Sports UAE')
  out = out.replace(/Hurghada Rentals/g, 'Marina Rentals')
  out = out.replace(/MediaBubble Hurghada/g, 'MediaBubble UAE')

  // Slugs & asset paths
  out = out.replace(/seo-hurghada-tourism/g, 'seo-dubai-tourism')
  out = out.replace(/google-ads-roas-red-sea/g, 'google-ads-roas-uae-hotels')
  out = out.replace(/social-media-egypt/g, 'social-media-uae')
  out = out.replace(/branding-egyptian-businesses/g, 'branding-uae-businesses')
  out = out.replace(/google-business-profile-hurghada/g, 'google-business-profile-dubai')
  out = out.replace(/whatsapp-marketing-in-egypt/g, 'whatsapp-marketing-uae')
  out = out.replace(/id: 'red-sea-divers'/g, "id: 'gulf-divers'")
  out = out.replace(/portfolioAsset\('red-sea-divers'/g, "portfolioAsset('gulf-divers'")
  out = out.replace(/id: 'hurghada-rentals'/g, "id: 'marina-rentals'")
  out = out.replace(/portfolioAsset\('hurghada-rentals'/g, "portfolioAsset('marina-rentals'")

  // Phrases (longest first)
  out = out.replace(/Hurghada and Red Sea businesses/g, 'UAE and Gulf businesses')
  out = out.replace(/Hurghada and across Egypt/g, 'Dubai and across the UAE')
  out = out.replace(/across Egypt and the Gulf/g, 'across the UAE and the Gulf')
  out = out.replace(/across the Gulf and Egypt/g, 'across the UAE and the Gulf')
  out = out.replace(/businesses across Egypt/g, 'businesses across the UAE')
  out = out.replace(/serving businesses across Egypt/g, 'serving businesses across the UAE')
  out = out.replace(/Red Sea Governorate, Egypt/g, 'Dubai, UAE')
  out = out.replace(/Red Sea Governorate/g, 'Dubai')
  out = out.replace(/Red Sea region/g, 'UAE')
  out = out.replace(/Red Sea hospitality/g, 'UAE hospitality')
  out = out.replace(/Red Sea hotels/g, 'UAE hotels')
  out = out.replace(/Red Sea clients/g, 'UAE clients')
  out = out.replace(/Red Sea and UAE/g, 'UAE and Gulf')
  out = out.replace(/in the Red Sea region/g, 'in the UAE')
  out = out.replace(/Red Sea waters/g, 'Arabian Gulf waters')
  out = out.replace(/Red Sea conditions/g, 'choppy Gulf conditions')
  out = out.replace(/Red Sea/g, 'Arabian Gulf')
  out = out.replace(/scuba diving Red Sea/g, 'scuba diving Dubai')
  out = out.replace(/diving Hurghada/g, 'diving Dubai')
  out = out.replace(/for Hurghada Businesses/g, 'for UAE Businesses')
  out = out.replace(/for Hurghada businesses/g, 'for UAE businesses')
  out = out.replace(/for Hurghada and Red Sea businesses/g, 'for UAE and Gulf businesses')
  out = out.replace(/local Hurghada terms/g, 'local Dubai terms')
  out = out.replace(/Hurghada map pack/g, 'Dubai map pack')
  out = out.replace(/Hurghada hotel industry/g, 'UAE hotel industry')
  out = out.replace(/Hurghada searches/g, 'Dubai searches')
  out = out.replace(/Hurghada tourism/g, 'Dubai tourism')
  out = out.replace(/Hurghada businesses/g, 'UAE businesses')
  out = out.replace(/Hurghada market/g, 'UAE market')
  out = out.replace(/in Hurghada/g, 'in Dubai')
  out = out.replace(/near Hurghada/g, 'near Dubai')
  out = out.replace(/Hurghada's/g, "Dubai's")
  out = out.replace(/'Hurghada'/g, "'Dubai'")
  out = out.replace(/Hurghada/g, 'Dubai')

  out = out.replace(/Social Media in Egypt/g, 'Social Media in the UAE')
  out = out.replace(/WhatsApp Marketing in Egypt/g, 'WhatsApp Marketing in the UAE')
  out = out.replace(/Google Business Profile for Hurghada/g, 'Google Business Profile for Dubai')
  out = out.replace(/Small Egyptian Businesses/g, 'Small UAE Businesses')
  out = out.replace(/Egyptian businesses/g, 'UAE businesses')
  out = out.replace(/Egyptian consumers/g, 'UAE consumers')
  out = out.replace(/Egypt's social/g, "UAE's social")
  out = out.replace(/TikTok in Egypt/g, 'TikTok in the UAE')
  out = out.replace(/LinkedIn for B2B in Egypt/g, 'LinkedIn for B2B in the UAE')
  out = out.replace(/underused in Egypt/g, 'underused in the UAE')
  out = out.replace(/audiences over 35 in Egypt/g, 'audiences over 35 in the UAE')
  out = out.replace(/businesses in Egypt/g, 'businesses in the UAE')
  out = out.replace(/for Egypt/g, 'for the UAE')
  out = out.replace(/in Egypt/g, 'in the UAE')
  out = out.replace(/Egypt weather/g, 'UAE weather')
  out = out.replace(/Egypt/g, 'UAE')

  out = out.replace(/8,000 EGP\/month/g, '8,000 AED/month')
  out = out.replace(/EGP/g, 'AED')

  return out
}

for (const file of TARGETS) {
  const before = fs.readFileSync(file, 'utf8')
  const after = purgeAeCopy(before)
  if (before !== after) {
    fs.writeFileSync(file, after)
    console.log('Updated', path.relative(root, file))
  } else {
    console.log('No changes', path.relative(root, file))
  }
}
