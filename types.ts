export type FieldError = {
  field: string;
  message: string;
};

export type Doc = {
  id: string;
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: multimedia[];
  headline: {
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
  };
  keywords: keyword[];
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

export type keyword = {
  name: string;
  value: string;
  rank: number;
  major: string;
};

export type multimedia = {
  rank?: number;
  subtype?: string;
  caption?: string;
  credit?: string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: {
    widewidth: number;
    wideheight: number;
    wide: string;
  };
  subType: string;
  crop_name: string;
};
