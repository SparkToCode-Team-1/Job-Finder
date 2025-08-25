import React, { useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./About.css";

const About: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".about .reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((el, i) => {
      el.style.transitionDelay = `${i * 120}ms`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="about"
      style={{ backgroundImage: "url('/assets/images/1756024199467.png')" }}>
      <div className="container">
        <h1 className=" pt-32">{language === "ar" ? "من نحن" : "About Us"}</h1>
        <div className="about-content">
          <section className="mission reveal">
            <h2>{language === "ar" ? "رسالتنا" : "Our Mission"}</h2>
            <p>
              {language === "ar"
                ? "نوفّر منصة مهنية موثوقة تربط الكفاءات الوطنية والإقليمية بفرص عمل نوعية، مع تمكين التحول الرقمي لعمليات الاستقطاب والتوظيف وتعزيز الكفاءة والمواءمة."
                : "We provide a trusted professional platform that connects national and regional talent with quality opportunities while enabling the digital transformation of recruitment and alignment processes."}
            </p>
          </section>
          <section className="vision reveal">
            <h2>{language === "ar" ? "رؤيتنا" : "Our Vision"}</h2>
            <p>
              {language === "ar"
                ? "أن نكون منصة محورية تدعم منظومة سوق العمل وتسهم في استدامة تنمية المواهب من خلال حلول تقنية موثوقة وقابلة للتوسع."
                : "To become a pivotal platform that supports the labour‑market ecosystem and sustains talent development through scalable, reliable technology solutions."}
            </p>
          </section>
          <section className="story reveal">
            <h2>{language === "ar" ? "خلفية تأسيسية" : "Background"}</h2>
            <p>
              {language === "ar"
                ? "يجمع فريقنا بين خبرات التدريب التقني، تحليل الاحتياج الوظيفي، وتصميم الحلول الرقمية لبناء منظومة تدعم الجودة والتكامل مع المبادرات الوطنية."
                : "Our team blends experience in technical training, occupational needs analysis, and digital solution design to build a framework that aligns with quality benchmarks and national initiatives."}
            </p>
          </section>
          <section className="values reveal">
            <h2>{language === "ar" ? "قيمنا الأساسية" : "Core Values"}</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>{language === "ar" ? "الاحترافية" : "Professionalism"}</h3>
                <p>
                  {language === "ar"
                    ? "نلتزم بإجراءات واضحة ومعايير تشغيل دقيقة لضمان تجربة منظمة لجميع الأطراف."
                    : "We adhere to structured procedures and precise operating standards to ensure an orderly experience for all parties."}
                </p>
              </div>
              <div className="value-item">
                <h3>{language === "ar" ? "الشفافية" : "Transparency"}</h3>
                <p>
                  {language === "ar"
                    ? "نوفر معلومات دقيقة وآليات تفاعل واضحة تعزز الثقة والاستمرارية."
                    : "We provide accurate information and clear interaction mechanisms that strengthen trust and continuity."}
                </p>
              </div>
              <div className="value-item">
                <h3>
                  {language === "ar"
                    ? "الابتكار المسؤول"
                    : "Responsible Innovation"}
                </h3>
                <p>
                  {language === "ar"
                    ? "نطوّر حلولاً قابلة للتوسع تراعي الجوانب التشغيلية والتنظيمية."
                    : "We develop scalable solutions that account for operational and regulatory dimensions."}
                </p>
              </div>
              <div className="value-item">
                <h3>
                  {language === "ar"
                    ? "التحسين المستمر"
                    : "Continuous Improvement"}
                </h3>
                <p>
                  {language === "ar"
                    ? "نقيس الأداء ونحلل البيانات لتطوير الخدمات وتعزيز الأثر طويل المدى."
                    : "We measure performance and analyse data to evolve services and enhance long‑term impact."}
                </p>
              </div>
            </div>
          </section>
          <section className="commitment reveal">
            <h2>{language === "ar" ? "التزامنا" : "Our Commitment"}</h2>
            <p>
              {language === "ar"
                ? "نلتزم بدعم مواءمة المخرجات التعليمية مع الاحتياجات الفعلية لسوق العمل، وتزويد أصحاب العمل بأدوات دقيقة، وتقديم قناة منظمة للباحثين عن عمل للوصول الفعال إلى الفرص."
                : "We are committed to aligning educational outputs with real labour‑market requirements, equipping employers with precise tools, and offering job seekers an orderly and effective access channel to opportunities."}
            </p>
          </section>
          <section className="team-info reveal">
            <h2>{language === "ar" ? "عن فريقنا" : "About Our Team"}</h2>
            <div className="team-content">
              <div className="team-image">
                <img
                  src="/assets/images/RihalGroup.jpg"
                  alt={
                    language === "ar" ? "فريق شركة حال" : "rihal Company Team"
                  }
                  className="team-photo"
                />
              </div>
              <div className="team-text">
                <p>
                  {language === "ar"
                    ? "نحن فريق من المدربين المحترفين في شركة حال، نجمع بين الخبرة العملية والشغف بالتطوير. نعمل على هذا المشروع بكل فخر وحماس، ونؤمن بأن النجاح يأتي من العمل الجماعي والرؤية المشتركة. مشروعنا هو انعكاس لطموحاتنا الكبيرة ورغبتنا في تحقيق التميز."
                    : "We are a team of professional trainers at rihal Company, combining practical experience with passion for development. We work on this project with pride and enthusiasm, believing that success comes from teamwork and shared vision. Our project reflects our big ambitions and desire to achieve excellence."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
