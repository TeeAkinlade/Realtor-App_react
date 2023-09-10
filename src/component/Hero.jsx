import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Spinner from '../component/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { useNavigate } from 'react-router';

const Hero = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingRef = collection(db, "listings");
            const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
            const querySnap = await getDocs(q)
            let newListings = [];
            querySnap.forEach((doc) => {
                return newListings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            });
            setListings(newListings)
            setLoading(false)
        }
        fetchListings()
    }, []);
    if (loading) {
        return <Spinner />
    }
    if (listings.length === 0) {
        return <></>
    }
    return (
        listings && (<>
            {/* swiper */}
            <Swiper slidesPerView={1}
                navigation={true}
                pagination={{ type: "progressbar" }}
                modules={[EffectFade, Autoplay, Pagination, Navigation]}
                effect='fade'
                autoplay={{ delay: 3000 }}>
                {listings.map((data, id) => (
                    <SwiperSlide key={id} onClick={() => navigate(`/category/${data.data.type}/${data.id}`)}>
                        <div className="relative w-full overflow-hidden h-[300px]"
                            style={{
                                background: `url(${data.data.imgUrls[0]}) center, no-repeat`,
                                backgroundSize: 'cover',
                            }}>
                        </div>
                        <p className="text-[#f1faee] absolute left1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">{data.data.name}</p>
                        <p className="text-[#f1faee] absolute left1 bottom-3 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">${data.data.discountedPrice ?? data.data.regularPrice}
                            {data.data.type === "rent" && " / month"}</p>
                    </SwiperSlide>
                )
                )}
            </Swiper>
            {/* swiper */}
        </>)
    )

}

export default Hero