import Hero from "@/components/site/home/hero/Hero";
import Feathers from "@/components/site/home/feathers/Feathers";
import ProductList from "@/components/site/home/productList/ProductList";
import SelectedComments from "@/components/site/home/selectedComments/SelectedComments";
import { getTranslations } from "@/i18n/getTranslations";

export default async function Home({ params }: { params: { locale: string } }) {

  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <>
      <Hero locale={locale} />
      <main >
        <Feathers locale={locale} />
        <ProductList locale={locale} />
        <SelectedComments locale={locale} />
      </main>
    </>
  );
}

