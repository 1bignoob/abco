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
  servicesHub: `${SITE_URL}/services/`,
};

const IDS = {
  website: `${SITE_URL}/#website`,
  webpage: `${SITE_URL}/#webpage`,
  business: `${SITE_URL}/#business`,
  organization: `${SITE_URL}/#organization`,
};

const SERVICE_TYPES = [
  'Landscaping',
  'Excavation',
  'Tree removal',
  'Tree pruning',
  'Property maintenance',
];

const AREA_SERVED = [
  { '@type': 'Place', name: 'Eagle Lake, PA' },
  { '@type': 'Place', name: 'Gouldsboro, PA' },
  { '@type': 'Place', name: 'Covington Township, PA' },
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

function toAbsoluteUrl(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  if (path.startsWith('http')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

function createOrganization() {
  return {
    '@type': 'Organization',
    '@id': IDS.organization,
    name: 'ABCO Landscaping & Construction',
    alternateName: 'ABCO Guys',
    url: SITE_URL,
    telephone: '+17188771197',
    email: 'sales@abcoguys.com',
    logo: toAbsoluteUrl(`${IMG.logos}/ABCO-logo.webp`),
    image: toAbsoluteUrl(`${IMG.heroes}/ABCO-hero.webp`),
    sameAs: ['https://www.facebook.com/yourpage'],
  };
}

function createLocalBusiness() {
  return {
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/LandscapingBusiness',
    '@id': IDS.business,
    name: 'ABCO Landscaping & Construction',
    alternateName: 'ABCO Guys',
    url: SITE_URL,
    telephone: '+17188771197',
    email: 'sales@abcoguys.com',
    logo: toAbsoluteUrl(`${IMG.logos}/ABCO-logo.webp`),
    image: toAbsoluteUrl(`${IMG.heroes}/ABCO-hero.webp`),
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
    serviceType: SERVICE_TYPES,
    areaServed: AREA_SERVED,
    openingHoursSpecification: OPENING_HOURS,
    parentOrganization: { '@id': IDS.organization },
  };
}

function createWebSite(description: string) {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    url: SITE_URL,
    name: 'ABCO Landscaping & Construction',
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

function createBaseGraph(webPageEntity: Record<string, unknown>, webSiteDescription: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      createWebSite(webSiteDescription),
      createOrganization(),
      createLocalBusiness(),
      {
        ...webPageEntity,
        creator: CREATOR,
      },
    ],
  };
}

export function createHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': IDS.business,
        name: 'ABCO Landscaping & Construction',
        alternateName: 'ABCO Guys',
        url: `${SITE_URL}/`,
        telephone: '+1-718-877-1197',
        email: 'sales@abcoguys.com',
        logo: {
          '@type': 'ImageObject',
          url: toAbsoluteUrl(`${IMG.schema}/schema-logo.png`),
          width: '500',
          height: '500',
        },
        image: [
          toAbsoluteUrl(`${IMG.schema}/schema-image.webp`),
          toAbsoluteUrl(`${IMG.portfolio}/schema-image.webp`),
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Gouldsboro',
          addressRegion: 'PA',
          postalCode: '18424',
          addressCountry: 'US',
        },
        areaServed: [
          {
            '@type': 'PostalCode',
            postalCode: '18424',
          },
          {
            '@type': 'PostalCode',
            postalCode: '18444',
          },
          {
            '@type': 'City',
            name: 'Scranton',
            sameAs: 'https://en.wikipedia.org/wiki/Scranton,_Pennsylvania',
            postalCode: '18512',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Eagle Lake',
            sameAs: 'https://en.wikipedia.org/wiki/Eagle_Lake,_Pennsylvania',
          },
          {
            '@type': 'City',
            name: 'Covington Township',
            sameAs: 'https://en.wikipedia.org/wiki/Covington_Township,_Lackawanna_County,_Pennsylvania',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Lackawanna County',
            sameAs: 'https://en.wikipedia.org/wiki/Lackawanna_County,_Pennsylvania',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'The Hideout',
            sameAs: 'https://en.wikipedia.org/wiki/The_Hideout,_Pennsylvania',
          },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:30',
            closes: '16:30',
          },
        ],
        makesOffer: [
          { '@id': `${SITE_URL}/#offer-landscaping` },
          { '@id': `${SITE_URL}/#offer-excavation` },
          { '@id': `${SITE_URL}/#offer-property-maintenance` },
          { '@id': `${SITE_URL}/#offer-tree-removal` },
          { '@id': `${SITE_URL}/#offer-lawn-care` },
          { '@id': `${SITE_URL}/#offer-seasonal-cleanup` },
          { '@id': `${SITE_URL}/#offer-gravel` },
          { '@id': `${SITE_URL}/#offer-winterizing` },
          { '@id': `${SITE_URL}/#offer-park-model-home-repair` },
        ],
      },
      {
        '@type': 'Offer',
        '@id': `${SITE_URL}/#offer-landscaping`,
        itemOffered: { '@id': `${SITE_URL}/#service-landscaping` },
      },
      {
        '@type': 'Offer',
        '@id': `${SITE_URL}/#offer-excavation`,
        itemOffered: { '@id': `${SITE_URL}/#service-excavation` },
      },
      {
        '@type': 'Offer',
        '@id': `${SITE_URL}/#offer-property-maintenance`,
        itemOffered: { '@id': `${SITE_URL}/#service-property-maintenance` },
      },
      {
        '@type': 'Offer',
        '@id': `${SITE_URL}/#offer-tree-removal`,
        itemOffered: { '@id': `${SITE_URL}/#service-tree-removal` },
      },
      {
        '@type': 'Offer',
        '@id': `${SITE_URL}/#offer-lawn-care`,
        itemOffered: { '@id': `${SITE_URL}/#service-lawn-care` },
      },
      {
        '@type': 'Offer',
        '@id': `${SITE_URL}/#offer-seasonal-cleanup`,
        itemOffered: { '@id': `${SITE_URL}/#service-seasonal-cleanup` },
      },
      {
        '@type': 'Offer',
        '@id': `${SITE_URL}/#offer-gravel`,
        itemOffered: { '@id': `${SITE_URL}/#service-gravel` },
      },
      {
        '@type': 'Offer',
        '@id': `${SITE_URL}/#offer-winterizing`,
        itemOffered: { '@id': `${SITE_URL}/#service-winterizing` },
      },
      {
        '@type': 'Offer',
        '@id': `${SITE_URL}/#offer-park-model-home-repair`,
        itemOffered: { '@id': `${SITE_URL}/#service-park-model-home-repair` },
      },
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
        serviceType: 'Tree Service',
        description: 'Safe tree felling, branch trimming, and stump grinding.',
        url: SERVICE_URLS.servicesHub,
        provider: { '@id': IDS.business },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-lawn-care`,
        name: 'Lawn Care',
        serviceType: 'Lawn Care',
        description: 'Routine lawn mowing, edging, weed control, and turf care.',
        url: SERVICE_URLS.propertyMaintenance,
        provider: { '@id': IDS.business },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-seasonal-cleanup`,
        name: 'Seasonal Cleanup',
        serviceType: 'Seasonal Cleanup',
        description: 'Spring and Fall property cleanups, including leaf removal and bed clearing.',
        url: SERVICE_URLS.propertyMaintenance,
        provider: { '@id': IDS.business },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-gravel`,
        name: 'Gravel Delivery and Spreading',
        serviceType: 'Gravel Installation',
        description: 'Bulk gravel delivery, grading, and driveway installation.',
        url: SERVICE_URLS.excavation,
        provider: { '@id': IDS.business },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-winterizing`,
        name: 'Winterizing',
        serviceType: 'Winterizing',
        description: 'Property winterization services to protect homes and landscapes from freezing temperatures.',
        url: SERVICE_URLS.servicesHub,
        provider: { '@id': IDS.business },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-park-model-home-repair`,
        name: 'Park Model Home Repair',
        serviceType: 'Home Repair',
        description: 'Specialized repair and maintenance for park model homes.',
        url: SERVICE_URLS.servicesHub,
        provider: { '@id': IDS.business },
      },
    ],
  };
}

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
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.'
  );

  (schema['@graph'] as Array<Record<string, unknown>>).push({
    '@type': 'ItemList',
    '@id': `${pageUrl}#services-list`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 3,
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
    ],
  });

  return schema;
}

export function createServicePageSchema(options: {
  slug: 'landscaping' | 'excavation' | 'property-maintenance';
  name: string;
  description: string;
  serviceType: string;
}) {
  const pageUrl = `${SITE_URL}/services/${options.slug}/`;
  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: options.name,
    description: options.description,
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
    mainEntity: { '@id': `${pageUrl}#service` },
  };

  const schema = createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.'
  );

  (schema['@graph'] as Array<Record<string, unknown>>).push(
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: options.name,
      serviceType: options.serviceType,
      description: options.description,
      provider: { '@id': IDS.business },
      areaServed: AREA_SERVED,
      url: pageUrl,
    },
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
      name: 'ABCO Landscaping & Construction Blog',
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
    name: `${options.title} | ABCO Landscaping & Construction`,
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

export function createAboutPageSchema() {
  const pageUrl = `${SITE_URL}/about/`;
  const webPage = {
    '@type': ['WebPage', 'AboutPage'],
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'About ABCO Landscaping & Construction in Eagle Lake, PA',
    description:
      'Learn about ABCO Landscaping & Construction, our values, service area, and local outdoor service experience in Eagle Lake, PA.',
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

export function createContactPageSchema() {
  const pageUrl = `${SITE_URL}/contact/`;
  const webPage = {
    '@type': ['WebPage', 'ContactPage'],
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Contact ABCO Landscaping & Construction | Free Estimates in Eagle Lake, PA',
    description:
      'Contact ABCO Landscaping & Construction for landscaping, excavation, and property maintenance estimates in Eagle Lake, Gouldsboro, and Covington Township, PA.',
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
