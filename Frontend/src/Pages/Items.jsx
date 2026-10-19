import { PackagePlus } from "lucide-react";

export const Items = () => {
  const Products = [
    {
      id: 1,
      name: "Laptop",
      Price: 40,
    },
    {
      id: 2,
      name: "Phone",
      Price: 47,
    },
    {
      id: 3,
      name: "Charger",
      Price: 45,
    },
     {
      id: 1,
      name: "Laptop",
      Price: 40,
    },
    {
      id: 2,
      name: "Phone",
      Price: 47,
    },
    {
      id: 3,
      name: "Charger",
      Price: 45,
    },
  ];

  const upadateProducts = () => {
    return (
      <div className="bg-green-600 p-4 grid grid-cols-3 gap-4">
        {Products.map((Product) => (
          <div key={Product.id} className="rounded-lg bg-white p-4 hover:-translate-y-3-1">
            <h1 className="font-bold text-black transition duration-300 hover:text-blue-500">
              {Product.name}
            </h1>
            <h2 className="font-semibold text-red-500">{Product.name}</h2>
            <p className="text-sm">{Product.Price}</p>
          </div>
        ))}
      </div>
    );
  };

  return(
  <div>
    {upadateProducts()}
  </div>
  )
};
