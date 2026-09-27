import { useEffect, useState } from "react";


const productIcons = {
  // Fresh Juices
  Apple: "🍎",
  Banana: "🍌",
  Papaya: "🥭",
  Pomegranate: "❤️",
  Strawberry: "🍓",
  "Fresh Lemon": "🍋",
  Sathukodi: "🍊",
  Muskmelon: "🍈",

  // Mixed Juices / Drinks
  "Fruit Mix": "🍹",
  "Rose Milk": "🌹",
  "Badam Milk": "🥛",
  "Butter Milk": "🥛",
  Lassi: "🥛",
  Orange: "🍊",
  Lemon: "🍋",
};

function MenuCard({ item }) {
  return (
    <div className="menu-card">

      <div className="fruit-icon">
  {productIcons[item.name] || "🍹"}
</div>

      <div>
        <h3>{item.name}</h3>

        <p>
          {item.description || "Fresh & delicious"}
        </p>
      </div>

      <strong>
        ₹{item.price}
      </strong>

      {/* Product Availability */}
      <div
        className={
          item.available
            ? "product-available"
            : "product-unavailable"
        }
      >
        {item.available
          ? "🟢 Available"
          : "🔴 Currently Unavailable"}
      </div>

    </div>
  );
}


function Menu() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(
      "http://localhost:8080/om_Saravanan_Ice/ProductServlet"
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }

        return response.json();
      })

      .then((data) => {

        console.log("Products received:", data);

        setProducts(data);
        setLoading(false);

      })

      .catch((error) => {

        console.error(
          "Product loading error:",
          error
        );

        setLoading(false);
      });

  }, []);


  // ==========================================
  // LOADING MESSAGE
  // ==========================================

  if (loading) {
    return (
      <section
        className="menu-section"
        id="menu"
      >

        <div className="section-heading">

          <p>OUR MENU</p>

          <h2>
            Fresh & Delicious
          </h2>

          <span>
            Loading menu...
          </span>

        </div>

      </section>
    );
  }


  // ==========================================
  // SEPARATE PRODUCTS BY CATEGORY
  // ==========================================

  const freshJuices =
    products.filter(
      (item) =>
        item.category === "Fresh Juice"
    );

  const mixedJuices =
    products.filter(
      (item) =>
        item.category === "Mixed Juice"
    );


  // ==========================================
  // MAIN MENU
  // ==========================================

  return (

    <section
      className="menu-section"
      id="menu"
    >

      <div className="section-heading">

        <p>OUR MENU</p>

        <h2>
          Fresh & Delicious
        </h2>

        <span>
          Choose your favourite drink
        </span>

      </div>


      {/* =========================
          FRESH JUICE
      ========================= */}

      {freshJuices.length > 0 && (

        <>

          <h3 className="menu-title">
            🍊 Fresh Juice
          </h3>

          <div className="menu-grid">

            {freshJuices.map((item) => (

              <MenuCard
                key={item.id}
                item={item}
              />

            ))}

          </div>

        </>

      )}


      {/* =========================
          MIXED JUICE
      ========================= */}

      {mixedJuices.length > 0 && (

        <>

          <h3 className="menu-title">
            🍹 Mixed Juice
          </h3>

          <div className="menu-grid">

            {mixedJuices.map((item) => (

              <MenuCard
                key={item.id}
                item={item}
              />

            ))}

          </div>

        </>

      )}

    </section>

  );
}

export default Menu;