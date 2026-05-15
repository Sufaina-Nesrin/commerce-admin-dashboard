import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore'

import { db } from '../firebase'

const categoryCollection =
  collection(db, 'categories')

const productCollection =
  collection(db, 'products')


/* =========================
   VALIDATE CATEGORY DATA
========================= */

const validateCategoryData = (
  data
) => {

  if (!data) {
    throw new Error(
      'Category data is required'
    )
  }

  // NAME
  if (
    !data.name ||
    typeof data.name !== 'string'
  ) {
    throw new Error(
      'Category name is required'
    )
  }

  if (data.name.trim().length < 2) {
    throw new Error(
      'Category name must be at least 2 characters'
    )
  }

  return {
    name: data.name.trim(),
  }
}


/* =========================
   ADD CATEGORY
========================= */

export const addCategory = async (
  categoryData
) => {

  try {

    const validatedData =
      validateCategoryData(
        categoryData
      )

    const response = await addDoc(
      categoryCollection,
      {
        ...validatedData,
        createdAt: Date.now(),
      }
    )

    return {
      success: true,
      id: response.id,
      message:
        'Category added successfully',
    }

  } catch (error) {

    console.log(
      'Add Category Error:',
      error
    )

    throw new Error(
      error.message ||
      'Failed to add category'
    )
  }
}


/* =========================
   GET CATEGORIES
========================= */

export const getCategories =
  async () => {

    try {

      const categorySnapshot =
        await getDocs(
          categoryCollection
        )

      const productSnapshot =
        await getDocs(
          productCollection
        )

      const products =
        productSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        )

      const categories =
        categorySnapshot.docs.map(
          (doc) => {

            const categoryData = {
              id: doc.id,
              ...doc.data(),
            }

            const productCount =
              products.filter(
                (product) =>
                  product.category ===
                  categoryData.id
              ).length

            return {
              ...categoryData,
              productCount,
            }
          }
        )

      return categories

    } catch (error) {

      console.log(
        'Get Categories Error:',
        error
      )

      throw new Error(
        'Failed to fetch categories'
      )
    }
  }


/* =========================
   DELETE CATEGORY
========================= */

export const deleteCategory =
  async (id) => {

    try {

      if (
        !id ||
        typeof id !== 'string'
      ) {
        throw new Error(
          'Invalid category ID'
        )
      }

      const categoryDoc = doc(
        db,
        'categories',
        id
      )

      await deleteDoc(categoryDoc)

      return {
        success: true,
        message:
          'Category deleted successfully',
      }

    } catch (error) {

      console.log(
        'Delete Category Error:',
        error
      )

      throw new Error(
        error.message ||
        'Failed to delete category'
      )
    }
  }