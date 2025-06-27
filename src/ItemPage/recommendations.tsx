import ProductListing from "../Homepage/productsListing";
import { ClothingItem } from "../Homepage/itemsHome";

interface RecommendationsProps {
  similarItems: ClothingItem[]
}

function Recommendations({ similarItems }: RecommendationsProps) {
  return (
    <>
      {similarItems.length > 0 && (
        <section className="container mx-auto mb-20">
          <h2 className="text-2xl text-[#4b6686] xl:pl-8 p-4 font-bold underline">
            You may also like
          </h2>
          <div className={`flex overflow-x-auto ${similarItems.length < 4 ? 'sm:justify-center' : ''} scrollbar-hide`}>
            <div className="flex gap-4 p-4">
              {similarItems.map((item) => (
                <div key={item.id}>
                  <ProductListing {...item} bool={true} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Recommendations
