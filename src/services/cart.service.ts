const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

function getToken() {
  return localStorage.getItem("token") || "";
}

export const cartService = {
  async getCart() {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: {
        token: getToken(),
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }

    return res.json();
  },

  async addToCart(productId: string) {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      throw new Error("Failed to add product");
    }

    return res.json();
  },

  async removeItem(productId: string) {
    const res = await fetch(`${BASE_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        token: getToken(),
      },
    });

    if (!res.ok) {
      throw new Error("Failed to remove item");
    }

    return res.json();
  },

  async updateQuantity(productId: string, count: number) {
    const res = await fetch(`${BASE_URL}/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
      body: JSON.stringify({ count }),
    });

    if (!res.ok) {
      throw new Error("Failed to update quantity");
    }

    return res.json();
  },

  async clearCart() {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "DELETE",
      headers: {
        token: getToken(),
      },
    });

    if (!res.ok) {
      throw new Error("Failed to clear cart");
    }

    return res.json();
  },
};
