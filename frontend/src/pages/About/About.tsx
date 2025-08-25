import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./About.css";

const About: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div
      className="about"
      style={{ backgroundImage: "url('/images/1756024199467.png')" }}>
      <div className="container">
        <h1 className=" pt-32">{language === "ar" ? "من نحن" : "About Us"}</h1>
        <div className="about-content">
          <section className="mission">
            <h2>{language === "ar" ? "مهمتنا" : "Our Mission"}</h2>
            <p>
              {language === "ar"
                ? "نحن فريق من المدربين المتخصصين في شركة حال، نعمل بشغف على تطوير وتحسين منصة البحث عن الوظائف. هدفنا هو ربط المواهب المميزة بالفرص الوظيفية المناسبة وتسهيل عملية التوظيف للجميع."
                : "We are a team of specialized trainers at rihal Company, working passionately to develop and improve the job search platform. Our goal is to connect outstanding talents with suitable job opportunities and facilitate the recruitment process for everyone."}
            </p>
          </section>

          <section className="story">
            <h2>{language === "ar" ? "قصتنا" : "Our Story"}</h2>
            <p>
              {language === "ar"
                ? "كفريق من المدربين في شركة رحال، نفخر بالعمل على هذا المشروع الطموح. أهدافنا كبيرة ورؤيتنا واضحة - نريد إحداث تغيير حقيقي في عالم التوظيف. نحن فخورون بما حققناه حتى الآن ونطمح للوصول إلى آفاق أكبر وأوسع."
                : "As a team of trainers at rihal Company, we are proud to work on this ambitious project. Our goals are big and our vision is clear - we want to make a real change in the world of recruitment. We are proud of what we have achieved so far and aspire to reach bigger and broader horizons."}
            </p>
          </section>

          <section className="values">
            <h2>
              {language === "ar"
                ? "قيمنا وطموحاتنا"
                : "Our Values & Aspirations"}
            </h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>🎯 {language === "ar" ? "التميز" : "Excellence"}</h3>
                <p>
                  {language === "ar"
                    ? "نسعى للتميز في كل ما نقوم به، من التدريب إلى تطوير المنصة."
                    : "We strive for excellence in everything we do, from training to platform development."}
                </p>
              </div>
              <div className="value-item">
                <h3>
                  🚀 {language === "ar" ? "الطموح الكبير" : "Big Ambitions"}
                </h3>
                <p>
                  {language === "ar"
                    ? "أهدافنا كبيرة ونعمل بجد لتحقيق رؤيتنا الطموحة في المستقبل."
                    : "Our goals are big and we work hard to achieve our ambitious vision for the future."}
                </p>
              </div>
              <div className="value-item">
                <h3>
                  💪{" "}
                  {language === "ar" ? "الفخر والإنجاز" : "Pride & Achievement"}
                </h3>
                <p>
                  {language === "ar"
                    ? "نحن فخورون بإنجازاتنا ونؤمن بقدرتنا على الوصول لأهداف أكبر."
                    : "We are proud of our achievements and believe in our ability to reach bigger goals."}
                </p>
              </div>
              <div className="value-item">
                <h3>
                  🌟 {language === "ar" ? "التطلع للأكبر" : "Aiming Higher"}
                </h3>
                <p>
                  {language === "ar"
                    ? "لا نكتفي بالحالي، بل نطمح دائماً للأكبر والأفضل في جميع مجالاتنا."
                    : "We don't settle for the current, but always aspire for bigger and better in all our fields."}
                </p>
              </div>
            </div>
          </section>

          <section className="team-info">
            <h2>{language === "ar" ? "عن فريقنا" : "About Our Team"}</h2>
            <div className="team-content">
              <div className="team-image">
                <img
                  src="/images/RihalGroup.jpg"
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
