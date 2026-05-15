import {
  collection,
  getDocs,
} from 'firebase/firestore'

import { db } from '../firebase'

const productCollection =
  collection(db, 'products')

const categoryCollection =
  collection(db, 'categories')

const bannerCollection =
  collection(db, 'banners')


// GET DASHBOARD COUNTS
export const getDashboardCounts =
  async () => {

    try {

      // Fetch all collections in parallel
      const [
        productSnapshot,
        categorySnapshot,
        bannerSnapshot,
      ] = await Promise.all([
        getDocs(productCollection),
        getDocs(categoryCollection),
        getDocs(bannerCollection),
      ])

      // Count documents
      const counts = {
        products:
          productSnapshot.size,

        categories:
          categorySnapshot.size,

        banners:
          bannerSnapshot.size,
      }

      return counts

    } catch (error) {

      console.log(
        'Dashboard Count Error:',
        error
      )

      throw error
    }
  }