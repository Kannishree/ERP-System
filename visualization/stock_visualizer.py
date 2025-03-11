import requests
import matplotlib.pyplot as plt

# Backend API endpoint to fetch products
API_URL = "http://localhost:5000/api/products"  # Change if necessary

# Fetch product data from backend
def fetch_products():
    try:
        response = requests.get(API_URL)
        response.raise_for_status()
        return response.json()  # Return list of products
    except requests.exceptions.RequestException as e:
        print("Error fetching products:", e)
        return []

# Generate stock visualization
def plot_stock(chart_type="bar"):
    products = fetch_products()
    if not products:
        print("No products found.")
        return

    # Extract product names and stock values
    names = [product['name'] for product in products]
    stock_levels = [product['stock'] for product in products]

    # Plot different chart types
    plt.figure(figsize=(10, 5))

    if chart_type == "bar":
        plt.bar(names, stock_levels, color='skyblue')
    elif chart_type == "line":
        plt.plot(names, stock_levels, marker="o", linestyle="-", color="b")
    elif chart_type == "pie":
        plt.pie(stock_levels, labels=names, autopct="%1.1f%%", colors=["red", "blue", "green", "orange", "purple"])
    else:
        print("Invalid chart type. Using bar chart by default.")
        plt.bar(names, stock_levels, color='skyblue')

    plt.xlabel("Product Name")
    plt.ylabel("Stock Available")
    plt.title("Product Stock Availability")

    if chart_type == "bar" or chart_type == "line":
        plt.xticks(rotation=45, ha="right")

    plt.tight_layout()
    plt.show()

# User selects chart type
if __name__ == "__main__":
    chart_choice = input("Enter chart type (bar, line, pie): ").strip().lower()
    plot_stock(chart_choice)
