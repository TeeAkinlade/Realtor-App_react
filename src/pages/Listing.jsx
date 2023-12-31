import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase';
import Spinner from '../component/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa'
import { getAuth } from "firebase/auth"
import ContactForm from '../component/ContactForm';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Listing = () => {
    const params = useParams();
    const auth = getAuth();
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    const [contactLandlord, setContactLandlord] = useState(false);
    const [hover, setHover] = useState(false);
    // SwiperCore.use([Autoplay, Navigation, Pagination])

    useEffect(() => {

        const fetchListing = async () => {
            const docRef = doc(db, "listings", params.resultId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        fetchListing()
    }, [params.resultId])
    if (loading) {
        return <Spinner />
    }

    const onHover = () => {
        setHover(true);
    };

    const onLeave = () => {
        setHover(false);
    };

    return (
        <main>
            <Swiper slidesPerView={1}
                // centeredSlides={true}
                navigation={true}
                pagination={{ type: "progressbar" }}
                modules={[EffectFade, Autoplay, Pagination, Navigation]}
                effect='fade'
                autoplay={{ delay: 3000 }}>
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div className=" relative w-[100%] overflow-hidden h-[300px] sm:h-[400px]" style={{
                            background: `url(${listing.imgUrls[index]}) center no-repeat`,
                            backgroundSize: 'cover',
                            objectFit: 'scale-down'
                        }}>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="fixed top-[15%] sm:top-[13%] right-[5%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center" onClick={() => {
                //to copy the window location href
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(() => {
                    setShareLinkCopied(false)
                }, 2000)
            }}>
                <FaShare className='text-lg text-slate-500' />
            </div>
            {shareLinkCopied && (
                <p className="fixed top-[30%] sm:top-[25%] right-[5%] font-semibold boder-2 border-gray-400 rounded-md bg-white z-10 p-2 ">Linked copied</p>
            )}

            <div className="flex flex-col md:flex-row max-w-6xl lg:mx-auto my-4 mx-2 sm:m-4 p-2 sm:p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
                <div className="w-full">
                    <p className="text-2xl font-bold mb-3 text-blue-900 ">
                        {listing.name} - ${" "} {listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type == "rent" ? "/ month" : ""}
                    </p>
                    <p className="flex items-center mt-6 mb-3 font-semibold"><FaMapMarkerAlt className='text-green-700 mr-1' />{listing.address}</p>
                    <div className=" flex justify-start items-center space-x-4 w-[75%]">
                        <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md whitespace-nowrap">{listing.type === "rent" ? "For Rent" : "For Sale"}</p>
                        {listing.offer && (
                            <p className="w-full max-w-[200px] bg-green-800 rounded-md py-1 px-2 text-white font-semibold text-center shadow-md whitespace-nowrap">{`$${+listing.regularPrice - +listing.discountedPrice} discount`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        )}
                    </div>
                    <p className=" mt-3 mb-3"><span className="font-semibold">Description - </span> {listing.description}</p>
                    <ul className="flex items-center space-x-2 sm:space-x-4 lg:space-x-10 text-sm font-semibold mb-6">
                        <li className="flex items-center whitespace-nowrap">
                            <FaBed className='text-lg mr-1' />
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaBath className='text-lg mr-1' />
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaParking className='text-lg mr-1' />
                            {listing.parking ? `Parking spot` : "No parking"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaChair className='text-lg mr-1' />
                            {listing.furnished ? `Furnished` : "Not Furnished"}
                        </li>

                    </ul>
                    {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
                        <div className="mt-6">
                            <button className="px-7 py-3 bg-blue-600 text-white font-medium text small uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg w-full text-center transition duration-150 ease-in-out" onClick={() => setContactLandlord(true)}>Contact Landlord</button>
                        </div>
                    )}
                    {contactLandlord && (
                        <ContactForm userRef={listing.userRef} listing={listing} />
                    )}
                </div>
                {/* for map */}
                <div className=" w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
                    <MapContainer center={[listing.enableGeoLocation.lat, listing.enableGeoLocation.lng]} zoom={13} scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[listing.enableGeoLocation.lat, listing.enableGeoLocation.lng]}>
                            <Popup
                                onMouseOver={onHover}
                                onMouseOut={onLeave}
                            >
                                {listing.address}
                            </Popup>
                            {hover && (
                                <p>click to show address</p>
                            )}
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </main >
    )
}

export default Listing