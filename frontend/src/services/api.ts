// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5001';
const TENANT_ID = import.meta.env.VITE_TENANT_ID || 'ugc';

// Types
export interface PricingPlan {
  planKey: string;
  name: string;
  hours: string;
  price: number;
  setupFee: number;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export interface PricingResponse {
  lang: string;
  plans: PricingPlan[];
}

export interface HeroData {
  lang: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  ctaPrimary: string;
  urgency: string;
  stats: {
    clients: string;
    costSaved: string;
    rating: string;
  };
}

export interface HowItWorksStep {
  lang: string;
  stepNumber: number;
  title: string;
  description: string;
  icon?: string;
  stepLabel?: string;
}

export interface HowItWorksResponse {
  lang: string;
  steps: HowItWorksStep[];
}

export interface ServiceItem {
  lang: string;
  title: string;
  description: string;
  benefit: string;
  icon: string;
  order: number;
}

export interface ServicesResponse {
  lang: string;
  sourceLang?: string;
  services: ServiceItem[];
}

export interface TestimonialItem {
  lang: string;
  content: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  order: number;
}

export interface TestimonialsResponse {
  lang: string;
  testimonials: TestimonialItem[];
}

export interface BlogItem {
  lang: string;
  blogId: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  order?: number;
}

export interface BlogsResponse {
  lang: string;
  sourceLang?: string;
  blogs: BlogItem[];
}

export interface BlogByIdResponse {
  lang: string;
  blog: BlogItem;
}

export interface CaseStudyItem {
  lang: string;
  caseStudyId: number;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: Array<{ metric: string; value: string; description: string }>;
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  image: string;
  stats: {
    mainResult: string;
    timeframe: string;
    seoFocus: string;
    [key: string]: unknown;
  };
  order?: number;
}

export interface CaseStudiesResponse {
  lang: string;
  caseStudies: CaseStudyItem[];
}

export interface CaseStudyByIdResponse {
  lang: string;
  caseStudy: CaseStudyItem;
}

export interface FaqItem {
  lang: string;
  question: string;
  answer: string;
  order: number;
}

export interface FaqsResponse {
  lang: string;
  faqs: FaqItem[];
}

// API Service
class ApiService {
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'X-Tenant-ID': 'ugc', // Hardcoded to ugc for UGC pricing
    };
  }

  async getPricing(lang: string = 'en'): Promise<PricingResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pricing?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching pricing:', error);
      throw error;
    }
  }

  async getFAQs(lang: string = 'en'): Promise<FaqsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  }

  async getCaseStudies(lang: string = 'en'): Promise<CaseStudiesResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/case-studies?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching case studies:', error);
      throw error;
    }
  }

  async getCaseStudyById(caseStudyId: number, lang: string = 'en'): Promise<CaseStudyByIdResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/case-studies/${caseStudyId}?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching case study by id:', error);
      throw error;
    }
  }

  async getBlogs(lang: string = 'en'): Promise<BlogsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }

  async getBlogById(blogId: number, lang: string = 'en'): Promise<BlogByIdResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching blog by id:', error);
      throw error;
    }
  }

  async getTestimonials(lang: string = 'en'): Promise<TestimonialsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  }

  async getServices(lang: string = 'en'): Promise<ServicesResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  async getHero(lang: string = 'en'): Promise<HeroData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hero?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Backend returns { lang, hero }, we need to extract the hero data
      const heroData = result.hero || result;
      return heroData;
    } catch (error) {
      console.error('Error fetching hero:', error);
      throw error;
    }
  }

  async getHowItWorks(lang: string = 'en'): Promise<HowItWorksResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/how-it-works?lang=${lang}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching how it works:', error);
      throw error;
    }
  }

  // Admin methods (if needed later)
  async createPlan(planData: Partial<PricingPlan>, lang: string = 'en'): Promise<PricingPlan> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/pricing`, {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify({ lang, plan: planData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.plan;
    } catch (error) {
      console.error('Error creating plan:', error);
      throw error;
    }
  }

  async updatePlan(planKey: string, updates: Partial<PricingPlan>, lang: string = 'en'): Promise<PricingPlan> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/pricing/${planKey}`, {
        method: 'PUT',
        headers: {
          ...this.getHeaders(),
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify({ lang, updates }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.plan;
    } catch (error) {
      console.error('Error updating plan:', error);
      throw error;
    }
  }

  async deletePlan(planKey: string, lang: string = 'en'): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/pricing/${planKey}?lang=${lang}`, {
        method: 'DELETE',
        headers: {
          ...this.getHeaders(),
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
