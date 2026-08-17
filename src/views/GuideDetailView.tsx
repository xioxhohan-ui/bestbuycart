import React, { useEffect, useState } from 'react';
import { contentService } from '../services/contentService';
import { Article, GuideSection } from '../types/content';
import { TableOfContents } from '../components/content/TableOfContents';
import { FAQAccordion } from '../components/content/FAQAccordion';
import { ArticleCommentsSection } from '../components/community/ArticleCommentsSection';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { BookOpen, Calendar, User, ShieldCheck, ChevronRight, Trophy, Star, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const GuideDetailView: React.FC<{ slug?: string }> = ({ slug = 'how-to-choose-headphones' }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [activeSection, setActiveSection] = useState<string>('sec-1');
  const { navigate } = useNavigation();
  const { formatPrice } = useCountry();

  useEffect(() => {
    contentService.getArticleBySlug(slug).then((art: Article | undefined) => {
      if (art) {
        setArticle(art);
        updatePageSEO(art.metaTitle, art.metaDescription);
      }
    });
  }, [slug]);

  if (!article) return null;

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Home
          </span>
          <ChevronRight size={13} />
          <span onClick={() => navigate('/guides')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Buying Guides
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>{article.title}</span>
        </div>

        {/* Article Header Banner */}
        <div style={{ maxWidth: '860px', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
            <BookOpen size={13} /> {article.category.toUpperCase()} BUYING GUIDE
          </div>

          <h1 className="h1" style={{ margin: '0 0 12px', fontSize: '2.2rem', lineHeight: 1.25, color: '#1A1A1A' }}>
            {article.title}
          </h1>

          <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: 1.5, margin: '0 0 20px' }}>
            {article.excerpt}
          </p>

          {/* Author & Fact Check Byline */}
          <div className="flex items-center gap-lg" style={{ fontSize: '0.82rem', color: '#6B7280', flexWrap: 'wrap' }}>
            <div className="flex items-center gap-xs">
              <User size={15} style={{ color: '#2563EB' }} />
              <span>By <strong style={{ color: '#1A1A1A' }}>{article.authorName}</strong> ({article.authorRole})</span>
            </div>

            <div className="flex items-center gap-xs">
              <ShieldCheck size={15} style={{ color: '#059669' }} />
              <span>Reviewed by <strong style={{ color: '#1A1A1A' }}>{article.reviewerName}</strong></span>
            </div>

            <div className="flex items-center gap-xs">
              <Calendar size={15} />
              <span>Updated: {article.updatedDate}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', height: '360px', marginBottom: '40px', boxShadow: 'var(--shadow-card)' }}>
          <img src={article.featuredImage} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Main Content Layout with Sticky Table of Contents */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '48px', alignItems: 'start' }}>
          {/* Main Article Body */}
          <div>
            {article.sections.map((sec: GuideSection) => (
              <div key={sec.id} id={sec.id} style={{ marginBottom: '40px' }}>
                <h2 className="h2" style={{ color: '#1A1A1A', fontSize: '1.4rem', margin: '0 0 14px', borderBottom: '2px solid #F1F5F9', paddingBottom: '8px' }}>
                  {sec.title}
                </h2>
                <div style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.7 }}>
                  {sec.contentHtml}
                </div>
              </div>
            ))}

            {/* Top Recommendations Structured Cards */}
            {article.topRecommendations && article.topRecommendations.length > 0 && (
              <div style={{ marginTop: '48px', marginBottom: '48px' }}>
                <div className="flex items-center gap-xs" style={{ marginBottom: '20px' }}>
                  <Trophy size={20} style={{ color: '#D97706' }} />
                  <h3 className="h2" style={{ margin: 0, fontSize: '1.35rem', color: '#1A1A1A' }}>
                    Top Tested Recommendations
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {article.topRecommendations.map((rec, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '18px',
                        border: '1.5px solid var(--border-default)',
                        padding: '24px',
                        display: 'grid',
                        gridTemplateColumns: '120px minmax(0, 1fr)',
                        gap: '20px',
                        alignItems: 'center',
                        boxShadow: 'var(--shadow-card)'
                      }}
                    >
                      <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                        <img src={rec.image} alt={rec.productName} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                      </div>

                      <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: rec.tag === 'Best Overall' ? '#EFF6FF' : '#ECFDF5', color: rec.tag === 'Best Overall' ? '#2563EB' : '#059669', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                          <Trophy size={11} /> {rec.tag}
                        </div>

                        <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', color: '#1A1A1A', fontWeight: 800 }}>
                          {rec.productName}
                        </h4>

                        <div className="flex items-center gap-md" style={{ marginBottom: '10px' }}>
                          <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1A1A1A' }}>
                            {formatPrice(rec.priceUSD)}
                          </span>
                          <span style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 700 }}>
                            Worth Score: {rec.worthScore}%
                          </span>
                          <span className="flex items-center gap-xs" style={{ fontSize: '0.82rem', color: '#D97706', fontWeight: 700 }}>
                            <Star size={12} fill="#D97706" style={{ color: '#D97706' }} /> {rec.rating}
                          </span>
                        </div>

                        <p style={{ margin: '0 0 14px', fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.4 }}>
                          {rec.highlight}
                        </p>

                        <div className="flex items-center gap-sm">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate('/product-detail')}
                          >
                            View Best Prices
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate('/is-it-worth-it')}
                          >
                            Is It Worth It?
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs Accordion */}
            {article.faqs.length > 0 && <FAQAccordion faqs={article.faqs} />}

            {/* Community Discussion Section */}
            <ArticleCommentsSection
              targetType="guide"
              targetId={article.id}
              targetTitle={article.title}
              targetUrl={`/guides/${slug}`}
            />
          </div>

          {/* Sticky Sidebar */}
          <div>
            <TableOfContents
              sections={article.sections}
              activeSectionId={activeSection}
              onSelectSection={scrollToSection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
