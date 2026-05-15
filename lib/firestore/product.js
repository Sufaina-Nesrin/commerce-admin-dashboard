import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'

import { db } from '../firebase'

const productCollection = collection(db, 'products')


// VALIDATE PRODUCT DATA
const validateProductData = (data) => {

  if (!data) {
    throw new Error('Product data is required')
  }

  // NAME
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Product name is required')
  }

  if (data.name.trim().length < 3) {
    throw new Error('Product name must be at least 3 characters')
  }

  // PRICE
  if (
    data.price === undefined ||
    data.price === null ||
    data.price === ''
  ) {
    throw new Error('Price is required')
  }

  if (isNaN(data.price)) {
    throw new Error('Price must be a number')
  }

  if (Number(data.price) <= 0) {
    throw new Error('Price must be greater than 0')
  }

  // CATEGORY
  if (!data.category || typeof data.category !== 'string') {
    throw new Error('Category is required')
  }

  if (data.category.trim().length < 2) {
    throw new Error('Invalid category')
  }

  // IMAGE
  if (!data.image || typeof data.image !== 'string') {
    throw new Error('Product image is required')
  }

  if (!data.image.startsWith('http')) {
    throw new Error('Invalid image URL')
  }

  // DESCRIPTION
  if (!data.description || typeof data.description !== 'string') {
    throw new Error('Description is required')
  }

  if (data.description.trim().length < 10) {
    throw new Error(
      'Description must be at least 10 characters'
    )
  }

  return {
    name: data.name.trim(),
    price: Number(data.price),
    category: data.category.trim(),
    image: data.image.trim(),
    description: data.description.trim(),
  }
}


// ADD PRODUCT
export const addProduct = async (productData) => {
  try {

    const validatedData =
      validateProductData(productData)

    const response = await addDoc(productCollection, {
      ...validatedData,
      createdAt: Date.now(),
    })

    return response

  } catch (error) {
    console.log('Add Product Error:', error)
   throw new Error(
      error.message ||
      'Failed to add product'
    )
  }
}


// GET PRODUCTS
export const getProducts = async () => {
  try {

    const snapshot = await getDocs(productCollection)

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return products

  } catch (error) {
    console.log('Get Products Error:', error)
   throw new Error(
      error.message ||
      'Failed to get product'
    )
  }
}


// DELETE PRODUCT
export const deleteProduct = async (id) => {
  try {

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid product ID')
    }

    const productDoc = doc(db, 'products', id)

    await deleteDoc(productDoc)

    return true

  } catch (error) {
    console.log('Delete Product Error:', error)
 throw new Error(
      error.message ||
      'Failed to delete product'
    )
  }
}


// UPDATE PRODUCT
export const updateProduct = async (
  id,
  updatedData
) => {
  try {

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid product ID')
    }

    const validatedData =
      validateProductData(updatedData)

    const productDoc = doc(db, 'products', id)

    await updateDoc(productDoc, {
      ...validatedData,
      updatedAt: Date.now(),
    })

    return true

  } catch (error) {
    console.log('Update Product Error:', error)
    throw new Error(
      error.message ||
      'Failed to update product'
    )
  }
}