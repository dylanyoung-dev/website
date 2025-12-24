import { Layout } from "@/components/ui/Layout/Layout";
import { TallyForm } from "@/components/forms";

export const metadata = {
  title: "Dylan Young | Contact Me for more information",
  description: "Leave feedback about my blogs, app projects or general feedback.",
};

export default function ContactPage() {
  return (
    <Layout
      metaTitle="Dylan Young | Contact Me for more information"
      metaDescription="Leave feedback about my blogs, app projects or general feedback."
    >
      <section className="relative w-full sm:w-md md:w-md lg:w-xl xl:w-6xl">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-3xl font-semibold">Contact Me</h1>
            <TallyForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}


