import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase';
import Spinner from '../component/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Autoplay } from 'swiper'
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
    const params = useParams();
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
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
                        <div className=" relative w-full overflow-hidden h-[300px]" style={{
                            background: `url(${listing.imgUrls[index]}) center no-repeat`,
                            backgroundSize: 'cover'
                        }}>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </main >
    )
}

export default Listing