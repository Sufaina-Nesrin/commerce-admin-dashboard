import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'

import { db } from '../firebase'

const bannerCollection = collection(db, 'banners')


// VALIDATE PRODUCT DATA
const validateProductData = (data) => {
  if (!data) {
    throw new Error(
      'Banner data is required'
    )
  }

  // NAME
  if (
    !data.name ||
    typeof data.name !== 'string'
  ) {
    throw new Error(
      'Banner name is required'
    )
  }

  
  // IMAGE
  if (!data.image || typeof data.image !== 'string') {
    throw new Error('Product image is required')
  }

  if (!data.image.startsWith('http')) {
    throw new Error('Invalid image URL')
  }

  
  

  return {
    name: data?.name,
    image: data.image.trim(),
  }
}


// ADD BANNER
export const addBanner = async (productData) => {
  try {

    const validatedData =
      validateProductData(productData)

    const response = await addDoc(bannerCollection, {
      ...validatedData,
      createdAt: Date.now(),
    })

    return response

  } catch (error) {
    console.log('Add Banner Error:', error)
   throw new Error(
      error.message ||
      'Failed to add banner'
    )
  }
}


// GET BANNERS
export const getBanners = async () => {
  try {

    const snapshot = await getDocs(bannerCollection)

    const banners = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return banners

  } catch (error) {
    console.log('Get Banners Error:', error)
   throw new Error(
      error.message ||
      'Failed to get banners'
    )
  }
}


// DELETE BANNER
export const deleteBanner = async (id) => {
  try {

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid banner ID')
    }

    const bannerDoc = doc(db, 'banners', id)

    await deleteDoc(bannerDoc)

    return true

  } catch (error) {
    console.log('Delete Banner Error:', error)
   throw new Error(
      error.message ||
      'Failed to delete banners'
    )
  }
}



