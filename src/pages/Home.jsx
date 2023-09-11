import { useEffect, useState } from 'react'
import Hero from '../component/Hero'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { Link } from 'react-router-dom'
import ListingItem from '../component/ListingItem'

const Home = () => {
  const [offerListing, setOfferListing] = useState(null);
  const [rentListing, setRentListing] = useState(null);
  const [saleListing, setSaleListing] = useState(null);

  // offers
  useEffect(() => {
    const offers = async () => {
      try {
        // get reference
        const listingRef = collection(db, "listings");
        //get the query
        const q = query(listingRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4));
        // execute the query
        const querySnap = await getDocs(q)
        // where to save the data fetch
        const listings = [];
        //fetch n loop through
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        });
        setOfferListing(listings)

      } catch (error) {
        console.log(error)

      }
    }
    offers()
  }, [])
  // rent

  useEffect(() => {
    const rent = async () => {
      try {
        // get reference
        const listingRef = collection(db, "listings");
        //get the query
        const q = query(listingRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4));
        // execute the query
        const querySnap = await getDocs(q)
        // where to save the data fetch
        const listings = [];
        //fetch n loop through
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        });
        setRentListing(listings)
        listings.map((listing) => {

          console.log(listing.id)
        })

      } catch (error) {
        console.log(error)

      }
    }
    rent()
  }, [])

  // sale
  useEffect(() => {
    const sale = async () => {
      try {
        // get reference
        const listingRef = collection(db, "listings");
        //get the query
        const q = query(listingRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(4));
        // execute the query
        const querySnap = await getDocs(q)
        // where to save the data fetch
        const listings = [];
        //fetch n loop through
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        });
        setSaleListing(listings)

      } catch (error) {
        console.log(error)

      }
    }
    sale()
  }, [])

  return (
    <div>
      <Hero />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {/* offer */}
        {offerListing && offerListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text--2xl font-semibold mt-6">Recent offers</h2>
            <Link to="/offers">
              <p className="text-sm px-3 text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more offers</p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {offerListing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    result={listing.data}
                  />
                ))}
              </ul>
            </Link>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl font-semibold mt-6">Place for rents</h2>
            <Link to="/category/rent">
              <p className="text-sm px-3 text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more rents</p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rentListing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    result={listing.data}
                  />
                ))}
              </ul>
            </Link>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text--2xl font-semibold mt-6">Place for sales</h2>
            <Link to="/category/sale">
              <p className="text-sm px-3 text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more sales</p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {saleListing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    result={listing.data}
                  />
                ))}
              </ul>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home