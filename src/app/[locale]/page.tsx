// src/app/[lang]/page.tsx

import About from '@/components/About';
import Hero from '@/components/Hero';
import { useTranslations } from 'next-intl'
import PageContainer from '@/components/PageContainer';
import SkillsSection from '@/components/SkillsSection';
import ProjectList from '@/components/ProjectList';
import { Contact } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Page({ params }: { params: { lang: string } }) {

  const t = useTranslations()
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


    </section>
  );
}
