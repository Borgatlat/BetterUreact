"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ShopScreen = () => {
  const [activeCategory, setActiveCategory] = useState("featured")

  const categories = [
    { id: "featured", name: "Featured" },
    { id: "equipment", name: "Equipment" },
    { id: "apparel", name: "Apparel" },
    { id: "supplements", name: "Supplements" },
    { id: "accessories", name: "Accessories" },
  ]

  const featuredItems = [
    {
      id: 1,
      name: "Premium Resistance Bands Set",
      price: 29.99,
      image: "https://via.placeholder.com/150",
      rating: 4.8,
      reviews: 124,
      discount: 15,
    },
    {
      id: 2,
      name: "BetterU Performance T-Shirt",
      price: 24.99,
      image: "https://via.placeholder.com/150",
      rating: 4.6,
      reviews: 89,
      discount: 0,
    },
    {
      id: 3,
      name: "Adjustable Dumbbell Set",
      price: 199.99,
      image: "https://via.placeholder.com/150",
      rating: 4.9,
      reviews: 56,
      discount: 10,
    },
    {
      id: 4,
      name: "Protein Powder - Chocolate",
      price: 39.99,
      image: "https://via.placeholder.com/150",
      rating: 4.7,
      reviews: 203,
      discount: 0,
    },
    {
      id: 5,
      name: "Foam Roller - Deep Tissue",
      price: 19.99,
      image: "https://via.placeholder.com/150",
      rating: 4.5,
      reviews: 78,
      discount: 0,
    },
  ]

  const renderItem = ({ item }) => {
    const discountedPrice = item.discount > 0 ? (item.price - (item.price * item.discount) / 100).toFixed(2) : null

    return (
      <TouchableOpacity style={styles.productCard}>
        <View style={styles.imageContainer}>
          <View style={styles.productImage}>
            <Ionicons name="barbell-outline" size={40} color="cyan" />
          </View>
          {item.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}% OFF</Text>
            </View>
          )}
        </View>

        <Text style={styles.productName}>{item.name}</Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="cyan" />
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviews})
          </Text>
        </View>

        <View style={styles.priceContainer}>
          {discountedPrice ? (
            <>
              <Text style={styles.originalPrice}>${item.price}</Text>
              <Text style={styles.discountedPrice}>${discountedPrice}</Text>
            </>
          ) : (
            <Text style={styles.price}>${item.price}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color="white" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>SUMMER SALE</Text>
            <Text style={styles.bannerSubtitle}>Up to 40% off on selected items</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerImageContainer}>
            <Ionicons name="fitness" size={60} color="cyan" />
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryButton, activeCategory === category.id && styles.activeCategoryButton]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text style={[styles.categoryText, activeCategory === category.id && styles.activeCategoryText]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={featuredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 20,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "cyan",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  banner: {
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.3)",
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: "cyan",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: "white",
    fontSize: 14,
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: "cyan",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  bannerImageContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  activeCategoryButton: {
    backgroundColor: "cyan",
  },
  categoryText: {
    color: "white",
    fontSize: 14,
  },
  activeCategoryText: {
    color: "black",
    fontWeight: "bold",
  },
  productsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 15,
    margin: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  productImage: {
    height: 120,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "cyan",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  discountText: {
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
  },
  productName: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    color: "#aaa",
    fontSize: 12,
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  price: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  originalPrice: {
    color: "#aaa",
    fontSize: 14,
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountedPrice: {
    color: "cyan",
    fontSize: 16,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "cyan",
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default ShopScreen

