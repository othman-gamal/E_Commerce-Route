const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

// Get token from localStorage (client-side only)
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

/* ================================
   ADD PRODUCT TO WISHLIST
================================ */
export const addToWishlist = async (productId: string) => {
  const token = getToken();

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token || "",
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    throw new Error("Failed to add product to wishlist");
  }

  return res.json();
};

/* ================================
   REMOVE PRODUCT FROM WISHLIST
================================ */
export const removeFromWishlist = async (wishlistItemId: string) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/${wishlistItemId}`, {
    method: "DELETE",
    headers: {
      token: token || "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to remove product from wishlist");
  }

  return res.json();
};

/* ================================
   GET LOGGED USER WISHLIST
================================ */
export const getWishlist = async () => {
  const token = getToken();

  const res = await fetch(BASE_URL, {
    headers: {
      token: token || "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return res.json();
};
