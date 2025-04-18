// src/app/[lang]/page.tsx

import About from '@/components/About';
import Hero from '@/components/Hero';
import PageContainer from '@/components/PageContainer';
import SkillsSection from '@/components/SkillsSection';
import ProjectList from '@/components/ProjectList';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <section className="p-6">
      <PageContainer isAnimating={true}>
        <Hero />
        <About />
        <SkillsSection />
      </PageContainer>
      <PageContainer>
        <ProjectList />
        <ContactForm />
      </PageContainer>
      <Footer />

    </section>
  );
}
