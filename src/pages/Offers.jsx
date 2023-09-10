import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"
import { db } from '../firebase'
import Spinner from '../component/Spinner';
import ListingItem from '../component/ListingItem';

const Offers = () => {

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("offer", "==", true), orderBy('timestamp', "desc"), limit(8));
        const querySnap = await getDocs(q);
        //get the last item in the query display on the screen
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchListing(lastVisible)
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(listings)
        setLoading(false)

      } catch (error) {
        toast.error('could not fetch listing')

      }
    }
    fetchListing()
  }, []);

  const fetchMore = async () => {
    try {
      const listingRef = collection(db, "listings")
      const q = query(listingRef, where("offer", "==", true), orderBy('timestamp', "desc"), startAfter(lastFetchListing), limit(4));
      const querySnap = await getDocs(q);
      //get the last item in the query display om the screen
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      // setListings((prevState) =>[...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      // toast.error('could not fetch listing')


    }
  }
  fetchMore()

  return <div className='max-w-6xl mx-auto px-3'>
    <h1 className="text-3xl text-center my-6 font-semibold">Offers</h1>
    {loading ? (
      <Spinner />
    ) : listings && listings.length > 0 ? (
      <>
        <main className="">
          <ul className=" sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {listings.map((listing) => (
              <ListingItem key={listing.id}
                id={listing.id}
                result={listing.data}
              />
            ))}
          </ul>
        </main>
        {lastFetchListing && (
          <div className="flex justify-center items-center">
            <button className="bg-white px-3 py-1.5 text-gray-700 border border-gray-600 mb-6 hover:border-slate-600 cursor-point rounded transition duration150 ease-in-out" onClick={fetchMore}>See more</button>
          </div>
        )}
      </>
    ) : (
      <p className="">There is no current offer</p>
    )
    }
  </div >

}

export default Offers