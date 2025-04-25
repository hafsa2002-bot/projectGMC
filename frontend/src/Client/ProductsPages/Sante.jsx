import { ChevronDown, Info, Scale } from 'lucide-react'
import React, {useState} from 'react'

function Sante({product}) {
    const nutritionArray = [
        {
          label: "Énergie",
          per100g: `${product?.nutriments?.["energy-kj_100g"] ?? "-"} kJ (${product?.nutriments?.["energy-kcal_100g"] ?? "-"} kcal)`,
          perPortion: `${product?.nutriments?.["energy-kj_serving"] ?? "-"} kJ (${product?.nutriments?.["energy-kcal_serving"] ?? "-"} kcal)`,
        //   comparison: `-3 %`,
        },
        {
          label: "Matières grasses",
          per100g: `${product?.nutriments?.fat_100g ?? "-"} g`,
          perPortion: `${product?.nutriments?.fat_serving ?? "-"} g`,
        //   comparison: `+2 %`,
        },
        {
          label: "Acides gras saturés",
          per100g: `${product?.nutriments?.["saturated-fat_100g"] ?? "-"} g`,
          perPortion: `${product?.nutriments?.["saturated-fat_serving"] ?? "-"} g`,
        //   comparison: `+17 %`,
        },
        {
          label: "Glucides",
          per100g: `${product?.nutriments?.carbohydrates_100g ?? "-"} g`,
          perPortion: `${product?.nutriments?.carbohydrates_serving ?? "-"} g`,
        //   comparison: `-15 %`,
        },
        {
          label: "Sucres",
          per100g: `${product?.nutriments?.sugars_100g ?? "-"} g`,
          perPortion: `${product?.nutriments?.sugars_serving ?? "-"} g`,
        //   comparison: `-100 %`,
        },
        {
          label: "Fibres alimentaires",
          per100g: `${product?.nutriments?.fiber_100g ?? "-"} g`,
          perPortion: `${product?.nutriments?.fiber_serving ?? "-"} g`,
        //   comparison: `-100%`,
        },
        {
          label: "Protéines",
          per100g: `${product?.nutriments?.proteins_100g ?? "-"} g`,
          perPortion: `${product?.nutriments?.proteins_serving ?? "-"} g`,
        //   comparison: `-`,
        },
        {
          label: "Sel",
          per100g: `${product?.nutriments?.salt_100g ?? "-"} g`,
          perPortion: `${product?.nutriments?.salt_serving ?? "-"} g`,
        //   comparison: `-`,
        },
        {
          label: "Alcool",
          per100g: `${product?.nutriments?.alcohol_100g ?? "0"} % vol`,
          perPortion: `${product?.nutriments?.alcohol_serving ?? "0"} % vol`,
        //   comparison: ``,
        },
        {
            label: 'Fruits, légumes, noix et huiles de colza, noix et olive',
            per100g: `0 %`,
            perServing: `0 %`,
            // comparison: ``,
          },
      ];
     
    const [isOpen, setIsOpen] = useState(true);
  return (

    <div className="font-roboto w-11/12 max-w-5xl mx-auto mt-10 mb-12 px-4">
        {/* Section Title */}
        <div className="border-b border-gray-300 flex items-center gap-3 pb-2">
            <div className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <Info className="text-yellow-500" />
                Valeurs nutritionnelles et ingrédients
            </div>
        </div>

        {/* Nutriscore */}
        <div className="mt-6">
            <p className="text-gray-800 text-lg font-semibold mb-4">Nutrition</p>
            {   
                product?.nutriscore_grade == "a" 
                ? (
                    <div className='rounded-lg text-lg flex  p-4 gap-2 bg-green-200 hover:green-400'>
                        <div className='h-18'>
                            <img className='w-full h-full' src="/images/nutriscore-a-new-fr.svg" alt='nutriscore-a-new-fr' />
                        </div>
                        <div className='mt-1 ml-2'>
                            <p className='text-green-600'>Nutri-Score A</p>
                            <p>Très bonne qualité nutritionnelle</p>
                        </div>
                    </div>
                ) : product?.nutriscore_grade == "b"
                ? (
                    <div className='rounded-lg text-lg flex  p-4 gap-2 bg-green-100 hover:green-300'>
                        <div className='h-18'>
                            <img className='w-full h-full' src="/images/nutriscore-b-new-fr.svg" alt='nutriscore-b-new-fr' />
                        </div>
                        <div className='mt-1 ml-2'>
                            <p className='text-green-400'>Nutri-Score B</p>
                            <p>Bonne qualité nutritionnelle</p>
                        </div>
                    </div>
                ) : product?.nutriscore_grade == "c"
                ? (
                    <div className='rounded-lg text-lg flex  p-4 gap-2 bg-orange-200 hover:orange-300'>
                        <div className='h-18'>
                            <img className='w-full h-full' src="/images/nutriscore-c-new-fr.svg" alt='nutriscore-c-new-fr' />
                        </div>
                        <div className='mt-1 ml-2'>
                            <p className='text-yellow-600'>Nutri-Score C</p>
                            <p>Qualité nutritionnelle moyenne</p>
                        </div>
                    </div>
                ) : product?.nutriscore_grade == "d"
                ? (
                    <div className='rounded-lg text-lg flex  p-4 gap-2 bg-orange-50 hover:orange-200'>
                        <div className='h-18'>
                            <img className='w-full h-full' src="/images/nutriscore-d-new-fr.svg" alt='nutriscore-d-new-fr' />
                        </div>
                        <div className='mt-1 ml-2'>
                            <p className='text-orange-600'>Nutri-Score D</p>
                            <p>Moins bonne qualité nutritionnelle</p>
                        </div>
                    </div>
                ) : product?.nutriscore_grade == "e"
                ? (
                    <div className='rounded-lg text-lg flex  p-4 gap-2 bg-red-100 hover:bg-red-300'>
                        <div className='h-18'>
                            <img className='w-full h-full' src="/images/nutriscore-e-new-fr.svg" alt='nutriscore-e-new-fr' />
                        </div>
                        <div className='mt-1 ml-2'>
                            <p className='text-red-400'>Nutri-Score E</p>
                            <p>Moins bonne qualité nutritionnelle</p>
                        </div>
                    </div>
                ) : (
                    <div className='rounded-lg text-lg flex  p-4 gap-2 bg-gray-100 hover:bg-gray-200'>
                        <div className='h-18'>
                            <img className='w-full h-full' src="/images/nutriscore-unknown-new-fr.svg" alt='nutriscore-unknown-new-fr' />
                        </div>
                        <div className='mt-1 ml-2'>
                            <p className='text-gray-700'>Nutri-Score inconnu </p>
                            <p>Données manquantes pour calculer le Nutri-Score</p>
                        </div>
                    </div>
                )
            }
        </div>

        {/* Nutrition Table */}
        <div className="mt-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-8 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                >
                    <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                    <Scale className="text-yellow-500" /> Tableau nutritionnel
                    </div>
                    <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                    <div className="px-4 pb-4 text-gray-700 text-sm">
                      <div className="w-full border border-gray-100  font-roboto text-sm mt-6">
  <div className="grid grid-cols-3 bg-gray-100 font-semibold text-gray-800 px-4 py-3">
    <span className='px-4'>Tableau nutritionnel</span>
    <span className='px-8'>Pour 100g</span>
    <span className='px-8'>Par portion ({product?.quantity})</span>
    {/* <span>Comparé à</span>  */}
  </div>
  {nutritionArray.map((item, idx) => (
    <div
      key={idx}
      className={`grid grid-cols-3 px-4 py-3 ${
        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
      }`}
    >
      <span className='px-4'>{item.label}</span>
      <span className='px-8'>{item.per100g}</span>
      <span className='px-8'>{item.perPortion}</span>
      {/* <span>{item.comparison}</span> Added comparison column */}
    </div>
  ))}
</div>

                    </div>
                )}

            </div>
        </div>
    </div>
  
  )
}

export default Sante
