import { useEffect, useState } from "react";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fresh Juice");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [message, setMessage] = useState("");

  // ==========================================
  // LOAD ALL PRODUCTS
  // ==========================================
  const loadProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/om_Saravanan_Ice/ProductServlet"
      );

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      console.log("Products:", data);

      setProducts(data);
    } catch (error) {
      console.error("Load Products Error:", error);
      setMessage("Unable to load products.");
    }
  };

  // ==========================================
  // LOAD PRODUCTS WHEN PAGE OPENS
  // ==========================================
  useEffect(() => {
    loadProducts();
  }, []);

  // ==========================================
  // ADD / UPDATE PRODUCT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Basic validation
    if (!name.trim()) {
      setMessage("Product name is required.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setMessage("Please enter a valid price.");
      return;
    }

    try {
      const formData = new URLSearchParams();

      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("available", String(available));

      let url =
        "http://localhost:8080/om_Saravanan_Ice/ProductServlet";

      let method = "POST";

      // UPDATE
      if (isEditing) {
        if (!editingId) {
          setMessage("Product ID is missing.");
          return;
        }

        formData.append("id", String(editingId));

        method = "PUT";
      }

      console.log("Sending:", formData.toString());

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formData.toString(),
      });

      const data = await response.json();

      console.log("Server response:", data);

      if (response.ok && data.success) {
        if (isEditing) {
          setMessage("Product updated successfully!");
        } else {
          setMessage("Product added successfully!");
        }

        // Reload products
        await loadProducts();

        // Clear form
        handleCancel();
      } else {
        setMessage(data.message || "Operation failed.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      setMessage("Unable to connect to Java server.");
    }
  };

  // ==========================================
  // EDIT PRODUCT
  // ==========================================
  const handleEdit = (product) => {
    setName(product.name || "");
    setCategory(product.category || "Fresh Juice");
    setPrice(product.price || "");
    setImage(product.image || "");
    setDescription(product.description || "");
    setAvailable(product.available);

    setEditingId(product.id);
    setIsEditing(true);

    setMessage("");

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // DELETE PRODUCT
  // ==========================================
  const handleDelete = async (id, productName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${productName}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/om_Saravanan_Ice/ProductServlet?id=${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Delete response:", data);

      if (response.ok && data.success) {
        setMessage("Product deleted successfully!");

        await loadProducts();
      } else {
        setMessage(data.message || "Product deletion failed.");
      }
    } catch (error) {
      console.error("Delete Error:", error);

      setMessage("Unable to connect to Java server.");
    }
  };

  // ==========================================
  // TOGGLE PRODUCT AVAILABILITY
  // ==========================================
  const handleToggleAvailability = async (product) => {
    try {
      const formData = new URLSearchParams();

      formData.append("id", String(product.id));
      formData.append("name", product.name || "");
      formData.append("category", product.category || "");
      formData.append("price", String(product.price || 0));
      formData.append("image", product.image || "");
      formData.append("description", product.description || "");

      // Change true -> false
      // Change false -> true
      formData.append("available", String(!product.available));

      console.log(
        "Changing availability:",
        product.name,
        "from",
        product.available,
        "to",
        !product.available
      );

      const response = await fetch(
        "http://localhost:8080/om_Saravanan_Ice/ProductServlet",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },

          credentials: "include",

          body: formData.toString(),
        }
      );

      const data = await response.json();

      console.log("Availability response:", data);

      if (response.ok && data.success) {
        if (product.available) {
          setMessage(`${product.name} is now unavailable.`);
        } else {
          setMessage(`${product.name} is now available.`);
        }

        await loadProducts();
      } else {
        setMessage(
          data.message || "Unable to change product availability."
        );
      }
    } catch (error) {
      console.error("Availability Error:", error);

      setMessage("Unable to connect to Java server.");
    }
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancel = () => {
    setName("");
    setCategory("Fresh Juice");
    setPrice("");
    setImage("");
    setDescription("");
    setAvailable(true);

    setEditingId(null);
    setIsEditing(false);
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2>Product Management</h2>

      {/* ======================================
          MESSAGE
      ====================================== */}
      {message && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            backgroundColor: "#f1f1f1",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}

      {/* ======================================
          ADD / EDIT FORM
      ====================================== */}
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          backgroundColor: "#fafafa",
        }}
      >
        <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>

        {/* PRODUCT NAME */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Product Name</strong>
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* CATEGORY */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Category</strong>
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          >
            <option value="Fresh Juice">Fresh Juice</option>
            <option value="Mixed Juice">Mixed Juice</option>
            <option value="Ice Bar">Ice Bar</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* PRICE */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Price</strong>
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            min="0"
            step="0.01"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* IMAGE */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Image</strong>
          </label>

          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image filename or URL"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* DESCRIPTION */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Description</strong>
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* AVAILABLE */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />

            {"  "}

            <strong>Product Available</strong>
          </label>
        </div>

        {/* BUTTONS */}
        <div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ======================================
          PRODUCT LIST
      ====================================== */}
      <h3>Products</h3>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                backgroundColor: "#fff",
              }}
            >
              {/* PRODUCT INFORMATION */}
              <h3>{product.name}</h3>

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {product.description || "No description"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {product.available ? (
                  <span>🟢 Available</span>
                ) : (
                  <span>🔴 Unavailable</span>
                )}
              </p>

              {/* ==================================
                  EDIT BUTTON
              ================================== */}
              <button
                type="button"
                onClick={() => handleEdit(product)}
                style={{
                  padding: "8px 15px",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              >
                ✏️ Edit
              </button>

              {/* ==================================
                  DELETE BUTTON
              ================================== */}
              <button
                type="button"
                onClick={() =>
                  handleDelete(product.id, product.name)
                }
                style={{
                  padding: "8px 15px",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              >
                🗑️ Delete
              </button>

              {/* ==================================
                  AVAILABILITY BUTTON
              ================================== */}
              <button
                type="button"
                onClick={() =>
                  handleToggleAvailability(product)
                }
                style={{
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                {product.available
                  ? "🔴 Make Unavailable"
                  : "🟢 Make Available"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;