// ─── lib/schema.ts ───────────────────────────────────────────────────────────────
// All Google structured-data (JSON-LD) for the site lives here.
// Each page imports and calls the matching create*Schema() function,
// then passes the result to BaseLayout via the `schemaJson` prop.
//
// QUICK REFERENCE — which function to call on each page:
//   index.astro                    → createHomePageSchema()
//   services/index.astro           → createServicesHubSchema()
//   services/[any].astro           → createServicePageSchema({ slug, name, description, serviceType })
//   blog/index.astro               → createBlogIndexSchema(posts)
//   blog/[slug].astro              → createBlogPostSchema({ slug, title, description, ... })
//   about.astro                    → createAboutPageSchema()
//   faq.astro                      → createFaqPageSchema(faqs)
//   contact.astro                  → createContactPageSchema()
//   terms-of-use / privacy / disclaimer → createLegalPageSchema({ path, name, description })
//
// PAGE ENTITY RULES (Offer/Service scope):
//   • Homepage: full catalog (all OFFERS + all SERVICES)
//   • Services hub (/services): full catalog (all OFFERS + all SERVICES)
//   • Individual service page: ONLY the matching Offer + Service for that slug
//       Example: /services/excavation/ → offer-excavation + service-excavation
//   • Blog/About/FAQ/Contact/Legal pages: no Offer/Service catalog entities
//
// AREA TYPE CONSISTENCY:
//   • All pages reuse AREA_SERVED (single source of truth).
//   • If you change place types (City vs Place vs AdministrativeArea), change it once here.
//
// SHARED CONSTANTS (at top of file):
//   SITE_URL       → canonical origin, used in every absolute URL
//   IMG            → shorthand paths to each image folder
//   SERVICE_URLS   → full URLs for all 9 service pages
//   IDS            → @id anchors reused across @graph nodes
//   AREA_SERVED    → 7-entry geographic area list with sameAs links (shared by all pages)
//   SERVICES       → all 9 Service nodes (single source of truth)
//   OFFERS         → all 9 Offer nodes with itemOffered references
//   OPENING_HOURS  → hours spec reused by LocalBusiness and service pages
//   CREATOR        → GothamWebDev org node attached to every page WebSite
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = 'https://abcoguys.com';

const IMG = {
  heroes:    '/images/heros',
  logos:     '/images/logos',
  og:        '/images/og',
  portfolio: '/images/portfolio',
  schema:    '/images/schema',
};

const SERVICE_URLS = {
  landscaping: `${SITE_URL}/services/landscaping/`,
  excavation: `${SITE_URL}/services/excavation/`,
  propertyMaintenance: `${SITE_URL}/services/property-maintenance/`,
  treeRemoval: `${SITE_URL}/services/tree-removal/`,
  stumpGrinding: `${SITE_URL}/services/stump-grinding/`,
  seasonalCleanup: `${SITE_URL}/services/seasonal-cleanup/`,
  gravel: `${SITE_URL}/services/gravel/`,
  winterizing: `${SITE_URL}/services/winterizing/`,
  parkModelHomeRepair: `${SITE_URL}/services/park-model-home-repair/`,
  servicesHub: `${SITE_URL}/services/`,
};

const IDS = {
  website: `${SITE_URL}/#website`,
  webpage: `${SITE_URL}/#webpage`,
  business: `${SITE_URL}/#business`,
  organization: `${SITE_URL}/#organization`,
};

// Detailed area list with sameAs — used by every page including homepage
const AREA_SERVED = [
  { '@type': 'Place',              name: '18424',              sameAs: 'https://en.wikipedia.org/wiki/Gouldsboro,_Pennsylvania' },
  { '@type': 'Place',              name: '18444',              sameAs: 'https://en.wikipedia.org/wiki/Moscow,_Pennsylvania' },
  { '@type': 'City',               name: 'Scranton',           sameAs: 'https://en.wikipedia.org/wiki/Scranton,_Pennsylvania' },
  { '@type': 'AdministrativeArea', name: 'Eagle Lake',         sameAs: 'https://en.wikipedia.org/wiki/Eagle_Lake,_Pennsylvania' },
  { '@type': 'City',               name: 'Covington Township', sameAs: 'https://en.wikipedia.org/wiki/Covington_Township,_Lackawanna_County,_Pennsylvania' },
  { '@type': 'AdministrativeArea', name: 'Lackawanna County',  sameAs: 'https://en.wikipedia.org/wiki/Lackawanna_County,_Pennsylvania' },
  { '@type': 'AdministrativeArea', name: 'The Hideout',        sameAs: 'https://en.wikipedia.org/wiki/The_Hideout,_Pennsylvania' },
];

const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday'],
    opens: '09:30',
    closes: '16:30',
  },
];

const CREATOR = {
  '@type': 'Organization',
  name: 'GothamWebDev',
  url: 'https://gothamwebdev.com',
};

// All 9 services as schema.org Service nodes — single source of truth.
// Used by createBaseGraph() (all non-homepage pages) and createHomePageSchema().
// serviceType is valid here on Service, NOT on LocalBusiness (use makesOffer there instead).
const SERVICES = [
  {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-landscaping`,
    name: 'Landscaping',
    serviceType: 'Landscaping',
    description: 'Professional landscaping design, installation, and upkeep.',
    url: SERVICE_URLS.landscaping,
    provider: { '@id': IDS.business },
  },
  {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-excavation`,
    name: 'Excavation',
    serviceType: 'Excavation',
    description: 'Professional grading, trenching, and excavation services.',
    url: SERVICE_URLS.excavation,
    provider: { '@id': IDS.business },
  },
  {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-property-maintenance`,
    name: 'Property Maintenance',
    serviceType: 'Property Maintenance',
    description: 'Routine upkeep and maintenance for residential and commercial properties.',
    url: SERVICE_URLS.propertyMaintenance,
    provider: { '@id': IDS.business },
  },
  {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-tree-removal`,
    name: 'Tree Removal',
    serviceType: 'Tree Removal and Trimming',
    description: 'Safe tree felling and branch trimming.',
    url: SERVICE_URLS.treeRemoval,
    provider: { '@id': IDS.business },
  },
  {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-stump-grinding`,
    name: 'Stump Grinding',
    serviceType: 'Stump Grinding',
    description: 'Professional stump grinding and removal, ground below grade for replanting or turf.',
    url: SERVICE_URLS.stumpGrinding,
    provider: { '@id': IDS.business },
  },
  {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-seasonal-cleanup`,
    name: 'Seasonal Cleanup',
    serviceType: 'Seasonal Cleanup',
    description: 'Spring and Fall property cleanups, including leaf removal and bed clearing.',
    url: SERVICE_URLS.seasonalCleanup,
    provider: { '@id': IDS.business },
  },
  {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-gravel`,
    name: 'Gravel Delivery and Spreading',
    serviceType: 'Gravel Installation',
    description: 'Bulk gravel delivery, grading, and driveway installation.',
    url: SERVICE_URLS.gravel,
    provider: { '@id': IDS.business },
  },
  {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-winterizing`,
    name: 'Winterizing',
    serviceType: 'Winterizing',
    description: 'Property winterization services to protect homes and landscapes from freezing temperatures.',
    url: SERVICE_URLS.winterizing,
    provider: { '@id': IDS.business },
  },
  {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-park-model-home-repair`,
    name: 'Park Model Home Repair',
    serviceType: 'Home Repair',
    description: 'Specialized repair and maintenance for park model homes.',
    url: SERVICE_URLS.parkModelHomeRepair,
    provider: { '@id': IDS.business },
  },
];

// All 9 Offer nodes — one per service.
// LocalBusiness.makesOffer references these by @id; @graph includes full nodes via spreads.
const OFFERS = [
  { '@type': 'Offer', '@id': `${SITE_URL}/#offer-landscaping`,            itemOffered: { '@id': `${SITE_URL}/#service-landscaping` } },
  { '@type': 'Offer', '@id': `${SITE_URL}/#offer-excavation`,             itemOffered: { '@id': `${SITE_URL}/#service-excavation` } },
  { '@type': 'Offer', '@id': `${SITE_URL}/#offer-property-maintenance`,   itemOffered: { '@id': `${SITE_URL}/#service-property-maintenance` } },
  { '@type': 'Offer', '@id': `${SITE_URL}/#offer-tree-removal`,           itemOffered: { '@id': `${SITE_URL}/#service-tree-removal` } },
  { '@type': 'Offer', '@id': `${SITE_URL}/#offer-stump-grinding`,         itemOffered: { '@id': `${SITE_URL}/#service-stump-grinding` } },
  { '@type': 'Offer', '@id': `${SITE_URL}/#offer-seasonal-cleanup`,       itemOffered: { '@id': `${SITE_URL}/#service-seasonal-cleanup` } },
  { '@type': 'Offer', '@id': `${SITE_URL}/#offer-gravel`,                 itemOffered: { '@id': `${SITE_URL}/#service-gravel` } },
  { '@type': 'Offer', '@id': `${SITE_URL}/#offer-winterizing`,            itemOffered: { '@id': `${SITE_URL}/#service-winterizing` } },
  { '@type': 'Offer', '@id': `${SITE_URL}/#offer-park-model-home-repair`, itemOffered: { '@id': `${SITE_URL}/#service-park-model-home-repair` } },
];

function toAbsoluteUrl(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  if (path.startsWith('http')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

function createBusinessLogo() {
  return {
    '@type': 'ImageObject',
    url: toAbsoluteUrl(`${IMG.schema}/schema-logo.png`),
    width: '500',
    height: '500',
  };
}

// ─── createOrganization ───────────────────────────────────────────────────
// Returns a raw Organization node (@type: Organization).
// Used as the parent company record across all pages via createBaseGraph().
// Update: name, url, telephone, email, logo, image, sameAs social links.
function createOrganization() {
  return {
    '@type': 'Organization',
    '@id': IDS.organization,
    name: 'ABCO Landscaping',
    alternateName: 'ABCO Guys',
    url: SITE_URL,
    telephone: '+17188771197',
    email: 'sales@abcoguys.com',
    logo: createBusinessLogo(),
    image: toAbsoluteUrl(`${IMG.heroes}/ABCO-hero.webp`),
    sameAs: ['https://www.facebook.com/yourpage'],
  };
}

// ─── createLocalBusiness ─────────────────────────────────────────────────
// Returns a raw LocalBusiness node (@type: LocalBusiness).
// This is the physical business record: address, hours, areaServed, contactPoint.
// Called ONLY by createBaseGraph().
// `offerIds` controls which offers appear on the current page:
//   • service pages: one offer id (page-specific)
//   • services hub: all offer ids
//   • blog/about/contact/legal/faq: none (no service catalog noise)
// NOT used on the homepage (homepage builds its own HomeAndConstructionBusiness graph).
// Update: address, telephone, email, priceRange, openingHoursSpecification, areaServed.
function createLocalBusiness(options?: { offerIds?: string[] }) {
  const offerIds = options?.offerIds ?? [];

  return {
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/LandscapingBusiness',
    '@id': IDS.business,
    name: 'ABCO Landscaping',
    alternateName: 'ABCO Guys',
    url: SITE_URL,
    telephone: '+17188771197',
    email: 'sales@abcoguys.com',
    logo: createBusinessLogo(),
    image: [
      {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(`${IMG.schema}/abco-landscaping-truck-gouldsboro-pa.webp`),
        caption: 'ABCO Landscaping branded truck at a landscaping and excavation job site in Gouldsboro, PA 18424',
      },
      {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(`${IMG.schema}/abco-skid-steer-lot-clearing-gouldsboro-pa.webp`),
        caption: 'Skid steer performing lot clearing and brush removal at a residential property in Gouldsboro, PA 18424',
      },
    ],
    sameAs: ['https://www.facebook.com/yourpage'],
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gouldsboro',
      addressRegion: 'PA',
      postalCode: '18424',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+17188771197',
        availableLanguage: 'en',
      },
    ],
    ...(offerIds.length > 0
      ? {
          // LocalBusiness should reference Offer nodes via makesOffer.
          // Full Offer nodes are injected into @graph per-page in createBaseGraph().
          makesOffer: offerIds.map((id) => ({ '@id': id })),
        }
      : {}),
    areaServed: AREA_SERVED,
    openingHoursSpecification: OPENING_HOURS,
    parentOrganization: { '@id': IDS.organization },
  };
}

function getServiceIdForSlug(slug: string) {
  return `${SITE_URL}/#service-${slug}`;
}

function getOfferIdForSlug(slug: string) {
  return `${SITE_URL}/#offer-${slug}`;
}

function findServiceBySlug(slug: string) {
  return SERVICES.find((service) => service['@id'] === getServiceIdForSlug(slug));
}

function findOfferBySlug(slug: string) {
  return OFFERS.find((offer) => offer['@id'] === getOfferIdForSlug(slug));
}

function createWebSite(description: string) {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    url: SITE_URL,
    name: 'ABCO Landscaping',
    description,
    creator: CREATOR,
  };
}

function createBreadcrumbList(items: Array<{ name: string; url: string }>, idBase: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${idBase}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── createBaseGraph ─────────────────────────────────────────────────────
// Assembles the standard { "@context", "@graph": [...] } used by every page
// EXCEPT the homepage. Combines: WebSite + Organization + LocalBusiness +
// a caller-supplied webPageEntity (WebPage, ServicePage, BlogPosting, etc.).
// Every exported create*Schema() function (except createHomePageSchema) calls this.
// `additionalEntities` allows page-specific Offer/Service/ItemList nodes.
function createBaseGraph(
  webPageEntity: Record<string, unknown>,
  webSiteDescription: string,
  options?: {
    localBusinessOfferIds?: string[];
    additionalEntities?: Array<Record<string, unknown>>;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      createWebSite(webSiteDescription),
      createOrganization(),
      createLocalBusiness({ offerIds: options?.localBusinessOfferIds }),
      ...(options?.additionalEntities ?? []),
      {
        ...webPageEntity,
        creator: CREATOR,
      },
    ],
  };
}

// ─── createHomePageSchema ────────────────────────────────────────────────
// Standalone homepage schema — does NOT call createBaseGraph() or createLocalBusiness().
// Builds its own @graph from scratch using @type: HomeAndConstructionBusiness
// (more specific than LocalBusiness; used for Google rich results on the homepage).
// Includes: all 9 makesOffer/Service nodes, full areaServed list, contactPoint,
// priceRange, logo ImageObject, openingHours.
// Used ONLY in: src/pages/index.astro
// To add a service: add an Offer node, a Service node, and a makesOffer @id reference.
export function createHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': IDS.business,
        name: 'ABCO Landscaping',
        alternateName: 'ABCO Guys',
        url: `${SITE_URL}/`,
        telephone: '+1-718-877-1197',
        email: 'sales@abcoguys.com',
        priceRange: '$$',
        image: [
          {
            '@type': 'ImageObject',
            url: toAbsoluteUrl(`${IMG.portfolio}/abco-landscaping-truck-gouldsboro-pa.webp`),
            caption: 'ABCO Landscaping truck in Gouldsboro, PA',
            width: '1200',
            height: '675',
          },
          {
            '@type': 'ImageObject',
            url: toAbsoluteUrl(`${IMG.portfolio}/abco-skid-steer-lot-clearing-gouldsboro-pa.webp`),
            caption: 'ABCO Guys skid steer performing lot clearing and site preparation in Gouldsboro, PA',
            width: '1200',
            height: '675',
          },
        ],
        logo: createBusinessLogo(),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Gouldsboro',
          addressRegion: 'PA',
          postalCode: '18424',
          addressCountry: 'US',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+17188771197',
            availableLanguage: 'en',
          },
        ],
        areaServed: AREA_SERVED,
        openingHoursSpecification: OPENING_HOURS,
        makesOffer: OFFERS.map(o => ({ '@id': o['@id'] })),
      },
      ...OFFERS,
      ...SERVICES,
    ],
  };
}

// ─── createServicesHubSchema ─────────────────────────────────────────────────────────
// Schema for the /services/ hub page (CollectionPage + ItemList of 9 services).
// Used ONLY in: src/pages/services/index.astro
// To add a service: increment numberOfItems and add a ListItem.
export function createServicesHubSchema() {
  const pageUrl = `${SITE_URL}/services/`;
  const webPage = {
    '@type': ['WebPage', 'CollectionPage'],
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Landscaping, Excavation & Property Maintenance Services | Eagle Lake, PA',
    description:
      'Service overview for landscaping, excavation, and property maintenance in Eagle Lake, Gouldsboro, and Covington Township, PA.',
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
    mainEntity: { '@id': `${pageUrl}#services-list` },
  };

  const schema = createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.',
    {
      // Services hub is the catalog page, so include full offers/services here only.
      localBusinessOfferIds: OFFERS.map((offer) => offer['@id']),
      additionalEntities: [...OFFERS, ...SERVICES],
    }
  );

  (schema['@graph'] as Array<Record<string, unknown>>).push({
    '@type': 'ItemList',
    '@id': `${pageUrl}#services-list`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 9,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Landscaping Services',
        url: `${SITE_URL}/services/landscaping/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Excavation Services',
        url: `${SITE_URL}/services/excavation/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Property Maintenance Services',
        url: `${SITE_URL}/services/property-maintenance/`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Tree Removal Services',
        url: `${SITE_URL}/services/tree-removal/`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Stump Grinding Services',
        url: `${SITE_URL}/services/stump-grinding/`,
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Seasonal Cleanup Services',
        url: `${SITE_URL}/services/seasonal-cleanup/`,
      },
      {
        '@type': 'ListItem',
        position: 7,
        name: 'Gravel Delivery and Spreading Services',
        url: `${SITE_URL}/services/gravel/`,
      },
      {
        '@type': 'ListItem',
        position: 8,
        name: 'Winterizing Services',
        url: `${SITE_URL}/services/winterizing/`,
      },
      {
        '@type': 'ListItem',
        position: 9,
        name: 'Park Model Home Repair Services',
        url: `${SITE_URL}/services/park-model-home-repair/`,
      },
    ],
  });

  return schema;
}

// ─── createServicePageSchema ────────────────────────────────────────────────────────
// Schema for individual service pages (WebPage + Service + BreadcrumbList).
// Used in: every src/pages/services/[name].astro file.
// Options:
//   slug        → URL segment (e.g. "landscaping")
//   name        → human-readable service name (also used as page <title>)
//   description → service page meta description
//   serviceType → schema.org serviceType value (e.g. "Landscaping")
export function createServicePageSchema(options: {
  slug: string;
  name: string;
  description: string;
  serviceType: string;
}) {
  const pageUrl = `${SITE_URL}/services/${options.slug}/`;
  const service = findServiceBySlug(options.slug);
  const offer = findOfferBySlug(options.slug);
  const fallbackServiceId = `${pageUrl}#service`;
  const mainServiceId = service?.['@id'] ?? fallbackServiceId;

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: options.name,
    description: options.description,
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
    // Service pages should point to the one service they are about.
    mainEntity: { '@id': mainServiceId },
  };

  const pageEntities: Array<Record<string, unknown>> = [];

  if (offer) pageEntities.push(offer);

  if (service) {
    pageEntities.push(service);
  } else {
    // Fallback for any future slug that is not yet in SERVICES.
    pageEntities.push({
      '@type': 'Service',
      '@id': fallbackServiceId,
      name: options.name,
      serviceType: options.serviceType,
      description: options.description,
      provider: { '@id': IDS.business },
      areaServed: AREA_SERVED,
      url: pageUrl,
    });
  }

  const schema = createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.',
    {
      // Service pages: only one offer/service pair for the current slug.
      localBusinessOfferIds: offer ? [offer['@id']] : [],
      additionalEntities: pageEntities,
    }
  );

  (schema['@graph'] as Array<Record<string, unknown>>).push(
    createBreadcrumbList(
      [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Services', url: `${SITE_URL}/services/` },
        { name: options.name, url: pageUrl },
      ],
      pageUrl
    )
  );

  return schema;
}

// ─── createBlogIndexSchema ─────────────────────────────────────────────────────────
// Schema for the /blog/ listing page (CollectionPage + Blog + ItemList of all posts).
// Used ONLY in: src/pages/blog/index.astro
// The `posts` array is passed in from getCollection('blog') at build time.
export function createBlogIndexSchema(posts: Array<{ id: string; data: { title: string } }>) {
  const pageUrl = `${SITE_URL}/blog/`;
  const webPage = {
    '@type': ['WebPage', 'CollectionPage'],
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Landscaping & Excavation Blog | Eagle Lake, PA Homeowner Guides',
    description:
      'Practical landscaping, excavation, and property care guides for Eagle Lake, Gouldsboro, and Covington Township homeowners.',
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
    mainEntity: { '@id': `${pageUrl}#blog` },
  };

  const schema = createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.'
  );

  (schema['@graph'] as Array<Record<string, unknown>>).push(
    {
      '@type': 'Blog',
      '@id': `${pageUrl}#blog`,
      url: pageUrl,
      name: 'ABCO Landscaping Blog',
      isPartOf: { '@id': IDS.website },
      about: { '@id': IDS.business },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#blog-post-list`,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.data.title,
        url: `${SITE_URL}/blog/${post.id}/`,
      })),
    }
  );

  return schema;
}

// ─── createBlogPostSchema ──────────────────────────────────────────────────────────
// Schema for an individual blog post (WebPage + BlogPosting + BreadcrumbList).
// Used ONLY in: src/pages/blog/[slug].astro
// Tags from frontmatter are joined into the `keywords` field automatically.
export function createBlogPostSchema(options: {
  slug: string;
  title: string;
  description: string;
  pubDateIso: string;
  author?: string;
  tags?: string[];
}) {
  const pageUrl = `${SITE_URL}/blog/${options.slug}/`;
  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${options.title} | ABCO Landscaping`,
    description: options.description,
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
    mainEntity: { '@id': `${pageUrl}#blogposting` },
  };

  const schema = createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.'
  );

  const article: Record<string, unknown> = {
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#blogposting`,
    headline: options.title,
    description: options.description,
    datePublished: options.pubDateIso,
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: options.author ?? 'ABCO Team',
    },
    publisher: { '@id': IDS.organization },
    articleSection: 'Landscaping and Outdoor Services',
  };

  if (options.tags?.length) {
    article.keywords = options.tags.join(', ');
  }

  (schema['@graph'] as Array<Record<string, unknown>>).push(
    article,
    createBreadcrumbList(
      [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Blog', url: `${SITE_URL}/blog/` },
        { name: options.title, url: pageUrl },
      ],
      pageUrl
    )
  );

  return schema;
}

// ─── createAboutPageSchema ─────────────────────────────────────────────────────────
// Schema for the /about/ page (AboutPage + BreadcrumbList).
// Used ONLY in: src/pages/about.astro
export function createAboutPageSchema() {
  const pageUrl = `${SITE_URL}/about/`;
  const webPage = {
    '@type': ['WebPage', 'AboutPage'],
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'About ABCO Landscaping in Eagle Lake, PA',
    description:
      'Learn about ABCO Landscaping, our values, service area, and local outdoor service experience in Eagle Lake, PA.',
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
    mainEntity: { '@id': IDS.business },
  };

  const schema = createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.'
  );

  (schema['@graph'] as Array<Record<string, unknown>>).push(
    createBreadcrumbList(
      [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'About', url: pageUrl },
      ],
      pageUrl
    )
  );

  return schema;
}

// ─── createFaqPageSchema ───────────────────────────────────────────────────────────
// Schema for the /faq/ page (FAQPage with Question/Answer pairs + BreadcrumbList).
// Used ONLY in: src/pages/faq.astro
// The `faqs` array is passed in from the page's own data array.
export function createFaqPageSchema(faqs: Array<{ q: string; a: string }>) {
  const pageUrl = `${SITE_URL}/faq/`;
  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Landscaping, Excavation & Property Maintenance FAQs',
    description:
      'Common questions about ABCO landscaping, excavation, and property maintenance services in Eagle Lake, PA and nearby areas.',
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
    mainEntity: { '@id': `${pageUrl}#faq` },
  };

  const schema = createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.'
  );

  (schema['@graph'] as Array<Record<string, unknown>>).push(
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
    createBreadcrumbList(
      [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'FAQ', url: pageUrl },
      ],
      pageUrl
    )
  );

  return schema;
}

// ─── createContactPageSchema ────────────────────────────────────────────────────────
// Schema for the /contact/ page (ContactPage + BreadcrumbList).
// Used ONLY in: src/pages/contact.astro
export function createContactPageSchema() {
  const pageUrl = `${SITE_URL}/contact/`;
  const webPage = {
    '@type': ['WebPage', 'ContactPage'],
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Contact ABCO Landscaping | Free Estimates in Eagle Lake, PA',
    description:
      'Contact ABCO Landscaping for landscaping, excavation, and property maintenance estimates in Eagle Lake, Gouldsboro, and Covington Township, PA.',
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
    mainEntity: { '@id': IDS.business },
  };

  const schema = createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.'
  );

  (schema['@graph'] as Array<Record<string, unknown>>).push(
    createBreadcrumbList(
      [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Contact', url: pageUrl },
      ],
      pageUrl
    )
  );

  return schema;
}

// ─── createLegalPageSchema ─────────────────────────────────────────────────────────
// Schema for the three legal pages: terms-of-use, privacy-policy, disclaimer.
// Used in: src/pages/terms-of-use.astro, privacy-policy.astro, disclaimer.astro
// Set pageType to 'PrivacyPolicy' for the privacy page; omit for the others.
export function createLegalPageSchema(options: {
  path: '/terms-of-use/' | '/privacy-policy/' | '/disclaimer/';
  name: string;
  description: string;
  pageType?: 'WebPage' | 'PrivacyPolicy';
}) {
  const pageUrl = `${SITE_URL}${options.path}`;
  const webPage = {
    '@type': options.pageType ?? 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: options.name,
    description: options.description,
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
  };

  return createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.'
  );
}
