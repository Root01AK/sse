import type { Schema, Struct } from '@strapi/strapi';

export interface BannerListHomeBanner extends Struct.ComponentSchema {
  collectionName: 'components_banner_list_home_banners';
  info: {
    displayName: 'Home_Banner';
  };
  attributes: {
    Banner_cta: Schema.Attribute.String;
    Banner_description: Schema.Attribute.Text;
    Banner_title: Schema.Attribute.Text;
    BannerImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface CtaAllPagesCta extends Struct.ComponentSchema {
  collectionName: 'components_cta_all_pages_ctas';
  info: {
    displayName: 'CTA';
    icon: 'crown';
  };
  attributes: {
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.Text;
  };
}

export interface FaQsFaqHeadings extends Struct.ComponentSchema {
  collectionName: 'components_fa_qs_faq_headings';
  info: {
    displayName: 'FaqHeadings';
  };
  attributes: {
    description: Schema.Attribute.Text;
    Faq_list: Schema.Attribute.Component<'fa-qs.faq-list', true>;
    title: Schema.Attribute.String;
  };
}

export interface FaQsFaqList extends Struct.ComponentSchema {
  collectionName: 'components_fa_qs_faq_lists';
  info: {
    displayName: 'FaqList';
  };
  attributes: {
    Answer: Schema.Attribute.Text;
    Question: Schema.Attribute.Text;
  };
}

export interface ListcontentHomeValues extends Struct.ComponentSchema {
  collectionName: 'components_listcontent_home_values';
  info: {
    displayName: 'Home_values';
  };
  attributes: {
    cards: Schema.Attribute.Component<'listcontent.values-card', true>;
    value_description: Schema.Attribute.Text;
    Value_title: Schema.Attribute.String;
  };
}

export interface ListcontentPHomeCards extends Struct.ComponentSchema {
  collectionName: 'components_listcontent_p_home_cards';
  info: {
    displayName: 'p-home-cards';
  };
  attributes: {
    product_img: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface ListcontentProductCards extends Struct.ComponentSchema {
  collectionName: 'components_listcontent_product_cards';
  info: {
    displayName: 'product-cards';
  };
  attributes: {
    cards: Schema.Attribute.Component<'listcontent.p-home-cards', true>;
    product_description: Schema.Attribute.Text;
    product_title: Schema.Attribute.String;
  };
}

export interface ListcontentValuesCard extends Struct.ComponentSchema {
  collectionName: 'components_listcontent_values_cards';
  info: {
    displayName: 'Values_card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ServingAreasServingAreaList extends Struct.ComponentSchema {
  collectionName: 'components_serving_areas_serving_area_lists';
  info: {
    displayName: 'serving_area_list';
  };
  attributes: {
    description: Schema.Attribute.Text;
    location: Schema.Attribute.Component<'serving-areas.servinglist', true>;
    title: Schema.Attribute.String;
  };
}

export interface ServingAreasServinglist extends Struct.ComponentSchema {
  collectionName: 'components_serving_areas_servinglists';
  info: {
    displayName: 'Servinglist';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SpecsSpecs extends Struct.ComponentSchema {
  collectionName: 'components_specs_specs';
  info: {
    displayName: 'specs';
  };
  attributes: {
    sizes: Schema.Attribute.Text;
    thickness: Schema.Attribute.String;
  };
}

export interface TestimonialsListTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_testimonials_list_testimonials';
  info: {
    displayName: 'Testimonials';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    quote: Schema.Attribute.Text;
    testi_cards: Schema.Attribute.Component<
      'testimonials-list.testimonials-cards',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface TestimonialsListTestimonialsCards
  extends Struct.ComponentSchema {
  collectionName: 'components_testimonials_list_testimonials_cards';
  info: {
    displayName: 'testimonials_cards';
    icon: 'briefcase';
  };
  attributes: {
    name: Schema.Attribute.String;
    profession: Schema.Attribute.String;
    reviews: Schema.Attribute.Text;
  };
}

export interface WhyChooseUsWhyList extends Struct.ComponentSchema {
  collectionName: 'components_why_choose_us_why_lists';
  info: {
    displayName: 'WhyList';
  };
  attributes: {
    images: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface WhyChooseUsWhyus extends Struct.ComponentSchema {
  collectionName: 'components_why_choose_us_whyuses';
  info: {
    displayName: 'Whyus';
    icon: 'bulletList';
  };
  attributes: {
    List: Schema.Attribute.Component<'why-choose-us.why-list', true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'banner-list.home-banner': BannerListHomeBanner;
      'cta-all-pages.cta': CtaAllPagesCta;
      'fa-qs.faq-headings': FaQsFaqHeadings;
      'fa-qs.faq-list': FaQsFaqList;
      'listcontent.home-values': ListcontentHomeValues;
      'listcontent.p-home-cards': ListcontentPHomeCards;
      'listcontent.product-cards': ListcontentProductCards;
      'listcontent.values-card': ListcontentValuesCard;
      'serving-areas.serving-area-list': ServingAreasServingAreaList;
      'serving-areas.servinglist': ServingAreasServinglist;
      'specs.specs': SpecsSpecs;
      'testimonials-list.testimonials': TestimonialsListTestimonials;
      'testimonials-list.testimonials-cards': TestimonialsListTestimonialsCards;
      'why-choose-us.why-list': WhyChooseUsWhyList;
      'why-choose-us.whyus': WhyChooseUsWhyus;
    }
  }
}
