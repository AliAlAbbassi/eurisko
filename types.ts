export type FieldError = {
  field: string;
  message: string;
};

export type Doc = {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: [];
  headline: {
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
  };
  keywords: [];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: {
    original: string;
    person: [
      {
        firstname: string;
        middlename: string;
        lastname: string;
        qualifier: string;
        title: string;
        role: string;
        organization: string;
        rank: number;
      }
    ];
    organization: string;
  };
  _id: string;
  word_count: number;
  uri: string;
};
