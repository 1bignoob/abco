const SITE_URL = 'https://abcoguys.com';

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
    logo: toAbsoluteUrl('/logo.png'),
    image: toAbsoluteUrl('/hero.jpg'),
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
    logo: toAbsoluteUrl('/logo.png'),
    image: toAbsoluteUrl('/hero.jpg'),
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
      webPageEntity,
    ],
  };
}

export function createHomePageSchema() {
  const webPage = {
    '@type': 'WebPage',
    '@id': IDS.webpage,
    url: `${SITE_URL}/`,
    name: 'Landscaping & Excavation in Eagle Lake, PA | ABCO Landscaping & Construction',
    description:
      'ABCO Landscaping & Construction serves Eagle Lake, Gouldsboro, and Covington Township with landscaping, excavation, tree removal, and property maintenance services.',
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.business },
    mainEntity: { '@id': IDS.business },
  };

  const schema = createBaseGraph(
    webPage,
    'Landscaping, excavation, tree pruning and removal, and property maintenance in Eagle Lake, PA.'
  );

  const homeFaq = {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#homepage-faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What areas do you serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We serve Eagle Lake, Gouldsboro, Covington Township, and surrounding communities in northeastern Pennsylvania (ZIP 18424).',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer free estimates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — we provide free, no-obligation estimates for all landscaping, excavation, and property maintenance projects.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are your business hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Monday through Friday 8:00 AM – 6:00 PM, Saturday 9:30 AM – 4:30 PM. We are closed on Sundays.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work with residential and commercial customers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We take on residential homeowners, commercial property managers, and RV community sites across the Eagle Lake area.',
        },
      },
    ],
  };

  (schema['@graph'] as Array<Record<string, unknown>>).push(homeFaq);
  return schema;
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
